// handles all user routes, like login, signup, profile, etc

/*
* dependencies
* */
const router = require("express").Router();
const User = require("../models/user");


/*
* routes
* */

//------------------ get routes ---------------------
router.get("/signup", function (req, res, next) {
    res.render("accounts/signup");
});

//------------------ post routes ---------------------

router.post("/signup", function(req, res, next) {
    // create a new user
    let user = new User();
    // store form body as shorter variable
    let body = req.body;

    // add form data to new user object
    user.profile.name = body.name;
    user.email = body.email;
    user.password = body.password;

    // find a user by email in db
    User.findOne({ email:body.email }, function(e, existingUser) {
       // if user already exists tell them else save
        if (existingUser) {
            console.log(`${body.email} already exists.`);
            return res.redirect("/signup");
        } else {
            user.save(function(e, user) {
                if(e) return next(e);
                res.json("New user created");
            });
        }
    });
});

//------------------ put routes ---------------------


//------------------ delete routes ---------------------



// router.post("/signup", function(req, res, next) {
//     let user = new User();
//     let body = req.body;
//     // store form collected data in new user
//     user.profile.name = body.name;
//     user.password = body.password;
//     user.email = body.email;
//     // save the user
//     user.save(function(e) {
//         if(e) {
//             return next(e);
//         } else {
//             res.json("new user created successfully!");
//         };
//     });
// });



/*
* router exports
* */
module.exports = router;
