package backend

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Task struct {
	ID     string    `json:"_id"`
	Title  string    `json:"title"`
	Solved bool      `json:"solved"`
	Date   time.Time `json:"date"`
}

// genezio: deploy
type TaskService struct {
	mongo *mongo.Client
}

func New() TaskService {
	url := os.Getenv("MONGO_DB_URI")
	if url == "" {
		panic("It seems that the MONGO_DB_URI environment variable is not set in the `.env` file. Check the documentation https://genezio.com/blog/how-to-add-a-mongodb-to-your-genezio-project/ for more information.")
	}
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(url))
	if err != nil {
		panic(err)
	}

	return TaskService{
		mongo: client,
	}
}

func (b TaskService) GetAllTasks() ([]Task, error) {
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	defer cursor.Close(context.Background())

	var tasks []Task
	for cursor.Next(context.Background()) {
		var task Task
		var result bson.M
		if err = cursor.Decode(&result); err != nil {
			return nil, err
		}
		task.ID = result["_id"].(primitive.ObjectID).Hex()
		task.Title = result["title"].(string)
		task.Solved = result["solved"].(bool)
		task.Date = result["date"].(primitive.DateTime).Time()
		tasks = append(tasks, task)
	}

	return tasks, nil

}

func (b TaskService) CreateTask(task Task) (Task, error) {
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	res, err := collection.InsertOne(context.Background(), task)
	if err != nil {
		return Task{}, err
	}
	fmt.Println("Inserted a single document: ", res)
	task.ID = res.InsertedID.(primitive.ObjectID).Hex()
	return task, nil
}

func (b TaskService) UpdateTask(id string, task Task) (Task, error) {
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return Task{}, err
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"title": task.Title, "solved": task.Solved}}
	_, err = collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return Task{}, err
	}
	task.ID = objectID.Hex()
	return task, nil

}

func (b TaskService) DeleteTask(id string) error {
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	return nil

}
