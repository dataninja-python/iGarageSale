/*
* dependencies
* */
var bcrypt = require("bcrypt");
var express = require("express");
var users = express.Router();
var User = require("../models/user_model.js");
/*
* routes
* */
users.get("/new", function (request, response) {
    response.render("users/new.ejs", {
        currentUser: request.session.currentUser
    });
});
users.post("/", function (request, response) {
    // let body = request.body;
    // let password = body.password;
    request.body.password = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
    User.create(request.body, function (error, createdUser) {
        console.log("user is created", createdUser);
        response.redirect("/fruits");
    });
});
/*
* export
* */
module.exports = users;
