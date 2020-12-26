// handles all main routes, like home, product, cart, etc
/*
* dependencies
* */
var router = require("express").Router();
/*
* routes
* */
//------------------ get routes ---------------------
router.get("/", function (req, res) {
    res.render("main/home");
});
router.get("/about", function (req, res) {
    res.render("main/about");
});
//------------------ post routes ---------------------
//------------------ put routes ---------------------
//------------------ delete routes ---------------------
/*
* router exports
* */
module.exports = router;
