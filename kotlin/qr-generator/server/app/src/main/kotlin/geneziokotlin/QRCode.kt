package geneziokotlin

import classes.QRCode
import classes.QRCodeId
import classes.QRCodeResponse
import com.mongodb.*
import com.mongodb.client.model.Filters
import com.mongodb.client.result.DeleteResult
import com.mongodb.client.result.InsertOneResult
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoCollection
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.Serializable
import org.bson.BsonInt64
import org.bson.Document
import org.bson.types.Binary
import org.bson.types.ObjectId
import kotlin.reflect.typeOf





class QRCodeHandler{
    val QRCodeCollection : MongoCollection<Document>
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

        QRCodeCollection= database.getCollection("codes")
    }

    fun fetchCodes(userId: String): QRCodeResponse {
        val res: ArrayList<QRCodeId> = arrayListOf()
        println("User id in fetch codes = $userId")
        val filter = Filters.eq("userId",userId)
        runBlocking {
            val cursor = QRCodeCollection.find(filter)
            cursor.collect {document ->
                println("we found a document")
                val qrId = document["_id"].toString()
                val binary = document["bitmap"] as Binary
                val byteArray: ByteArray = binary.data
                println("We got the byte array")
                res.add(QRCodeId(qrId,document.getString("userId"),document.getString("name"), byteArray))
                println("we added the byte array")
            }
        }
        return QRCodeResponse(true,"Codes fetched succesfully",res)
    }

    fun addNewQRCode(qrCode: QRCode): QRCodeResponse {
        var res: InsertOneResult
        val documentToInsert = Document()
        documentToInsert["userId"] = qrCode.userId
        documentToInsert["name"] = qrCode.name
        val binaryBitmap = Binary(qrCode.bitmap)
        documentToInsert["bitmap"] = binaryBitmap
        runBlocking {

            res = QRCodeCollection.insertOne(documentToInsert)
        }
        println("Inserted document id: ${res.insertedId}")
        val objectId = res.insertedId.asObjectId()
        return QRCodeResponse(true,"QRCode added successfully", arrayListOf(QRCodeId(objectId.value.toString(),qrCode.userId,qrCode.name,qrCode.bitmap)))
    }

    fun delete(qrCodeId: QRCodeId): QRCodeResponse{
        val filter =Filters.eq("_id",ObjectId(qrCodeId._id))
        val res: ArrayList<QRCodeId> = arrayListOf()
        lateinit var cursor : DeleteResult
        runBlocking {
            cursor = QRCodeCollection.deleteOne(filter)
        }
        if(cursor.deletedCount.toInt() != 1){
            return QRCodeResponse(false,"QRCode dosen't exist", arrayListOf())
        }
        return QRCodeResponse(true,"Code Deleted", arrayListOf())

    }
}