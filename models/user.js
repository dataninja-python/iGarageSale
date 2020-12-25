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
* hash password
* */
// hash password before saving to db for better security
UserSchema.pre("save", function (next) {
    // used let instead of const here because unsure if reference needs to change
    var user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, function (e, salt) {
        if (e) {
            return next(e);
        }
        ;
        bcrypt.hash(user.password, salt, null, function (e, hash) {
            if (e) {
                return next(e);
            }
            user.password = hash;
            next();
        });
    });
});
/*
* password comparison
* */
// create a custom method to compare user and db passwords
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
/*
* export
* */
module.exports = mongoose.model("User", UserSchema);
