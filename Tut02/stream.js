const fs = require ("fs");
const path = require("path");


//readable streams 
const rs = fs.createReadStream(path.join(__dirname,"files", "lorem.txt"), {encoding: "utf8"});

//writable streams
const wr = fs .createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

// rs.on("data", (dataChunk) =>{
//     wr.write(dataChunk);
// })

rs.pipe(wr);