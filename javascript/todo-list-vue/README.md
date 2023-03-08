# Todo VueJS App example

This is an example of a todo application with users, auth and tasks that uses VueJS for the frontend application and Genezio for deploying and developing the backend.

## Initialization

1. Run `npm install` in the `server/` folder to install the dependencies.
2. Run `npm install` in the `client/` folder to install the dependencies.

## Run the example locally

1. Run `genezio local` in the `server/` folder to start the local server.
2. Start the VueJS app by going to the `client/` folder and run `npm run dev`.

## Deploy the example in the Genezio infrastructure

1. Run `genezio deploy` in the `server/` folder that contains also the `genezio.yaml` file. This will deploy your code in the Genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
2. Start the VueJS app by going to the `client/` folder and run `npm run dev`.

## Deploy the frontend in Genezio Infrastructure
1. Run `npm i && npm run build` in the `client` folder to build the VueJS app.
2. Run `genezio deploy --frontend` in the `server` folder to deploy the frontend in the Genezio infrastructure.
