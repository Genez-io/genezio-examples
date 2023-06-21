# Blockchain example

In this example, we have implemented a class that queries periodically using BlastAPI smart contract events and saves them in a MongoDB.

The class is implemented in the `./server/blockchainServer.js` file.

Note: `genezio deploy` deploys both backend and frontend. If you want to test this example out-of-the-box by running 1 command, head to the `server` directory and run `genezio deploy`.

If you want to deploy your application step-by-step, follow the guidelines below.

## Clone the example
1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/javascript/blockchain`

## Initialization

1. Run `npm install` in the `server/` folder to install the dependencies.
2. Run `npm install` in the `client/` folder to install the dependencies.

## Run the example locally

1. Run `genezio local` in the `server/` folder. This will start a local web server that listens for requests.
2. Open a new terminal and run the React app in the `client/` folder.

## Deploy the example in the Genezio infrastructure

1. Run `genezio deploy --backend` in the `server/` folder. This will deploy the code to Genezio infrastructure and it will create the SDK.
2. Open a new terminal and run the React app in the `client/` folder.

## Deploy the frontend in Genezio Infrastructure
1. Run `npm i && npm run build` in the `client` folder to build the React app.
2. Run `genezio deploy --frontend` in the `server` folder to deploy the frontend in the Genezio infrastructure.
