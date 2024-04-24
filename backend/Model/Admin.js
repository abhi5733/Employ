
const mongoose = require("mongoose")

const adminSchema = mongoose.Schema({
    name:String,
    email:String,
    number:String,
    password:String,
    company_name: String ,
    designation : String ,
    pin_code : String,
    address : String ,
    jobsPosted: Array 
})



const adminModel = mongoose.model("admin" , adminSchema)

module.exports = {adminModel}
