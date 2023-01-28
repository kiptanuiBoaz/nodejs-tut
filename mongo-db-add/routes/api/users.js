const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");
const {handleNewUser} = require("../../controllers/registerController");
const { getUser, deleteUser, getUsers, updateUser} = require("../../controllers/usersController");

router.route("/")
    //get employees
    .get( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), getUsers)

   //update employee 
    .put( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), updateUser)

    //add employee
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),handleNewUser)

    //delete employee
    .delete(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), deleteUser);

router.route("/:user")
    .get( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),getUser);


module.exports =  router;