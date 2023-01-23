const { json } = require("express");

const data = {
    employees: require("../model/employees.json"),
    //fn to update employees
    setEmployees: function(data){this.employees = data}
};


const getEmployees = (req,res)=>{
    return res.status(200).json(data.employees)

}

const createNewEmployee = (req,res)=>{
    const newEmployee = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstName,
        lastname: req.body.lastName
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(404).json({"message": "first_name and last_name are required"});
    }

    //update the data object
    data.setEmployees([...data.employees, newEmployee]);
    
    //succes response
    return res.status(201).json(data.employees);
}

const updateEmployee = (req,res)=>{
    //destrucure the data object
    const {id,firstname,lastname} = req.body;
    //grab the employee with the sent id
    const employee = data.employees.find(emp => emp.id === parseInt(id))

    //send a bad request if the employee with the id  doen't exist
    if(!employee) return res.status(400).json({"message":`Employee ID ${id} does not exist`});

    //hydrate the employee variable with recieved data
    if(firstname)  employee.firstname = firstname;
    if(lastname) employee.lastname = lastname;

    //filter the array and erase the previous recodes
    const filteredArr = data.employees.filter(employee => employee.id !== parseInt(id));
    //
    //pop updated emplyee to employees arr
    const unsortedArray = [...filteredArr, employee];
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    
    //send a success response
    return res.status(200).json(data.employees);
}

const deleteEmployee = (req,res)=>{
     //find the employee with `id`
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    //send an error message if doest exist
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    //filter the array to remove the employee with `id`
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));

    //call the setEmployess fn to update employees
    data.setEmployees([...filteredArray]);

    //success message
    return res.status(200).json(data.employees);
}

const  getEmployee = (req, res)=>{
    //find the employee with id
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    return res.json(employee);
}

//export the fns
module.exports = {
    getEmployees,
    deleteEmployee,
    getEmployee,
    updateEmployee,
    createNewEmployee
}