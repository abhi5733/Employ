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
const mongoose = require("mongoose") 
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



// getting the User Data 

adminRoute.get("/", async (req,res)=>{
const id = req.body.UserId

    try{

        const user = await userModel.find({_id:id}) 
          res.status(200).send(user)
    }catch(err){
   res.status(401).send({"msg":"user not found"})
    }

})



// getting the Admin Data 

adminRoute.get("/adminData", async (req,res)=>{
  const id = req.body.UserId
  
      try{
  
          const user = await adminModel.find({_id:id}) 
            res.status(200).send(user)
      }catch(err){
     res.status(401).send({"msg":"user not found"})
      }
  
  })


// uploading resume 

adminRoute.post('/uploadResume',  upload.single('resume'), async (req, res) => {
    // Handle file upload
try{
    const { filename, path } = req.file;
    console.log(req.headers.userid)
    // Save file metadata to database
    // For MongoDB integration, use Mongoose or any other MongoDB driver
   const cloud = await  uploadonCloudinary(path)
   console.log(cloud,"hello")
  
//    deleting the file from system
   deleteFile(path)

  //  const user = await userDataModel.find({userID:req.headers.userid})
  const user = await userModel.find({_id:req.headers.userid})

  

    user[0].resume = cloud.secure_url
  await user[0].save()
  res.send(user[0]);
}catch(err){

  res.send(err)
}
  //  else{

  //   const data = new userDataModel({resume:cloud.url,
  //     userID 
  //     :req.headers.userid
  // })

  // await data.save()
  // res.send(data);
  //  }

  });




  ////////////////////////////////////////////////// upload Photo /////////////////////////////////////// 

adminRoute.post('/uploadPhoto',  upload.single('photo'), async (req, res) => {
    // Handle file upload
try{
    const { filename, path } = req.file;
    console.log(path)
    // Save file metadata to database
    // For MongoDB integration, use Mongoose or any other MongoDB driver
   const cloud = await  uploadonCloudinary(path)
   console.log(cloud,"hello")
   const role = req.headers.user
   const toggle = req.headers.toggle

  // checking wether the person is User or Admin . 

   if(role=="user"){
   const user  = await userModel.findByIdAndUpdate(req.headers.userid , {profilePic:cloud.secure_url} ,{ new: true })
   deleteFile(path)
    res.send(user); 
  }else{
    if(!toggle){
    const user  = await adminModel.findByIdAndUpdate(req.headers.userid , {profilePic:cloud.secure_url} ,{ new: true })
    deleteFile(path)
    res.send(user);
    }else{
      const user  = await adminModel.findByIdAndUpdate(req.headers.userid , {CompanyPic:cloud.secure_url} ,{ new: true })
    deleteFile(path)
    res.send(user);
    }
   }     
   
}catch(err){
  res.send(err)
}
  });



//   updating the datain User 

  adminRoute.patch("/update" , async (req,res)=>{

    const userId = req.body._id
  
    console.log(req.body,req.body._id,"req.body._id")
    try{

    const data = await  userModel.findByIdAndUpdate( userId , req.body ,{ new: true });
    res.status(200).send(data)

    }catch(err){

        res.status(404).send(err)

    }

  })

// updating userData using put

//   updating the datain UserData

