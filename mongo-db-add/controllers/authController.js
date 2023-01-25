const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const bcrypt = require("bcrypt");

const handleLogin = async (req,res) => {
    //destructure body params
    const {user, pwd} = req.body;

    //handle bad request
    if(!pwd || !user) res.status(400).json({"message":"Username and password are required"});

    //query the presensce of user
    const foundUser = usersDB.users.find(person => person.username === user);
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
        
        //saving refresh token with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        //add refresh token to user object in db
        const currentUser = {...foundUser, refreshToken}
        //finally add the tokened user with filtered users to db
        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );
        
        return  res
            .cookie("jwt", refreshToken, {httpOnly:true, sameSite:"None", maxAge: 24 * 60 * 60 * 1000})
            .status(200)
            .json({"message":`User ${user} is logged in!`, accessToken})
        ;
    }else{
        return res.status(401).json({"message":"Password is incorrect"});
    }

}

module.exports = {handleLogin}; 