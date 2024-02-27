# Todo List

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

Note: Using `dart` on the backend side is still experimental and may not work as expected.
Please contact us if you encounter any issues using [GitHub Issues](https://github.com/Genez-io/genezio/issues) or [Discord](https://discord.com/invite/uc9H5YKjXv).

This is an example of a todo list application that uses:

- `Dart` for the backend
- `Flutter` for the frontend
- `MongoDB` to store the data
- `genezio` for developing and deploying the project

If you want to deploy your application step-by-step, follow the guidelines below.

## Prerequisites:

1. Host a Mongo Database. Follow this [tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial) to get a free tier database.

## Clone the example

1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/dart/todo-list`

## Initialization

1. Run `dart pub get` in the `server/` folder to install the dependencies.
2. Run `flutter pub get` in the `client/` folder to install the dependencies.
3. Create a `.env` file in the `server/` folder and add MongoDB URI and the database table name.

## Deploy the example in the genezio infrastructure

Run `genezio deploy` in the `server/` folder that contains also the `genezio.yaml` file. This will deploy your code in the genezio infrastructure. The application will be available at the URL provided in the terminal.


## Run the example locally

1. Run `genezio local` in the `server/` folder to start the local server.
2. Start the Flutter app by going to the `client/` folder and run `flutter run -d chrome`.
