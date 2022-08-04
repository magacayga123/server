const express=require("express");
const User=require("./../modals/user.js");
const jsonwebtoken=require("jsonwebtoken");
const authRouter=express.Router();
authRouter.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password ,type} = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
  
    //   const hashedPassword = await bcryptjs.hash(password, 8);
  
      let user = new User({
        email,
        password,
        name,
        type
      });
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ err: e.message });
    }
  });
  //sign in
  authRouter.post("/api/signin",async(req,res)=>{
    try{
        const {email,password} =req.body;
        const thatuser=await User.findOne({email});
        if(!thatuser){
            return res.status(400).json({msg:"that email doesnot exisists"});
        }
       if(thatuser.password!=password){
        return res.json({msg:"incorrect password"});
       }
       const token=jsonwebtoken.sign({id:thatuser._id},"passwordkey");
      //  console.log(token);
      thatuser.token=token;
       res.json({...thatuser._doc})

    }catch(e){
        res.status(500).json({error:e.message});
    }
  });
  authRouter.post("/get-user",async(req,res)=>{
   try{
    const {token}=req.body;
    if(token==null||token==""){
     return res.json({msg:false});
    }
    const verified=jsonwebtoken.verify(token,"passwordkey");
    if(!verified){
      return res.json({msg:false});
    }
    const user=await User.findById(verified.id);
    if(!user){
      return res.json({msg:false});
    }
    user.token=token;
    // console.log(user);
    res.json({msg:true,user:user});
   }catch(e){
    res.status(500).json({err:e.message});
   }
  })
module.exports=authRouter;