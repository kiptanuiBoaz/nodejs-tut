const User = require("../model/Users");// user schema
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = async (req,res) => {
    //destructure body params
    const {user, pwd} = req.body;

    //handle bad request
    if(!pwd || !user) res.status(400).json({"message":"Username and password are required"});

    //query the presensce of user
    const foundUser = await User.findOne({username: user}).exec(); //exec is necessary bcoz its a mongoose method used with await without a callback
    //exit if user is not found
    if(!foundUser) return res.status(401).json({"message":"user unauthorised!"});

    //evaluate  password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if(match){
        //acces the roles of the fouend user
        const roles = Object.values(foundUser.roles)
        //create access token
        const accessToken = jwt.sign(
            { "UserInfo":{
                    "username": foundUser.username,
                    "roles": roles, 
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "20m"}
        )

        //create Refresh token
        const refreshToken = jwt.sign(
            {"username": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        )
        
        //saving refresh token with found user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        
        return  res
            .cookie("jwt", refreshToken, {httpOnly:true, sameSite:"None", maxAge: 24 * 60 * 60 * 1000}) //secureSite: true
            .status(200)
            .json({"message":`User ${user} is logged in!`, accessToken})
        ;
    }else{
        return res.status(401).json({"message":"Password is incorrect"});
    }

}

module.exports = {handleLogin}; 