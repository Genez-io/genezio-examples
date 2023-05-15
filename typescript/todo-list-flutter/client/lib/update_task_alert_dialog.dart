import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'package:todo_list/sdk/task_service.dart';

class UpdateTaskAlertDialog extends StatefulWidget {
  final String token;
  final String taskId, taskName, taskDescription;

  const UpdateTaskAlertDialog({
    Key? key,
    required this.token,
    required this.taskId,
    required this.taskName,
    required this.taskDescription,
  }) : super(key: key);

  @override
  State<UpdateTaskAlertDialog> createState() => _UpdateTaskAlertDialogState();
}

class _UpdateTaskAlertDialogState extends State<UpdateTaskAlertDialog> {
  final TextEditingController taskNameController = TextEditingController();
  final TextEditingController taskDescriptionController =
      TextEditingController();

  @override
  Widget build(BuildContext context) {
    taskNameController.text = widget.taskName;
    taskDescriptionController.text = widget.taskDescription;

    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    return AlertDialog(
      scrollable: true,
      title: const Text('Update Task',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 16,
            color: Colors.green,
          )),
      content: SizedBox(
          height: height * 0.35,
          width: width * 0.7,
          child: Form(
            child: Column(children: <Widget>[
              TextFormField(
                controller: taskNameController,
                style: const TextStyle(fontSize: 16),
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 20,
                  ),
                  hintText: 'Task',
                  hintStyle: const TextStyle(fontSize: 14),
                  icon: const Icon(CupertinoIcons.square_list,
                      color: Colors.purple),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
              ),
              const SizedBox(height: 15),
              TextFormField(
                controller: taskDescriptionController,
                style: const TextStyle(fontSize: 16),
                decoration: InputDecoration(
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 20,
                  ),
                  hintText: 'Description',
                  hintStyle: const TextStyle(fontSize: 14),
                  icon: const Icon(CupertinoIcons.square_list,
                      color: Colors.purple),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
              ),
              const SizedBox(height: 15),
            ]),
          )),
      actions: <Widget>[
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
            final id = widget.taskId;
            final title = taskNameController.text;
            final description = taskDescriptionController.text;
            // Nice-to-have: Hardcoded value for solved/status for now.
            // Add a dropdown/checkbox to select solved or not.
            TaskService.updateTask(
              widget.token,
              id,
              title,
              description,
              false,
            ).then((_) {
              // Create a snackbar
              final snackBar = SnackBar(
                content: Text('Task updated'),
                backgroundColor: Colors.green,
              );
              // Show snackbar
              ScaffoldMessenger.of(context).showSnackBar(snackBar);
              Navigator.popAndPushNamed(context, '/');
            }).catchError((error) {
              // Create a snackbar
              final snackBar = SnackBar(
                content: Text('Error: $error'),
                backgroundColor: Colors.red,
              );
              // Show snackbar
              ScaffoldMessenger.of(context).showSnackBar(snackBar);
            });
          },
          child: const Text('Save'),
        ),
      ],
    );
  }
}
