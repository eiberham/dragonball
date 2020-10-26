const express = require("express");

const router = express.Router();

const { body } = require("express-validator");
const validate = require("../middleware/validate");

const auth = require('../controllers/auth');

router.post(
    "/",
    [
        validate([
            body("user")
                .not()
                .isEmpty()
                .trim()
                .escape()
                .exists(),
            body("password")
                .not()
                .isEmpty()
                .trim()
                .escape()
                .exists()
        ])
    ],
    async (req, res) => {
        const username = req.body.user;
        const { password } = req.body;

        try {
            const response = await auth.login(username, password)
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({
                message: error
            });
        }
    }
);

module.exports = router;
