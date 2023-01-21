const {format} = require("date-fns");
const {v4: uuid} = require("uuid");
//file system
const fs = require("fs");
//files system with promises 
const fsPromises = require("fs").promises;
//path module
const path = require("path");

const logEvents = async(message)=>{
    const dateTime = `${format(new Date,"yyyy-MM-dd \t HH:mm:ss")}`;
    const logTime = `${dateTime} \t ${uuid()} \t ${message} \n`;
    console.log(logTime);

    try{
        if(!fs.existsSync(path.join(__dirname,"logs"))){
            await fsPromises.mkdir(path.join(__dirname,"logs"));
        }
        await fsPromises.appendFile(path.join(__dirname,"logs", "eventLog.txt"), logTime)

    }catch(err){
        console.error(err);
    }
}

 module.exports =logEvents;