const mongoose =require("mongoose");
const cartSchema=mongoose.Schema({
    product_type:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:0,
    }
})
const userSchema=mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,
    },
    email:{
        required:true,
        type:String,
        trim:true,
    },
    password:{
      required:true,
      type:String,
      trim:true,
    },
    type:{
        type: String,
        required:true
    },
    token:{
        type:String,
        default: ""
    },
    cart:[cartSchema],
  
});
const User=mongoose.model("User",userSchema);
module.exports=User;