
<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

# Getting started with Dart and React

Note: Using `dart` on the backend side is still experimental and may not work as expected.
Please contact us if you encounter any issues using [GitHub Issues](https://github.com/Genez-io/genezio/issues) or [Discord](https://discord.com/invite/uc9H5YKjXv).

This is an example of a todo list application that uses:

- `Dart` for the backend
- `React` for the frontend
- `MongoDB` to store the data
- `genezio` for developing and deploying the project

## Prerequisites

Host a Mongo Database. Follow this [tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial) to get a free tier database.

If you don't already have them, you'll need to install the following tools:
- [Dart](https://dart.dev/get-dart)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Genezio](https://genez.io)

Note: I recommend you to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage NodeJs and npm versions.
After installing `nvm`, you can easily get the any version of `node` by running `nvm install <node_version>`.
`nvm` will automatically install the corresponding `npm` version.

## Project Structure

`genezio` looks for `genezio.yaml` to read the settings for deploying the project or for spinning a local dev server for testing.

The `backend` directory contains methods to store and retrieve data from a Redis instance.

The `frontend` directory contains the source code for the React application.

To glue this two component together, an auto-generated SDK is installed in the `client/node_modules` folder.
This can be used by simply importing it into the frontend source code like any other dependency of your project.


## Run the project

### Clone this example

Clone the repository:
```bash
git clone https://github.com/Genez-io/genezio-examples
```

Navigate to the following directory:
```bash
cd ./genezio-examples/dart/todo-list-react-typescript
```

### Test your project locally

Test the project locally:
```bash
genezio local
```

Open a new terminal, navigate to the following directory, and run the following commands to install the generated genezio SDK and start the React application:
```bash
cd ./client
genezio link --projectName todo-list-react-typescript --region us-east-1
npm install && npm run dev
```

The React application is built using [Vite](https://vitejs.dev/). Vite will open a server on port `5173` by default.

### Deploy your project with genezio

If you wish to deploy your project to the Genezio infrastructure, follow these steps:

To deploy a functional project, you need to connect a Mongo instance to it. Follow [these instructions](https://genez.io/blog/how-to-add-a-mongodb-to-your-genezio-project/) to create a Mongo database.

Save the Mongo credentials in a `.env` file in the backend directory and configure the deployment command to use this file to also load the environment variables.

```env
MONGODB_URI=<your-mongo-uri>
```

Run the following command in the backend directory:
```bash
cd server/
genezio deploy --env .env --backend
```

Afterwards, run the following command in the frontend directory:
```bash
cd client/
genezio deploy --frontend
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install -g genezio`  | Installs genezio globally                        |
| `genezio login`           | Logs in to genezio                               |
| `genezio local`           | Starts a local server                            |
| `genezio deploy`          | Deploys a production project                     |
| `genezio --help`          | Get help using genezio                           |


## Want to learn more?

Check out:
- [Official genezio documentation](https://genez.io/docs)
- [Web development tutorials](https://genez.io/blog)
- [Discord channel](https://discord.gg/uc9H5YKjXv)

## Contact

If you need support or you have any questions, please join us in our [Discord channel](https://discord.gg/uc9H5YKjXv). We'd love to chat!

## Built With
- [Genezio](https://genez.io/)
- [Dart](https://dart.dev/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
