# Getting started with Dart and React

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

This is an example of a todo application that uses:
 * `Dart` for the backend
 * `React` for the frontend
 * `MongoDB`
 * `genezio` for developing and deploying the project

Note: `genezio deploy` deploys both backend and frontend.
If you want to test this example out-of-the-box by running 1 command, head to the `server` directory and run `genezio deploy`.

If you want to deploy your application step-by-step, follow the guidelines below.

## Prerequisites:

1. Host a Mongo Database. Follow this [tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial) to get a free tier database.

## Clone the example
1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/dart/todo-list-react-typescript`

## Initialization

1. Run `dart pub get` in the `server/` folder to install the dependencies.
2. Run `npm install && npm run build` in the `client/` folder to install the dependencies.
3. Create a `.env` file in the `server/` folder and add MongoDB URI and the database table name.

## Run the example locally

1. Run `genezio local` in the `server/` folder to start the local server.
2. Start the React app by going to the `client/` folder and run `npm start`.

## Deploy the example in the genezio infrastructure

1. Run `genezio deploy --backend` in the `server/` folder that contains also the `genezio.yaml` file. This will deploy your code in the genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
2. Start React app by going to the `client/` folder and run `npm start`.

## Deploy the frontend in genezio Infrastructure

1. Run `npm install && npm run build` in the `client/` folder to build the Flutter app.
2. Run `genezio deploy --frontend` in the `server` folder to deploy the frontend in the genezio infrastructure.
