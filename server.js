const express = require('express');
const app = express();
const port = 3000;

const pretty = require('express-prettify');

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

app.use(pretty({ query: 'pretty' }));

app.set('json spaces', 4);

app.get('/', (req, res, next) => {
    res.send(`Welcome to the dragon ball api, enjoy!`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));