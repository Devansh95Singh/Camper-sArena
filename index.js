const express= require("express"),
          app=express(),
          bodyparser=require("body-parser"),
          mongoose=require("mongoose"),
          passport=require("passport"),
          localStrategy =require("passport-local"),
          passportLocalMongoose=require("passport-local-mongoose"),
          User=require("./models/user"),
          campground=require("./models/campground"),
          comment=require("./models/comment"),
          seeddb=require("./seed");

  seeddb();
 mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
 app.use(bodyparser.urlencoded({extended:true}));


//const campOne=new  campground({name:'GraniteHill',image:'https://images.unsplash.com/photo-1533632359083-0185df1be85d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',desc:'This is  a new campground.'});
//campOne.save().then(()=>console.log(campOne));
app.use(require("express-session")({
    secret:"hello everyone!!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

 app.set("view engine","ejs");

 app.get("/",(req,res)=>{
     res.render("landing");

 });
app.get("/campground",(req,res)=>{
    campground.find({},(err,allCampgrounds)=>{
        if(err){
            console.log("error");
        }else{
            res.render("campground",{campgrounds:allCampgrounds});

        }


    });
    
    

});
app.post("/campground",(req,res)=>{
    const name=req.body.name;
    const image=req.body.image;
    const desc=req.body.desc;

    const addCampground={name:name,image:image,desc:desc};
    campground.create(addCampground,(err,addnewCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/campground");

        }
    });



});
app.get("/campground/new",(req,res)=>{
    res.render("newCamp");
})
app.get("/campground/:id",(req,res)=>{
    campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("show",{campground:foundCampground});
        }

    });
})

app.get("/campground/:id/comment/new",(req,res)=>{
    campground.findById(req.params.id,(err,campground)=>{
        if(err)
        {
            console.log(err);
        }else{
            res.render("newcomment",{campground:campground});

        }
    });
    

});

app.post("/campground/:id/comment",(req,res)=>{
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
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campground/'+campground._id);
                }

            });
        }

    });

});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",(req,res)=>{
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
app.get("/login",(req,res)=>{
    res.render("login");
})
 app.listen(3000);
 console.log("Server has Started");