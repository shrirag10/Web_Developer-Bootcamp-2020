var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name : "Cloud's Rest" , 
        image : "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1988&q=80",
        description : "Beautiful cloudy skies with blissful streams to relax..."
    },
    {
        name : "Mountain viewpoint" , 
        image : "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        description : "Gorgeous view of the Gigantic mountain upfront..."
    },
    {
        name : "The Camp Nou" , 
        image : "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description : "Extra-ordinary relaxing spaces to enjoy with your family :)"
    }
]



function seedDB(){
    Campground.deleteMany({},function(err){
        if(err) {
                console.log(err);
            } 
        console.log("Removed campgrounds!!");
        data.forEach(function(seed){
            Campground.create(seed,function(err,newSeed){
                if(err){
                    console.log(err);
                }
                   
                else
                {
                    console.log("Created campground!");
                    Comment.create({
                        text:"This is a sample comment.",
                        author:"Shrirag"
                    },function(err,comment){
                        if(err)
                            console.log(err);
                        else{
                            newSeed.comments.push(comment);
                            newSeed.save();
                            console.log("Created new comment!!");
                        }
                    });
                }
            });
    
        });
    });
    
}

module.exports = seedDB;