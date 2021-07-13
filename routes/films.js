const express = require("express");
const { check, body } = require("express-validator");

const router = express.Router();
const auth = require("../middleware/auth");

const validate = require("../middleware/validate");

const films = require("../controllers/films");

router.get("/", async (req, res) => {
    try {
        const response = await films.getAll();
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
        const response = await films.get(name);
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
            body("title").isAlphanumeric(),
            body("description").isString(),
            body("movies").exists(),
            body("cover")
                .isString()
                .isURL()
        ])
    ],
    async (req, res) => {
        const { title, description, movies, cover } = req.body;

        try {
            const response = await films.create(
                title,
                description,
                movies,
                cover
            );
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
            const response = await films.delete(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(422).json({
                message: err
            });
        }
    }
);

module.exports = router;
