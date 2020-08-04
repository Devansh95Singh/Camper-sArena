const express=require("express");
const router=express.Router({mergeParams:true});
const campground=require("../models/campground");
const comment=require("../models/comment");
router.get("/new",isLoggedIn,(req,res)=>{
    campground.findById(req.params.id,(err,campground)=>{
        if(err)
        {
            console.log(err);
        }else{
            res.render("newcomment",{campground:campground});

        }
    });
    

});

router.post("/",isLoggedIn,(req,res)=>{
    campground.findById(req.params.id, (err,campground)=>{
        if(err)
        {
            console.log(err);
        }else{
            comment.create(req.body.comment ,(err,comment)=>{
                if(err)
                {
                    console.log(err);
                }else{
                    comment.createdAt=req.user.createdAt;
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/'+campground._id);
                }

            });
        }

    });

});
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
module.exports=router;