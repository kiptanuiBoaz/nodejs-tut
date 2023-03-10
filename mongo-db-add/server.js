require("dotenv").config(); //to be available in all files
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const connectDB = require("./config/dbCon");
const {logger} = require("./middleware/logEvents");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const PORT = process.env.PORT || 3500;

//connect to mongoDB server
connectDB();

//custom middlewareLogger
app.use(logger);


//handle the credentials check before cors
app.use(credentials); 

//domains allowed to ping the server
app.use(cors(corsOptions));

// middleware function provided by the Express.js to handle formdata
app.use(express.urlencoded({extended: false}))

//built in middleware for json data
app.use(express.json());

//middlware for cookies
app.use(cookieParser());

//middleware function provided by the Express.js framework that is used to serve static files from a specific folder
app.use("/",express.static(path.join(__dirname,'/public')));
//pass static files from the subdir
app.use("/subdir", express.static(path.join(__dirname,'/public')));


//routes
app.use("/",require("./routes/root.js"));
app.use("/register",require("./routes/register.js"));
app.use("/auth",require("./routes/auth.js"));
app.use("/refresh",require("./routes/refresh.js"));
app.use("/logout",require("./routes/logout.js"));

//protected routes
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees.js"));
app.use("/users", require("./routes/api/users.js"));

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

//listen to mongoose connected  event
mongoose.connection.once("open",()=>{
    console.log("Connected to MongoDB");
    //listen on server port after conncetion is succesful
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})





//mongodb password
// hTQz7N18FqGh7H4j

// Admin
// pATAg5W4qUtas7uX