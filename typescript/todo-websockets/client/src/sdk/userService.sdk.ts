/**
 * This is an auto generated code. This code should not be modified since the file can be overwritten
 * if new genezio commands are executed.
 */

import { Remote } from "./remote";

export type CreateUserResponse = {
  success: boolean;
  msg?: string;
  err?: string;
};
export type User = { _id: string; name: string; email: string };
export type UserLoginResponse = {
  success: boolean;
  user?: User;
  token?: string;
  msg?: string;
  err?: string;
};
export type CheckSessionResponse = { success: boolean; err?: string };

export class UserService {
  static remote = new Remote(
    "https://92f4cf70-09d1-474b-9ac4-a38deb80ce00.dev.cluster.genez.io"
  );

  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<CreateUserResponse> {
    return await UserService.remote.call(
      "UserService.register",
      name,
      email,
      password
    );
  }
  static async login(
    email: string,
    password: string
  ): Promise<UserLoginResponse> {
    return await UserService.remote.call("UserService.login", email, password);
  }
  static async checkSession(token: string): Promise<CheckSessionResponse> {
    return await UserService.remote.call("UserService.checkSession", token);
  }
}

export { Remote };
