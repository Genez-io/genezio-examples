/**
 * This is an auto generated code. This code should not be modified since the file can be overwritten
 * if new genezio commands are executed.
 */

import { Remote } from "./remote";

export type Task = {
  _id: string;
  title: string;
  ownerId: string;
  solved: boolean;
  date: Date;
};
export type GetTasksResponse = {
  success: boolean;
  tasks: Array<Task>;
  err?: string;
};
export type GetTaskResponse = { success: boolean; task?: Task; err?: string };
export type UpdateTaskResponse = { success: boolean; err?: string };
export type DeleteTaskResponse = { success: boolean; err?: string };

export class TaskService {
  static remote = new Remote(
    "https://e09cdb69-3895-466e-a85a-689c4bf7def7.dev.cluster.genez.io"
  );

  static async getAllTasksByUser(
    token: string,
    userId: string
  ): Promise<GetTasksResponse> {
    return await TaskService.remote.call(
      "TaskService.getAllTasks",
      token,
      userId
    );
  }
  static async createTask(
    token: string,
    title: string,
    ownerId: string
  ): Promise<GetTaskResponse> {
    return await TaskService.remote.call(
      "TaskService.createTask",
      token,
      title,
      ownerId
    );
  }
  static async updateTask(
    token: string,
    id: string,
    title: string,
    solved: boolean
  ): Promise<UpdateTaskResponse> {
    return await TaskService.remote.call(
      "TaskService.updateTask",
      token,
      id,
      title,
      solved
    );
  }
  static async deleteTask(
    token: string,
    id: string
  ): Promise<DeleteTaskResponse> {
    return await TaskService.remote.call("TaskService.deleteTask", token, id);
  }
}

export { Remote };
