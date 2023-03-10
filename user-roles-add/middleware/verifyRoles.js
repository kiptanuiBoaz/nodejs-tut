//accept any number of params
const verifyRoles = (...allowedRoles) =>{
    return (req,res,next) =>{
        //unAuthorized
        if(!req?.roles) return res.status(401).json({"message":"Unauthorized"});

        //passed along with verifyRoles middlesware
        const rolesArray = [...allowedRoles];
        
        console.log(rolesArray);
        console.log(req.roles);
        //compare role from jwt verify with allowed roles (predefined)
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        //check if there is atleat one role
        if(!result) return res.status(401).json({"message":"Unauthorized"});
        next();
    }
} 

module.exports = verifyRoles;