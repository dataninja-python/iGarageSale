/*
* dependencies
* */
const express = require("express");
const methodOveride = require("method-override");
// object relational mapper to connect mongo db and nodejs
const mongoose = require("mongoose");
// add additional user logging functionality
const morgan = require("morgan");
const bodyParser = require("body-parser");
const User = require("./models/user");

/*
* configuration
* */
require("dotenv").config();
const app = express();
const db = mongoose.connection;
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
    useFindAndModify: false,
        useCreateIndex: true
},
    function () {
        console.log(`Mongod connection established at: ${MONGODB_URI}`);
});

db.on("error", function (e) {
    console.log(e.message + " is Mongod not running?");
});
// db.on("connected", function () {
//     console.log(`mongo connected: ${MONGODB_URI}`);
// });
db.on("disconnected", function () {
    console.log("mongo disconnected");
});

/*
* middleware
* */
app.use(morgan("dev"));
// app can now parse json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOveride("_method"));


/*
* routes
* */
//------------------ get routes ---------------------
// landing page
// app.get("/", function (req, res) {
//     let name = "iGarageSale";
//     res.json(`Welcome to ${name}`);
//     // res.send("Hello World");
// });
//
// app.get("/igs", function (req, res) {
//     let test = "testing 123";
//     res.json(`${test}`);
// });

app.post("/create-user", function(req, res, next) {
    let user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(e) {
        if(e) {
            return next(e);
        }
        res.json("new user created successfully!");
    });
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
    if(e) {
        throw(e);
    }
    console.log("Server running on port: ", PORT);
});