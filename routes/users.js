const express = require("express");
const { check, body, oneOf, validationResult } = require("express-validator");

const router = express.Router();
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const users = require("../controllers/users");

router.get("/", async (req, res) => {
    try {
        const response = await users.getAll();
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
        const response = await users.get(name);
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
            body("username").isString(),
            body("name").isString(),
            body("password").isAlphanumeric(),
            body("profile").isNumeric()
        ])
    ],
    async (req, res) => {
        const { username, password, name, profile } = req.body;
        try {
            const response = await users.create(
                username,
                password,
                name,
                profile
            );
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
            body("username").isString(),
            body("name").isString(),
            body("password").isAlphanumeric(),
            body("profile").isNumeric()
        ])
    ],
    async (req, res) => {
        try {
            validationResult(req).throw();
            const { id } = req.params;
            const response = await users.update(id, { ...req.body });
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
            const response = await users.delete(id);
            res.status(200).json(response);
        } catch (err) {
            res.status(422).json({
                message: err
            });
        }
    }
);

module.exports = router;
