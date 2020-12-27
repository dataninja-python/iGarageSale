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
const ejs = require("ejs");
const engine = require("ejs-mate");
// may need to replace with express-session
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");


/*
* configuration
* */
require("dotenv").config();
const app = express();
const db = mongoose.connection;
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

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
        console.log(`Mongod connection established at: ${MONGODB_URI}`);
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
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
// app can now parse json data using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOveride("_method"));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    store: new MongoStore({url: MONGODB_URI, autoReconnect: true}),
}));
app.use(flash());


app.engine("ejs", engine);
app.set("view engine", "ejs");

const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");

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
    if(e) {
        throw(e);
    } else {
        console.log("Server running on port: ", PORT);
    }
});