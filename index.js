const express= require("express"),
  app=express(),
  bodyparser=require("body-parser"),
  mongoose=require("mongoose");
  campground=require("./models/campground");
 mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended:true}));


//const campOne=new  campground({name:'GraniteHill',image:'https://images.unsplash.com/photo-1533632359083-0185df1be85d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',desc:'This is  a new campground.'});
//campOne.save().then(()=>console.log(campOne));

 app.set("view engine","ejs");
 //const campgrounds=[
    //{name:"Mountain Rainer",image:"https://images.unsplash.com/photo-1590122401646-5534a84afa13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Wisconsin",image:"https://images.unsplash.com/photo-1590122401646-5534a84afa13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Wisconsin",image:"https://images.unsplash.com/photo-1556942154-006c061d4561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Shimla",image:"https://images.unsplash.com/photo-1565053396207-75ca17bdf99c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Mountain Rainer",image:"https://images.unsplash.com/photo-1545313841-926bbf0fa7d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Wisconsin",image:"https://images.unsplash.com/photo-1545313841-926bbf0fa7d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Shimla",image:"https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Mountain Rainer",image:"https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Wisconsin",image:"https://images.unsplash.com/photo-1527931548997-178c464df936?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //{name:"Shimla",image:"https://images.unsplash.com/photo-1512862413804-7d90a3069054?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
//];

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
    campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:foundCampground});
        }

    });
})


 app.listen(3000);
 console.log("Server has Started");