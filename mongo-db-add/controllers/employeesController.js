const Employee = require("../model/Employee"); //employee model


const getEmployees = async (req,res)=>{
    const employees = await Employee.find();//returns all the employees

    if(!employees){
        //handle emptydb
        return res.status(201).json({"message":"No employees found!"});
    }else{
        //success operation
        return res.status(200).json(employees);
    }
}

const createNewEmployee = async (req,res)=> {
    //check for required fields
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({"message":" firstname and lastname are required"})
    }
    
    try {
        const {firstname, lastname} = req.body;

        //create a new employee record
        const result = await Employee.create({
            firstname,
            lastname,
        })
        //send response to client
        return res.status(201).json(result);

    } catch (error) {
        console.error(error)
    }
    
    //succes response
    return res.status(201).json(data.employees);
}

const updateEmployee = async (req,res) => {
    //check if id is provided
    if(!req?.body?.id)  return res.status(400).json({"message": "id paramater is required"});
    
    //destrucure the data object
    const {id,firstname,lastname} = req.body;
    //grab the employee with the sent id from db
    const employee = await Employee.findOne({_id: id}).exec();

    //send !found when employee  doen't exist
    if(!employee) return res.status(204).json({"message":`No emmployee matches ID ${id}`});

    //hydrate the employee variable with recieved data
    if(firstname)  employee.firstname = firstname;
    if(lastname) employee.lastname = lastname;

    //add updated employee to db
    const result = await employee.save();
   
    //send a success response
    return res.status(200).json(result);
}

const deleteEmployee = async (req,res) => {

    if(!req?.body?.id)  return res.status(400).json({"message": "id paramater is required"});
     
    //find the employee with `id`
    const employee = await Employee.findOne({_id: req.body.id}).exec();//needs exec

   //send !found when employee  doen't exist
   if(!employee) return res.status(204).json({"message":`No emmployee matches ID ${id}`});

   //delete in db
    const  result = await Employee.deleteOne({_id: req.body.id});
    //success message
    return res.status(200).json(result);
}

const  getEmployee = async (req, res)=>{
    
    if(!req?.params?.id) return  res.status(400).json({"message": "id paramater is required"});
    
    //find the employee with id
    const employee = await Employee.findOne({_id:req.params.id}).exec();//needs exec
   //send !found when employee  doen't exist
   if(!employee) return res.status(204).json({"message":`No emmployee matches ID ${req.params.id}`});
    return res.status(200).json(employee);
}

//export the fns
module.exports = {
    getEmployees,
    deleteEmployee,
    getEmployee,
    updateEmployee,
    createNewEmployee
}