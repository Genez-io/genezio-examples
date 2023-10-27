package geneziokotlin

import com.mongodb.*
import com.mongodb.client.model.Filters
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import com.mongodb.kotlin.client.coroutine.FindFlow
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoCollection
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.count
import kotlinx.coroutines.flow.forEach
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import org.bson.BsonInt64
import org.bson.BsonObjectId
import org.bson.Document
import java.lang.Exception
import java.lang.RuntimeException

@Serializable
data class User(
    var email: String,
    var password: String,
)
@Serializable
data class UserId(
    var _id: String,
    var email: String,
    var password: String,
)
@Serializable
data class UserResponse(
    var success: Boolean,
    var message: String?,
    var data: ArrayList<UserId>?,

    )


class UserHandler{
    val userCollection : MongoCollection<Document>
    init {
        // Replace the placeholder with your Atlas connection string
        val uri = "Your MongoDB URI"
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
        val database = mongoClient.getDatabase("QRGenerator")
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

        userCollection = database.getCollection("users")
    }

    fun fetchUsers(): UserResponse {
        val res: ArrayList<UserId> = arrayListOf()
        runBlocking {
            val cursor = userCollection.find()
            cursor.collect {document ->
                val userId = document["_id"].toString()
                res.add(UserId(userId,document.getString("email"),document.getString("password")))
            }
        }
        println("Fetched users succesfully")
        println(res.toString())


        return UserResponse(true,"Users fetched",res)
    }

     fun addNewUser(user: User): UserResponse {
         var resFind: ArrayList<User>
         val filter = Filters.eq("email",user.email)
         runBlocking {
             resFind = ArrayList<User>(userCollection.find<User>(filter).toList())
         }
         if(resFind.size != 0){
             return UserResponse(false,"User already exists", arrayListOf())
         }
        var res: InsertOneResult
        val documentToInsert = Document()
         documentToInsert["email"] = user.email
         documentToInsert["password"] = user.password
        runBlocking {

            res = userCollection.insertOne(documentToInsert)
        }

        println("Inserted document id: ${res.insertedId}")
        val objectId = res.insertedId.asObjectId()
        return UserResponse(true,"user added successfully", arrayListOf(UserId(objectId.value.toString(),user.email,user.password)))
    }

    fun login(user: User): UserResponse{
        val filter = Filters.and(Filters.eq("email",user.email),Filters.eq("password",user.password))
        val res: ArrayList<UserId> = arrayListOf()
        runBlocking {
            val cursor = userCollection.find(filter)
            cursor.collect {document ->
                val userId = document["_id"].toString()
                res.add(UserId(userId,document.getString("email"),document.getString("password")))
            }
        }
        if(res.size != 1){
            return UserResponse(false,"Wrong credentials or user dosen't exist", arrayListOf())
        }
        return UserResponse(true,"user logged in", arrayListOf(res[0]))

    }
}
