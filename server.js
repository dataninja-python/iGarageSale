/*
* dependencies
* */
var express = require("express");
var morgan = require("morgan");
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
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOveride("_method"));
/*
* routes
* */
//------------------ get routes ---------------------
// landing page
app.get("/", function (req, res) {
    var name = "iGarageSale";
    res.json("Welcome to " + name);
    // res.send("Hello World");
});
app.get("/igs", function (req, res) {
    var test = "testing 123";
    res.json("" + test);
});
//------------------ post routes ---------------------
// app.post();
//------------------ put routes ---------------------
// app.put();
//------------------ delete routes ---------------------
// app.delete();
/*
* listening server port
* */
// e = error
app.listen(PORT, function (e) {
    if (e) {
        throw (e);
    }
    console.log("Server running on port: ", PORT);
});
