/*
* dependencies
* */
// object relational mapper to connect mongo db and nodejs
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
/*
* create schema
* */
// user blueprint
var UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    profile: {
        name: { type: String, "default": "" },
        picture: { type: String, "default": "" }
    },
    address: String,
    history: [{
            date: Date,
            paid: { type: Number, "default": 0 }
        }]
});
/*
* export
* */
var User = mongoose.model("User", UserSchema);
module.exports = User;
