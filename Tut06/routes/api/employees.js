const express = require("express");
const router = express.Router(); 


const data = {};
data.employees = require("../../data/employees.json");

router.route("/")
    //get employees
    .get((req,res)=>{
        res.json(data.employees)

    })

    //add employee
    .post((req,res)=>{
        res.json({
            "first_name": req.body.firstName,
            "last_name": req.body.lastName
        })
    })

    //update employee
    .put((req,res)=>{
        res.json({
            "first_name": req.body.firstName,
            "last_name": req.body.lastName
        })
    })

    //delete employee
    .delete((req,res)=>{ res.json({ "id": req.body.id})});

router.route("/:id")
    .get((req, res)=>{
        res.json({"id": req.params.id})
    });


module.exports =  router;