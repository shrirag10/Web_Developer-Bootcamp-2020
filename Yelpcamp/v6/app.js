var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
    mongoose.connect("mongodb://localhost:27017/yelp_campv6", { useNewUrlParser: true ,useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

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
            res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user});
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
    res.render("campgrounds/new.ejs");
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
        res.render("campgrounds/show",{campground:foundCampground});

    }     
    
});
    
});

// ===========================================================
// COMMENTS ROUTES
// ===========================================================
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
        } else 
        {
            res.render("comments/new",{campground:campground});
        }

    });


});

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        } else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }

    });
});
// ======================================================
// AUTH ROUTES
// ======================================================

// show register form
app.get("/register", function(req, res){
    res.render("register"); 
 });
 //handle sign up logic
 app.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
              res.redirect("/register");
         }
         passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds"); 
         });
     });
 });
 
 // show login form
 app.get("/login", function(req, res){
    res.render("login"); 
 });
 // handling login logic
 app.post("/login", passport.authenticate("local", 
     {
         successRedirect: "/campgrounds",
         failureRedirect: "/login"
     }), function(req, res){
 });
 
 // logic route
 app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
 });
 
 function isLoggedIn(req, res, next){
     
     if(req.isAuthenticated()){
         return next();
     }
     else {
        res.redirect("/login");
     }
    
 }

// Server opening
app.listen(3000, function() {
    console.log("Web server has been started Press ctrl + C to Exit ");
    console.log("Serving at 3000");

} );