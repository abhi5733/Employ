
import {Get, Login, loading, stopLoading , user} from "./actionType" 

const initialState = {
    count:0,
    load:false,
    login : false,
    user: "user"
    
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
            return {...state , login:true}  
         case user :
            return {...state , user:action.payload}   

        default:
            return state


    }

 }

 export default reducer