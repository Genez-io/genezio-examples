<div align="center"> <a href="https://genez.io/">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_White.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_Black.svg">
  <img alt="genezio logo" src="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_Black.svg" style="max-height: 50px;">
</picture>

</div>

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

[![Join our community](https://img.shields.io/discord/1024296197575422022?style=social&label=Join%20our%20community%20&logo=discord&labelColor=6A7EC2)](https://discord.gg/uc9H5YKjXv)
[![Follow @geneziodev](https://img.shields.io/twitter/url/https/twitter.com/geneziodev.svg?style=social&label=Follow%20%40geneziodev)](https://twitter.com/geneziodev)

</div>

# Shopping Cart Project

This example will show you how to harness the speed of a Redis database to build a shopping cart functionality using TypeScript/NodeJs.

The example is backed by `genezio` on the server side.

A minimal frontend for the online store is implemented using React and Bootstrap.
The great part about a minimal design, is that you can go as wild as you'd like with the frontend and tweak it further to your liking.

The application is built using:
 * `NodeJs` for the backend
 * `React` for the frontend
 * `Upstash Redis` for a database

## Prerequisites

If you don't already have them, you'll need to install the following tools:
- [Node.js](https://nodejs.org/en/download/current) (version >= 16.0.0)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Genezio](https://genez.io)

Note: I recommend you to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage NodeJs and npm versions.
After installing `nvm`, you can easily get the any version of `node` by running `nvm install <node_version>`.
`nvm` will automatically install the corresponding `npm` version.

## Project Structure

Inside the project folder, you will find the following files and folders:

```bash
.
├── README.md
├── genezio.yaml
├── client
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── models.tsx
│   │   ├── react-app-env.d.ts
│   │   └── reportWebVitals.ts
│   └── tsconfig.json
└── server
    ├── package-lock.json
    ├── package.json
    ├── shoppingCartService.ts
    └── tsconfig.json
```

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
cd ./genezio-examples/typescript/shopping-cart
```

### Test your project locally

Test the project locally:
```bash
genezio local
```

Open a new terminal, navigate to the following directory, and run npm start to launch the React application:
```bash
cd ./client
npm install && npm run install-sdk-local && npm start
```

### Deploy your project with genezio

If you wish to deploy your project to the Genezio infrastructure, follow these steps:

Log in to Genezio using the command genezio login:
```bash
genezio login
```

Deploy your project using the genezio deploy command from the ``./genezio-examples/javascript/chatgpt-project`` directory.
```bash
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

If you need support or you have any questions, please join us in our [Discord channel](https://discord.gg/uc9H5YKjXv). We'd love to chat!


## Built With
- [Genezio](https://genez.io/)
- [Node.JS](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Upstash](https://upstash.com/)
