const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");


//from employees controoller
const { getEmployees, deleteEmployee, getEmployee, updateEmployee, createNewEmployee} = employeesController;

router.route("/")
    //get employees
    .get( getEmployees)

   //update employee 
    .put( verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), updateEmployee)

    //add employee
    .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createNewEmployee)

    //delete employee
    .delete(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor), deleteEmployee);

router.route("/:id")
    .get(getEmployee);


module.exports =  router;