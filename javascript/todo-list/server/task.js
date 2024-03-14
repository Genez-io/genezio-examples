import { mongoose } from "mongoose";
import { reqAuth } from "./helper";
import { TaskModel } from "./models/task";
import { GenezioDeploy } from "@genezio/types";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your MONGO_DB_URI environment variable is not properly set, go to https://genezio.com/blog/how-to-add-a-mongodb-to-your-genezio-project/ to learn how to integrate your project with Mongo DB";

/**
 * The Task server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class Task {
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
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} userId The user ID.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async getAllTasksByUser(token, userId) {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Get all tasks by user request received with userID ${userId}`);

    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return authObject;
    }
    let tasks;
    try {
      tasks = (await TaskModel.find({ ownerId: userId })).map((task) => ({
        title: task.title,
        ownerId: task.ownerId,
        solved: task.solved,
        date: task.date,
        _id: task._id.toString(),
      }));
    } catch (error) {
      return { success: false, tasks: [], err: error.toString() };
    }
    return { success: true, tasks: tasks };
  }

  /**
   * Method that creates a task for a giving user ID.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} title The tasktitle.
   * @param {*} ownerId The owner's of the task ID.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async createTask(token, title, ownerId) {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(
      `Create task request received for user with id ${ownerId} with title ${title}`
    );

    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return authObject;
    }
    let task;
    try {
      task = await TaskModel.create({
        title: title,
        ownerId: ownerId,
      });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    return {
      success: true,
      task: { title: title, ownerId: ownerId, _id: task._id.toString() },
    };
  }

  /**
   * Method that creates a task for a giving user ID.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} id The task's id.
   * @param {*} title The task's title.
   * @param {*} solved If the task is solved or not.
   * @returns An object containing two properties: { success: true }
   */
  async updateTask(token, id, title, solved) {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(
      `Update task request received with id ${id} with title ${title} and solved value ${solved}`
    );

    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return authObject;
    }
    try {
      await TaskModel.updateOne(
        { _id: id },
        {
          title: title,
          solved: solved,
        }
      );
    } catch (error) {
      return { success: false, err: error.toString() };
    }
    return { success: true };
  }

  /**
   * Method that deletes a task for a giving user ID.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @param {*} title The tasktitle.
   * @param {*} ownerId The owner's of the task ID.
   * @returns An object containing one property: { success: true }
   */
  async deleteTask(token, id) {
    if (!process.env.MONGO_DB_URI) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Delete task with id ${id} request received`);

    const authObject = await reqAuth(token);
    if (!authObject.success) {
      return authObject;
    }
    try {
      await TaskModel.deleteOne({ _id: id });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }
}
