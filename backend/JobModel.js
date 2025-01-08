
const mongoose = require("mongoose")


const jobSchema = mongoose.Schema({
    company_name:String,
    postTitle:String,
    description : String , 
    vacancy:Number,
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' } ,
    salary: { 
        min:  Number , // Minimum salary
        max:  Number   // Maximum salary
    },
    employment_type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true }, // Type of employment
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    tags: { type: [String] }  // Tags for easy filtering (e.g., 'JavaScript', 'Remote')

})



const jobModel = mongoose.model("jobs" , jobSchema)

module.exports = {jobModel}
