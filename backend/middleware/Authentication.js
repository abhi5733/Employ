
const jwt = require("jsonwebtoken")



  const authenticator = (req,res,next)=>{
// console.log(req.headers.authorization)
    
try{

const token = req.headers.authorization
    // console.log(token)
    const decoded = jwt.verify(token, 'masai');
    // console.log(decoded)

    if(decoded){
        console.log(decoded.UserId)
        req.body.UserId = decoded.UserId
       
        next()
    }else{
        res.send({"msg":"Authentication failed"})
    }
   

}catch(err){

    res.send({"msg":"Authentication failed"})

}


  }


  module.exports = {authenticator}