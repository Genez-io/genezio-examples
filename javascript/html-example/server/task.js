import { mongoose } from "mongoose"
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
    mongoose.connect(MONGO_DB_URI);
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
  async getAllTasksByUser(token) {
    console.log(`Get all tasks by user request received with token ${token}`)

    const tasks = await TaskModel.find({ token: token });

    if (tasks.length === 0) {
      await TaskModel.create({
        token: token,
        title: "Check the other example projects",
        url: "https://github.com/Genez-io/genezio-examples"
      })

      await TaskModel.create({
        token: token,
        title: "Check our documentation",
        url: "https://docs.genez.io/genezio-documentation/"
      })

      await TaskModel.create({
        token: token,
        title: "Watch our Youtube tutorials",
        url: "https://www.youtube.com/@genezio7235"
      })

      await TaskModel.create({
        token: token,
        title: "Read our technical articles on genezio blog",
        url: "https://genez.io/blog/"
      })

      const initTasks = await TaskModel.find({ token: token });

      return { success: true, tasks: initTasks };
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
  async createTask(token, title) {
    console.log(`Create task request received for user with ${token} with title ${title}`)

    const task = await TaskModel.create({
      title: title,
      token: token
    });

    return {
      success: true,
      task: { title: title, _id: task._id.toString() }
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
    console.log(`Update task request received with id ${id} with title ${title} and solved value ${solved}`)

    await TaskModel.updateOne(
      { _id: id, token: token },
      {
        title: title,
        solved: solved
      }
    );

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
    console.log(`Delete task with id ${id} request received`)

    await TaskModel.deleteOne({ token: token, _id: id });

    return { success: true };
  }
}
