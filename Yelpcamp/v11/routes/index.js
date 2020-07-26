var express=require("express");
var router=express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// Default route
router.get("/",function(req,res){
    res.render("landing");
});
// Contact route 
router.get("/contact",function(req,res){
    res.render("contact");
});

// Show register form
router.get("/register", function(req, res){
    res.render("register"); 
 });
 //Handle sign up logic
router.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
          }
         passport.authenticate("local")(req, res, function()
         {
            req.flash("success","Welcome to Yelpcamp "+user.username);
            res.redirect("/campgrounds"); 
         });
     });
 });
 
 // Show login form
router.get("/login", function(req, res){
    res.render("login"); 
 });
 // Handling login logic
router.post("/login", passport.authenticate("local", 
     {   
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
     }), function(req, res){
 });
 
 // Logout route
router.get("/logout", function(req, res){

    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
 });
 

 module.exports=router;