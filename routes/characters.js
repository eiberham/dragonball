const express = require("express");
const { check, body, oneOf, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const characters = require('../controllers/characters');

router.get("/", async (req, res) => {
    try {
        const response = await characters.getAll();
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
        const response = await characters.get(name);
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
            body("avatar")
                .isString()
                .isURL()
        ])
    ],
    async (req, res) => {
        const { name, description, avatar } = req.body;

        try {
            const response = await characters.create(name, description, avatar);
            res.status(200).json(response);
        } catch (error) {
            res.status(401).json({
                message: error
            });
        }
    }
);

router.patch(
    "/:id",
    [
        auth,
        validate([check("id").isAlphanumeric()]),
        oneOf([
            body("name").isString(),
            body("description").isString(),
            body("avatar").isURL()
        ])
    ],
    async (req, res) => {
        try {
            validationResult(req).throw();
            const { id } = req.params;
            const response = await characters.update(id, { ...req.body });
            res.status(200).json(response);
        } catch (err) {
            res.status(422).json({
                message: err
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
            const response = await characters.delete(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(422).json({
                message: err
            });
        }
    }
);

module.exports = router;
