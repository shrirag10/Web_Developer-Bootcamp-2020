var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware/index");
const { Router } = require("express");


// INDEX ROUTE
router.get("/",function(req,res){
    // Getting data from the database

    Campground.find( {},function(err,allcampgrounds){
        if(err){
            console.log("Something went wrong!!");
            console.log(err);
        } else {
            
            console.log("Retrieving Data...");
            res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user});
        }   
    });
    


});
// CREATE ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
                }
    var newCampground={name:name,image:image,description:desc,author:author}   
   
    Campground.create(newCampground,function(err,newlyCreated)
            {
                if(err){
                    console.log("Something went wrong!!");
                    console.log(err);
            } else 
            {    
                // redirecting to campgrounds
                req.flash("success","Campground created successfully");
                res.redirect("/campgrounds");
   
            }
    });
 });
// NEW ROUTE 
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new.ejs");
});

//SHOW ROUTE 
router.get("/:id",function(req,res){
// find the campground with provided id 
Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err)
    {
        console.log("Error occured!!!");
        console.log(err);
    } else 
    {
        res.render("campgrounds/show",{campground:foundCampground});

    }     
    
});
  
});
// EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwner,function(req,res){
   
        Campground.findById(req.params.id,function(err,foundCampground)
        {
             res.render("campgrounds/edit",{campground:foundCampground});

        });
     
});
// UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwner,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err)
        {
            res.redirect("/campgrounds");
        } else
        {   req.flash("success","Campground updated successfully");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

// DELETE ROUTE
router.delete("/:id",middleware.checkCampgroundOwner,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deleteCampground){
        if(err)
        {
            res.redirect("/campgrounds");
            console.log(err);

        } else
        {   req.flash("success","Campground deleted successfully");
            res.redirect("/campgrounds");   
        }
    });
});





module.exports=router;