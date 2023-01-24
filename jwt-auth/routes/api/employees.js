const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");

//from employees controoller
const { getEmployees, deleteEmployee, getEmployee, updateEmployee, createNewEmployee} = employeesController;

router.route("/")
    //get employees
    .get(verifyJWT, getEmployees)

    //add employee
    .put(updateEmployee)

    //update employee
    .post(createNewEmployee)

    //delete employee
    .delete(deleteEmployee);

router.route("/:id")
    .get(getEmployee);


module.exports =  router;