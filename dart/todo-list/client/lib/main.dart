import 'package:flutter/material.dart';

import 'package:todo_list/add_task_alert_dialog.dart';
import 'package:todo_list/delete_task_alert_dialog.dart';
import 'package:todo_list/update_task_alert_dialog.dart';

import 'package:todo_list/sdk/task_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Todo List',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: const MyHomePage(title: 'Todo List'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final PageController pageController = PageController(initialPage: 0);

  // This is a temporary token for testing purposes
  String token = "this-is-a-hardcoded-token";

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: PageView(
        controller: pageController,
        children: <Widget>[
          Center(
            child: Tasks(
              token: token,
            ),
          ),
          Center(
            child: Tasks(
              token: token,
            ),
          ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(
            bottom: 20.0), // Adjust the bottom margin as needed
        child: FloatingActionButton(
          onPressed: () {
            showDialog(
              context: context,
              builder: (BuildContext context) {
                return AddTaskAlertDialog(token: token);
              },
            );
          },
          tooltip: 'Add a new task',
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}

class Tasks extends StatefulWidget {
  final String token;
  const Tasks({Key? key, required this.token}) : super(key: key);

  @override
  State<Tasks> createState() => _TasksState();
}

class _TasksState extends State<Tasks> {
  List<Task> tasks = [];

  @override
  void initState() {
    super.initState();

    _getTasks().then((response) {
      tasks.addAll(response.tasks);
      // Update UI
      setState(() {
        tasks = tasks;
      });
    }).catchError((error) {
      print(error);
    });
  }

  Future<GetTasksResponse> _getTasks() async {
    return TaskService.getAllTasksByUser(widget.token);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(10.0),
      child: ListView.builder(
        itemCount: tasks.length,
        itemBuilder: (context, index) {
          final task = tasks[index];
          return Container(
            height: 100,
            margin: const EdgeInsets.only(bottom: 15.0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(15.0),
              border: Border.all(
                color: Colors.deepPurple,
                width: 1,
              ),
              color: Colors.white,
            ),
            child: ListTile(
              leading: Checkbox(
                value: task.solved,
                onChanged: (value) {
                  final id = task.id;
                  final title = task.title;
                  final url = task.url;
                  setState(() {
                    TaskService.updateTask(
                        id, widget.token, title, url, value!);
                    task.solved = value;
                  });
                },
              ),
              title: SelectableText(
                task.title,
                style: task.solved == true
                    ? TextStyle(decoration: TextDecoration.lineThrough)
                    : null,
              ),
              subtitle: SelectableText(task.url,
                  style: task.solved == true
                      ? TextStyle(decoration: TextDecoration.lineThrough)
                      : null),
              isThreeLine: true,
              trailing: PopupMenuButton(
                icon: const Icon(Icons.more_vert),
                itemBuilder: (context) => [
                  PopupMenuItem(
                    value: 'update',
                    child: Text('Update Task'),
                    onTap: () {
                      String taskId = task.id;
                      String taskName = task.title;
                      String taskUrl = task.url;
                      Future.delayed(Duration.zero, () {
                        showDialog(
                          context: context,
                          builder: (context) => UpdateTaskAlertDialog(
                              token: widget.token,
                              taskId: taskId,
                              taskName: taskName,
                              taskUrl: taskUrl),
                        );
                      });
                    },
                  ),
                  PopupMenuItem(
                    value: 'delete',
                    child: Text('Delete'),
                    onTap: () {
                      String taskId = task.id;
                      String taskName = task.title;
                      Future.delayed(Duration.zero, () {
                        showDialog(
                          context: context,
                          builder: (context) => DeleteTaskDialog(
                              token: widget.token,
                              taskId: taskId,
                              taskName: taskName),
                        );
                      });
                    },
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
