const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title: String,
    description: String,
    movies: [{ 
        type: String
    }],
    cover: String
});

mongoose.model('films', FilmSchema, 'films');