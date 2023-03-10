/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class StripeHandler {
      static remote = new Remote("https://jjzr6ennmvdvrzjwlejjupo5f40rczbr.lambda-url.us-east-1.on.aws/")
  
      static async createCheckoutSession() {
          return StripeHandler.remote.call("StripeHandler.createCheckoutSession")  
      }
      
      
  }
  
  export { Remote };
  