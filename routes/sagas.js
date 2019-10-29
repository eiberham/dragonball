const express = require("express");
const redis = require("redis");
const mongoose = require("mongoose");
const { check, body } = require("express-validator");
const config = require("../config");

const client = redis.createClient({ host: config.redis.host });
const router = express.Router();

const Sagas = mongoose.model("sagas");
const auth = require("../middleware/auth");

const validate = require("../middleware/validate");

router.get("/", (req, res) => {
    client.get("sagas", (err, result) => {
        if (err) throw err;
        if (result) {
            res.status(200).json(JSON.parse(result));
        } else {
            Sagas.find({}, (err, sagas) => {
                if (err) throw err;
                client.setex(
                    "sagas",
                    process.env.REDIS_EXP_TIME,
                    JSON.stringify(sagas)
                );
                res.status(200).json(sagas);
            });
        }
    });
});

router.get("/:name", (req, res) => {
    const { name } = req.params;
    client.get(name, (err, result) => {
        if (err) throw err;
        if (result) {
            res.status(200).json(JSON.parse(result));
        } else {
            Sagas.findOne(
                { name: { $regex: new RegExp(`^${name}`, "i") } },
                (err, saga) => {
                    if (err) throw err;
                    client.setex(
                        name,
                        process.env.REDIS_EXP_TIME,
                        JSON.stringify(saga)
                    );
                    res.status(200).json(saga);
                }
            );
        }
    });
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
    (req, res) => {
        const { name, description, image } = req.body;

        Sagas.create(
            {
                name,
                description,
                image
            },
            (err, saga) => {
                if (err) throw err;
                res.status(201).json({
                    message: "Resource created"
                });
            }
        );
    }
);

router.delete(
    "/:id",
    [auth, validate([check("id").isAlphanumeric()])],
    (req, res) => {
        const { id } = req.params;
        Sagas.deleteOne({ _id: id }, (err, saga) => {
            if (err) throw err;
            res.status(200).json({
                message: "Resource deleted"
            });
        });
    }
);

module.exports = router;
