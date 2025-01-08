
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
    jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }], // Linking to Job model,
    profilePic : String,
    CompanyPic : String ,
    CompanyLoaction : String
})



const adminModel = mongoose.model("admin" , adminSchema)

module.exports = {adminModel}
