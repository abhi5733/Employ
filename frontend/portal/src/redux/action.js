import {Get ,  Login,  Logout,  loading, stopLoading , user  } from "./actionType" 
import axios from "axios"
// require('dotenv').config()

// login function

export const loginFunction = (obj)=>(dispatch)=>{
    // http://localhost:7300/
    // console.log(1)
  return  axios.post(`${import.meta.env.VITE_URL}/user/login`, obj).then((res)=>res)
    .catch((err)=>err)

}

// admin login function 


export const adminLoginFunction = (obj)=>(dispatch)=>{

    return  axios.post(`${import.meta.env.VITE_URL}/user/adminLogin`, obj).then((res)=>res)
      .catch((err)=>err)
  
  }


export const logged = ()=>{
return{
    type:Login
}
}

// logout 


export const handleLogout = ()=>{
    return{
        type:Logout
    }
    }
    

// signup function

export const signupFunction = (state)=>(dispatch)=>{

    return axios.post(`${import.meta.env.VITE_URL}/user/register` , state).then((res)=>res)
    .catch((err)=>err)

}

// signup for admin 

export const admiSignupFunction = (state)=>(dispatch)=>{

    return axios.post(`${import.meta.env.VITE_URL}/user/adminRegister` , state).then((res)=>res)
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
