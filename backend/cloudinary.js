const { v2: cloudinary } = require('cloudinary');
const fs = require("fs")

cloudinary.config({ 
  cloud_name: process.env.cloudinary_name, 
  api_key: process.env.cloudinary_key, 
  api_secret: process.env.cloudinary_secret
});


const uploadonCloudinary = async (localfilepath)=>{

    try{

        if(!localfilepath) return null
        // uploading file on cloudinary
       const response = await cloudinary.uploader.upload(localfilepath
        ,{
            resource_type:"auto"
        })
        // file has ben uploaded successfully
        console.log(response)
return response
    }catch(err){
fs.unlink(localfilepath) 
// remove the locally saved temporarily file
return null ;

    }


}




  module.exports = {uploadonCloudinary}