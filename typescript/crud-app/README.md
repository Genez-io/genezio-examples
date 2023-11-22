# crud-app

This is an example of a user system management application that exemplifies all the basic CRUD operations. 
The app uses React for the frontend application, Genezio for deploying and developing the backend and Postgres for the databse.

Note: `genezio deploy` deploys both backend and frontend. If you want to test this example out-of-the-box by running 1 command, head to the `crud-app` directory and run `genezio deploy`.

If you want to deploy your application step-by-step, follow the guidelines below.

## Clone the example
1. Run `git clone https://github.com/Genez-io/genezio-examples`
2. Navigate to the folder `cd ./genezio-examples/typescript/crud-app`

## Initialization

1. Run `npm install` in the `server/` folder to install the dependencies.
2. Run `npm install` in the `client/` folder to install the dependencies.
3. In the `server/` folder, create a .env file and add your NEON_POSTGRES_URL variable
   
## Run the example locally

1. Run `genezio local` in the root directory to start the backend local server.
2. Start the React app by going to the `client/` folder and run `npm start`.

## Deploy the example in the Genezio infrastructure

2. Run `genezio deploy` in the root directory that contains also the `genezio.yaml` file. This will deploy both your backend enviroment and frontend enviroment in the Genezio infrastructure and it will also create an SDK that can be used to call the methods remotely.
3. Click on the frontend link provided in the terminal to view and test your fully deployed application.

