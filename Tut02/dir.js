const fs = require ("fs");

//check if directory exists
if(!fs.existsSync("./new")){

    //create new directory
    fs.mkdir("./new",(err)=>{
        if(err) throw err;
        console.log("Directory created");
    })
}

if(fs.existsSync("./new")){

    //create new directory
    fs.rmdir("./new",(err)=>{
        if(err) throw err;
        console.log("Directory removed");
    })
}