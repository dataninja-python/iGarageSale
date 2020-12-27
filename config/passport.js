/*
* dependencies
* */
// adds temporary db middleware
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
/*
* serialialization
* */
// translate user data object into format to be stored in db
passport.serializeUser(function (user, done) {
    var id = user._id;
    done(null, id);
});
// translate from storage back to data object for user usable by program
passport.deserializeUser(function (id, done) {
    User.findById(id, function (e, user) {
        done(e, user);
    });
});
/*
* middleware
* */
passport.use("local-login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({ email: email }, function (e, user) {
        if (e)
            return done(e);
        if (!user) {
            return done(null, false, req.flash("loginMessage", "No user found"));
        }
        if (!user.comparePassword(password)) {
            return done(null, false, req.flash("loginMessage", "Wrong password! Try again."));
        }
        return done(null, user);
    });
}));
/*
* custom function
* */
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }
    else {
        res.redirect("/login");
    }
};
