const express = require("express");
const { check, body } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

const validate = require("../middleware/validate");

const sagas = require('../controllers/sagas');

router.get("/", async (req, res) => {
    try {
        const response = await sagas.getAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({
            message: error
        });
    }
});

router.get("/:name", async (req, res) => {
    const { name } = req.params;

    try {
        const response = await sagas.get(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({
            message: error
        });
    }
});

router.post(
    "/",
    [
        auth,
        validate([
            body("name").isAlphanumeric(),
            body("description").isString(),
            body("image")
                .isString()
                .isURL()
        ])
    ],
    async (req, res) => {
        const { name, description, image } = req.body;

        try {
            const response = await sagas.create(name, description, image);
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({
                message: error
            });
        }
    }
);

router.delete(
    "/:id",
    [auth, validate([check("id").isAlphanumeric()])],
    async (req, res) => {
        const { id } = req.params;
        
        try {
            const response = await sagas.delete(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(422).json({
                message: err
            });
        }
    }
);

module.exports = router;
