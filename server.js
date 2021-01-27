const express = require("express");
const https = require("https");
const chalk = require("chalk");
const fs = require("fs");
const helmet = require("helmet");
const winston = require("winston");
const expresswinston = require("express-winston");

const port = process.env.PORT || 3000;
const pretty = require("express-prettify");
const ratelimit = require("express-rate-limit");
const mongoose = require("mongoose");
const ui = require("swagger-ui-express");
const docs = require("./swagger.json");

const limiter = ratelimit({
    windowMs: 15 * 60 * 100,
    max: 20
});

require("dotenv").config();

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

require("./models/users");
require("./models/characters");
require("./models/sagas");
require("./models/films");

const auth = require("./routes/auth");
const characters = require("./routes/characters");
const sagas = require("./routes/sagas");
const films = require("./routes/films");

const app = express();

app.use(limiter);

app.use(
    expresswinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "http {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute(req, res) {
            return false;
        } // optional: allows to skip some log messages based on request and/or response
    })
);

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.append("Access-Control-Allow-Credentials", "true");
    res.append("Access-Control-Allow-Methods", [
        "GET",
        "OPTIONS",
        "PUT",
        "POST",
        "PATCH",
        "DELETE"
    ]);
    res.append(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token"
    );
    if (req.method === "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(helmet());

app.use(pretty({ query: "pretty" }));

app.set("json spaces", 4);

app.use("/swagger", ui.serve, ui.setup(docs));

app.get("/", (req, res, next) => {
    res.send(`Welcome to the dragon ball api, enjoy!`);
});

app.use("/api/auth", auth);
app.use("/api/characters", characters);
app.use("/api/sagas", sagas);
app.use("/api/films", films);

https
    .createServer(
        {
            key: fs.readFileSync("./certs/key.pem"),
            cert: fs.readFileSync("./certs/cert.pem"),
            passphrase: process.env.TSL_PASSPHRASE
        },
        app
    )
    .listen(port, () => console.log(chalk.blue(`Listening on port ${port}`)));
