const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const usersDB = {
    users: require("../model/users.json"),
    setUsers: function(data){this.users = data}
};

const handleNewUser = async (req,res) =>{
    //destructure body params
    const {user, pwd} = req.body;

    //handle bad request
    if(!pwd || !user) res.status(400).json({"message":"Username and password are required"});

    //check for duplicate usernames in db
    const duplicate = usersDB.users.find(person => person.username === user);

    //send a conflict mesage if duplicate
    if(duplicate) return res.status(409).json({"message": "username already in use"});

    try{
        //hash password
        const hashedPWD = await bcrypt.hash(pwd,10);
        //store new user
        const newUser = {"username":user, "password":hashedPWD};
        usersDB.setUsers([...usersDB.users, newUser]);

        //simulate database simulation
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)

        return res.status(201).json({"message":`New user ${user} created succesfully`})

    }catch(err){
        console.error(err);
        res.status(500).json({"message": err.message});
    }

}

module.exports= {handleNewUser}