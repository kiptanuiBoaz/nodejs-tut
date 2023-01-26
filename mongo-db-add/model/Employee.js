const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//employess schema
//use mogoose shcema constructor
const employeeSchema = new Schema({
    firstname: {
        type : String,
        required: true,

    },
    lastname: {
        type : String,
        required: true,

    }
})

//mongoDB sets collection names to plural lower case
module.exports = mongoose.model("Employee", employeeSchema);