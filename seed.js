const mongoose=require("mongoose");
const campground=require("./models/campground");
const comment=require("./models/comment");

const data=[
    {
        name:"Kedarnath",
        image:"https://images.unsplash.com/photo-1571328565610-56f07b8bf3ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc:"Kedarnath is a town in the Indian state of Uttarakhand, which has gained importance because of Kedarnath Temple. It is a Nagar Panchayat in Chamoli district. The most remote of the four Chota Char Dham sites, Kedarnath is located in the Himalayas, about 3,583 m above sea level."
    },
    {
        name:"Badrinath",
        image:"https://images.unsplash.com/photo-1571328565610-56f07b8bf3ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc:"Kedarnath is a town in the Indian state of Uttarakhand, which has gained importance because of Kedarnath Temple. It is a Nagar Panchayat in Chamoli district. The most remote of the four Chota Char Dham sites, Kedarnath is located in the Himalayas, about 3,583 m above sea level."
    },
    {
        name:"Nath",
        image:"https://images.unsplash.com/photo-1571328565610-56f07b8bf3ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc:"Kedarnath is a town in the Indian state of Uttarakhand, which has gained importance because of Kedarnath Temple. It is a Nagar Panchayat in Chamoli district. The most remote of the four Chota Char Dham sites, Kedarnath is located in the Himalayas, about 3,583 m above sea level."
    }
];
function seeddb(){
    //Remove all campgrounds
    campground.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed campgrounds!");
          //add a few campgrounds
         data.forEach(function(seed){
             campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err)
                 } else {
                     console.log("added a campground");
                     //create a comment
                     comment.create(
                         {
                             text: "This place is great, but I wish there was internet",
                             author: "Homer"
                         }, function(err, comment){
                             if(err){
                                 console.log(err);
                             } else {
                                 campground.comments.push(comment);
                                 campground.save();
                                 console.log("Created new comment");
                             }
                         });
                 }
             });
         });
     }); 
     //add a few comments
 }
module.exports=seeddb;