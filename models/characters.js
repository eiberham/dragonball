const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    description: String,
    avatar: String
});

mongoose.model('characters', CharacterSchema, 'characters');