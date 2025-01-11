const express = require("express")
const userRoute = express.Router()
const {userModel} = require("../Model/UserModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { adminModel } = require("../Model/Admin");



/////////////////////////////////////////////////////////////////////// User register route  /////////////////////////////////////////////////////////////////////////////////////

userRoute.post("/register", async (req, res) => {

    const { email , password } = req.body
console.log(req.body.userType,"Type")
    try {

        const alreadyUser = await userModel.find({ email })
        const previousAdmin = await adminModel.find({email})

        if (alreadyUser.length == 0 && previousAdmin.length==0) {
    
            bcrypt.hash(password , 10 , async (err, hash)=> {
           
                if(err){
              res.send(err)
                }else{
                    console.log(2)
              let user = new userModel({...req.body,password:hash,profilePic :""})
             await user.save()
             res.send({"msg":"User registered successfully" , user})
                }

            });

        

        }else if(alreadyUser.length > 0 ){
            res.status(200).send({"msg": "User has already registered , You can Login"})
        }else{
            res.status(401).send({"msg": "User has already registered as job seeker"})
        }

    } catch (err) {
        console.log(err)
        res.status(403).send({"msg" : "Something went wrong"})
    }

})


////////////////////////////////////////////////////////////////// Admin Registering  /////////////////////////////////////////////////////////////////////////



userRoute.post("/adminRegister" , async(req,res) => {

    console.log(req.body,"body")    
        try{
       const email = req.body.email ; 
       const password = req.body.password ;
            const previousUser = await userModel.find({email})
            const previousAdmin = await adminModel.find({email})
    
            if(previousUser.length==0 && previousAdmin.length==0){
    
                bcrypt.hash( password , 10 , async (err, hash)=> {
               
                    if(err){
                       
                        res.status(404).send({"msg" : "create account first"})
                    
                    }else{
                    
                        
                        const user = new adminModel({...req.body,password:hash})
                        await user.save()
                        res.status(200).send({"msg":"Admin registered successfully" , user})
                    
                    }
    
                }) 
    
            }else if(previousUser.length>0 ){
            
                 res.status(401).send({"msg": "User has already registered as job seeker"})
            }else{
                
                res.status(200).send({"msg": "Admin has already registered , You can Login"})
            }
    
        
     }catch(err){
    // console.log("err")
            res.send(err)
       
        }
    
    })
    
    


///////////////////////////////////////////////////////////  user  Login Route    ///////////////////////////////////////////////////////////////////////////////////////////////////////


userRoute.post("/login" , async (req,res)=>{


    try{

     const {email,password} = req.body

     const alreadyUser = await userModel.find({email})
if(alreadyUser.length>0){  
console.log(password, alreadyUser[0].password)
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
   
        res.status(500).send({"msg":"Something went wrong"})

    }

})


////////////////////////////////////////////////////////////////   Admin login     /////////////////////////////////////////////////////////////////////////////// 


userRoute.post("/adminLogin" , async (req,res)=>{

    try{

console.log(req.body)
const email = req.body.email
const password = req.body.password
        
const user = await adminModel.find({email})

        if(user.length>0){

            bcrypt.compare(password , user[0].password , function(err, result) {
       
                if(result){
                 
                    const token = jwt.sign({ UserId: user[0]._id }, 'masai')
                    res.status(200).send({"msg":"login Successfull" , "token":token})
        
                }else{
                    console.log("I am the error 1")
                    res.status(401).send({"msg": "Something went wrong"});
        
                }
        
            }) ;


        }else{
  console.log("I am the error 2")
            res.status(401).send({"msg": "User not found"});

        }


    }catch(err){
        console.log("I am the error 3")
        res.status(404).send({"msg": "Something went wrong", err});
    
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








