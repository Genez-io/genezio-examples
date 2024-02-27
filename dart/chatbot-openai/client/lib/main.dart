import 'package:flutter/material.dart';
import 'package:flutter_chat_ui/flutter_chat_ui.dart';
import 'package:flutter_chat_types/flutter_chat_types.dart' as types;
import 'package:uuid/uuid.dart';
import 'package:flutter/cupertino.dart';

import 'package:chat_app/sdk/chat_backend.dart';
import 'package:chat_app/colors.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: ChatPage(
        title: "Full Stack Dart Chat App",
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}

class ChatPage extends StatefulWidget {
  const ChatPage({super.key, required this.title});
  final String title;

  @override
  // ignore: library_private_types_in_public_api
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final _user = const types.User(
    id: '82091008-a484-4a89-ae75-a22bf8d6f3ac',
    lastName: "John",
    firstName: "Doe",
  );
  final _userChatgpt = const types.User(
    id: '82091008-a484-4a89-ae75-a22bf8d6f3ad',
    lastName: "",
    firstName: "Yoda",
  );

  final List<types.Message> _messages = [];

  @override
  void initState() {
    super.initState();
    final first_message = types.TextMessage(
      author: _userChatgpt,
      createdAt: DateTime.now().millisecondsSinceEpoch,
      id: const Uuid().v4(),
      text: "Yoda, my name is. Help you, how can I?",
    );
    _messages.add(first_message);
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
          centerTitle: true,
          backgroundColor: darkPurple,
          actions: [
            IconButton(
              onPressed: () {
                _onIconPressed();
              },
              icon: const Icon(
                Icons.favorite,
                color: Colors.red,
                size: 24.0,
                semanticLabel: 'Show bookmarks',
              ),
              tooltip: "Show bookmarks",
            ),
          ],
        ),
        body: Chat(
          messages: _messages,
          onSendPressed: _handleSendPressed,
          onMessageDoubleTap: _onMessageDoubleTap,
          showUserAvatars: true,
          showUserNames: true,
          user: _user,
          theme: const DefaultChatTheme(
            inputBackgroundColor: darkPurple,
            primaryColor: darkPurple,
            inputBorderRadius: BorderRadius.all(Radius.circular(20)),
            inputMargin: EdgeInsets.all(10),
          ),
        ),
      );

  void _addMessage(types.Message message) {
    setState(() {
      _messages.insert(0, message);
    });
  }

  void _handleSendPressed(types.PartialText message) {
    final textMessage = types.TextMessage(
      author: _user,
      createdAt: DateTime.now().millisecondsSinceEpoch,
      id: const Uuid().v4(),
      text: message.text,
    );

    _addMessage(textMessage);

    // Send prompt to chatGPT
    ChatBackend.askYoda(message.text).then((response) {
      final gptMessage = types.TextMessage(
        author: _userChatgpt,
        createdAt: DateTime.now().millisecondsSinceEpoch,
        id: const Uuid().v4(),
        text: response,
      );
      _addMessage(gptMessage);
    });
  }

  void _onMessageDoubleTap(BuildContext _, types.Message message) async {
    if (message is types.TextMessage) {
      ChatBackend.addBookmark(message.text);
    }
  }

  void _onIconPressed() {
    ChatBackend.getAllBookmarks().then((bookmarks) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            backgroundColor: gray,
            title: const Text("All time favorites"),
            titleTextStyle: const TextStyle(
              color: Colors.black,
              fontSize: 20,
            ),
            content: SingleChildScrollView(
              child: ListBody(
                children: bookmarks
                    .map((bookmark) => Container(
                        decoration: BoxDecoration(
                          color: lightPurple,
                          border: Border.all(
                            color: lightPurple,
                            width: 0.5,
                          ),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        margin: EdgeInsets.all(10),
                        padding: EdgeInsets.all(10),
                        child: Text(bookmark)))
                    .toList(growable: false),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text("Close"),
              ),
            ],
          );
        },
      );
    });
  }
}
