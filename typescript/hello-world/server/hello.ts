import { GenezioDeploy } from "@genezio/types";
import { testFunction } from "./testFunction";

export enum Season {
  Winter = "Winter",
  Summer = "Summer",
}

/**
 * This class represents a hello world server that can be deployed on genezio infrastructure
 * using "genezio deploy" command or tested locally using "genezio local".
 */
@GenezioDeploy()
export class HelloWorld {
  constructor() {
    console.log("Constructor called!");
  }

  /**
   * Method that returns a "Hello world" message.
   */
  helloWorld() {
    console.log("Hello world request received!");
    return "Hello world!";
  }

  /**
   * Method that returns a personalized "Hello world" message.
   */
  hello(name: string, from: string, value: Season): string {
    console.log(
      `Hello world request received with name ${name} from ${from} value ${value}!`
    );
    // if (name.length > 3) {
    //   throw new Error("Length too big");
    // }
    let nameTested = testFunction(name);
    const message = `Hello, ${nameTested}, from ${from} during this ${value}`;
    console.log(message);

    return message;
  }
}
