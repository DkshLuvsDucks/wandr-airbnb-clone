const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const {saveRedirectUrl} = require("../middlewares.js");

// Sign Up
router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Registeration successful - Welcome to Wandr!");
            res.redirect("/listings");
        })
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

// Log In
router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login",
    saveRedirectUrl, 
    passport.authenticate("local", {
        failureRedirect: "/login", 
        failureFlash: true
    }),
    async (req, res) => {
    req.flash("success", "Welcome back to Wandr!");
    const redirectUrl = res.locals.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
});

// Log Out
router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    })
});

module.exports = router;