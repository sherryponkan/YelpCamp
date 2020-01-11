var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("comments/new", {campground: campground});
    })
});

//Comments Create
router.post("/", middleware.isLoggedIn,function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "You've created a new comment!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});


router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){

    Comment.findById(req.params.comment_id, function(err, comment){
        res.render("comments/edit", {campground_id: req.params.id, comment: comment});
    })
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, edited){
        req.flash("success", "Changed your comment!");
        res.redirect("/campgrounds/"+req.params.id);
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        req.flash("success", "Comment deleted!");
        res.redirect("/campgrounds/"+req.params.id);
    });
});


module.exports = router;
