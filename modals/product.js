const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    owner:{
       required:true,
       type:String, 
    },
    price:{
        required:true,
        type:Number,
    },
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    images:[{
        type:String,
        required:true,
    }],
    ratings:{
        type:Number,
        default:0,
    },
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
});
const Product=mongoose.model("products",productSchema);
module.exports=Product;