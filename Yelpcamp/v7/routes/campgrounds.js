var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");


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
router.post("/",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc}   
    // campgrounds.push(newCampground);
    Campground.create(newCampground,function(err,newlyCreated)
            {
                if(err){
                    console.log("Something went wrong!!");
                    console.log(err);
            } else 
            {       
                // redirecting to campgrounds
                  res.redirect("/campgrounds");
   
            }
    });
 });
// NEW ROUTE 
router.get("/new",function(req,res){
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
module.exports=router;