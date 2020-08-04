const express=require("express");
const router=express.Router();
const passport=require("passport");
const User=require("../models/user");


router.get("/",(req,res)=>{
    res.render("landing");

});
router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/signup",(req,res)=>{
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err)
        {
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/campground");
            });
        }
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect:"/campground",
    failureRedirect:"/login"
}) ,(req,res)=>{});
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/");

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