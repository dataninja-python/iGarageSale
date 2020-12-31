/*
* dependencies
* */
var mongoose = require("mongoose");
/*
* schema
* */
var fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean
});
/*
* model
* */
var Fruit = mongoose.model("Fruit", fruitSchema);
/*
* export
* */
module.exports = Fruit;
