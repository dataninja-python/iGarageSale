/*
* dependencies
* */
const express = require("express");
const methodOveride = require("method-override");
// object relational mapper to connect mongo db and nodejs
const mongoose = require("mongoose");
const session = require("express-session");
const morgan = require("morgan");
const ejs = require("ejs");
const engine = require("ejs-mate");

/*
* configuration
* */
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

/*
* middleware
* */
app.use(methodOveride("_method"));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
}));
app.use(express.json());
app.engine("ejs", engine);
app.set("view engine", "ejs");

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
    },
    function () {
        console.log(`MonGOD connected at: ${MONGODB_URI}`);
    });

db.on("error", function (error) {
    console.log(error.message + " is Mongod not running?");
});
db.on("connected", function () {
    console.log(`mongo connected: ${MONGODB_URI}`);
});
db.on("disconnected", function () {
    console.log("mongo disconnected");
});


/*
* controllers
* */
const fruitsController = require("./controllers/fruits_controller.js");
app.use("/fruits", fruitsController);
const userController = require("./controllers/users_controller.js");
app.use("/users", userController);
const sessionsController = require("./controllers/sessions_controller.js");
app.use("/sessions", sessionsController);
const mainController = require("./controllers/main_controller.js");
app.use("/", mainController);
const electronicsController = require("./controllers/electronics_controller.js");
app.use("/electronics", electronicsController);


/*
* routes
* */
// app.get("/", function (request, response) {
//     let name = "AJ";
//     response.json("My name is " + name);
// });
//
// app.get("/batman", function (request, response) {
//     let name = "Batman";
//     response.json(name);
// });

/*
* listening server port
* */
app.listen(PORT, function (error) {
    if(error) throw(error);
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
// may need to replace with express-session
// app.use(express.static(__dirname + "/public"));
// app can now parse json data using bodyParser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// const mainRoutes = require("./routes/main");
// const userRoutes = require("./routes/user");
// app.use(mainRoutes);
// app.use(userRoutes);