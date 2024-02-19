
import {Get} from "./actionType" 

const initialState = {
    count:0
}

 const reducer = (state = initialState,action)=>{

    switch(action.type){

         case Get:
            return {...state,count: state.count + action.payload}


        default:
            return state


    }

 }

 export default reducer