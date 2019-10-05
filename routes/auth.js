const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    console.log("parameters: ", req.body);
    res.send('This is the auth resource');
});

module.exports = router;