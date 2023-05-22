import 'package:mongo_dart/mongo_dart.dart';
import 'package:getting_started/helper.dart';
import 'package:json_annotation/json_annotation.dart';

part 'task.g.dart';

@JsonSerializable()
class Task {
  String id;
  String title;
  String url;
  String token;
  bool solved;
  DateTime date;

  Task(
    this.id,
    this.title,
    this.url,
    this.token,
    this.solved,
    this.date,
  );

  factory Task.fromJson(Map<String, dynamic> json) => _$TaskFromJson(json);

  Map<String, dynamic> toJson() => _$TaskToJson(this);
}

@JsonSerializable()
class GetTasksResponse {
  bool success;
  List<Task> tasks;

  GetTasksResponse(
    this.success,
    this.tasks,
  );

  factory GetTasksResponse.fromJson(Map<String, dynamic> json) =>
      _$GetTasksResponseFromJson(json);

  Map<String, dynamic> toJson() => _$GetTasksResponseToJson(this);
}

@JsonSerializable()
class GetTaskResponse {
  bool success;
  Task task;

  GetTaskResponse(
    this.success,
    this.task,
  );

  factory GetTaskResponse.fromJson(Map<String, dynamic> json) =>
      _$GetTaskResponseFromJson(json);

  Map<String, dynamic> toJson() => _$GetTaskResponseToJson(this);
}

@JsonSerializable()
class UpdateTaskResponse {
  bool success;

  UpdateTaskResponse(
    this.success,
  );

  factory UpdateTaskResponse.fromJson(Map<String, dynamic> json) =>
      _$UpdateTaskResponseFromJson(json);

  Map<String, dynamic> toJson() => _$UpdateTaskResponseToJson(this);
}

@JsonSerializable()
class DeleteTaskResponse {
  bool success;

  DeleteTaskResponse(
    this.success,
  );

  factory DeleteTaskResponse.fromJson(Map<String, dynamic> json) =>
      _$DeleteTaskResponseFromJson(json);

  Map<String, dynamic> toJson() => _$DeleteTaskResponseToJson(this);
}

class TaskService {
  Db? db;

  /// Method that returns all tasks for a given user ID.
  ///
  /// The method will be exported to a SDK using genezio.
  ///
  /// @param token The user's token.
  /// @returns A list containing tasks.
  Future<GetTasksResponse> getAllTasksByUser(String token) async {
    print("Trying to get all tasks by user with token: $token");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Get tasks from database
    final tasks = await db
        ?.collection(TASK_COLLECTION)
        .find({
          "token": token,
        })
        .map((task) {
          return Task.fromJson(task);
        })
        .toList()
        .catchError((e) {
          print("Error getting tasks from database: $e");
          throw e;
        });

    if (tasks == null || tasks.isEmpty) {
      await db
          ?.collection(TASK_COLLECTION)
          .insert(Task(
                  ObjectId().$oid,
                  "Check our documentation",
                  "https://docs.genez.io/genezio-documentation/",
                  token,
                  false,
                  DateTime.now())
              .toJson())
          .catchError((e) {
        print("Error adding task to database: $e");
        throw e;
      });

      await db
          ?.collection(TASK_COLLECTION)
          .insert(Task(
                  ObjectId().$oid,
                  "Watch our Youtube tutorials",
                  "https://www.youtube.com/@genezio7235",
                  token,
                  false,
                  DateTime.now())
              .toJson())
          .catchError((e) {
        print("Error adding task to database: $e");
        throw e;
      });

      await db
          ?.collection(TASK_COLLECTION)
          .insert(Task(
                  ObjectId().$oid,
                  "Read our technical articles on genezio blog",
                  "https://genez.io/blog",
                  token,
                  false,
                  DateTime.now())
              .toJson())
          .catchError((e) {
        print("Error adding task to database: $e");
        throw e;
      });
    } else {
      return GetTasksResponse(true, tasks);
    }

    // Get tasks from database
    final initTasks = await db
        ?.collection(TASK_COLLECTION)
        .find({
          "token": token,
        })
        .map((task) {
          return Task.fromJson(task);
        })
        .toList()
        .catchError((e) {
          print("Error getting tasks from database: $e");
          throw e;
        });

    // Check if iniTasks is null
    if (initTasks == null || initTasks.isEmpty) {
      return GetTasksResponse(false, []);
    }

    return GetTasksResponse(true, initTasks);
  }

  /// Method that creates a task for a giving user ID.
  ///
  /// @param token The user's token.
  /// @returns A list the string "success" if everything went well.
  Future<GetTaskResponse> createTask(
      String token, String title, String url) async {
    print("Trying to add a new task with title: $title");

    // Check if the database is connected
    if (db == null) {
      // Connect to the database
      await _connect();
    }

    // Create a new task in the database
    Task task = Task(ObjectId().$oid, title, url, token, false, DateTime.now());

    // Add task into the database
    await db?.collection(TASK_COLLECTION).insert(task.toJson()).catchError((e) {
      print("Error adding task to database: $e");
      throw e;
    });

    return GetTaskResponse(true, task);
  }

  /// Method that deletes a task for giving user token and with a given id.
  ///
  /// @param token The user's token.
  /// @param id The tasks's id.
  /// @returns A list the string "success" if everything went well.
  Future<DeleteTaskResponse> deleteTask(String token, String id) async {
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

    return DeleteTaskResponse(true);
  }

  /// Method that updates a task.
  ///
  /// @param token The user's token.
  /// @param id The tasks's id.
  /// @param title The tasks's title.
  /// @param solved The tasks's solved flag.
  /// @returns A list the string "success" if everything went well.
  Future<UpdateTaskResponse> updateTask(
      String id, String token, String title, String url, bool solved) async {
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

    return UpdateTaskResponse(true);
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
