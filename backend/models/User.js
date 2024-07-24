const mongoose=require('mongoose');
const Userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const userModel=mongoose.model("Users",Userschema)
module.exports=userModel