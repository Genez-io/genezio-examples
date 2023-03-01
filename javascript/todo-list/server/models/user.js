const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
