/*
* dependencies
* */
const express = require("express");
const methodOveride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();

/*
* port
* */
const PORT = process.env.PORT || 3003;

/*
* database
* */
const MONGODB_URI = process.env.MONGODB_URI;

// ------------------------------------------------
// config db
// ------------------------------------------------
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

db.on("error", function (e) {
    console.log(e.message + " is Mongod not running?");
});
db.on("connected", function () {
    console.log(`mongo connected: ${MONGODB_URI}`);
});
db.on("disconnected", function () {
    console.log("mongo disconnected");
});

/*
* middleware
* */
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOveride("_method"));


/*
* routes
* */
app.get("/", function (req, res) {
    res.send("Hello World");
});

/*
* listening server port
* */
app.listen(PORT, function () {
    console.log("Listening on port: ", PORT);
});