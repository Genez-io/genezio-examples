import { GenezioDeploy } from "@genezio/types";
import Sequelize from "sequelize";
import Task from "./models/task";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: One of your environment variables (DB_TABLE_NAME, DB_USERNAME, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT) is not properly set, go to https://dev.mysql.com/doc/refman/8.2/en/installing.html to learn how to obtain the necesearry environment variables";

/**
 * The Task server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class TaskController {
  db;
  constructor() {
    this.#connect();
  }

  #connect() {
    this.db = {};

    const dbModels = [Task];

    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return;
    }

    let sequelize;
    try {
      sequelize = new Sequelize(
        process.env.DB_TABLE_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: process.env.DB_DIALECT,
          logging: false,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }

    dbModels.forEach((modelElem) => {
      const model = modelElem(sequelize, Sequelize.DataTypes);
      this.db[model.name] = model;
      // DELETE IN PROD - not safe
      model.sync({ alter: true });
    });

    Object.keys(this.db).forEach((modelName) => {
      if (this.db[modelName].associate) {
        this.db[modelName].associate(this.db);
      }
    });

    this.db.sequelize = sequelize;
    this.db.Sequelize = Sequelize;
  }

  /**
   * Method that returns all tasks.
   *
   * The method will be exported via SDK using genezio.
   *
   * @returns An object containing two properties: { success: true, tasks: tasks }
   */
  async getAllTasks() {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);

      return { success: false, err: missing_env_error };
    }
    console.log(`Get all tasks by user request received`);

    let tasks;
    try {
      tasks = await this.db.Task.findAll();
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    return { success: true, tasks: tasks };
  }

  /**
   * Method that creates a task.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} title The tasktitle.
   * @returns An object containing two properties: { success: true, id: taskId }
   */
  async createTask(title) {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Create task request received with title ${title}`);

    let task;
    try {
      task = await this.db.Task.create({
        title: title,
      });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    return {
      success: true,
      task: { title: title, id: task.id },
    };
  }

  /**
   * Method that updates a task.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} id The task's id.
   * @param {*} title The task's title.
   * @param {*} solved If the task is solved or not.
   * @returns An object containing two properties: { success: true }
   */
  async updateTask(id, title, solved) {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(
      `Update task request received with id ${id} with title ${title} and solved value ${solved}`
    );

    try {
      await this.db.Task.update(
        {
          title: title,
          solved: solved,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }

  /**
   * Method that deletes a task.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} id The task's id.
   * @returns An object containing one property: { success: true }
   */
  async deleteTask(id) {
    if (
      !process.env.DB_TABLE_NAME ||
      !process.env.DB_USERNAME ||
      !process.env.DB_PASS ||
      !process.env.DB_HOST ||
      !process.env.DB_PORT ||
      !process.env.DB_DIALECT
    ) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Delete task with id ${id} request received`);

    try {
      await this.db.Task.destroy({ where: { id: id } });
    } catch (error) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }
}
