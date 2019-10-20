const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    description: String,
    avatar: String
});

CharacterSchema.pre('find', () => {
    console.log("characters were queried");
});

CharacterSchema.post('save', () => {
    // TODO: send mail
    console.log("characters were saved");
});

mongoose.model('characters', CharacterSchema, 'characters');