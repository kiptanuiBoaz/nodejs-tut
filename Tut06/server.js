const express = require('express');
const app = express();
const path = require('path');
const {logger,logEvents} = require("./middleware/logEvents")
const PORT = process.env.PORT || 3500;


//custom middlewareLogger
app.use(logger)

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

app.get("/*", (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));