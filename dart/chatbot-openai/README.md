# Fullstack Dart/Flutter Chat with ChatGPT

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

Note: Using `dart` on the backend side is still experimental and may not work as expected.
Please contact us if you encounter any issues using [GitHub Issues](https://github.com/Genez-io/genezio/issues) or [Discord](https://discord.com/invite/uc9H5YKjXv).

Welcome to our demo chat app integrated with Chat GPT, written in Flutter (frontend), Dart(backend), MongoDB as a database and deployed [genezio](https://genezio.com).

This app allows users to engage in conversations with a chatbot powered by ChatGPT.

This app is meant to be a demo for a technical talk on the topic of building full stack apps with Dart and genezio.

## Clone the example
1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/dart/chatbot-openai`

## Run this demo

Prerequisites:
1. Get an OpenAI secret key. Create an account on the [OpenAI platform](https://platform.openai.com/) and head to this [link](https://platform.openai.com/account/api-keys) to add a secret key.
2. Host a Mongo Database. Follow this [tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial) to get a free tier database.
3. Create a `server/.env` file and add the following environment variables:
```env
OPENAPI_KEY=todo
MONGODB_URI=todo
```

If you want to deploy this demo and play around with it, follow these steps:

1. Install genezio with `npm install -g genezio`
2. Login on the genezio platform: `genezio login`
4. Head to the server directory and test it locally with: `genezio local` in the `server` directory and `flutter run -d chrome` in the `client` directory.
5. When you are happy with the local version, deploy it on our infrastructure with: `genezio deploy` from the `server` directory.
6. Brag about it to your friends! You can share the frontend link to your friends and colleagues and let them play around with your new features.

## Learn more

For more details on how to use genezio, check the links below:

- https://genezio.com/docs
- https://github.com/genez-io/genezio-examples

For more details on each dart package, you can check out [pub.dev](https://pub.dev)
