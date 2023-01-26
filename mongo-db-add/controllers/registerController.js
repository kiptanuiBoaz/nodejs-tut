const bcrypt = require("bcrypt");
const User = require("../model/Users");// user schema

const handleNewUser = async (req,res) =>{
    //destructure body params
    const {user, pwd} = req.body;

    //handle bad request
    if(!pwd || !user) res.status(400).json({"message":"Username and password are required"});

    //check for duplicate usernames in db
    const duplicate = await User.findOne({username: user}).exec(); //exec is necessary bcoz its a mongoose method used with await without a callback

    //send a conflict mesage if duplicate
    if(duplicate) return res.status(409).json({"message": "username already in use"});

    try{
        //hash password
        const hashedPWD = await bcrypt.hash(pwd,10);
         //create and store (this also calls .save()) new user
        const newUser = await User.create({
            "username":user,
            "password":hashedPWD
        });

        console.log(newUser);
         

        return res.status(201).json({"message":`New user ${user} created succesfully`})

    }catch(err){
        console.error(err);
        res.status(500).json({"message": err.message});
    }

}

module.exports= {handleNewUser}