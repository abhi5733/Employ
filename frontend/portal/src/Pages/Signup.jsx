import React, { useState } from 'react'
import "../styles/Signup.css"
import {getFunction } from "../redux/action"
import { useDispatch, useSelector } from 'react-redux'
import { Get } from '../redux/actionType'
import { Box , FormControl , FormLabel , Input ,  Image ,Flex, Text,  Heading,  Button} from '@chakra-ui/react'
import { FaRegCircleCheck } from "react-icons/fa6";
import axios from 'axios'
const Signup = () => {

  const[state,setState] = useState({})

    const dispatch = useDispatch()
    const store = useSelector((store)=>store.count)
  
    const handleClick = ()=>{

        dispatch(getFunction({type:Get,payload:5}))
    
    }

    const handleSubmit = (e)=>{
      e.preventDefault()
axios.post("https://employme-b4ru.onrender.com/user/register" , state).then((res)=>console.log(res))
.catch((err)=>console.log(err))
    }

    const handleChange = (e)=>{

      const {value , name} =  e.target
  
      setState({...state, [name]:value})
      console.log(state)
    }
  return (
<Box width="80%"  border={"1px solid black"}  margin="20px auto"  >

  <Flex>

<Box border={"1px solid black"} p={2}  >
  <Image w={'60%'}  margin={"50px auto"} src="https://static.naukimg.com/s/7/104/assets/images/white-boy.a0d2814a.png" alt="text" />
 <Text textAlign={"Center"} fontWeight="bold" m={10}  >On registering , you can</Text>
<Flex alignItems={"center"} ><FaRegCircleCheck /> <Text m={2} >Build your Profie and let recruiters find you</Text></Flex>
<Flex alignItems={"center"} ><FaRegCircleCheck/> <Text m={2}>Build your Profie and let recruiters find you</Text></Flex>
<Flex alignItems={"center"} ><FaRegCircleCheck/> <Text m={2}>Build your Profie and let recruiters find you</Text></Flex>
</Box>

<form onSubmit={handleSubmit}> 
  <FormControl  isRequired >
  <FormLabel >Name</FormLabel>
  <Input type='name' name="name" onChange={handleChange} value={state.name}  /> 
  <FormLabel >Email address</FormLabel>
  <Input type='email' name="email" onChange={handleChange} value={state.email}  /> 
  <FormLabel >Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange} value={state.password} /> 
  {/* <FormLabel >Retry Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange}  /> */}
  <FormLabel >Mobile Number</FormLabel>
  <Input type="number" name="number" onChange={handleChange} value={state.password} />
  <FormLabel >Work Status</FormLabel>

<Flex>

<Flex  border={"1px solid black"} p={2} value="Exp" name="Exp" _hover={{cursor:"pointer"}} onClick={(e) => handleChange()} > 
<Box>
  <Heading size="sm" >I am Experienced</Heading>
  <Text>I have work Experience </Text>
  <Text>(Excluding internship)</Text>
</Box>
<Image ml={5} src="https://static.naukimg.com/s/7/104/assets/images/briefcase.bdc5fadf.svg" />
</Flex>

<Flex  border={"1px solid black"} p={2} value="fresh" name="fresh" _hover={{cursor:"pointer"}} onClick={ handleChange } > 
<Box >
  <Heading size="sm" >I am Fresher</Heading>
  <Text>I am a Student /</Text>
  <Text>Haven't worked after graduation</Text>
</Box>
<Image ml={5} src="https://static.naukimg.com/s/7/104/assets/images/schoolbag.a54cbf7a.svg" />
</Flex>

</Flex>

  <Button type='submit'mt={5} >Register Now</Button>
  
  
  </FormControl>
  </form>


  </Flex>

</Box>
    )
}

export default Signup