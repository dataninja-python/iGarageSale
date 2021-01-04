/*
* dependencies
* */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* schema
* */
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: String,
    // email: { type: String, unique: true, required: true}
});

/*
* model
* */
const User = mongoose.model("User", userSchema);

/*
* export
* */
module.exports = User;