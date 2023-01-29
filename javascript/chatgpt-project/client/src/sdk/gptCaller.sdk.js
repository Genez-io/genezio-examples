/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class GptCaller {
      static remote = new Remote("https://5mpaydeidlktmlbj7vdoslwm7e0sfwme.lambda-url.us-east-1.on.aws/")
  
      static async askChatGPT(requestText) {
          return GptCaller.remote.call("GptCaller.askChatGPT", requestText)  
      }
  
      
  }
  
  export { Remote };
  