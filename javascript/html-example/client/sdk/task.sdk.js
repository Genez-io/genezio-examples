/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class Task {
      static remote = new Remote("https://iaprwapo6wcs7vjx6hk3a4nuum0vpbes.lambda-url.eu-central-1.on.aws/")
  
      static async getAllTasksByUser(token) {
          return Task.remote.call("Task.getAllTasksByUser", token)  
      }
  
      static async createTask(token, title) {
          return Task.remote.call("Task.createTask", token, title)  
      }
  
      static async updateTask(token, id, title, solved) {
          return Task.remote.call("Task.updateTask", token, id, title, solved)  
      }
  
      static async deleteTask(token, id) {
          return Task.remote.call("Task.deleteTask", token, id)  
      }
  
      
  }
  
  export { Remote };
  