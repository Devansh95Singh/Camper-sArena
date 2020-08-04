const { models } = require("mongoose");

const mongoose=require("mongoose");
const comment=require("./comment");
const campSchema=mongoose.Schema({
    name:String,
    image:String,
    desc:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String

    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
});
module.exports=mongoose.model("campground",campSchema);
