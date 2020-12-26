/*
* dependencies
* */
// object relational mapper to connect mongo db and nodejs
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

/*
* create schema
* */
// user blueprint
const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    profile: {
        name: { type: String, default: "" },
        picture: { type: String, default: "" }
    },
    address: String,
    history: [{
        date: Date,
        paid: { type: Number, default: 0 },
        // item: { type: Schema.Types.ObjectId, ref:"" }
    }]
});


/*
* export
* */
const User = mongoose.model("User", UserSchema);
module.exports = User;