const jwt=require('jsonwebtoken');
require('dotenv').config();
const autthenticatejwt=(req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token);
    if(token)
    {
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(403);
            }
            req.user=user;
            next();
        })
    }
    else
    {
        res.status(401);
    }
}
module.exports=autthenticatejwt;