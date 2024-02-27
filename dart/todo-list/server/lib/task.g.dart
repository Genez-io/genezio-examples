// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Task _$TaskFromJson(Map<String, dynamic> json) => Task(
      json['id'] as String,
      json['title'] as String,
      json['url'] as String,
      json['token'] as String,
      json['solved'] as bool,
      DateTime.parse(json['date'] as String),
    );

Map<String, dynamic> _$TaskToJson(Task instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'url': instance.url,
      'token': instance.token,
      'solved': instance.solved,
      'date': instance.date.toIso8601String(),
    };

GetTasksResponse _$GetTasksResponseFromJson(Map<String, dynamic> json) =>
    GetTasksResponse(
      json['success'] as bool,
      (json['tasks'] as List<dynamic>)
          .map((e) => Task.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$GetTasksResponseToJson(GetTasksResponse instance) =>
    <String, dynamic>{
      'success': instance.success,
      'tasks': instance.tasks,
    };

GetTaskResponse _$GetTaskResponseFromJson(Map<String, dynamic> json) =>
    GetTaskResponse(
      json['success'] as bool,
      Task.fromJson(json['task'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$GetTaskResponseToJson(GetTaskResponse instance) =>
    <String, dynamic>{
      'success': instance.success,
      'task': instance.task,
    };

UpdateTaskResponse _$UpdateTaskResponseFromJson(Map<String, dynamic> json) =>
    UpdateTaskResponse(
      json['success'] as bool,
    );

Map<String, dynamic> _$UpdateTaskResponseToJson(UpdateTaskResponse instance) =>
    <String, dynamic>{
      'success': instance.success,
    };

DeleteTaskResponse _$DeleteTaskResponseFromJson(Map<String, dynamic> json) =>
    DeleteTaskResponse(
      json['success'] as bool,
    );

Map<String, dynamic> _$DeleteTaskResponseToJson(DeleteTaskResponse instance) =>
    <String, dynamic>{
      'success': instance.success,
    };
