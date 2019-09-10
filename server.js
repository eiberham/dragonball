const express = require('express');
const helmet = require('helmet');
const port = process.env.PORT || 3000;
const pretty = require('express-prettify');
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});

require('./models/characters');

const characters = require('./routes/characters');

const app = express();

app.use(function(req, res, next){
    res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.append('Access-Control-Allow-Credentials', 'true');
    res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE']);
    res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(helmet());

app.use(pretty({ query: 'pretty' }));

app.set('json spaces', 4);

app.get('/', (req, res, next) => {
    res.send(`Welcome to the dragon ball api, enjoy!`);
});

app.use('/api/characters', characters);

app.listen(port, () => console.log(`Listening on port ${port}`));