import Web3 from "web3";
import { abi } from "./abi.js";
import { EventModel } from "./models/event.js";
import { mongoose } from "mongoose";
import { GenezioDeploy, GenezioMethod } from "@genezio/types";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_mongo_error =
  "ERROR: Your MONGO_DB_URI environment variable is not properly set, go to https://genez.io/blog/how-to-add-a-mongodb-to-your-genezio-project/ to learn how to integrate your project with Mongo DB";
const missing_env_contract_error =
  "ERROR: Your CONTRACT_ADDRESS environment variable is not properly set, go to https://genez.io/blog/create-your-first-web3-app/ to learn how obtain a contract address";

const missing_env_blast_api_error =
  "ERROR: Your BLAST_API_RPC_ENDPOINT environment variable is not properly set, go to https://genez.io/blog/create-your-first-web3-app/ to learn how to obtain a Blast API Endpoint";

/**
 * The Blockchain server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class BlockchainServer {
  constructor() {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_mongo_error);
      return;
    }
    if (!process.env.CONTRACT_ADDRESS) {
      console.log(red_color, missing_env_contract_error);
      return;
    }
    if (!process.env.BLAST_API_RPC_ENDPOINT) {
      console.log(red_color, missing_env_blast_api_error);
      return;
    }
    mongoose.connect(process.env.MONGO_DB_URI).catch((err) => {
      console.log(err);
      throw err;
    });
    try {
      this.web3 = new Web3(process.env.BLAST_API_RPC_ENDPOINT);
      this.contract = new this.web3.eth.Contract(
        JSON.parse(abi),
        process.env.CONTRACT_ADDRESS
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
    this.knownEventTokens = this.contract.options.jsonInterface.filter(
      (token) => {
        return token.type === "event";
      }
    );
  }

  /**
   * Private method that decodes an event and returns the name and the parameters.
   *
   * This will not be callable using the genezio SDK. Only the public methods are exposed publicly.
   *
   * @param {*} event
   * @returns An object containing the name of the event and its parameters.
   */
  #decodeEvent(event) {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_mongo_error);
      return;
    }
    if (!process.env.CONTRACT_ADDRESS) {
      console.log(red_color, missing_env_contract_error);
      return;
    }
    if (!process.env.BLAST_API_RPC_ENDPOINT) {
      console.log(red_color, missing_env_blast_api_error);
      return;
    }
    // Retrieve the event declaration from the ABI
    let eventToken;
    try {
      eventToken = this.knownEventTokens.find((knownEventToken) => {
        return knownEventToken.signature === event.topics[0];
      });
    } catch (err) {
      console.log(err);
      return undefined;
    }

    if (!eventToken) {
      console.log("cannot process log %d", event.logIndex);
      return undefined;
    }

    // Decode the event
    let decodedEvent;
    try {
      decodedEvent = this.web3.eth.abi.decodeLog(
        eventToken.inputs,
        event.data,
        event.topics.slice(1)
      );
    } catch (err) {
      console.log(err);
      return undefined;
    }

    // Parse the parameters in a simple dictionary
    const parameters = {};
    eventToken.inputs.forEach((input) => {
      parameters[input.name] = decodedEvent[input.name];
    });

    return {
      name: eventToken.name,
      parameters,
    };
  }

  /**
   * Method used to get all the events in a paginated way.
   *
   * @param {*} from The starting index of the first event.
   * @param {*} limit The number of events that will be part of the response.
   * @returns
   */
  async getEvents(from, limit) {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_mongo_error);
      return { success: false, err: missing_env_mongo_error };
    }
    if (!process.env.CONTRACT_ADDRESS) {
      console.log(red_color, missing_env_contract_error);
      return { success: false, err: missing_env_contract_error };
    }
    if (!process.env.BLAST_API_RPC_ENDPOINT) {
      console.log(red_color, missing_env_blast_api_error);
      return { success: false, err: missing_env_blast_api_error };
    }
    console.log(
      `Received getEvents request with from = ${from} limit = ${limit}`
    );
    let count;
    let events;
    try {
      count = await EventModel.count();
      console.log("Event count", count);
      events = await EventModel.find(undefined, undefined, {
        skip: from,
        limit,
        sort: { blockNumber: -1, logIndex: -1 },
      });
    } catch (err) {
      console.log(err);
      return { success: false, err: err };
    }

    return {
      count,
      events: events.map((event) => ({
        id: event.id,
        name: event.name,
        parameters: event.parameters,
        blockNumber: event.blockNumber,
      })),
    };
  }

  /**
   * Method that will be called periodically by the genezio infrastructure to index the events.
   *
   * The creation of an Ethereum block will take up to 12 seconds.
   *
   * The frequency with which the method will be called can be modified from the genezio YAML file.
   *
   */
  @GenezioMethod({ type: "cron", cronString: "* * * * *" })
  async sync() {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_mongo_error);
      return;
    }
    if (!process.env.CONTRACT_ADDRESS) {
      console.log(red_color, missing_env_contract_error);
      return;
    }
    if (!process.env.BLAST_API_RPC_ENDPOINT) {
      console.log(red_color, missing_env_blast_api_error);
      return;
    }
    // Get the current block number and request the last 100 blocks
    let events;
    let blockNumber;
    try {
      blockNumber = await this.web3.eth.getBlockNumber();
      events = await this.web3.eth.getPastLogs({
        address: process.env.CONTRACT_ADDRESS,
        fromBlock: blockNumber - 100,
        toBlock: blockNumber,
      });
    } catch (err) {
      console.log(err);
      return;
    }

    console.log(`New sync started with ${events.length} to save`);

    for (const event of events) {
      const decodedEvent = this.#decodeEvent(event);

      if (!decodedEvent) {
        continue;
      }

      // Insert the missing events.
      try {
        await EventModel.findOneAndUpdate(
          { id: `${event.transactionHash}-${event.logIndex}` },
          {
            $setOnInsert: {
              id: `${event.transactionHash}-${event.logIndex}`,
              name: decodedEvent.name,
              parameters: decodedEvent.parameters,
              blockNumber: event.blockNumber,
              logIndex: event.logIndex,
            },
          },
          { upsert: true }
        );
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
}
