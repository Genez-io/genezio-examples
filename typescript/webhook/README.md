# Webhook example

Sometimes we might need to communicate directly over HTTP instead of JSONRPC. In this example, the `helloWorldOverHttp`
implemented in `HelloWorldHttpExample` class will be triggered by an HTTP request.

## Clone the example

1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/typescript/webhook`

## Run the example locally

1. Run `genezio local` in the `server/` folder. This will generate the SDK and start a local web server that listens for
   requests.
2. In the `client/` folder, execute `npm install` to install the dependencies
3. In the `client/` folder, execute `npm run build` to convert the Typescript code to Javascript.
4. In the `client/` folder, execute `npm start` to run the client. This script will use the SDK to call the methods that
   you have deployed locally in the previous step.
5. You should see the greeting messages.

## Deploy the example in the Genezio infrastructure

1. Run `genezio deploy` in the `server/` folder. This will deploy the code to Genezio infrastructure and it will create
   the SDK.
2. In the `client/` folder, execute `npm install` to install the dependencies
3. In the `client/` folder, execute `npm run build` to convert the Typescript code to Javascript.
4. In the `client/` folder, execute `npm start` to run the client. This script will use the SDK to call the methods that
   you have deployed locally in the previous step.
5. You should see the greeting messages.
