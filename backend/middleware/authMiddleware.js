const jwt=require('jsonwebtoken');
require('dotenv').config();
const autthenticatejwt=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token)
    {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
            next();
        } catch (err) {
            console.error('JWT verification failed:', err.message);
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
    else
    {
        res.status(401).json({ message: 'Token required' });
    }
}
module.exports=autthenticatejwt;