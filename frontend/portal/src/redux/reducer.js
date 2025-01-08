
import {Get, Login, Logout, loading, stopLoading , user} from "./actionType" 

const initialState = {
    count:0,
    load:false,
    login : false,
    user: localStorage.getItem("role") || "user" ,
    token : localStorage.getItem("token") 
    
}

 const reducer = (state = initialState,action)=>{

    switch(action.type){

        case Get:
            return {...state,count: state.count + action.payload}
        case loading:
            return {...state,load:true}
        case stopLoading:
            return {...state , load:false}
        case Login :
            return {...state , login:true , token:localStorage.getItem("token")}  
        case user :
            return {...state , user:action.payload}   
        case Logout:
            return {...state, token:localStorage.getItem("token") ,  login:false }
        default:
            return state


    }

 }

 export default reducer