<div align="center"> <a href="https://genezio.com/"></a>
<img alt="genezio logo" src="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_Black.svg" style="max-height: 50px;">

</div>

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

[![Join our community](https://img.shields.io/discord/1024296197575422022?style=social&label=Join%20our%20community%20&logo=discord&labelColor=6A7EC2)](https://discord.gg/uc9H5YKjXv)
[![Follow @geneziodev](https://img.shields.io/twitter/url/https/twitter.com/geneziodev.svg?style=social&label=Follow%20%40geneziodev)](https://twitter.com/geneziodev)

</div>

# Smart contract indexer with Ethereum, Bware and genezio
In this project, we are creating an application that queries Ethereum smart contract events using Bware Endpoints
and saves the log events in MongoDB.

## Prerequisites
- ✅ [NodeJs](https://nodejs.org/) >= 16.0.0
- ✅ [npm](https://genezio.com/)
- ✅ [genezio](https://genezio.com/)

Note: We recommend using [nvm]() to install Node.js and npm.

## Project Structure

Inside the project folder, you will find the following files and folders:

```
├── backend/
│   ├── abi.js 
│   ├── blockchainServer.js 
│   ├── config.js 
│   ├── package.json
│   └── models/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .eslintrc.json
│   ├── package.json
│   ├── index.html
│   ├── .gitignore
│   └── .vite.config.js
├── genezio.yaml
├── README.md
├── .genezioignore
└── tsconfig.json
```

Genezio looks for `genezio.yaml` to read the settings for deploying the project or for spinning a local dev server for testing.

The `backend` directory contains the implementation of the server side of the project.

The `frontend` directory contains a React application that talks with the genezio server.

To glue this two component together, an auto-generated SDK is installed in the `client/node_modules` folder.
This can be used by simply importing it into the frontend source code like any other dependency of your project.

## Run the project

### Clone this example

Clone the repository:

```
git clone https://github.com/Genez-io/genezio-examples
```

Navigate to the following directory:
```
cd ./genezio-examples/javascript/blockchain
```

### Get a database

For this project, you need a MongoDB instance for this project. You can find instruction on how to do it [here](https://genezio.com/blog/how-to-add-a-mongodb-to-your-genezio-project/).


### Test your project locally

Test the project locally:
```
genezio local
```

Open a new terminal, navigate to the following directory, and run npm start to launch the React application:
```
cd ./client
npm run dev
```

### Deploy your project with genezio

If you wish to deploy your project to the Genezio infrastructure, follow these steps:

Log in to Genezio using the command genezio login:
```
genezio login
```

Deploy your project using the genezio deploy command from the ``./genezio-examples/javascript/blockchain`` directory.
```
genezio deploy
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
- [Official genezio documentation](https://genezio.com/docs)
- [Web development tutorials](https://genezio.com/blog)
- [Discord channel](https://discord.gg/uc9H5YKjXv)


## Contact

If you need support or you have any questions, please join us in our [Discord channel](). We'd love to chat!

## Built With
- [Bware](https://bwarelabs.com/)
- [Ethereum](https://ethereum.org/en/)
- [MongoDB](https://www.mongodb.com/atlas/database)
- [Genezio](https://genezio.com/)
- [React.js](https://github.com/facebook/react)
- [Vite.js](https://vitejs.dev/)

