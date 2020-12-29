/*
* dependencies
* */
const mongoose = require("mongoose");

/*
* schema
* */
const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean
});

/*
* model
* */
const Fruit = mongoose.model("Fruit", fruitSchema);

/*
* export
* */
module.exports = Fruit;