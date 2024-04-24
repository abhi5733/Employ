
const mongoose = require("mongoose")


const jobSchema = mongoose.Schema({
    company_name:String,
    post:String,
    vacancy:String,
    applicant: Array,
    owner: Array
})



const jobModel = mongoose.model("jobs" , jobSchema)

module.exports = {jobModel}
