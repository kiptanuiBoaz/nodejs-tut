const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");


//from employees controoller
const { getEmployees, deleteEmployee, getEmployee, updateEmployee, createNewEmployee} = employeesController;

router.route("/")
    //get employees
    .get( getEmployees)

   //update employee 
    .put(updateEmployee)

    //add employee
    .post(createNewEmployee)

    //delete employee
    .delete(deleteEmployee);

router.route("/:id")
    .get(getEmployee);


module.exports =  router;