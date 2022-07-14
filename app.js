const express = require("express");
const app = express();
const mongoose = require("mongoose");

require('dotenv').config()
;

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db config
const mongoURI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(mongoURI, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected to mongodb!"));

// routes
const router = require('./routes');
app.use(router);

//error handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// server
const PORT = process.env.PORT || 2075;
app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
