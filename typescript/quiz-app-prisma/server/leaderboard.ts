import { PrismaClient } from "@prisma/client";
import {
  AddPlayerLeaderboardResponse,
  GetLeaderboardResponse,
} from "./models/typeLeaderboard";
import { GenezioDeploy } from "@genezio/types";

const red_color = "\x1b[31m%s\x1b[0m";
const missing_env_error =
  "ERROR: Your MYSQL_DB_URL environment variable is not properly set, go to https://dev.mysql.com/doc/mysql-getting-started/en/ to learn how to create a MySQL database";

// Class representing the leaderboard
@GenezioDeploy()
export class Leaderboard {
  prisma: PrismaClient;

  constructor() {
    // Initialize the Prisma client for database interactions
    this.prisma = new PrismaClient();
  }

  // Method for adding a player to the leaderboard
  async addPlayerLeaderboard(
    playerName: string,
    score: number
  ): Promise<AddPlayerLeaderboardResponse> {
    return new Promise(async (resolve) => {
      if (!playerName && !(score === 0 || score !== null)) {
        return resolve({ success: false });
      }
      // Check if the MYSQL_DB_URL environment variable is present
      if (!process.env.MYSQL_DB_URL) {
        console.log(red_color, missing_env_error);
        return resolve({ success: false, err: missing_env_error });
      }
      // Insert the new player into the database
      await this.prisma.leaderboard
        .create({
          data: {
            playerName: playerName,
            score: score,
            date: new Date(),
          },
        })
        .catch((error: any) => {
          console.error("Database connection error", error);
          return resolve({
            success: false,
            err: "Database connection error: " + error.name,
          });
        });
      return resolve({ success: true });
    });
  }

  // Method for retrieving the leaderboard
  async getLeaderboard(): Promise<GetLeaderboardResponse> {
    return new Promise<GetLeaderboardResponse>(async (resolve) => {
      // Check if the MYSQL_DB_URL environment variable is present
      if (!process.env.MYSQL_DB_URL) {
        console.log(red_color, missing_env_error);
        return resolve({
          success: false,
          leaderboard: [],
          err: missing_env_error,
        });
      }
      // Fetch leaderboard data from the database
      const leaderboard = await this.prisma.leaderboard
        .findMany()
        .catch((error: any) => {
          console.error("Leaderboard get error", error);
          return resolve({
            success: false,
            leaderboard: [],
            err: "Database connection error: " + error.name,
          });
        });
      // If is data in leaderboard
      if (!leaderboard) {
        return resolve({ success: false, leaderboard: [] });
      } else {
        // Sort leaderboard entries based on score and date
        leaderboard.sort((first, second) => {
          // Sort by score in descending order
          if (second.score !== first.score) {
            return second.score - first.score;
          }
          // If scores are equal, sort by date in descending order
          return second.date.getTime() - first.date.getTime();
        });
        // Resolve with success response and leaderboard data
        return resolve({ success: true, leaderboard: leaderboard });
      }
    });
  }
}
