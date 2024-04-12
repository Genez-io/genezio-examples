# Fullstack Langchain, OpenAI starter project

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

This project is a customized AI assistant. You can easily provide custom data by leveraging vector databases and chained prompts.

You can easily test it in Gitpod - an in-browser vscode solution:

<div align="center">

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Genez-io/genezio-examples)

</div>

## Steps to deploy

0. Run git clone `https://github.com/Genez-io/genezio-examples`.
1. Navigate to the folder `cd ./genezio-examples/typescript/langchain-starter`.
2. Get an OpenAI API key and save it in `server/.env`.
3. Fetch your custom data in `server/data`. Currently this project supports only `.md` files, but you can easily change that from `server/createVectorDatabase.ts`.
4. Populate the vector database by running `cd server && npm i && npx tsx createVectorDatabase.ts`. This will create a directory `lancedb` where the embeddings for you custom data are saved.
5. Run `genezio deploy --env .env`.
6. You can test your application using the subdomain provided in the output.

Note: Alternatively, instead of running `genezio deploy`, you can test locally by running `genezio local`.

## Troubleshooting

### Error: `You may need to run npm install @lancedb/vectordb-linux-x64-gnu.`

This probably happens because your machine is arm-based.
`lancedb` does not provide an easy way to do cross building.
Please use an x86 machine to deploy your project.
You can easily do this by using Github Actions and setting up an workflow to deploy your application for each commit.
Check out this [tutorial](https://genezio.com/docs/integrations/github-action/) for setting github actions with genezio.
