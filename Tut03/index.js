const logEvents = require('./logEvents');


const EventEmitter = require("events");

class MyEmitter extends EventEmitter{};

// initialize
const myEmitter = new MyEmitter();

//add a listerner for the log event
myEmitter.on("log",(msg)=>logEvents(msg));

setTimeout(()=>{
    myEmitter.emit("log", "Log event emitted");
},2000);
