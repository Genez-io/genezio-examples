import { TaskModel } from "./models/task";
import { GenezioAuth, GenezioDeploy, GnzContext } from "@genezio/types";
import { DataTypes, Sequelize } from "sequelize";
import pg from "pg";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your POSTGRES_URL environment variable is not properly set, go to https://genezio.com/docs/features/databases to learn how to create a free tier postgres database for your project";

export type Task = {
  taskId: number;
  title: string;
  solved: boolean;
  ownerId: string;
  date: Date;
};

export type GetTasksResponse = {
  success: boolean;
  tasks: Task[];
  err?: string;
};

export type GetTaskResponse = {
  success: boolean;
  task?: Task;
  err?: string;
};

export type UpdateTaskResponse = {
  success: boolean;
  err?: string;
};

export type DeleteTaskResponse = {
  success: boolean;
  err?: string;
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
    try {
      if (!process.env.POSTGRES_URL) {
        console.log(red_color, missing_env_error);
        return;
      }
      // Initialize the database connection manager
      const sequelize = new Sequelize(process.env.POSTGRES_URL || "", {
        dialect: "postgres",
        dialectModule: pg,
        define: {
          timestamps: false, // This disables the created_at and updated_at columns
        },
        dialectOptions: {
          ssl: {
            require: true, // Use SSL with the 'require' option
          },
        },
      });
      // Intialize the TaskModel
      TaskModel.init(
        {
          taskId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          title: DataTypes.STRING(512),
          ownerId: DataTypes.STRING(512),
          solved: DataTypes.BOOLEAN,
          date: DataTypes.DATE,
        },

        {
          sequelize,
          modelName: "TaskModel",
          tableName: "tasks",
        }
      );
      sequelize.sync();
    } catch (err: any) {
      console.log(
        "\x1b[33m%s\x1b[0m",
        "WARNING: Check if your environment variables are correctly set"
      );
      console.log(err);
    }
  }

  /**
   * Method that returns the (max userId) + 1 from the database
   * or 0 if there are no users in the database
   *
   * @returns a number reprezenting the max id in the table
   */
  async #generateUniqueId(): Promise<number> {
    const maxId: number = await TaskModel.max("taskId");
    if (maxId == null) {
      return 0;
    }
    return maxId + 1;
  }
  /**
   * Method that returns all tasks for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session.
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  @GenezioAuth()
  async getAllTasks(context: GnzContext): Promise<GetTasksResponse> {
    if (!process.env.POSTGRES_URL) {
      console.log(red_color, missing_env_error);
      return { success: false, tasks: [], err: missing_env_error };
    }
    const ownerId = context.user?.userId;
    if (!ownerId)
      return {
        success: false,
        tasks: [],
        err: "User not authentificated or token has expired",
      };
    console.log(
      `Get all tasks by user request received with userID ${context.user?.userId}`
    );
    let tasks;
    try {
      tasks = await TaskModel.findAll({ where: { ownerId: ownerId } });
    } catch (error: any) {
      return { success: false, tasks: [], err: error.toString() };
    }

    return { success: true, tasks: tasks };
  }

  /**
   * Method that creates a task for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session
   * @param {*} title The tasktitle.
   * @returns An object containing two properties: { success: true, task: task }
   */
  @GenezioAuth()
  async createTask(
    context: GnzContext,
    title: string
  ): Promise<GetTaskResponse> {
    if (!process.env.POSTGRES_URL) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Create task request received with title ${title}`);
    const ownerId = context.user?.userId;
    if (!ownerId)
      return {
        success: false,
        err: "User not authentificated or token has expired",
      };
    let task;
    try {
      var maxId = await this.#generateUniqueId();

      task = await TaskModel.create({
        taskId: maxId,
        title: title,
        solved: false,
        ownerId: ownerId,
        date: new Date(),
      });
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return {
      success: true,
      task: task,
    };
  }

  /**
   * Method that updates a task for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session.
   * @param {*} id The task's id.
   * @param {*} title The task's title.
   * @param {*} solved If the task is solved or not.
   * @returns An object containing one property: { success: true }
   */
  @GenezioAuth()
  async updateTask(
    context: GnzContext,
    id: number,
    title: string,
    solved: boolean
  ): Promise<UpdateTaskResponse> {
    if (!process.env.POSTGRES_URL) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    const ownerId = context.user?.userId;
    if (!ownerId)
      return {
        success: false,
        err: "User not authentificated or token has expired",
      };
    console.log(
      `Update task request received with id ${id} with title ${title} and solved value ${solved}`
    );

    const task = await TaskModel.findOne({
      where: { taskId: id, ownerId: ownerId },
    });
    if (!task) {
      return {
        success: false,
        err: "task does not exist or the user doesn't have access to it",
      };
    }

    try {
      task.set({
        title: title,
        solved: solved,
      });
      await task.save();
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }

  /**
   * Method that deletes a task for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session.
   * @param {*} id The task's id.
   * @returns An object containing one property: { success: true }
   */
  @GenezioAuth()
  async deleteTask(
    context: GnzContext,
    id: number
  ): Promise<DeleteTaskResponse> {
    if (!process.env.POSTGRES_URL) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    const ownerId = context.user?.userId;
    if (!ownerId)
      return {
        success: false,
        err: "User not authentificated or token has expired",
      };
    console.log(`Delete task with id ${id} request received`);

    const task = await TaskModel.findOne({
      where: { taskId: id, ownerId: ownerId },
    });
    if (!task) {
      return {
        success: false,
        err: "task does not exist or the user doesn't have access to it",
      };
    }
    try {
      await task.destroy();
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }
}
