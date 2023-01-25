const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
};
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req,res) => {
    //destructure cookies
    const cookies = req.cookies;

    //check for cookies and jwt property
    if(!cookies?.jwt) return res.status(401).json({"message":"cookie not found"});

    //access refresh token
    const refreshToken = cookies.jwt;

    //query the presensce of user with refresh token in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    //exit if user is not found
    if(!foundUser) return res.status(403).json({"message":"Forbidden!"});

    //evaluate  jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            //id recieved name is !== name in DB
            if(err || decoded.username !== foundUser.username) return res.status(403).json({"message":`${err.message}`});

            //roles of user from DB
            const roles = Object.values(foundUser.roles)
            //generate a new access token
            const accessToken = jwt.sign(
                { "UserInfo":{
                    "username": decoded.username,
                    "roles": roles, 
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"30s"}
            );

            return res.json({accessToken});
        }
    )

}

module.exports = {handleRefreshToken}; 