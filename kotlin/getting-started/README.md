# Getting started with Kotlin and Android Studio

This is an example of a todo application that uses:
 * `Kotlin` for the backend
 * `Kotlin/Android` for the frontend
 * `MongoDB`
 * `genezio` for developing and deploying the project

## Dependencies

You will need to install the following tools if not already present on your development environment:
- [The latest version of Android Studio](https://developer.android.com/studio)
- [Java Development Kit](https://www.oracle.com/java/technologies/downloads/)
- [Kotlin compiler](https://kotlinlang.org/docs/command-line.html)
- [Gradle](https://gradle.org/install/)
- [Genezio](https://github.com/Genez-io/genezio)

Note: Kotlin support is present in the development version of Genezio, you will need to follow the next steps:
- `git clone https://github.com/Genez-io/genezio.git`
- `git checkout dev`
- `npm install`
- `npm run install-locally-dev`
- `genezio login`

Note: `genezio deploy` deploys the backend, due to the nature of mobile development this command only generates an SDK for the mobile application (front-end)
If you want to test this example out-of-the-box by running 1 command, head to the `server` directory and run `genezio deploy` (if you have all the needed dependencies installed).

If you want to deploy your application step-by-step, follow the guidelines below.

## Clone the example
1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/kotlin/getting-started`

## Run the example locally

1. Run `genezio local` in the `server/` folder to start the local server.
2. At this point an SDK should be generated in the `client/` folder. Use Android Studio to open the application using an emulator
## Deploy the example in the genezio infrastructure

1. Run `genezio deploy` in the `server/` folder that contains the `genezio.yaml` file. This will deploy your code in the genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
2. You can run the mobile app just like in the `Run the example locally` section above.

## Additional notes:

1. As of now the structure of your project is important as well as a number of external libraries that are specified in the build.gradle.kts files
2. For new projects try to build from the existing example; you may add any necessary libraries for your usecase in build.gradle.kts

## Support
For any questions/issues that may arise don't hesitate to:
- contact me at george@genez.io
- join the [Discord server](https://discord.gg/R5ywWdsBrz)
