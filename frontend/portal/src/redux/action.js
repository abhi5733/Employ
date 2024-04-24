import {Get ,  Login,  loading, stopLoading , user  } from "./actionType" 
import axios from "axios"
// require('dotenv').config()

// login function

export const loginFunction = (obj)=>(dispatch)=>{
    // http://localhost:7300/
  return  axios.post(`https://employme-b4ru.onrender.com/user/login`, obj).then((res)=>res)
    .catch((err)=>err)

}

// admin login function 


export const adminLoginFunction = (obj)=>(dispatch)=>{

    return  axios.post(`http://localhost:7300/user/adminLogin`, obj).then((res)=>res)
      .catch((err)=>err)
  
  }


export const logged = ()=>{
return{
    type:Login
}
}

// signup function

export const signupFunction = (state)=>(dispatch)=>{

    return axios.post("http://localhost:7300/user/register" , state).then((res)=>res)
    .catch((err)=>err)

}

// signup for admin 

export const admiSignupFunction = (state)=>(dispatch)=>{
console.log(state)
    return axios.post("http://localhost:7300/user/adminRegister" , state).then((res)=>res)
    .catch((err)=>err)

}



export const getFunction = ({type})=>{
    console.log("inside function")
    return {
        type
    }
}

export const loadingFunction = ()=>{
    return{
        type:loading
    }
}



export const stoploadingFunction = ()=>{
    return{
        type : stopLoading
    }
}

// user or admin 

export const userFunction = (payload)=>{
   
    return{
        type: user,
        payload 
    }
}
