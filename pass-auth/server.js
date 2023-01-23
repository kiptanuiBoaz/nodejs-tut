const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors")
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3500;



//custom middlewareLogger
app.use(logger);


//domains allowed to ping the server
app.use(cors(corsOptions));

// middleware function provided by the Express.js to handle formdata
app.use(express.urlencoded({extended: false}))

//built in middleware for json data
app.use(express.json());

//middleware function provided by the Express.js framework that is used to serve static files from a specific folder
app.use("/",express.static(path.join(__dirname,'/public')));
//pass static files from the subdir
app.use("/subdir", express.static(path.join(__dirname,'/public')));

//root router
app.use("/",require("./routes/root.js"));


//API route
app.use("/employees", require("./routes/api/employees.js"));


//applies to all http methods that  made it this far without bieng served
app.all("*", (req, res)=>{
    res.status(404);

    if(req.accepts("html")){
        //send html if the client headers accepts .html
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }else if(req.accepts("json")){
        //send json if the client headers accepts json
        res.json({error: "404 Not Found"})
    }else{
          //send text if the client headers accepts text
        res.type(txt).send("404 Not Found")
    }
  
})


//provisions for any uncaught errors
// custom middleware to catch, log and  save errors
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));