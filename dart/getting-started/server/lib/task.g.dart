// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

TaskModel _$TaskModelFromJson(Map<String, dynamic> json) => TaskModel(
      json['id'] as String,
      json['title'] as String,
      json['url'] as String,
      json['token'] as String,
      json['solved'] as String,
      json['date'] as String,
    );

Map<String, dynamic> _$TaskModelToJson(TaskModel instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'url': instance.url,
      'token': instance.token,
      'solved': instance.solved,
      'date': instance.date,
    };
