/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/

import Foundation

class UserService {
  public static let remote = Remote(url: "http://127.0.0.1:8083/UserService")

  static func register(name: String, email: String, password: String) async -> Any {
    return await UserService.remote.call(method: "UserService.register", args:name, email, password)
  }

  static func login(email: String, password: String) async -> Any {
    return await UserService.remote.call(method: "UserService.login", args:email, password)
  }

  static func checkSession(token: String) async -> Any {
    return await UserService.remote.call(method: "UserService.checkSession", args:token)
  }

}
