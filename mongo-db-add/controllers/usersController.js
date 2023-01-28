const User = require("../model/Users"); //employee model
const ROLES_LIST = require("../config/roles");
const bcrypt = require("bcrypt");


const getUsers = async (req,res)=>{
    const users = await User.find();//returns all the users

    if(!users){
        //handle emptydb
        return res.status(201).json({"message":"No users found!"});
    }else{
        //success operation
        return res.status(200).json(users);
    }
}

const updateUser = async (req,res) => {
    if(req.body.user === "Admin") return res.status(401).json({"message":"Cannote edit Admin!"})
    //check if user is provided
    if(!req?.body?.user)  return res.status(400).json({"message": "user paramater is required"});
 
    //destrucure the data object
    const {user, pwd, newRoles} = req.body;
    
    //grab the employee with the sent id from db
    const foundUser = await User.findOne({ username: user}).exec();

    //send !found when employee  doen't exist
    if(!foundUser) return res.status(204).json({"message":`No users matches the name ${user}`});

    //handle roles
    if(newRoles){
         newRoles.includes(ROLES_LIST.Admin) ?
          foundUser.roles = {...ROLES_LIST} : 
          foundUser.roles = {"Editor" : 1984,"User" : 2001}
    }else{
        foundUser.roles={"User" : 2001}
    }
    
    //handle password
    if(pwd){
        try{
            //hash password
            const hashedPWD = await bcrypt.hash(pwd,10);
            foundUser.password = hashedPWD;
        }catch(err){
            console.error(err);
            return res.status(500).json({"message": err.message});
        }
    } 

    //add updated user to db
    const result = await foundUser.save();
   
    //send a success response
    return res.status(200).json(result);
}

const deleteUser = async (req,res) => {
if(req.body.user === "Admin") return res.status(401).json({"message":"Cannote delete Admin!"})
//check if user is provided
if(!req?.body?.user)  return res.status(400).json({"message": "user paramater is required"});
     const {user} = req.body;
    //find the employee with `user`
    const foundUser = await User.findOne({username: user}).exec();//needs exec

   //send !found when employee  doen't exist
   if(!foundUser) return res.status(204).json({"message":`No user matches ID ${user}`});

   //delete in db
    const  result = await User.deleteOne({username: user});
    //success message
    return res.status(200).json(result);
}

const  getUser = async (req, res)=>{
    
    if(!req?.params?.user) return  res.status(400).json({"message": "user paramater is required"});
    
    //find the employee with id
    const foundUser = await User.findOne({ username:req.params.user}).exec();//needs exec
   //send !found when employee  doen't exist
   if(!foundUser) return res.status(204).json({"message":`No user matches ID ${req.params.user}`});
    return res.status(200).json(foundUser);
}

//export the fns
module.exports = {
    getUser,
    deleteUser,
    getUsers,
    updateUser,
}