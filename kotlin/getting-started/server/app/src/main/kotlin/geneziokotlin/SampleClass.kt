package geneziokotlin

import com.mongodb.*
import com.mongodb.client.result.InsertOneResult
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoCollection
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import org.bson.BsonInt64
import org.bson.BsonValue
import org.bson.Document
import org.bson.codecs.pojo.annotations.BsonId
import org.bson.types.ObjectId

@Serializable
data class Task(
    var title : String,
    var description: String,
    var status: Boolean
)


class TaskService {
    val taskCollection : MongoCollection<Task>
    init {
        // Replace the placeholder with your Atlas connection string
        val uri = "mongodb+srv://genezio:genezio@cluster0.c6qmwnq.mongodb.net/?retryWrites=true&w=majority"
        // Construct a ServerApi instance using the ServerApi.builder() method
        val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .build()
        val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .serverApi(serverApi)
            .build()
        // Create a new client and connect to the server
        val mongoClient = MongoClient.create(settings)
        val database = mongoClient.getDatabase("test")
        try {
            // Send a ping to confirm a successful connection
            runBlocking {
                val command = Document("ping", BsonInt64(1))
                val commandResult = database.runCommand(command)
                println("Pinged your deployment. You successfully connected to MongoDB!")
            }
        } catch (me: MongoException) {
            System.err.println(me)
        }

        taskCollection = database.getCollection("kotlin_tasks")
    }

    fun fetchTasks(): ArrayList<Task> {
        var res: ArrayList<Task>
        runBlocking {
            res = ArrayList<Task>(taskCollection.find<Task>().toList())

        }
        return res
    }

     fun addNewTask(task: Task): String {
        var res: InsertOneResult
        runBlocking {
            res = taskCollection.insertOne(Task(task.title, task.description, task.status))
        }
        println("Inserted document id: ${res.insertedId}")
        return res.insertedId.toString()
    }
}
