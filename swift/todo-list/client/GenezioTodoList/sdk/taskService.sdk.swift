/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
import Foundation



class TaskService {
    public static let remote = Remote(url: "https://oa5edlfxd5vj4lk2nj3gqvfrcq0nylhf.lambda-url.us-east-1.on.aws/")
    
    static func getAllTasksByUser(token: String, userId: String) async -> Any {
          return await TaskService.remote.call(method: "TaskService.getAllTasksByUser", args: token, userId)  
      }

  static func createTask(token: String, title: String, ownerId: String) async -> Any {
          return await TaskService.remote.call(method: "TaskService.createTask", args: token, title, ownerId)  
      }

  static func updateTask(token: String, id: String, title: String, solved: Bool) async -> Any {
          return await TaskService.remote.call(method: "TaskService.updateTask", args: token, id, title, solved)  
      }

  static func deleteTask(token: String, id: String) async -> Any {
          return await TaskService.remote.call(method: "TaskService.deleteTask", args: token, id)  
      }

  
}