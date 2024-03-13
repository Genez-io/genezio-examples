/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/

import Foundation

class TaskService {
  public static let remote = Remote(url: "http://127.0.0.1:8083/TaskService")

  static func getAllTasksByUser(token: String, userId: String) async -> Any {
    return await TaskService.remote.call(method: "TaskService.getAllTasksByUser", args:token, userId)
  }

  static func createTask(token: String, title: String, ownerId: String) async -> Any {
    return await TaskService.remote.call(method: "TaskService.createTask", args:token, title, ownerId)
  }

  static func updateTask(token: String, id: String, title: String, solved: Bool) async -> Any {
    return await TaskService.remote.call(method: "TaskService.updateTask", args:token, id, title, solved)
  }

  static func deleteTask(token: String, id: String) async -> Any {
    return await TaskService.remote.call(method: "TaskService.deleteTask", args:token, id)
  }

}
