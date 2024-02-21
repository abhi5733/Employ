import React, { useState } from 'react'
import  "../styles/Login.css"
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import axios from "axios"


const Login = () => {
 
  const[state,setState] = useState({})

  const handleChange = (e)=>{

    const {value , name} =  e.target

    setState({...state, [name]:value})
    console.log(state)
  }


  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post("https://employme-b4ru.onrender.com/user/login" , state)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  
  }


  return (

  <Box width="80%" margin="auto" border="1px solid black" >
  
  <Box w={"50%"} m={"auto"} border="1px solid black" mt={100} p={5} > 
  <form onSubmit={handleSubmit}> 
  <FormControl  isRequired >
  <FormLabel >Email address</FormLabel>
  <Input type='email' name="email" onChange={handleChange} value={state.email}  /> 
  <FormErrorMessage>Email is required.</FormErrorMessage>
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <FormLabel >Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange} value={state.password} /> 
  
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <Button type='submit'mt={5} >Submit</Button>
  </FormControl>
  </form>
  </Box>
  </Box>

  
    
  )
}

export default Login