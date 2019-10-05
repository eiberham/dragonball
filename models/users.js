const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    profile: Number
});

mongoose.model('users', UserSchema, 'users');