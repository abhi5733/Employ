const express = require("express")
const {connection} = require("./db")
const {userRoute} = require("./Routes/UserRoute")
const {userModel} = require("./Model/UserModel")
const {authenticator} = require("./middleware/Authentication")
require("dotenv").config()
const  cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors)
 app.use("/user" , userRoute)
 app.use(authenticator)
 


 app.get("/" , async(req,res)=>{
     try{
        const data = await userModel.find()
        res.send(data)
    }catch(err){
        res.send(err)
    }
   
 })



app.listen(process.env.port , async ()=>{

    try{
    await connection
console.log("Mongo DB connected")

    }catch(err){
        console.log("Mongo DB not  connected")
    }
    console.log(`Server running at ${process.env.port} port`)
})