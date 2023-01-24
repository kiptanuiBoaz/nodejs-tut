const {jwt} = require("jsonwebtoken");

require("dotenv").config();
const fsPromises = require("fs").promises;

const verifyJWT = (req,res,next) =>  {
    //access token from the req headers
    const authHeader =  req.headers["authorization"];

    //handle token absence
    if (!authHeader) return res.status(401).json({"message": "jwt token required"});
    console.log(authHeader);
    //access the token from Headers string
    const token = authHeader.split(" ")[1];

    //verify the token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        //callback
        (err, decoded)=>{
            if(err) return res.status(403).json({"message":err.message});
            //seting the username to decoded usrname from jwt
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT;