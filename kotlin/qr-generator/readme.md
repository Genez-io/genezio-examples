# Getting started with Kotlin and Android Studio

This is an example of a mobile app that can generate qr codes that uses:
 * `Kotlin` for the backend
 * `Kotlin/Android` for the frontend
 * `MongoDB`
 * `genezio` for developing and deploying the project

## Dependencies

You will need to install the following tools if not already present on your development environment:
- [Java Development Kit](https://www.oracle.com/java/technologies/downloads/)
- [Kotlin compiler](https://kotlinlang.org/docs/command-line.html)
- [Gradle](https://gradle.org/install/)
- [Android Studio](https://developer.android.com/studio)
-

Note: `genezio deploy` deploys the backend, due to the nature of mobile development this command only generates an SDK for the mobile application (front-end)
If you want to test this example out-of-the-box by running 1 command, head to the `server` directory and run `genezio deploy` (if you have all the needed dependencies installed).

If you want to deploy your application step-by-step, follow the guidelines below.

## Clone the example
1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/kotlin/qr-generator`

## Set the MongoDB URI
1. Navigate to `server/app/src/main/kotlin/geneziokotlin`
2. In the 2 kotlin classes replace the variable uri at line 46 with your MongoDB URI string 

## Run the example locally

2. Run `genezio local` in the `server/` folder to start the local server.
3. At this point an SDK should be generated in the `client/` folder. Use Android Studio to open the application using an emulator
## Deploy the example in the genezio infrastructure

1. Run `genezio deploy` in the `server/` folder that contains the `genezio.yaml` file. This will deploy your code in the genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
2. You can run the mobile app just like in the `Run the example locally` section above.

## Additional notes:

1. As of now the structure of your project is important as well as a number of external libraries that are specified in the build.gradle.kts files
2. For new projects try to build from the existing example; you may add any necessary libraries for your usecase in build.gradle.kts