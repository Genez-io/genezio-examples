# Pure Html example

This is an example of a TODO application that introduces the user to the Genezio infrastructure with simple HTML and JavaScript, without any framework.

## Initialization

1. Run `npm install` in the `server/` folder to install the dependencies.

## Run the example locally

1. Run `genezio local` in the `server/` folder to start the local server.
2. Start the index.html by going to the `client/` folder and run `npm start`.

## Deploy the example in the Genezio infrastructure

1. Run `genezio deploy` in the `server/` folder that contains also the `genezio.yaml` file. This will deploy your code in the Genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.

## Deploy the frontend in Genezio Infrastructure

1. Run `genezio deploy --frontend` in the `server` folder to deploy the frontend in the Genezio infrastructure.
