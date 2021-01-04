
/*
* dependencies
* */
const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user_model.js");

/*
* routes
* */
sessions.get("/new", function (request, response) {
    response.render("sessions/new.ejs", {currentUser: request.session.currentUser});
});

// login functionality
sessions.post("/", function(request, response) {
    // lookup username
    User.findOne({ username: request.body.username }, function (error, foundUser) {
        // if error with database stop
        if(error) {
            console.log(error);
            response.send("database related problem. contact database administrator.");
        } else if (!foundUser) {
            // if user is not found
            // [x] todo: may be an error in referring to a home page here. test it.
            response.send(`<a href="/fruits">Sorry, no user found</a>`);
        } else {
            // valid user so check password
            if (bcrypt.compareSync(request.body.password, foundUser.password)) {
                // user session created
                request.session.currentUser = foundUser;
                response.redirect("/fruits");
            } else {
                // !password
                response.send(`<a href="/fruits">password does not match. try again.</a>`);
            }
        }
    });
});

sessions.delete("/", function (request, response) {
    request.session.destroy(
        function () {
            response.redirect("/fruits");
        });
});

/*
* routes
* */
module.exports = sessions;