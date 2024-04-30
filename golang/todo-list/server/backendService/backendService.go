package backend

import (
	"context"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Task struct {
	ID     primitive.ObjectID `json:"_id"`
	Title  string             `json:"title"`
	Solved bool               `json:"solved"`
	Date   string             `json:"date"`
}

// genezio: deploy
type TaskService struct {
	mongo *mongo.Client
	ctx   context.Context
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

	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			panic(err)
		}
	}()
	return TaskService{
		mongo: client,
		ctx:   context.Background(),
	}
}

func (b TaskService) GetAllTasks() ([]Task, error) {
	fmt.Println("We got here")
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	cursor, err := collection.Find(b.ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(b.ctx)

	var tasks []Task
	if err = cursor.All(b.ctx, &tasks); err != nil {

		return nil, err
	}
	return tasks, nil

}

func (b TaskService) CreateTask(task Task) (Task, error) {
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	res, err := collection.InsertOne(b.ctx, task)
	if err != nil {
		return Task{}, err
	}
	fmt.Println("Inserted a single document: ", res)
	task.ID = res.InsertedID.(primitive.ObjectID)
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
	_, err = collection.UpdateOne(b.ctx, filter, update)
	if err != nil {
		return Task{}, err
	}
	task.ID = objectID
	return task, nil

}

func (b TaskService) DeleteTask(id string) error {
	collection := b.mongo.Database("todo-list-ts").Collection("tasks")
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	filter := bson.M{"_id": objectID}
	_, err = collection.DeleteOne(b.ctx, filter)
	if err != nil {
		return err
	}
	return nil

}
