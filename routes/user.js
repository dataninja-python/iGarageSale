// handles all user routes, like login, signup, profile, etc
/*
* dependencies
* */
var router = require("express").Router();
var User = require("../models/user");
var passport = require("passport");
var passportConf = require("../config/passport");
/*
* routes
* */
//------------------ get routes ---------------------
router.get("/signup", function (req, res, next) {
    res.render("accounts/signup", {
        errors: req.flash("errors")
    });
});
router.get("/login", function (req, res) {
    if (req.user)
        return res.direct("/");
    res.render("accounts/login", { message: req.flash("loginMessage") });
});
//------------------ post routes ---------------------
router.post("/signup", function (req, res, next) {
    // create a new user
    var user = new User();
    // store form body as shorter variable
    var body = req.body;
    // add form data to new user object
    user.profile.name = body.name;
    user.email = body.email;
    user.password = body.password;
    // find a user by email in db
    User.findOne({ email: body.email }, function (e, existingUser) {
        // if user already exists tell them else save
        if (existingUser) {
            // console.log(`${body.email} already exists.`);
            req.flash("errors", "Account with that email address already exists");
            return res.redirect("/signup");
        }
        else {
            user.save(function (e, user) {
                if (e)
                    return next(e);
                // res.json("New user created");
                return res.redirect("/");
            });
        }
    });
});
router.post("/login", passport.authenticate("local-login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true
}));
//------------------ put routes ---------------------
//------------------ delete routes ---------------------
/*
* router exports
* */
module.exports = router;
