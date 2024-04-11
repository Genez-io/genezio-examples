import { CodeModel } from "./models/code";
import { GenezioAuth, GenezioDeploy, GnzContext } from "@genezio/types";
import { DataTypes, Sequelize } from "sequelize";
import pg from "pg";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your POSTGRES_URL environment variable is not properly set, go to https://genezio.com/docs/features/databases to learn how to create a free tier postgres database for your project";

export type Code = {
  codeId: number;
  title: string;
  ownerId: string;
  codeText: string;
  date: Date;
};

export type GetCodesResponse = {
  success: boolean;
  codes: Code[];
  err?: string;
};

export type GetCodeResponse = {
  success: boolean;
  code?: Code;
  err?: string;
};

export type UpdateCodeResponse = {
  success: boolean;
  err?: string;
};

export type DeleteCodeResponse = {
  success: boolean;
  err?: string;
};

/**
 * The Code server class that will be deployed on the genezio infrastructure.
 */
@GenezioDeploy()
export class CodeService {
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
      // Intialize the CodeModel
      CodeModel.init(
        {
          codeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          title: DataTypes.STRING(512),
          ownerId: DataTypes.STRING(512),
          codeText: DataTypes.STRING(1024),
          date: DataTypes.DATE,
        },

        {
          sequelize,
          modelName: "CodeModel",
          tableName: "codes",
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
    const maxId: number = await CodeModel.max("codeId");
    if (maxId == null) {
      return 0;
    }
    return maxId + 1;
  }
  /**
   * Method that returns all codes for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session.
   * @returns An object containing two properties: { success: true, codes: codes }
   */
  @GenezioAuth()
  async getAllCodes(context: GnzContext): Promise<GetCodesResponse> {
    if (!process.env.POSTGRES_URL) {
      console.log(red_color, missing_env_error);
      return { success: false, codes: [], err: missing_env_error };
    }
    const ownerId = context.user?.userId;
    if (!ownerId)
      return {
        success: false,
        codes: [],
        err: "User not authentificated or token has expired",
      };
    console.log(
      `Get all codes by user request received with userID ${context.user?.userId}`
    );
    let codes;
    try {
      codes = await CodeModel.findAll({ where: { ownerId: ownerId } });
    } catch (error: any) {
      return { success: false, codes: [], err: error.toString() };
    }

    return { success: true, codes: codes };
  }

  /**
   * Method that creates a code for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session
   * @param {*} title The code title.
   * @param {*} codeText The code text used to generate the qr code.
   * @returns An object containing two properties: { success: true, code: code }
   */
  @GenezioAuth()
  async createCode(
    context: GnzContext,
    title: string,
    codeText: string
  ): Promise<GetCodeResponse> {
    if (!process.env.POSTGRES_URL) {
      console.log(red_color, missing_env_error);
      return { success: false, err: missing_env_error };
    }
    console.log(`Create code request received with title ${title}`);
    const ownerId = context.user?.userId;
    if (!ownerId)
      return {
        success: false,
        err: "User not authentificated or token has expired",
      };
    let code;
    try {
      var maxId = await this.#generateUniqueId();

      code = await CodeModel.create({
        codeId: maxId,
        title: title,
        codeText: codeText,
        ownerId: ownerId,
        date: new Date(),
      });
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return {
      success: true,
      code: code,
    };
  }

  /**
   * Method that updates a code for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session.
   * @param {*} id The code's id.
   * @param {*} title The code's title.
   * @param {*} codeText The code text used to generate the qr.
   * @returns An object containing one property: { success: true }
   */
  @GenezioAuth()
  async updateCode(
    context: GnzContext,
    id: number,
    title: string,
    codeText: string
  ): Promise<UpdateCodeResponse> {
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
      `Update code request received with id ${id} with title ${title} and code text ${codeText}`
    );

    const code = await CodeModel.findOne({
      where: { codeId: id, ownerId: ownerId },
    });
    if (!code) {
      return {
        success: false,
        err: "code does not exist or the user doesn't have access to it",
      };
    }

    try {
      code.set({
        title: title,
        codeText: codeText,
      });
      await code.save();
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }

  /**
   * Method that deletes a code for the authentficated user.
   * Only authenticated users with a valid token can access this method.
   *
   * The method will be exported via SDK using genezio.
   *
   * @param {*} context The genezio context for the authentification session.
   * @param {*} id The code's id.
   * @returns An object containing one property: { success: true }
   */
  @GenezioAuth()
  async deleteCode(
    context: GnzContext,
    id: number
  ): Promise<DeleteCodeResponse> {
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
    console.log(`Delete code with id ${id} request received`);

    const code = await CodeModel.findOne({
      where: { codeId: id, ownerId: ownerId },
    });
    if (!code) {
      return {
        success: false,
        err: "code does not exist or the user doesn't have access to it",
      };
    }
    try {
      await code.destroy();
    } catch (error: any) {
      return { success: false, err: error.toString() };
    }

    return { success: true };
  }
}
