<div align="center"> <a href="https://genez.io/"></a>
<img alt="genezio logo" src="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_Black.svg" style="max-height: 50px;">

</div>

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

[![Join our community](https://img.shields.io/discord/1024296197575422022?style=social&label=Join%20our%20community%20&logo=discord&labelColor=6A7EC2)](https://discord.gg/uc9H5YKjXv)
[![Follow @geneziodev](https://img.shields.io/twitter/url/https/twitter.com/geneziodev.svg?style=social&label=Follow%20%40geneziodev)](https://twitter.com/geneziodev)

</div>

# Simple genezio todo list example
This is a simple project with a server and a client for a quiz app. The server is built with [Node.js](https://nodejs.org/en/) and MongoDB. The client is built with [React](https://reactjs.org/).

## Prerequisites
- ✅ [NodeJs](https://nodejs.org) >= 16.0.0
- ✅ [npm](https://www.npmjs.com/)
- ✅ [genezio](https://genez.io/)

## Project Structure

Inside the project folder, you will find the following files and folders:

```
├── server/
│   ├── models/
│   ├── helper.ts
│   ├── task.ts
│   ├── user.ts
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   ├── package.json
|   └── tsconfig.json
├── genezio.yaml
├── README.md
├── .genezioignore
```

Genezio looks for `genezio.yaml` to read the settings for deploying the project or for spinning a local dev server for testing.

The `backend` directory contains the implementation of the server side of the project.

The `frontend` directory contains a simple React application that talks with the genezio server.

## Run the project

### Clone this example

Clone the repository:

```
git clone https://github.com/Genez-io/genezio-examples
```

Navigate to the following directory:
```
cd ./genezio-examples/typescript/todo-list
```

### Test your project locally

Test the project locally:
```
genezio local
```

Open a new terminal, navigate to the following directory, and launch the application:
```
cd ./client
npm run install-local-sdk
npm run dev
```

### Deploy your project with genezio

If you wish to deploy your project to the Genezio infrastructure, follow these steps:

Log in to Genezio using the command genezio login:
```
genezio login
```

Deploy your project using the genezio deploy command from the ``./genezio-examples/typescript/todo-list`` directory.
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
- [Official genezio documentation](https://genez.io/docs)
- [Web development tutorials](https://genez.io/blog)
- [Discord channel](https://discord.gg/uc9H5YKjXv)


## Contact

If you need support or you have any questions, please join us in our [Discord channel](). We'd love to chat!

## Built With
- [Genezio](https://genez.io/)
- [Node.JS](https://nodejs.org/en/)
- [React](https://reactjs.org/)
