var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "akfbe awif"
    },
    {
        name: "Stary Camping",
        image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "dkfbaie, asfhsbigs, asjghvrisgarwtkrdg"
    },
    {
        name: "Camp With Music",
        image: "https://images.unsplash.com/photo-1495473043751-d6f717fae955?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: "irsitjlkjajbfa, afgbisgeaownr, fidgbrisgetr pitorhydo"
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        console.log("removed campground");
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    Comment.create({
                        text: "This place is great, but I which there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        data.comments.push(comment);
                        data.save();
                        console.log("Created new comment");
                    })
                }
            });
        });
    });

}

module.exports = seedDB;
