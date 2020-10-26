
const redis = require("redis");
const config = require("../config");
const client = redis.createClient({ host: config.redis.host });
const mongoose = require("mongoose");

const Films = mongoose.model("films");

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {

        })
    },
    get: (name) => {
        return new Promise((resolve, reject) => {

        })
    },
    create: (name, description, avatar) => {
        return new Promise((resolve, reject) => {

        })
    },
    update: (id, body) => {
        return new Promise((resolve, reject) => {

        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {

        })
    }
}