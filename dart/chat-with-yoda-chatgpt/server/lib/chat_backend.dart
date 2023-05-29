import 'package:dart_openai/dart_openai.dart';
import 'package:mongo_dart/mongo_dart.dart';
import 'package:chat_with_chatgpt/constants.dart';
import 'package:dotenv/dotenv.dart';

class ChatBackend {
  var env = DotEnv(includePlatformEnvironment: true)..load();
  Db? db = null;

  // Private constructor
  ChatBackend() {
    // Set the OpenAI API key
    OpenAI.apiKey = env["OPENAPI_KEY"].toString();
  }

  Future<String> askChatGpt(String prompt, String question) async {
    // Create a list of messages (that contains only one message)

    // Right now, we are sending the system message every time
    // This can be optimized with a setCharacter() / setPrompt()
    final my_msg = [
      OpenAIChatCompletionChoiceMessageModel(
          content: prompt, role: OpenAIChatMessageRole.system),
      OpenAIChatCompletionChoiceMessageModel(
          content: question, role: OpenAIChatMessageRole.user),
    ];

    // Create a chat OpenAI instance
    final chat = await OpenAI.instance.chat
        .create(model: OPENAI_MODEL_GPT3_5, messages: my_msg);

    // Return the response from chatGPT
    return chat.choices.first.message.content;
  }

  Future<String> askYoda(String question) async {
    return askChatGpt(characters["yoda"]!, question);
  }

  Future<String> askChewbacca(String question) async {
    return askChatGpt(characters["chewbacca"]!, question);
  }

  Future<String> _connect() async {
    final MONGODB_URI = env["MONGODB_URI"].toString();
    // Connect to the database
    db = await Db.create(MONGODB_URI).catchError((e) {
      print("Error connecting to database: $e");
      throw e;
    });

    // Open the database
    await db?.open().catchError((e) {
      print("Error opening database: $e");
      throw e;
    });

    return "success";
  }

  Future<String> addBookmark(String content) async {
    print("Trying to add bookmark with content: $content");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Check if bookmark already exists
    final value =
        await db?.collection("bookmarks").findOne({'content': content});
    if (value != null) {
      print("Bookmark already exists");
      throw "Bookmark already exists";
    }

    // Add bookmark into the database
    await db
        ?.collection("bookmarks")
        .insertOne({'content': content}).catchError((e) {
      print("Error adding bookmark: $e");
      throw e;
    });

    return "success";
  }

  Future<List<String>> getAllBookmarks() async {
    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Get all the bookmarks from the database
    final rawBookmarks = await db?.collection("bookmarks").find();

    // Check if there are any bookmarks
    if (rawBookmarks == null) {
      return [];
    }

    // Convert the list of bookmarks into a list of strings List<String>
    final bookmarksList = await rawBookmarks
        .map((element) => element['content'].toString())
        .toList();

    return bookmarksList;
  }
}
