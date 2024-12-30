<div align="center"> <a href="https://genezio.com/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_White.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_Black.svg">
    <img alt="genezio logo" src="https://github.com/genez-io/graphics/raw/HEAD/svg/Icon_Genezio_Black.svg" height="100" >
  </picture>
</a>
 </div>

<div align="center">

[![Join our community](https://img.shields.io/discord/1024296197575422022?style=social&label=Join%20our%20community%20&logo=discord&labelColor=6A7EC2)](https://discord.gg/uc9H5YKjXv)
[![Follow @geneziodev](https://img.shields.io/twitter/url/https/twitter.com/geneziodev.svg?style=social&label=Follow%20%40geneziodev)](https://twitter.com/geneziodev)

</div>

# Genezio FaaS Python Getting Started

In the `index.py` file, you will see the implementation of a function that writes something to the console and returns a 200 page with a simple message.

You can preview the function and add a `?name=` URL parameter to see how it works.

Each function is exposed as an HTTP endpoint and can be called from a third-party application.

You can add new functions (new py files), but you'll need to add them in the functions section of genezio.yaml to ensure they are deployed and exposed.

# Deploy
:rocket: You can deploy your own version of the template to Genezio with one click:

[![Deploy to Genezio](https://raw.githubusercontent.com/Genez-io/graphics/main/svg/deploy-button.svg)](https://app.genez.io/start/deploy?repository=https://github.com/Genez-io/faas-python-getting-started)


## Genezio CLI Commands

Genezio also provides a CLI tool that you can use to deploy your project from your machine.
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install -g genezio`  | Installs genezio globally                        |
| `genezio login`           | Logs in to genezio                               |
| `genezio local`           | Starts a local server                            |
| `genezio deploy`          | Deploys a production project                     |
| `genezio --help`          | Get help using genezio                           |

## Learn more

To learn more about Genezio, take a look at the following resources:

- [Official genezio documentation](https://genezio.com/docs)
- [Tutorials](https://genezio.com/blog)

## Contact

If you need support or you have any questions, please join us in our [Discord channel](https://discord.gg/uc9H5YKjXv). We'd love to chat!

## Built With

- [Genezio](https://genezio.com/)
- [Python](https://www.python.org/)

***

<div align="center"> <a href="https://genezio.com/">
  <p>Built with Genezio with ❤️ </p>
  <img alt="genezio logo" src="https://raw.githubusercontent.com/Genez-io/graphics/main/svg/powered_by_genezio.svg" height="40">
</a>
</div>
