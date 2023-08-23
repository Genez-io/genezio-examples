// Response type for adding a player to the leaderboard
export type AddPlayerLeaderboardResponse = {
  success: boolean; // Indicates whether the operation was successful
};

// Type for a single entry in the leaderboard
export type LeaderboardEntry = {
  id: number;
  playerName: string;
  score: number;
  date: Date;
};

// Response type for retrieving the leaderboard
export type GetLeaderboardResponse = {
  success: boolean; // Indicates whether the operation was successful
  leaderboard: LeaderboardEntry[]; // Array of leaderboard entries
};
