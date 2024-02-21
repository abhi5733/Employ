import {Get} from "./actionType" 
import axios from "axios"


export const loginFunction = (obj)=>(dispatch)=>{
console.log(obj)
  return  axios.post("https://employme-b4ru.onrender.com/user/login", obj).then((res)=> res)
    .catch((err)=>err)

}


export const getFunction = ({type,payload})=>{
    console.log("inside function")
    return {
        type,payload
    }
}