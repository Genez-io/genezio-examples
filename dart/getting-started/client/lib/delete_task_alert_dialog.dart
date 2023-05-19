import 'package:flutter/material.dart';

import 'package:todo_list/sdk/task_service.dart';

class DeleteTaskDialog extends StatefulWidget {
  final String token;
  final String taskId, taskName;

  const DeleteTaskDialog(
      {Key? key,
      required this.token,
      required this.taskId,
      required this.taskName})
      : super(key: key);

  @override
  State<DeleteTaskDialog> createState() => _DeleteTaskDialogState();
}

class _DeleteTaskDialogState extends State<DeleteTaskDialog> {
  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    return AlertDialog(
      title: const Text('Delete Task',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 16,
            color: Colors.red,
          )),
      content: SizedBox(
        height: height * 0.15,
        width: width * 0.7,
        child: Form(
          child: Column(
            children: <Widget>[
              const Text(
                'Are you sure you want to delete this task?',
                style: TextStyle(fontSize: 14),
              ),
              const SizedBox(height: 15),
              Text(
                widget.taskName.toString(),
                style:
                    const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 15),
            ],
          ),
        ),
      ),
      actions: [
        ElevatedButton(
          onPressed: () {
            Navigator.of(context, rootNavigator: true).pop();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.grey,
          ),
          child: const Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            TaskService.deleteTask(widget.token, widget.taskId).then((_) {
              // Create a snackbar to show a message to the user.
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Task deleted'),
                  backgroundColor: Colors.green,
                ),
              );
              Navigator.popAndPushNamed(context, "/");
            }).catchError((error) {
              // Create a snackbar to show a message to the user.
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Error deleting task'),
                  backgroundColor: Colors.red,
                ),
              );
            });
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.deepPurple,
          ),
          child: const Text('Delete'),
        ),
      ],
    );
  }
}
