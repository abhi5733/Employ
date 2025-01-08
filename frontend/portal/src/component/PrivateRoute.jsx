import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {Navigate} from "react-router-dom"

const PrivateRoute = ({children}) => {
  const login = useSelector((store)=>store.login)
  const token = localStorage.getItem("token")
  const toast = useToast()
 console.log(token,"login")

if(!login && token==null){
    toast({
        description: "Login first.",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    return <Navigate to="/"/>
}else{
  
    return children

}
    


}

export default PrivateRoute