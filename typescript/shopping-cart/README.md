# Shopping Cart Example

<div>

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

This is an example for a shopping cart functionality implemented using NodeJs, React and Redis.

The application is built using:
 * `NodeJs` for the backend
 * `React` for the frontend
 * `Upstash Redis` for a database


## Deploy the project yourself

1. Run `git clone https://github.com/Genez-io/genezio-examples`.
2. Navigate to the folder `cd ./genezio-examples/typescript/shopping-cart`.
3. Run `genezio deploy` to deploy both the backend and the frontend.

## Test the project locally

### Clone the repository

```bash
git clone https://github.com/Genez-io/genezio-examples && cd ./genezio-examples/typescript/shopping-cart
```

### Install dependencies

Run `npm install` in the `server/` folder to install the dependencies.

Run `npm install` and `npm run build` in the `client/` folder to install the dependencies.

### Start a local server with genezio

Run `genezio local` in the project's root directory. This will start a local backend server that you can use to test the backend methods.
```bash
$ genezio local
Server listening on port 8083
Your code was deployed and the SDK was successfully generated!
Test your code at https://app.genez.io/test-interface/local?port=8083
```

There are two ways of sending requests to the backend methods:
1. Using the genezio test interface available at [https://app.genez.io/test-interface/local?port=8083](https://app.genez.io/test-interface/local?port=8083).
2. Using the frontend code. Head to the `client` folder and `npm start`. The frontend will be able to call the backend methods using an auto-generated SDK.
