const express=require("express");
const router=express.Router();
const campground=require("../models/campground");

router.get("/",(req,res)=>{
    
    campground.find({},(err,allCampgrounds)=>{
        if(err){
            console.log("error");
        }else{
            res.render("campground",{campgrounds:allCampgrounds,currentUser:req.user});

        }


    });
    
    

});
router.post("/",isLoggedIn,(req,res)=>{
    const name=req.body.name;
    const image=req.body.image;
    const desc=req.body.desc;
    const author={
        id:req.user._id,
        username:req.user.username
    }

    const addCampground={name:name,image:image,desc:desc,author:author};
    campground.create(addCampground,(err,addnewCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/campground");

        }
    });



});
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("newCamp");
})
router.get("/:id",(req,res)=>{
    campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("show",{campground:foundCampground});
        }

    });
});
router.get("/:id/edit",(req,res)=>{
    campground.findById(req.params.id, (err,foundCampground)=>{
        if(err)
        {
            console.log(err);
        }else{
            res.render("campgroundEdit",{campground:foundCampground});        
        }
    });
    
});
router.put("/:id",(req,res)=>{
    campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updateCampground)=>{
        if(err)
        {
            res.redirect("/campground");
        }else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});
router.delete("/:id",(req,res)=>{
    campground.findByIdAndRemove(req.params.id,(err)=>{
        if(err)
        {
            res.redirect("/campground");
        }else{
            res.redirect("/campground");
        }
    })
})
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}
module.exports=router;