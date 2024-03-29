import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  solved: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const TaskModel = mongoose.models.FlutterTask || mongoose.model("flutter-tasks", taskSchema);
