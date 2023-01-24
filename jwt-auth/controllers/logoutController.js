const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout= async (req,res) => {
    //on client side alsa delete the access token
    //destructure cookies
    const cookies = req.cookies;

    //check for cookies and jwt property
    if(!cookies?.jwt) res.sendStatus(204).json({"message":"The cookie not found"});

    const refreshToken= cookies.jwt;

    //try to find refresh token in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    //erase cookie if user is not found
    if(!foundUser){
        res.clearCookie("jwt",  {httpOnly:true, sameSite:"None", maxAge: 24 * 60 * 60 * 1000});
        return res.status(204).json({"message":"Delted but not in db!"});
    }

    //delete the refresh token in the db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== refreshToken);

    //set refreshtoken field to empty
    const currentUser = {...foundUser, refreshToken:""};

    //push to db
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join( __dirname, "..", "model", users.json),
        JSON.stringify(usersDB.users)
    )
    //clear coockie
    res.clearCookie("jwt",  {httpOnly:true, sameSite:"None", maxAge: 24 * 60 * 60 * 1000}); //secure:true only serves https
    return res.sendStatus(204);  
   
}

module.exports = {handleLogout}; 