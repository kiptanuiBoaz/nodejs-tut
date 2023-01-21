
const path = require ("path");

const fsPromises = require("fs").promises;

const fileOps =  async () => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, "files" , "starter.txt"),"utf8");
        console.log(data);

        await fsPromises.writeFile(path.join(__dirname, "files" , "promiseWrite.txt"), data);
        await fsPromises.appendFile(path.join(__dirname,  "files",  "promiseWrite.txt"), "\n\n Nice to meet  you promise",);
        await fsPromises.rename(path.join(__dirname, "files" , "promiseWrite.txt"), path.join(__dirname,  "files" , "promiseNewWrite.txt"));

        const newData = await fsPromises.readFile(path.join(__dirname, "files" , "promiseNewWrite.txt"),"utf8");
        console.log(newData);

    }catch(err){
        console.error(err);
    }
}

fileOps();


// fs.writeFile(path.join(__dirname, "files" , "reply.txt"),"Nice to meet you" ,(err )=>{
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(path.join(__dirname, "files" , "reply.txt"),"\n\nYes it is" ,(err )=>{
//         if (err) throw err;
//         console.log("Append complete");

//         fs.renameb(path.join(__dirname, "files" , "reply.txt"),path.join(__dirname, "files" , "newReply.txt") ,(err )=>{
//             if (err) throw err;
//             console.log("Rename complete");
//         })
//     })
    
// })




//catching uncought errors
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
  })