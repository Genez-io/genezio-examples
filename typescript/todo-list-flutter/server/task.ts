import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { TaskModel } from "./models/task";
import { GenezioDeploy } from "@genezio/types";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your MONGO_DB_URI environment variable is not properly set, go to https://genez.io/blog/how-to-add-a-mongodb-to-your-genezio-project/ to learn how to integrate your project with Mongo DB";

export type Task = {
  id: string;
  token: string;
  title: string;
  description: string;
  solved: boolean;
  date: string;
};

export type GetTasksResponse = {
  success: boolean;
  tasks: Task[];
  err: string;
};

export type GetTaskResponse = {
  success: boolean;
  task: Task;
  err: string;
};

export type UpdateTaskResponse = {
  success: boolean;
  err: string;
};

export type DeleteTaskResponse = {
  success: boolean;
  err: string;
};

/**
 * The Task server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class TaskService {
  constructor() {
    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return;
    }
    mongoose.connect(process.env.MONGO_DB_URI || "").catch((err) => {
      console.log(err);
      throw err;
    });
  }

  /**
   * Method that returns all tasks for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async getAllTasksByUser(token: string): Promise<GetTasksResponse> {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, tasks: [], err: missing_env_error };
    }
    console.log(`Get all tasks request received for user with token ${token}`);

    let tasks;
    try {
      tasks = (await TaskModel.find({ token: token })).map((task) => {
        return {
          id: task._id.toString(),
          token: task.token,
          title: task.title,
          description: task.description,
          solved: task.solved,
          date: task.date.toString(),
        };
      });
    } catch (error: any) {
      return { success: false, tasks: [], err: error.toString() };
    }

    if (tasks.length === 0) {
      try {
        await TaskModel.create({
          token: token,
          title: "Check the other example projects",
          description: "https://github.com/Genez-io/genezio-examples",
        });

        await TaskModel.create({
          token: token,
          title: "Check our documentation",
          description: "https://docs.genez.io/genezio-documentation/",
        });

        await TaskModel.create({
          token: token,
          title: "Read our technical articles on genezio blog",
          description: "https://genez.io/blog/",
        });

        const initTasks: Task[] = (await TaskModel.find({ token: token })).map(
          (task) => {
            return {
              id: task._id.toString(),
              token: task.token,
              title: task.title,
              description: task.description,
              solved: task.solved,
              date: task.date.toString(),
            };
          }
        );

        console.log(
          `Found ${initTasks.length} tasks for user with token ${token}`
        );
        return { success: true, tasks: initTasks, err: "" };
      } catch (error: any) {
        return { success: false, tasks: [], err: error.toString() };
      }
    }

    console.log(`Found ${tasks.length} tasks for user with token ${token}`);
    return { success: true, tasks: tasks, err: "" };
  }

  /**
   * Method that creates a task for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} title The task's title.
   * @param {*} description The task's description.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async createTask(
    token: string,
    title: string,
    description: string
  ): Promise<GetTaskResponse> {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);

      return {
        success: false,
        task: {
          id: "err",
          token: "err",
          title: "err",
          description: "err",
          solved: false,
          date: "",
        },
        err: missing_env_error,
      };
    }
    console.log(`Create task request received for user with title ${title}`);

    if (!description) {
      description = "";
    }

    let task;
    try {
      task = await TaskModel.create({
        token: token,
        title: title,
        description: description,
        solved: false,
      });
    } catch (error: any) {
      return {
        success: false,
        task: {
          id: "err",
          token: "err",
          title: "err",
          description: "err",
          solved: false,
          date: "",
        },
        err: error.toString(),
      };
    }

    return {
      success: true,
      task: {
        id: task._id.toString(),
        token: token,
        title: title,
        description: description,
        solved: false,
        date: "",
      },
      err: "",
    };
  }

  /**
   * Method that creates a task for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} id The task's id.
   * @param {*} title The task's title.
   * @param {*} description The task's description.
   * @param {*} solved If the task is solved or not.
   * @returns An object containing two properties: { success: true }
   */
  async updateTask(
    token: string,
    id: string,
    title: string,
    description: string,
    solved: boolean
  ): Promise<UpdateTaskResponse> {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(
      `Update task request received with id ${id} with title ${title} and solved value ${solved}`
    );

    if (!description) {
      description = "";
    }

    try {
      await TaskModel.updateOne(
        {
          _id: new ObjectId(id.toString()),
          token: token,
        },
        {
          title: title,
          description: description,
          solved: solved,
        }
      );
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return { success: true, err: "" };
  }

  /**
   * Method that deletes a task for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} id The task's id.
   * @returns An object containing one property: { success: true }
   */
  async deleteTask(token: string, id: string): Promise<DeleteTaskResponse> {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Delete task with id ${id} request received`);

    try {
      await TaskModel.deleteOne({ _id: new ObjectId(id), token: token });
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return { success: true, err: "" };
  }
}
