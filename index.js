const express=require("express");
const mongoose=require("mongoose");
// const denv=require("dotenv");
const AdminRouter = require("./routers/admin.js");
const authRouter = require("./routers/auth.js");
// denv.config();
const app=express();
const port =process.env.PORT || 3000;
app.use(express.json());
app.use(authRouter);
app.use(AdminRouter);
app.listen(port,"0.0.0.0",()=>{
    console.log("listened");
})
const murl=process.env.MONGODB_URI||"mongodb+srv://magacayga:helloworld22@cluster0.svx6e.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(murl).then(()=>console.log("succeed")).catch((e)=>console.warn(e));
