const { models } = require("mongoose");

const mongoose=require("mongoose");
const campSchema=mongoose.Schema({
    name:String,
    image:String,
    desc:String
});
module.exports=mongoose.model("campground",campSchema);
