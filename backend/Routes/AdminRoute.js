const express = require("express")
const {userModel} = require("../Model/UserModel")
const { uploadonCloudinary } = require("../cloudinary")
const { userDataModel } = require("../Model/UserData")
const { upload } = require("../middleware/multer")
const { authenticator } = require("../middleware/Authentication")
const {adminModel} = require("../Model/Admin")
const adminRoute = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jobModel } = require("../Model/JobModel")
const fs = require('fs');
const path = require('path');

// Function to delete a file

const deleteFile = (filePath) => {
  // Construct the full path to the file
  const fullPath = path.join(filePath);

  // Check if the file exists
  if (fs.existsSync(fullPath)) {
    // Delete the file
    fs.unlinkSync(fullPath);
    console.log(`File ${filePath} deleted successfully.`);
  } else {
    console.log(`File ${filePath} does not exist.`);
  }
};



// getting the User 

adminRoute.get("/", async (req,res)=>{
const id = req.body.UserId

    try{

        const user = await userModel.find({_id:id}) 
          res.status(200).send(user)
    }catch(err){
   res.status(401).send({"msg":"user not found"})
    }


})


// uploading resume 

adminRoute.post('/uploadResume',  upload.single('resume'), async (req, res) => {
    // Handle file upload

    const { filename, path } = req.file;
    console.log(req.headers.userid)
    // Save file metadata to database
    // For MongoDB integration, use Mongoose or any other MongoDB driver
   const cloud = await  uploadonCloudinary(path)
   console.log(cloud,"hello")
  
//    deleting the file from system
   deleteFile(path)

   const user = await userDataModel.find({userID:req.headers.userid})

   if(user.length>0){

    user[0].resume = cloud.url 
  await user[0].save()
  res.send(user[0]);
   }else{

    const data = new userDataModel({resume:cloud.url,
      userID 
      :req.headers.userid
  })

  await data.save()
  res.send(data);
   }

  });




  // upload Photo 

adminRoute.post('/uploadPhoto',  upload.single('photo'), async (req, res) => {
    // Handle file upload
try{
    const { filename, path } = req.file;
    console.log(path)
    // Save file metadata to database
    // For MongoDB integration, use Mongoose or any other MongoDB driver
   const cloud = await  uploadonCloudinary(path)
   console.log(cloud,"hello")
  
   const user  = await userModel.findByIdAndUpdate(req.headers.userid , {profilePic:cloud.secure_url} ,{ new: true })
             
    deleteFile(path)
//     const data = new userDataModel({resume:cloud.url,
//         userID 
//         :req.headers.userid
//     })
//    await data.save()
    res.send(user);
}catch(err){
  res.send(err)
}
  });



//   updating the datain UserData

  adminRoute.patch("/update" , async (req,res)=>{

    const userId = req.body._id
    console.log(req.body)
    try{

    const data = await  userDataModel.findByIdAndUpdate( userId , req.body ,{ new: true });
    res.status(200).send(data)

    }catch(err){

        res.status(404).send({"msg":"not working"})

    }

  })

// updating userData using put

//   updating the datain UserData

adminRoute.put("/updateUser" , async (req,res)=>{

    const UserId = req.body._id
    console.log(req.body)
    try{

    const data = await  userModel.findByIdAndUpdate( UserId , req.body );
    res.send(data)

    }catch(err){

        res.status(404).send({"msg":"not working"})

    }

  })



// getting all the data from UserData 


adminRoute.get("/get" , async ( req,res )=>{
const id = req.body.UserId
console.log(id)
    try{

const data = await userDataModel.find({userID:id})

if(data.length>0){
  res.send(data)
}else{
  const userData = new userDataModel({resume:"" ,
    userID : id,
    skills : []})
  await userData.save()
  console.log(userData)
  res.send({data:userData})
}
    }
    catch(err){
        
        res.status(400).send({"msg":"something went wrong"})
   
    }

})


///////////////////////////////////////////////////////////////////// Admin Section  ///////////////////////////////////////////////////////////////////////////////////






// Login Admin 


adminRoute.post("/login" , async (req,res)=>{

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
        
                    res.status(401).send({"msg": "Something went wrong"});
        
                }
        
            }) ;
        


        }else{

            res.status(401).send({"msg": "User not found"});

        }


    }catch(err){

        res.status(404).send({"msg": "Something went wrong"});
    
    }

})



//////////////////////////////////////////////////////////////////////////  Job Rotes  //////////////////////////////////////////////////////////////////////////////////



//  create jobs



adminRoute.post("/postJob" , async (req,res)=>{

    try{
      console.log(req.body)
      const job = new jobModel({...req.body , owner : [ req.body.UserId]   })
      console.log(job)
      await job.save()
      res.status(200).send(job)

    }catch(err){

        res.status(404).send({'msg':"something went wrong"})

    }

})




//  get all jobs

adminRoute.get("/getJob" , async (req,res)=>{

    try{
      
      const job = await jobModel.find()
      res.status(200).send(job)

    }catch(err){

        res.status(404).send({'msg':"something went wrong"})

    }

})



// apply job

adminRoute.put("/apply" , async (req,res)=>{


    try{
  const {applicant , _id} = req.body

  if(applicant.includes(req.body.UserId)){
  res.status(404).send({"msg":"user already exists"}) 
  }else{
    applicant.push(req.body.UserId)
    console.log(req.body)
    const data = await jobModel.findByIdAndUpdate(_id , req.body)
    res.status(200).send({"msg":"Applied Successfully" , data})
  }
  

}catch(err){

res.status(404).send({"msg":"something went wrong"})
    
}


})


// get my jobs


adminRoute.get("/getMyJob" , async (req,res)=>{

    try{
     
     const id = req.body.UserId
     const {applicant} = req.body
     
    //  const data = await jobModel.find({ applicant: { $elemMatch: { id} } });
    const data = await jobModel.find({ applicant: { $in: [id] } });
    
  res.status(200).send(data)


    }catch(err){
        
  res.status(404).send({"msg":"something went wrong", err})
  
}

})




module.exports = {adminRoute}