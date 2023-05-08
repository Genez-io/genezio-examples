import 'package:mongo_dart/mongo_dart.dart';
import 'package:getting_started/helper.dart';
import 'package:json_annotation/json_annotation.dart';

part 'task.g.dart';

@JsonSerializable()
class TaskModel {
  String id;
  String title;
  String url;
  String token;
  String solved;
  String date;

  TaskModel(
    this.id,
    this.title,
    this.url,
    this.token,
    this.solved,
    this.date,
  );

  factory TaskModel.fromJson(Map<String, dynamic> json) =>
      _$TaskModelFromJson(json);

  Map<String, dynamic> toJson() => _$TaskModelToJson(this);
}

class Task {
  Db? db;

  /// Method that returns all tasks for a given user ID.
  ///
  /// The method will be exported to a SDK using genezio.
  ///
  /// @param token The user's token.
  /// @returns A list containing tasks.
  Future<List<TaskModel>> getAllTasksByUser(String token) async {
    print("Trying to get all tasks by user with token: $token");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Get tasks from database
    List<TaskModel>? tasks = await db
        ?.collection(TASK_COLLECTION)
        .find({
          "token": token,
        })
        .map((task) {
          return TaskModel.fromJson(task);
        })
        .toList()
        .catchError((e) {
          print("TEST 1: Error getting tasks from database: $e");
          throw e;
        });

    if (tasks == null || tasks.isEmpty) {
      await db
          ?.collection(TASK_COLLECTION)
          .insert(TaskModel(
                  ObjectId().$oid,
                  "Check our documentation",
                  "https://docs.genez.io/genezio-documentation/",
                  token,
                  "false",
                  DateTime.now().toString())
              .toJson())
          .catchError((e) {
        print("Error adding task to database: $e");
        throw e;
      });

      await db
          ?.collection(TASK_COLLECTION)
          .insert(TaskModel(
                  ObjectId().$oid,
                  "Watch our Youtube tutorials",
                  "https://www.youtube.com/@genezio7235",
                  token,
                  "false",
                  DateTime.now().toString())
              .toJson())
          .catchError((e) {
        print("Error adding task to database: $e");
        throw e;
      });

      await db
          ?.collection(TASK_COLLECTION)
          .insert(TaskModel(
                  ObjectId().$oid,
                  "Read our technical articles on genezio blog",
                  "https://genez.io/blog",
                  token,
                  "false",
                  DateTime.now().toString())
              .toJson())
          .catchError((e) {
        print("Error adding task to database: $e");
        throw e;
      });
    } else {
      return tasks;
    }

    // Get tasks from database
    final initTasks = await db
        ?.collection(TASK_COLLECTION)
        .find({
          "token": token,
        })
        .map((task) {
          return TaskModel.fromJson(task);
        })
        .toList()
        .catchError((e) {
          print("TEST 2: Error getting tasks from database: $e");
          throw e;
        });

    // Check if iniTasks is null
    if (initTasks == null || initTasks.isEmpty) {
      return [];
    }

    return initTasks;
  }

  /// Method that creates a task for a giving user ID.
  ///
  /// @param token The user's token.
  /// @returns A list the string "success" if everything went well.
  Future<TaskModel> createTask(String token, String title, String url) async {
    print("Trying to add a new task with title: $title");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Create a new task in the database
    final task = TaskModel(
        ObjectId().$oid, title, url, token, "false", DateTime.now().toString());

    // Add task into the database
    await db?.collection(TASK_COLLECTION).insert(task.toJson()).catchError((e) {
      print("Error adding task to database: $e");
      throw e;
    });

    return task;
  }

  /// Method that deletes a task for giving user token and with a given id.
  ///
  /// @param token The user's token.
  /// @param id The tasks's id.
  /// @returns A list the string "success" if everything went well.
  Future<String> deleteTask(String token, String id) async {
    print("Trying to delete the task with id: $id");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Delete the task from the database
    await db?.collection(TASK_COLLECTION).remove({
      "id": id,
      "token": token,
    }).catchError((e) {
      print("Error deleting task from database: $e");
      throw e;
    });

    return "success";
  }

  /// Method that updates a task.
  ///
  /// @param token The user's token.
  /// @param id The tasks's id.
  /// @param title The tasks's title.
  /// @param solved The tasks's solved flag.
  /// @returns A list the string "success" if everything went well.
  Future<String> updateTask(
      String id, String token, String title, String url, String solved) async {
    print("Trying to update the task with id: $id");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Update the task in the database
    await db?.collection(TASK_COLLECTION).update({
      "id": id,
      "token": token,
    }, {
      r"$set": {
        "title": title,
        "url": url,
        "solved": solved,
      }
    }).catchError((e) {
      print("Error updating task in database: $e");
      throw e;
    });

    return "success";
  }

  /// Method that connects to the database.
  ///
  /// @returns A string "success" if everything went well.
  Future<String> _connect() async {
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
}
