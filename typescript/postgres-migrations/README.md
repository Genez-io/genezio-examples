# Setup Postgres migrations using Kysely

<div align="center">

[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

</div>

This project uses [Kysely](https://kysely.dev/docs/getting-started) (a query builder) to perform postgres migrations before `genezio local` or `genezio deploy`.

You can easily test it in Gitpod - an in-browser IDE solution:

<div align="center">

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Genez-io/genezio-examples)

</div>

The migration are running using the `backend.deploy.scripts` hook in the `genezio.yaml`.

Important notes:
- Provide a Postgres URL in the file `server/.env`. You can easily get one from [https://app.genez.io/databases/](https://dev.app.genez.io/databases/).
- When deploying this project for the first, navigate to the project dashboard page and link the corresponding database to it.
