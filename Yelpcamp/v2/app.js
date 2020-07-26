// Frameworks included
var express   =require("express");
var app       =express();
var bodyParser=require("body-parser");
var mongoose  =require("mongoose");


app.set("view engine","ejs");  
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true ,useUnifiedTopology: true});

// Schema setup
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String
});
// Data model created based on the schema
var Campground=mongoose.model(" Campground",campgroundSchema);

//  // Creating a new data entry
// Campground.create(
//     {
//         name:"Mountain Viewpoint" 
//         ,image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
//         ,description:"Beautiful hill with a gorgeous city view from atop the hill :)"
//     },function(err,camp)
//             {
//                 if(err){
//                     console.log("Something went wrong!!");
//                     console.log(err);
//             } else 
//             {
//                     console.log("New entry added to the database");
//                     console.log(camp);
//             }
// });


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
Campground.findById(req.params.id,function(err,foundCampground){
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