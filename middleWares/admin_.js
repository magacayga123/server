const jsonwebtoken=require("jsonwebtoken");
const User = require("./../modals/user.js");
const adminMiddleware=async(req,res,next)=>{
   try{
    const  token=req.header("x-auth-token");
    if(!token){
        return res.status(400).json({msg:"no authentication in this device"});
    }
    const verified=jsonwebtoken.verify(token,"passwordkey");
    if(!verified){
        res.status(400).json({msg:"verification failed"});
    }
    const verifieduser=await User.findById(verified.id);
    if(verifieduser.type=="user"){
        res.status(400).json({msg:"you are not admin 😂"})
    }
    req.user=verified.id;
    req.token=token;
    next();
   }catch(e){
    res.status(500).json({err:e.message});
   }
}
module.exports=adminMiddleware;