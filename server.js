/*
* dependencies
* */
var express = require("express");
var methodOveride = require("method-override");
// object relational mapper to connect mongo db and nodejs
var mongoose = require("mongoose");
var session = require("express-session");
/*
* configuration
* */
require("dotenv").config();
var app = express();
var db = mongoose.connection;
var PORT = process.env.PORT || 3003;
var MONGODB_URI = process.env.MONGODB_URI;
/*
* middleware
* */
app.use(methodOveride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET
}));
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
    console.log("MonGOD connected at: " + MONGODB_URI);
});
db.on("error", function (error) {
    console.log(error.message + " is Mongod not running?");
});
db.on("connected", function () {
    console.log("mongo connected: " + MONGODB_URI);
});
db.on("disconnected", function () {
    console.log("mongo disconnected");
});
/*
* controller
* */
var fruitsController = require("./controllers/fruits_controller.js");
app.use("/fruits", fruitsController);
var userController = require("./controllers/users_controller.js");
app.use("/users", userController);
var sessionsController = require("./controllers/sessions_controller.js");
app.use("/sessions", sessionsController);
/*
* listening server port
* */
app.listen(PORT, function (error) {
    if (error)
        throw (error);
    console.log("listening...");
});
// const cookieParser = require("cookie-parser");
// const flash = require("express-flash");
// const MongoStore = require("connect-mongo")(session);
// const passport = require("passport");
// const Fruit = require("./models/fruits");
// add additional user logging functionality
// const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const User = require("./models/user");
// const ejs = require("ejs");
// const engine = require("ejs-mate");
// may need to replace with express-session
// app.use(express.static(__dirname + "/public"));
// app.use(morgan("dev"));
// app can now parse json data using bodyParser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(express.json());
// app.use(cookieParser());
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// app.engine("ejs", engine);
// app.set("view engine", "ejs");
// const mainRoutes = require("./routes/main");
// const userRoutes = require("./routes/user");
// app.use(mainRoutes);
// app.use(userRoutes);
