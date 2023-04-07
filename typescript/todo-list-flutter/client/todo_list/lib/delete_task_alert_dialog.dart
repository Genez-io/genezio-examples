import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

import 'package:todo_list/sdk/task.dart';

class DeleteTaskDialog extends StatefulWidget {
  final String taskId, taskName;

  const DeleteTaskDialog(
      {Key? key, required this.taskId, required this.taskName})
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
            Task.deleteTask(widget.taskId).then((_) {
              Fluttertoast.showToast(
                  msg: "Task deleted successfully",
                  toastLength: Toast.LENGTH_LONG,
                  gravity: ToastGravity.BOTTOM,
                  backgroundColor: Colors.black54,
                  textColor: Colors.white,
                  fontSize: 14.0);
              Navigator.popAndPushNamed(context, "/");
            }).catchError((error) {
              Fluttertoast.showToast(
                  msg: "Delete failed: $error",
                  toastLength: Toast.LENGTH_LONG,
                  gravity: ToastGravity.SNACKBAR,
                  backgroundColor: Colors.black54,
                  textColor: Colors.white,
                  fontSize: 14.0);
            });
            // Navigator.of(context, rootNavigator: true).pop();
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
