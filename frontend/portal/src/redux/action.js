import {Get} from "./actionType" 



export const getFunction = ({type,payload})=>{
    console.log("inside function")
    return {
        type,payload
    }
}