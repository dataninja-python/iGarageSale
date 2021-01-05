/*
* dependencies
* */
const express = require("express");
const Electronics = require("../models/electronics_model.js");
const electronics = express.Router();

const electronicsSeed = [
    {
        name:"GO2",
        brand:"JBL",
        color:"Blue",
        quantity:3,
        price:0,
        image:""
    },
    {
        name:"GO2",
        brand:"JBL",
        color:"Black",
        quantity:3,
        price:0,
        image:""
    },
    {
        name:"GO2",
        brand:"JBL",
        color:"Red",
        quantity:3,
        price:0,
        image:""
    }
];

/*
* routes
* */
// variables
const itemsRoute = "/";
const newRoute = "/new";
const seedRoute = "/setup/seed";
const idRoute = "/:id";
const editRoute = "/:id/edit";

/*
* authentication
* */
// const isAuthenticated = function (request, response, next) {
//     if (request.session.currentUser) {
//         return next();
//     } else {
//         response.redirect("/sessions/new");
//     }
// }


//------------------ get routes (read) ---------------------


// show all items on index page
electronics.get(itemsRoute, function (request, response){
    // console.log(itemsRoute);
    // console.log(request);
    Electronics.find({}, function (error, allElectronics) {
        response.render("electronics/index.ejs", {
            electronics: allElectronics,
            currentUser: request.session.currentUser
        });
    });
});

// create new items
electronics.get(newRoute, function (request, response){
    response.render(
        "electronics/new.ejs", {
            currentUser: request.session.currentUser
        });
});

// seed items
electronics.get(seedRoute, function (request, response){
    // create something
    Electronics.create(
        electronicsSeed,
        function(error, data) {
            if (error) throw error;
            response.redirect("/electronics");
        });
});

// show a specific item
electronics.get(idRoute, function (request, response) {
    let id = request.params.id;
    // display an item
    Electronics.findById(id, function (error, foundElectronic) {
        if (error) throw error;
        response.render("electronics/show.ejs", {
            electronic: foundElectronic,
            currentUser: request.session.currentUser
        });
    });
});


// edit an item
electronics.get(editRoute, function (request, response) {
    let id = request.params.id;
    Electronics.findById(id, function (error, foundElectronic) {
        response.render(
            "electronics/edit.ejs",
            {
                electronic: foundElectronic,
                currentUser: request.session.currentUser
            }
        );
    });
});

//------------------ post routes (create) ---------------------
electronics.post(itemsRoute, function (request, response) {
    let body = request.body;
    Electronics.create(body, function (error, createdFruit) {
        if (error) throw error;
        console.log(`${createdFruit} created`);
        // response.send(createdFruit);
        response.redirect("/electronics");
    });
});


//------------------ put routes (update) ---------------------
electronics.put(idRoute, function (request, response) {
    let body = request.body;
    let id = request.params.id;
    Electronics.findByIdAndUpdate(id, body, {new:true}, function (error, updatedModel) {
        if (error) throw error;
        response.redirect("/electronics");
    });
});

//------------------ delete routes (delete) ---------------------
// delete an item
electronics.delete(idRoute, function (request, response, deletedElectronic) {
    let id = request.params.id;
    console.log(`${deletedElectronic} deleted`)
    // remove this item
    Electronics.findByIdAndRemove(id, function (error, data) {
        if (error) throw error;
        response.redirect("/electronics");
    });
});



/*
* router
* */
module.exports = electronics;