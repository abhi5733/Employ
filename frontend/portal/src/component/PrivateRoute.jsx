import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from "react-router-dom"

const PrivateRoute = ({children}) => {
  const login = useSelector((store)=>store.login)
 

if(!login){
   
    return children
}else{
  
    return<Navigate to="/profile" />

}
    


}

export default PrivateRoute