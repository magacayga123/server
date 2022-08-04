const express=require("express");
const adminMiddleware = require("../middleWares/admin_");
const Product = require("../modals/product");
const User = require("../modals/user");
const AdminRouter=express.Router();
AdminRouter.post("/admin/add-product",adminMiddleware,async(req,res)=>{
 try{
    const {owner,price,description,images,quantity,title,category}=req.body;
    let product=Product({
        owner,
        price,
        description,
        images,
        quantity,
        title,
        category,
    });
    let pr=await product.save();
    res.json(pr);
 }catch(e){
    res.status(500).json({err:e.message});
 }
});
AdminRouter.get("/admin/get-my-products",async(req,res)=>{
   try{
      const owner=req.header("owner");
      let products=await Product.find({owner});
      // console.log(products);
      res.json(products);
   }catch(err){
      res.status(500).json({err:err.message})
   }
});
AdminRouter.get("/api/read-all-products",async(req,res)=>{
   try{
   let products=await Product.find({});
   res.json(products);
   }catch(e){
      res.status(500).json({err:e.message});
      // console.log(e.message);
   }
});
AdminRouter.post("/admin/delete-product",async(req,res)=>{
   try{
   const {id} =req.body;
   // Product.findByIdAndRemove(id);
    Product.deleteOne({_id:id},function(err,obje){
     if(err)console.log(err);
   //   console.log("nice");
    });
   res.json({output:"deleted"});
   }catch(err){
      res.status(500).json({err:err.message});
   }
});
AdminRouter.post("/admin/another-admin-rate-urproduct",async(req,res)=>{
   try{
      const {id,rating}=req.body;
      Product.findByIdAndUpdate(id,{ratings:rating},function(err,ob){
         if(err) console.log(err.message);

      });
      // let user=await User.findById(userid);
      // res.json(user);
      
    
      
   }catch(er){
      res.status(500).json({err:er.message});
   }
});
AdminRouter.post("/api/add-to-cart",async(req,res)=>{
   try{
   const {id,userid}=req.body;
   let thisuser=await User.findById(userid);
   thisuser.cart.push({product_type:id,quantity:1})
   // console.log(thisuser.cart);s
    User.findByIdAndUpdate(userid,{cart:thisuser.cart},function(err,obj){
      if(err)console.log(err);
    });
    let userk=await User.findById(userid);
   res.json(userk);
   }catch(e){
      res.status(500).json({err:e.message});
   }
});
AdminRouter.get("/api/get-cart-products",async(req,res)=>{
   try{
      const id=req.header("product-id");
      let productxinyourcart=await Product.findById(id);
      res.json(productxinyourcart);

   }catch(e){
      res.status(500).json({err:e.message});
   }
})
AdminRouter.get("/api/get-products-c",async(req,response)=>{
try{
   const category=req.header("category");
   let products=await Product.find({category})
   response.json(products);

}catch(e){
   response.status(500).json({err:e.message});
}
});
module.exports=AdminRouter;