const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('This is the list of films');
});

router.get('/:name', (req, res, next) => {
    res.send('this is a single film');
});

module.exports = router;