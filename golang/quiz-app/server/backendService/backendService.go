package backend

import (
	"context"
	"errors"
	"os"
	"quiz-app-backend/db"

	"time"
)
type LeaderboardEntry struct {
	ID int `json:"id"`
	PlayerName string `json:"playerName"`
	Score int `json:"score"`
	Date time.Time `json:"date"`
}

var ErrScoreOrPlayerNameNotValid =  errors.New("Score or PlayerName is empty")

// genezio: deploy
type LeaderboardService struct{
	prisma *db.PrismaClient
}

func New() LeaderboardService {
	url := os.Getenv("MYSQL_DB_URL")
	if url == "" {
		panic("ERROR: Your MYSQL_DB_URL environment variable is not properly set, go to https://dev.mysql.com/doc/mysql-getting-started/en/ to learn how to create a MySQL database")
	}
	client:= db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		panic(err)
	}
	return LeaderboardService{
		prisma : client,
	}
}


func (b LeaderboardService) AddPlayerLeaderboard(playerName string,score int ) (error) {
	if playerName == "" || score == 0 { 
		return ErrScoreOrPlayerNameNotValid
	}
	_, err := b.prisma.Leaderboard.CreateOne(
		db.Leaderboard.PlayerName.Set(playerName),
		db.Leaderboard.Score.Set(score),
		db.Leaderboard.Date.Set(time.Now()),
	).Exec(context.Background())
	if err != nil {
		return err
	}
	return nil
}

func (b LeaderboardService) GetLeaderboard() ([]LeaderboardEntry, error) {
	leaderboard, err := b.prisma.Leaderboard.FindMany().OrderBy(db.Leaderboard.Score.Order(db.DESC)).Exec(context.Background())
	if err != nil {
		return nil, err
	}
	entries := []LeaderboardEntry{}
	for _, v := range leaderboard {
		entries = append(entries, LeaderboardEntry{ID: v.ID, PlayerName: v.PlayerName, Score: v.Score, Date: v.Date})
	}
	return entries, nil
}

