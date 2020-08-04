const express= require("express"),
          app=express(),
          bodyparser=require("body-parser"),
          mongoose=require("mongoose"),
          methodOverride=require("method-override"),
          passport=require("passport"),
          localStrategy =require("passport-local"),
          passportLocalMongoose=require("passport-local-mongoose"),
          User=require("./models/user"),
          campground=require("./models/campground"),
          comment=require("./models/comment");
         

const campgroundRoutes=require("./routes/campground");
const commentRoutes=require("./routes/comment");
const authRoutes=require("./routes/auth");          
//seeddb();
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
mongoose.Promise=global.Promise;
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
app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
});
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comment",commentRoutes);
app.use("/",authRoutes);
 app.set("view engine","ejs");


 app.listen(3000);
 console.log("Server has Started");