import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:todo_list/add_task_alert_dialog.dart';
import 'package:todo_list/delete_task_alert_dialog.dart';
import 'package:todo_list/update_task_alert_dialog.dart';

import 'package:todo_list/sdk/task.dart';

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
      title: 'Flutter Todo List',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
      ),
      home: const MyHomePage(title: 'Getting started with Flutter and genezio'),
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
  late int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: PageView(
        controller: pageController,
        children: const <Widget>[
          Center(
            child: Tasks(),
          ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return const AddTaskAlertDialog();
            },
          );
        },
        tooltip: 'Add a new task',
        child: const Icon(Icons.add),
      ),
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 6.0,
        clipBehavior: Clip.antiAlias,
        child: SizedBox(
          height: kBottomNavigationBarHeight,
          child: BottomNavigationBar(
            currentIndex: _selectedIndex,
            selectedItemColor: Colors.deepPurple,
            unselectedItemColor: Colors.black,
            onTap: (index) {
              setState(() {
                _selectedIndex = index;
                pageController.jumpToPage(index);
              });
            },
            items: const [
              BottomNavigationBarItem(
                  icon: Icon(CupertinoIcons.square_list),
                  label: 'tasks',
                  tooltip: 'List all of your tasks'),
              BottomNavigationBarItem(
                icon: Icon(CupertinoIcons.tag),
                label: 'tags',
                tooltip: 'Check your tags',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Tasks extends StatefulWidget {
  const Tasks({Key? key}) : super(key: key);
  @override
  State<Tasks> createState() => _TasksState();
}

class _TasksState extends State<Tasks> {
  late List<dynamic> tasks = [];

  @override
  void initState() {
    super.initState();
    _getTasks();
  }

  Future<void> _getTasks() async {
    try {
      final allTasks = await Task.getAllTasks();

      setState(() {
        tasks = allTasks.values.toList()[1];
      });
    } catch (error) {
      print(error);
    }
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
              color: Colors.white,
              boxShadow: const [
                BoxShadow(
                  color: Colors.grey,
                  blurRadius: 5.0,
                  offset: Offset(0, 5), // shadow direction: bottom right
                ),
              ],
            ),
            child: ListTile(
              leading: Checkbox(
                value: task?['solved'],
                onChanged: (value) {
                  final id = task?['_id'] ?? '';
                  final title = task?['title'] ?? '';
                  final description = task?['description'] ?? '';
                  setState(() {
                    Task.updateTask(id, title, description, value.toString())
                        .catchError((error) {
                      Fluttertoast.showToast(
                          msg: "Update failed: $error",
                          toastLength: Toast.LENGTH_LONG,
                          gravity: ToastGravity.SNACKBAR,
                          backgroundColor: Colors.black54,
                          textColor: Colors.white,
                          fontSize: 14.0);
                    });
                    task?['solved'] = value;
                  });
                },
              ),
              title: SelectableText(
                task?['title'] ?? '',
                style: task?['solved'] == true
                    ? TextStyle(decoration: TextDecoration.lineThrough)
                    : null,
              ),
              subtitle: SelectableText(task?['description'] ?? '',
                  style: task?['solved'] == true
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
                      String taskId = task?['_id'] ?? '';
                      String taskName = task?['title'] ?? '';
                      String taskDescription = task?['description'] ?? '';
                      Future.delayed(Duration.zero, () {
                        showDialog(
                          context: context,
                          builder: (context) => UpdateTaskAlertDialog(
                              taskId: taskId,
                              taskName: taskName,
                              taskDescription: taskDescription),
                        );
                      });
                    },
                  ),
                  PopupMenuItem(
                    value: 'delete',
                    child: Text('Delete'),
                    onTap: () {
                      String taskId = task?['_id'] ?? '';
                      String taskName = task?['title'] ?? '';
                      Future.delayed(Duration.zero, () {
                        showDialog(
                          context: context,
                          builder: (context) => DeleteTaskDialog(
                              taskId: taskId, taskName: taskName),
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
