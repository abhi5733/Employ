const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password:String,
    number : String,
    status : String,
    city : String ,
    profilePic : String ,
    myJobs : [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }],
    resume:String ,
    // userID : String,
    skills : []
    
})



const userModel = mongoose.model("user" , userSchema)

module.exports = {userModel}