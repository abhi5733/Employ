
const mongoose = require("mongoose")


const userDataSchema = mongoose.Schema({
    resume:String ,
    userID : String,
    skills : []
})


const userDataModel = mongoose.model("userData" , userDataSchema)

module.exports = {userDataModel}