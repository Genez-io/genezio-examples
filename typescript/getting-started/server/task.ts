import mongoose from "mongoose"
import { TaskModel } from "./models/task"
import { GenezioDeploy } from "@genezio/types"

const red_color = '\x1b[31m%s\x1b[0m'
const yellow_color = '\x1b[33m%s\x1b[0m'

export type Task = {
  id: string,
  token: string,
  title: string,
  solved: boolean,
  date: Date,
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
 @GenezioDeploy({type: "jsonrpc"})
export class TaskService {
  constructor() {
    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
      if(!process.env.MONGO_DB_URI){ 
        console.log(red_color,"ERROR: Your MONGO_DB_URI environment variable is not set, go to https://genez.io/blog/how-to-add-a-mongodb-to-your-genezio-project/ to learn how to integrate your project with Mongo DB")
        return;
      }
      mongoose.connect(process.env.MONGO_DB_URI||"").catch((err)=>{
        console.log(yellow_color,"WARNING: Check if your environment variables are correctly set");
        console.log(err);
      });
    
  }

  /**
   * Method that returns all tasks for a giving user ID.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} token The user's token.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async getAllTasksByUser(token: string): Promise<GetTasksResponse> {
    console.log(`Get all tasks by user request received with token ${token}`)

    const tasks = (await TaskModel.find({ token: token })).map((task) => {
      return {
        id: task._id.toString(),
        token: task.token,
        title: task.title,
        solved: task.solved,
        date: task.date
      };
    });

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

      const initTasks = (await TaskModel.find({ token: token })).map((task) => {
        return {
          id: task._id.toString(),
          token: task.token,
          title: task.title,
          solved: task.solved,
          date: task.date
          };
        });


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
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async createTask(token: string, title: string): Promise<GetTaskResponse> {
    console.log(`Create task request received for user with ${token} with title ${title}`)

    const task = await TaskModel.create({
      title: title,
      token: token
    });

    return {
      success: true,
      task: { title: title, token:token, id: task._id.toString(), solved: false, date: new Date() }
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
  async updateTask(token: string, id: string, title: string, solved: boolean) : Promise<UpdateTaskResponse>{
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
   * @param {*} id The task's id.
   * @returns An object containing one property: { success: true }
   */
  async deleteTask(token: string, id: string):Promise<DeleteTaskResponse> {
    console.log(`Delete task with id ${id} request received`)

    await TaskModel.deleteOne({ token: token, _id: id });

    return { success: true };
  }
}
