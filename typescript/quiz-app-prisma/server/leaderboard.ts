import { PrismaClient } from "@prisma/client";
import {
  AddPlayerLeaderboardResponse,
  GetLeaderboardResponse,
} from "./models/typeLeaderboard";

// Class representing the leaderboard
export class Leaderboard {
  prisma: PrismaClient;

  constructor() {
    // Initialize the Prisma client for database interactions
    this.prisma = new PrismaClient();
  }

  // Method for adding a player to the leaderboard
  async addPlayerLeaderboard(
    playerName: string,
    score: number,
  ): Promise<AddPlayerLeaderboardResponse> {
    return new Promise(async (resolve) => {
      if (!playerName && !(score === 0 || score !== null)) {
        return resolve({ success: false });
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
          return resolve({ success: false });
        });
      return resolve({ success: true });
    });
  }

  // Method for retrieving the leaderboard
  async getLeaderboard(): Promise<GetLeaderboardResponse> {
    return new Promise<GetLeaderboardResponse>(async (resolve) => {
      // Fetch leaderboard data from the database
      const leaderboard = await this.prisma.leaderboard
        .findMany()
        .catch((error: any) => {
          console.error("Leaderboard get error", error);
          return resolve({ success: false, leaderboard: [] });
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
