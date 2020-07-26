// Frameworks included
var express   =require("express");
var app       =express();
var bodyParser=require("body-parser");
var mongoose  =require("mongoose");
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comment")


// APP CONFIG
app.set("view engine","ejs");  
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/yelp_campv4", { useNewUrlParser: true ,useUnifiedTopology: true});

// Seed data 
seedDB();

// Routes
app.get("/",function(req,res){
    res.render("landing");
});
// INDEX ROUTE
app.get("/campgrounds",function(req,res){
    // Getting data from the database
    Campground.find( {},function(err,allcampgrounds){
        if(err){
            console.log("Something went wrong!!");
            console.log(err);
        } else {
            console.log("Retrieving Data...");
            res.render("campgrounds",{campgrounds:allcampgrounds});
        }
    });
    


});
// CREATE ROUTE
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

//SHOW ROUTE 
app.get("/campgrounds/:id",function(req,res){
// find the campground with provided id 
Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err)
    {
        console.log("Error occured!!!");
        console.log(err);
    } else 
    {
        res.render("show",{campground:foundCampground});

    }     
    
});
    
});


// Server opening
app.listen(3000, function() {
    console.log("Web server has been started Press ctrl + C to Exit ");
    console.log("Serving at 3000");

} );