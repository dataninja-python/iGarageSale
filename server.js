/*
* dependencies
* */
var express = require("express");
var methodOveride = require("method-override");
var mongoose = require("mongoose");
var app = express();
var db = mongoose.connection;
require("dotenv").config();
/*
* port
* */
var PORT = process.env.PORT || 3003;
/*
* database
* */
var MONGODB_URI = process.env.MONGODB_URI;
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
    console.log("mongo connected: " + MONGODB_URI);
});
db.on("disconnected", function () {
    console.log("mongo disconnected");
});
/*
* middleware
* */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOveride("_method"));
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.listen(PORT, function () {
    console.log("Listening on port: ", PORT);
});
