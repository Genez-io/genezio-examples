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
import testpkg.TestCls

@Serializable
data class Task(
    var title : String,
    var description: String,
    var status: Boolean
)

val uri = "mongodb+srv://genezio:genezio@cluster0.c6qmwnq.mongodb.net/?retryWrites=true&w=majority"
val serverApi = ServerApi.builder()
            .version(ServerApiVersion.V1)
            .build()
val settings = MongoClientSettings.builder()
            .applyConnectionString(ConnectionString(uri))
            .serverApi(serverApi)
            .build()
val mongoClient = MongoClient.create(settings)
val taskCollection : MongoCollection<Task> = mongoClient.getDatabase("test").getCollection("kotlin_tasks")

class TaskService() {

    fun testExternalClass(test: TestCls) : TestCls {
        return TestCls(1, "1", true)
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
        return "OK"
    }
}
