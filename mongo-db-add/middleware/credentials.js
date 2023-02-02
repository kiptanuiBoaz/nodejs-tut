const whiteList = require("../config/whiteList");


const credentials = (req,res,next) => {
    //tap into headers object
    const origin = req.headers.origin;
    console.log(origin)
  

    //set control allow  origin to true for cors to allow resource sharing
    if(whiteList.includes(origin)){
        res.header("Access-Control-Allow-Origin", true)
    }
    
    next();
}

module.exports = credentials;