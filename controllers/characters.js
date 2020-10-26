
const redis = require("redis");
const config = require("../config");
const client = redis.createClient({ host: config.redis.host });
const mongoose = require("mongoose");

const Characters = mongoose.model("characters");

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            client.get("characters", (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Characters.find({}, (err, characters) => {
                        if (err) reject(err);
                        client.setex(
                            "characters",
                            process.env.REDIS_EXP_TIME,
                            JSON.stringify(characters)
                        );
                        resolve(characters);
                    });
                }
            });
        })
    },
    get: (name) => {
        return new Promise((resolve, reject) => {
            client.get(name, (err, result) => {
                if (err) reject(err);
                if (result) {
                    resolve(JSON.parse(result));
                } else {
                    Characters.findOne(
                        { name: { $regex: new RegExp(`^${name}`, "i") } },
                        (err, character) => {
                            if (err) reject(err);
                            client.setex(
                                name,
                                process.env.REDIS_EXP_TIME,
                                JSON.stringify(character)
                            );
                            resolve(character);
                        }
                    );
                }
            });
        })
    },
    create: (name, description, avatar) => {
        return new Promise((resolve, reject) => {
            Characters.create(
                {
                    name,
                    description,
                    avatar
                },
                (err, character) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource created"
                    });
                }
            );
        })
    },
    update: (id, body) => {
        return new Promise((resolve, reject) => {
            Characters.findOneAndUpdate(
                { _id: id },
                { ...body },
                { upsert: true },
                (err, character) => {
                    if (err) reject(err);
                    resolve({
                        message: "Resource updated"
                    });
                }
            );
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            Characters.deleteOne({ _id: id }, (err, character) => {
                if (err) reject(err);
                resolve({
                    message: "Resource deleted"
                });
            });
        })
    }
}