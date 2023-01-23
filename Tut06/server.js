const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors")
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const { restart } = require('nodemon');
const PORT = process.env.PORT || 3500;


//custom middlewareLogger
app.use(logger);

//cross origin resource sharing
//domains allowed to ping the server
const whiteList = ["http://www.mysite.com", "http://www.localhost:3500", "http:127.0.0.1:500"]
const corsOptions = {
    origin: (origin, callback) =>{
        //check if origin is in the whitelist
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }else{
            callback(new Error("Not allowed by cors"));
        }
    },

    optionSuccessStatus: 200

}
app.use(cors(corsOptions));

// middleware function provided by the Express.js framework that is used to parse incoming request bodies that have the Content-Type of application/x-www-form-urlencoded.
app.use(express.urlencoded({extended: false}))

//built in middleware for json data
app.use(express.json());

//middleware function provided by the Express.js framework that is used to serve static files from a specific folder
app.use(express.static(path.join(__dirname,'/public')));



app.get("^/$|/index(.html)?", (req,res)=>{
    // res.sendFile("./views/index.html" , {root: __dirname});
    res.sendFile(path.join(__dirname, "views", "index.html"));

})


app.get("/new-page.html", (req,res)=>{
    res.sendFile(path.join(__dirname, "views", "new-page.html"));

})

app.get("/old-page(.html)?", (req,res)=>{
    res.redirect(301, "/new-page.html");

})

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