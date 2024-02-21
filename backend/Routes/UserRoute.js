const express = require("express")
const userRoute = express.Router()
const {userModel} = require("../Model/UserModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



///////////////////////////////////////////////////////////////////////  register route  /////////////////////////////////////////////////////////////////////////////////////

userRoute.post("/register", async (req, res) => {

    const { email , password } = req.body
console.log(req.body.userType)
    try {

        const alreadyUser = await userModel.find({ email })
       

        if (alreadyUser.length == 0) {
           
            if(req.body.userType){   // for admin registerations
               
                bcrypt.hash( password , 10 , async (err, hash)=> {
           
                    if(err){
                  res.send(err)
                    }else{
                        console.log(req.body)
                  let user = new userModel({...req.body,password:hash})
                 await user.save()
                 res.send({"msg":"User registered successfully" , user})
                    }
    
                });




            }else{

            bcrypt.hash( password , 10 , async (err, hash)=> {
           
                if(err){
              res.send(err)
                }else{
                    console.log(req.body)
              let user = new userModel({...req.body,password:hash})
             await user.save()
             res.send({"msg":"User registered successfully" , user})
                }

            });

        }

        } else {
            res.send({ "msg": "User already registered" })
        }

    } catch (err) {
        console.log(err)
        res.send(err)
    }



})


///////////////////////////////////////////////////////////    Login Route    ///////////////////////////////////////////////////////////////////////////////////////////////////////


userRoute.post("/login" , async (req,res)=>{


    try{

     const {email,password} = req.body

     const alreadyUser = await userModel.find({email})
if(alreadyUser.length>0){  

    bcrypt.compare(password, alreadyUser[0].password, function(err, result) {
       
        if(result){
            const token = jwt.sign({ UserId: alreadyUser[0]._id }, 'masai')
            res.status(200).send({"msg":"login Successfull" , "token":token})

        }else{
            res.status(401).send({"msg": "Invalid Password"});
        }

    });



}else{
    res.status(404).send({"msg":"wrong credentials"});
   
}
    }catch(err){
   
        res.send({"msg":"Something went wrong"})

    }

})


/////////////////////////////////////////////////////////////////   Update Details   //////////////////////////////////////////////////////////////////////////                                                                            

// userRoute


     





///////////////////////////////////////////////////////////  Delete Account   ///////////////////////////////////////////////////////////////////
 
userRoute.delete("/delete" , async(req,res)=>{

    try{

 res.send(req.body)        


    }catch(err){


        res.send(err)


    }



})



             





///////////////////////////////////////////////////////////// Get  Route  ////////////////////////////////////////////////////////////////////////

userRoute.get("/" , async(req,res)=>{
    
    try{

        const users = await userModel.find()
       res.send(users)
    }
    catch(err){
        res.send(err)
    }
})


module.exports = {userRoute}
