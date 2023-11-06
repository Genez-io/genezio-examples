import  mongoose from "mongoose"
import { ObjectId } from 'mongodb'
import { MONGO_DB_URI } from "./helper"
import { TaskModel } from "./models/task"
import { GenezioDeploy } from "@genezio/types"

export type Task = {
  id: string,
  token: string,
  title: string,
  description: string,
  solved: boolean,
  date: string,
}

export type GetTasksResponse = {
  success: boolean,
  tasks: Task[]
}

export type GetTaskResponse = {
  success: boolean,
  task?: Task
}

export type UpdateTaskResponse = {
  success: boolean,
}

export type DeleteTaskResponse = {
  success: boolean,
}

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
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_DB_URI);
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
    console.log(`Get all tasks request received for user with token ${token}`)

    const tasks: Task[] = (await TaskModel.find({token: token})).map((task) => {
      return {
        id: task._id.toString(),
        token: task.token,
        title: task.title,
        description: task.description,
        solved: task.solved,
        date: task.date.toString()
        }
        });

    if (tasks.length === 0) {
      await TaskModel.create({
        token: token,
        title: "Check the other example projects",
        description: "https://github.com/Genez-io/genezio-examples"
      })

      await TaskModel.create({
        token: token,
        title: "Check our documentation",
        description: "https://docs.genez.io/genezio-documentation/"
      })

      await TaskModel.create({
        token: token,
        title: "Read our technical articles on genezio blog",
        description: "https://genez.io/blog/"
      })

      const initTasks: Task[] = (await TaskModel.find({token: token})).map((task) => {
        return {
          id: task._id.toString(),
          token: task.token,
          title: task.title,
          description: task.description,
          solved: task.solved,
          date: task.date.toString()
          }
          });

      console.log(`Found ${initTasks.length} tasks for user with token ${token}`)
      return { success: true, tasks: initTasks };
    }

    console.log(`Found ${tasks.length} tasks for user with token ${token}`)
    return { success: true, tasks: tasks };
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
  async createTask(token: string, title: string, description: string) : Promise<GetTaskResponse> {
    console.log(`Create task request received for user with title ${title}`)

    if (!description) {
      description = "";
    }

    const task = await TaskModel.create({
      token: token,
      title: title,
      description: description,
      solved: false,
    });

    return {
      success: true,
      task: { id: task._id.toString(), token: token, title: title, description: description, solved: false, date: ""}
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
  async updateTask(token: string, id: string , title: string, description: string, solved: boolean): Promise<UpdateTaskResponse>{
    console.log(`Update task request received with id ${id} with title ${title} and solved value ${solved}`)

    if (!description) {
      description = "";
    }

    await TaskModel.updateOne(
      {
        _id: new ObjectId(id.toString()),
        token: token
      },
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
   * @param {*} token The user's token.
   * @param {*} id The task's id.
   * @returns An object containing one property: { success: true }
   */
  async deleteTask(token:string, id: string): Promise<DeleteTaskResponse> {
    console.log(`Delete task with id ${id} request received`)

    await TaskModel.deleteOne({ _id: new ObjectId(id), token:token });

    return { success: true };
  }
}
