import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import 'package:todo_list/sdk/task_service.dart';

class AddTaskAlertDialog extends StatefulWidget {
  final String token;
  const AddTaskAlertDialog({
    Key? key,
    required this.token,
  }) : super(key: key);

  @override
  State<AddTaskAlertDialog> createState() => _AddTaskAlertDialogState();
}

class _AddTaskAlertDialogState extends State<AddTaskAlertDialog> {
  final TextEditingController taskNameController = TextEditingController();
  final TextEditingController taskDescriptionController =
      TextEditingController();

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    return AlertDialog(
      scrollable: true,
      title: const Text('New Task',
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
            final title = taskNameController.text;
            final description = taskDescriptionController.text;
            TaskService.createTask(widget.token, title, description)
                .then((response) {
              if (!response.success) {
                // Create a snackbar
                final snackBar = SnackBar(
                  content: Text('Error: ${response.err}'),
                  backgroundColor: Colors.red,
                );
                // Show snackbar
                ScaffoldMessenger.of(context).showSnackBar(snackBar);
                Navigator.popAndPushNamed(
                  context,
                  '/',
                );
              } else {
                // Create a snackbar
                final snackBar = SnackBar(
                  content: Text('Task created successfully!'),
                  backgroundColor: Colors.green,
                );
                // Show snackbar
                ScaffoldMessenger.of(context).showSnackBar(snackBar);
                Navigator.popAndPushNamed(
                  context,
                  '/',
                );
              }
            }).catchError((error) {
              // Create a snackbar
              final snackBar = SnackBar(
                content: Text(
                    'Unknon Error: $error Please check the backend logs in the project dashboard - https://app.genez.io.'),
                backgroundColor: Colors.red,
              );
              // Show snackbar
              ScaffoldMessenger.of(context).showSnackBar(snackBar);
              Navigator.popAndPushNamed(
                context,
                '/',
              );
            });
          },
          child: const Text('Save'),
        ),
      ],
    );
  }
}
