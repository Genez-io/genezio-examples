# Getting started with Flutter and genezio

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

## You can check a [demo getting-started app here](https://getting-started-flutter.dev.app.genez.io/).

This is an example of a todo application that uses Flutter for the frontend application and genezio for developing and deploying the backend.

Note: `genezio deploy` deploys both backend and frontend. If you want to test this example out-of-the-box by running 1 command, head to the `server` directory and run `genezio deploy`.

If you want to deploy your application step-by-step, follow the guidelines below.

## Clone the example

1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/typescript/todo-list-flutter`

## Initialization

1. Run `npm install` in the `server/` folder to install the dependencies.
2. Run `flutter pub get` in the `client/` folder to install the dependencies.

## Run the example locally

1. Run `genezio local` in the `server/` folder to start the local server.
2. Start the Flutter app by going to the `client/` folder and run `flutter run -d chrome`.

## Deploy the example in the genezio infrastructure

1. Run `genezio deploy --backend` in the `server/` folder that contains also the `genezio.yaml` file. This will deploy your code in the genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
2. Start the Flutter app by going to the `client/todo_list` folder and run `flutter run -d chrome`.

## Deploy the frontend in genezio Infrastructure

1. Run `flutter clean && flutter pub get && flutter build web` in the `client/todo_list` folder to build the Flutter app.
2. Run `genezio deploy --frontend` in the `server` folder to deploy the frontend in the genezio infrastructure.
