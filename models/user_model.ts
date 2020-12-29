/*
* dependencies
* */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* schema
* */
const userSchema = Schema({
    username: { type: String, unique: true, required: true },
    password: String
});

/*
* model
* */
const User = mongoose.model("User", userSchema);

/*
* export
* */
module.exports = User;