adminRoute.put("/updateUser" , async (req,res)=>{

    const UserId = req.body._id
    const role = req.headers.user
    console.log(req.body,req.body._id,"req.body._id")
    try{
if(role=="user"){
    const data = await  userModel.findByIdAndUpdate(  UserId , req.body );
    res.send(data)
}else{
  const data = await  adminModel.findByIdAndUpdate( UserId , req.body );
  res.send(data)
}

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



//////////////////////////////////////////////////////////////////////////  Job Rotes  //////////////////////////////////////////////////////////////////////////////////



//  create jobs



adminRoute.post("/postJob" , async (req,res)=>{
  const session = await mongoose.startSession(); // Start a new session for the transaction
    try{
      session.startTransaction();
      console.log(req.body)
      const job = new jobModel({...req.body , posted_by :  req.body.UserId  })
      console.log()
      await job.save({ session });
      const admin = await adminModel.findByIdAndUpdate(req.body.UserId , { $push: { jobsPosted: job._id } },{ new: true ,session})
      await session.commitTransaction();
      session.endSession();
      res.status(200).send({job,admin})

    }catch(err){
      await session.abortTransaction();
      session.endSession();
  
        res.status(500).send({'msg':"something went wrong",err})

    }

})

// update job using put 

adminRoute.put("/updateJob" , async (req,res)=>{

  try{
const id = req.body._id
const data = await jobModel.findByIdAndUpdate(id, req.body , { new: true })
res.status(200).send(data)
  }catch(err){
    res.status(500).send({'msg':"something went wrong"})

  }

})



//  get all jobs posted by Admin

adminRoute.get("/getJob" , async (req,res)=>{

    try{
      const id = req.body.UserId
      console.log(id)
      // using populate method to get all the jobs posted . 
      const job = await adminModel.findById(id).populate("jobsPosted");
      // console.log(job,"job")
      res.status(200).send(job)

    }catch(err){

        res.status(404).send(err)

    }

})

//  get all applicants of that job 

adminRoute.get("/getAllApplicant/:id" , async(req,res)=>{

  try{
    const { id } = req.params; 
    const job = await jobModel.findById(id).populate("applicants") ;
    res.status(200).send(job)
  }catch(err){
    res.status(404).send(err)
  }

})


// delete job posted by Admin


adminRoute.delete("/deleteJob/:id" , async(req,res)=>{
  const session = await mongoose.startSession();


  try{
    session.startTransaction();
    const  adminid  = req.headers.adminid 
    const { id } = req.params; 
   
     await jobModel.findByIdAndDelete(id, { session }) ;

       // Remove the job reference from the admin's jobsPosted array
    await adminModel.findByIdAndUpdate(
      adminid ,
      { $pull: { jobsPosted: id } },
      { session }
    )

     // Remove the job reference from all users who applied for it
     await userModel.updateMany(
      {   myJobs: id },
      { $pull: { myJobs: id } },
      { session }
    );

     await session.commitTransaction();
     session.endSession();
    res.status(200).send({"msg":"Job Deleted Successfully"})


  }catch(err){
    await session.abortTransaction();
    session.endSession();
    res.status(404).send(err)
  }

})




// apply job

adminRoute.put("/applyJob" , async (req,res)=>{
  const session = await mongoose.startSession();

    try{
      session.startTransaction();
      // job Model
  const {applicants , _id} = req.body
  const job = await userModel.findById(_id)

  if(applicants.includes(req.body.UserId) || job.applicants.includes(req.body.UserId)){
  res.status(404).send({"msg":"user already exists"}) 
  }else{
    applicants.push(req.body.UserId)
    console.log(req.body)
   const job =   await jobModel.findByIdAndUpdate(_id , req.body,{session})
 const user =    await userModel.findByIdAndUpdate(req.body.UserId , { $push: { myJobs: _id } },{ new: true , session })
      await session.commitTransaction();
      session.endSession();
      res.status(200).send({"msg":"Applied Successfully" ,job,user})
 
    }


}catch(err){
  await session.abortTransaction();
  session.endSession();
res.status(500).send({"msg":"something went wrong"})
    
}


})


// get my jobs


adminRoute.get("/getMyJob" , async (req,res)=>{

    try{
     
     const id = req.body.UserId
    //  const {applicant} = req.body
     
    //  const data = await jobModel.find({ applicant: { $elemMatch: { id} } });
    const data = await userModel.findById(id).populate("myJobs")
    
  res.status(200).send(data)


    }catch(err){
        
  res.status(404).send({"msg":"something went wrong", err})
  
}

})

// get all latest job 

adminRoute.get("/getLatestJobs" , async(req,res)=>{

  try{

    const data = await jobModel.find({}).sort({created_at:-1}).limit(10)
    res.status(200).send(data)

  }catch(err){
    res.status(500).send(err)
  }

})

// search function for Job Searching . 


adminRoute.get("/searchJobs", async (req, res) => {
   const query = req.headers.params ; // Get the keyword from query parameters

  if (!query) {
    return res.status(400).send({ msg: "Keyword is required for search" });
  }

  try {
    // Perform a search on tags (array) and postTitle
    const jobs = await jobModel.find({
      $or: [
        { tags: { $regex:  query, $options: "i" } }, // Case-insensitive search in tags array
        { postTitle: { $regex:  query, $options: "i" } }, // Case-insensitive search in postTitle
      ],
    }).populate("posted_by") // Populate the posted_by field with the admin details
      .sort({ created_at: -1 }) // Sort by latest
      .limit(10); // Limit to 10 results
// sending jobs as well as UserId to the frontend
    res.status(200).send({jobs,"Id":req.body.UserId});
  } catch (err) {
    console.error("Error in /searchJobs route:", err);
    res.status(500).send({ msg: "Something went wrong", error: err.message });
  }
});





module.exports = {adminRoute}
