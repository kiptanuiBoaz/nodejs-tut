const jwt = require("jsonwebtoken");

require("dotenv").config();
const fsPromises = require("fs").promises;

const verifyJWT = (req,res,next) =>  {
    //access token from the req headers
    const authHeader =  req.headers.authorization || req.headers.Authorization;

    //handle token absence
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({"message": "jwt token required"});
    
    //access the token from Headers string
    const token = authHeader.split(" ")[1];

    //verify the token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        //callback
        (err, decoded)=>{
            if(err) return res.status(403).json({"message":err.message});
            //seting the username (of req obj) to decoded usrname from jwt
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    )
}

module.exports = verifyJWT;