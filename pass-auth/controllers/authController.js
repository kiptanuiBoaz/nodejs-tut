const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
};

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
        //create JWTs
        return res.status(200).json({"message":`User ${user} is logged in!`})
    }else{
        return res.status(401).json({"message":"Password is incorrect"});
    }

}

module.exports = {handleLogin};