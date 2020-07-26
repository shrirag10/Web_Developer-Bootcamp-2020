// Frameworks included
var express=require("express");
var app=express();
// This command is used to set the default lookup extension for render mthd as ejs
app.set("view engine","ejs");  
// This command is used to add public directory to express explicitly
app.use(express.static("public"));
// Campgrounds array created for temp 
//This package is included in order to get the value of the input in form tag 
var bodyParser=require("body-parser");
// This command is used to tell express to use body parser package 
app.use(bodyParser.urlencoded({extended:true}));
var campgrounds=[
    {name:"Salmon Creek" ,image:"https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Mountain Viewpoint" ,image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"The great ranch cabin " ,image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Mountain Viewpoint" ,image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"The great ranch cabin " ,image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"Mountain Viewpoint" ,image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name:"The great ranch cabin " ,image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
];
// Routes
app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
res.render("campgrounds",{campgrounds:campgrounds});

});

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name:name,image:image}   
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    });

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});


// Server opening
app.listen(3000, function() {
    console.log("Web server has been started Press ctrl + C to Exit ");
    console.log("Serving at 3000");

} );