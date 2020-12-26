/*
* dependencies
* */
var express = require("express");
var methodOveride = require("method-override");
// object relational mapper to connect mongo db and nodejs
var mongoose = require("mongoose");
// add additional user logging functionality
var morgan = require("morgan");
var bodyParser = require("body-parser");
var User = require("./models/user");
var ejs = require("ejs");
var engine = require("ejs-mate");
/*
* configuration
* */
require("dotenv").config();
var app = express();
var db = mongoose.connection;
var PORT = process.env.PORT || 3003;
var MONGODB_URI = process.env.MONGODB_URI;
/*
* database
* */
// ------------------------------------------------
// config db
// ------------------------------------------------
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, function () {
    console.log("Mongod connection established at: " + MONGODB_URI);
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
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
// app can now parse json data using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOveride("_method"));
app.engine("ejs", engine);
app.set("view engine", "ejs");
var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/user");
app.use(mainRoutes);
app.use(userRoutes);
/*
* routes
* */
//------------------ get routes ---------------------
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
    else {
        console.log("Server running on port: ", PORT);
    }
});
