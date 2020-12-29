/*
* dependencies
* */
var express = require("express");
var router = express.Router();
var Fruit = require("../models/fruits");
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
var seedRoute = "/seed";
var idRoute = "/:id";
var editRoute = "/:id/edit";
//------------------ get routes (read) ---------------------
// app.get();
// show all items
router.get(itemsRoute, function (request, response) {
    console.log(itemsRoute);
    console.log(request);
    Fruit.find({}, function (error, allFruits) {
        response.render("main/index.ejs", {
            fruits: allFruits
        });
    });
});
// create new items
router.get(newRoute, function (request, response) {
    response.render("main/new.ejs");
});
// seed items
router.get(seedRoute, function (request, response) {
    // create something
    Fruit.create(theSeed, function (error, data) {
        if (error)
            throw error;
        response.redirect("/fruits");
    });
});
// show a specific item
router.get(idRoute, function (request, response) {
    var id = request.params.id;
    // display an item
    Fruit.findById(id, function (error, foundFruit) {
        if (error)
            throw error;
        response.render("main/show.ejs", {
            fruit: foundFruit
        });
    });
});
// edit an item
router.get(editRoute, function (request, response) {
    var id = request.params.id;
    Fruit.findById(id, function (error, foundFruit) {
        response.render("main/edit.ejs", {
            fruit: foundFruit
        });
    });
});
//------------------ post routes (create) ---------------------
router.post(itemsRoute, function (request, response) {
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
        // response.send(createdFruit);
        response.redirect("/fruits");
    });
});
//------------------ put routes (update) ---------------------
router.put(idRoute, function (request, response) {
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
router["delete"](idRoute, function (request, response) {
    var id = request.params.id;
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
module.exports = router;
