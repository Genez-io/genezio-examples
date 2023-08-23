// Define the structure of a Question
export type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

// Define the structure of a Leaderboard entry
export type LeaderboardInterface = {
  id: number;
  playerName: string;
  score: number;
  date: Date;
};

// Enum to represent the game status
export enum GameStatus {
  Loading,
  InProgress,
  Finished,
}
