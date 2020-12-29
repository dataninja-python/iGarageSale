/*
* dependencies
* */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
/*
* schema
* */
var userSchema = Schema({
    username: { type: String, unique: true, required: true },
    password: String
});
/*
* model
* */
var User = mongoose.model("User", userSchema);
/*
* export
* */
module.exports = User;
