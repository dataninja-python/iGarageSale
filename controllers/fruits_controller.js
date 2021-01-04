/*
* dependencies
* */
var express = require("express");
var Fruit = require("../models/fruits_model.js");
var fruits = express.Router();
var theSeed = [
    {
        name: "grapefruit",
        color: "pink",
        readyToEat: true
    },
    {
        name: "grape",
        color: "purple",
        readyToEat: false
    },
    {
        name: "avacado",
        color: "green",
        readyToEat: true
    }
];
/*
* routes
* */
// variables
var itemsRoute = "/";
var newRoute = "/new";
var seedRoute = "/setup/seed";
var idRoute = "/:id";
var editRoute = "/:id/edit";
/*
* authentication
* */
var isAuthenticated = function (request, response, next) {
    if (request.session.currentUser) {
        return next();
    }
    else {
        response.redirect("/sessions/new");
    }
};
//------------------ get routes (read) ---------------------
// show all items on index page
fruits.get(itemsRoute, function (request, response) {
    // console.log(itemsRoute);
    // console.log(request);
    Fruit.find({}, function (error, allFruits) {
        response.render("fruits/index.ejs", {
            fruits: allFruits,
            currentUser: request.session.currentUser
        });
    });
});
// create new items
fruits.get(newRoute, function (request, response) {
    response.render("fruits/new.ejs", {
        currentUser: request.session.currentUser
    });
});
// seed items
fruits.get(seedRoute, function (request, response) {
    // create something
    Fruit.create(theSeed, function (error, data) {
        if (error)
            throw error;
        response.redirect("/fruits");
    });
});
// show a specific item
fruits.get(idRoute, function (request, response) {
    var id = request.params.id;
    // display an item
    Fruit.findById(id, function (error, foundFruit) {
        if (error)
            throw error;
        response.render("fruits/show.ejs", {
            fruit: foundFruit,
            currentUser: request.session.currentUser
        });
    });
});
// edit an item
fruits.get(editRoute, function (request, response) {
    var id = request.params.id;
    Fruit.findById(id, function (error, foundFruit) {
        response.render("fruits/edit.ejs", {
            fruit: foundFruit,
            currentUser: request.session.currentUser
        });
    });
});
//------------------ post routes (create) ---------------------
fruits.post(itemsRoute, function (request, response) {
    var body = request.body;
    if (body.readyToEat === "on") {
        body.readyToEat = true;
    }
    else {
        body.readyToEat = false;
    }
    // response.send(body);
    Fruit.create(body, function (error, createdFruit) {
        if (error)
            throw error;
        console.log(createdFruit + " created");
        // response.send(createdFruit);
        response.redirect("/fruits");
    });
});
//------------------ put routes (update) ---------------------
fruits.put(idRoute, isAuthenticated, function (request, response) {
    var body = request.body;
    var id = request.params.id;
    if (body.readyToEat === "on") {
        body.readyToEat = true;
    }
    else {
        body.readyToEat = false;
    }
    Fruit.findByIdAndUpdate(id, body, { "new": true }, function (error, updatedModel) {
        if (error)
            throw error;
        response.redirect("/fruits");
    });
});
//------------------ delete routes (delete) ---------------------
// delete an item
fruits["delete"](idRoute, isAuthenticated, function (request, response, deletedFruit) {
    var id = request.params.id;
    console.log(deletedFruit + " deleted");
    // remove this item
    Fruit.findByIdAndRemove(id, function (error, data) {
        if (error)
            throw error;
        response.redirect("/fruits");
    });
});
/*
* router
* */
module.exports = fruits;
