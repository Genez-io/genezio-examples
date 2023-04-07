import  mongoose from "mongoose"
import { MONGO_DB_URI } from "./helper"
import { TaskModel } from "./models/task"

/**
 * The Task server class that will be deployed on the genezio infrastructure.
 */
export class Task {
  constructor() {
    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_DB_URI);
  }

  /**
   * Method that returns all tasks for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async getAllTasks() {
    console.log(`Get all tasks request received`)

    const tasks = await TaskModel.find();

    if (tasks.length === 0) {
      await TaskModel.create({
        title: "Check the other example projects",
        description: "https://github.com/Genez-io/genezio-examples"
      })

      await TaskModel.create({
        title: "Check our documentation",
        description: "https://docs.genez.io/genezio-documentation/"
      })

      await TaskModel.create({
        title: "Read our technical articles on genezio blog",
        description: "https://genez.io/blog/"
      })

      const initTasks = await TaskModel.find();

      return { success: true, tasks: initTasks };
    }

    return { success: true, tasks: tasks };
  }

  /**
   * Method that creates a task for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} title The task's title.
   * @param {*} description The task's description.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async createTask(title: string, description: string) {
    console.log(`Create task request received for user with title ${title}`)

    if (!description) {
      description = "";
    }

    const task = await TaskModel.create({
      title: title,
      description: description,
      solved: false,
    });

    return {
      success: true,
      task: { title: title, _id: task._id.toString() }
    };
  }

  /**
   * Method that creates a task for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} id The task's id.
   * @param {*} title The task's title.
   * @param {*} description The task's description.
   * @param {*} solved If the task is solved or not.
   * @returns An object containing two properties: { success: true }
   */
  async updateTask(id: string , title: string, description: string, solved: string) {
    console.log(`Update task request received with id ${id} with title ${title} and solved value ${solved}`)

    if (!description) {
      description = "";
    }

    await TaskModel.updateOne(
      { _id: id },
      {
        title: title,
        description: description,
        solved: solved
      }
    );

    return { success: true };
  }

  /**
   * Method that deletes a task for a giving user ID.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} id The task's id.
   * @returns An object containing one property: { success: true }
   */
  async deleteTask(id: string) {
    console.log(`Delete task with id ${id} request received`)

    await TaskModel.deleteOne({ _id: id });

    return { success: true };
  }
}
