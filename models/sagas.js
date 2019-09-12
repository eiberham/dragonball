const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SagaSchema = new Schema({
    name: String,
    description: String,
    image: String
});

mongoose.model('sagas', SagaSchema, 'sagas');