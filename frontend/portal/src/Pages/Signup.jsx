import React, { useState } from 'react'
import "../styles/Signup.css"
import {admiSignupFunction, getFunction, loadingFunction, signupFunction, stoploadingFunction } from "../redux/action"
import { useDispatch, useSelector } from 'react-redux'
import { Get } from '../redux/actionType'
import { Box , FormControl , FormLabel , Input ,  Image ,Flex, Text,  Heading,  Button ,useToast} from '@chakra-ui/react'
import { FaRegCircleCheck } from "react-icons/fa6";
import axios from 'axios'
import loader from "../assets/loader.gif"
import {Navigate, useNavigate} from "react-router-dom"

const Signup = () => {
  
  const user = useSelector((store)=>store.user)
  const toast = useToast()
  const[state,setState] = useState({})  // user state
  const[adminState,setAdminState] = useState({}) // admin state 
  const load = useSelector((store)=>store.load)
  const dispatch = useDispatch()
  const store = useSelector((store)=>store.count)
  const navigate = useNavigate()

  // handle submit for users 

  const handleSubmit = (e)=>{
      e.preventDefault()
      console.log(state);
      dispatch(loadingFunction())
     dispatch(signupFunction(state)).then((res)=>{console.log(res?.data?.msg || res.response.data.msg) , toast({
  description: res?.data?.msg || res.response.data.msg,
  status: res?.data?.msg ? 'success' : 'error',
  position:"top",
  duration: 2000,
  isClosable: true,
  }),dispatch(stoploadingFunction()) , navigate("/login")  })
  .catch((err)=> {console.log(err),toast({
  description: "Registeration failed.",
  status: 'error',
  position:"top",
  duration: 2000,
  isClosable: true,
  }),dispatch(stoploadingFunction()) } )
    
}


// handle submit for admin

const handleAdminSubmit = (e)=>{

  e.preventDefault()
  console.log(adminState);
  dispatch(loadingFunction())
 dispatch(admiSignupFunction(adminState)).then((res)=>{console.log(res?.data?.msg || res.response.data.msg) , toast({
description: res?.data?.msg || res.response.data.msg,
status: res?.data?.msg?'success':"error",
position:"top",
duration: 2000,
isClosable: true,
}),dispatch(stoploadingFunction()) , <Navigate to="/login" /> })
.catch((err)=> {console.log(err,"err") , toast({
description:  "Admin Registeration failed.",
status: 'error',
position:"top",
duration: 2000,
isClosable: true,
}),dispatch(stoploadingFunction())  } )

}



  const handleStatus = (num)=>{
  setState({...state,status:num})
    }

// handling change for user

  const handleChange = (e)=>{

  const {value , name} =  e.target
  
  setState({...state, [name]:value})
     
  }

  // handling changes for admin 

  const handleAdminChange = (e)=>{

    const {value , name} =  e.target

    setAdminState({...adminState,[name]:value})

  }



  return (
    <Box  bgColor={"#f8f8fc"}  > 

{user=="user"?
  <Box width="80%" p={[2,10,10,10]}   margin="auto"  >

  <Flex gap={20} flexDirection={["column","column","row","row"]} >
  { load &&  <Image position="absolute" src={loader} left={"50%"} top={"50%"} transform={"translate(-50%,-50%)"}    margin={"auto"}  w={"500px"} h={"500px"}  /> }
<Box borderRadius={20}  bgColor={"white"} boxShadow={"lg"} mt={"20px"}  w={[ "100%","100%","50%","50%"]}p={2}  >
  <Image w={'60%'}  margin={"50px auto"} src="https://static.naukimg.com/s/7/104/assets/images/white-boy.a0d2814a.png" alt="text" />
 <Text textAlign={"Center"} fontWeight="bold" m={10}  >On registering , you can</Text>
<Flex alignItems={"center"} ><FaRegCircleCheck /> <Text m={2} >Build your Profie and let recruiters find you</Text></Flex>
<Flex alignItems={"center"} ><FaRegCircleCheck/> <Text m={2}>Build your Profie and let recruiters find you</Text></Flex>
<Flex alignItems={"center"} ><FaRegCircleCheck/> <Text m={2}>Build your Profie and let recruiters find you</Text></Flex>
</Box>
<Box boxShadow={"lg"}  w={[ "100%","100%","50%","50%"]} mt={"20px"}  bgColor={"white"}  borderRadius={20} p={2} > 
<form onSubmit={handleSubmit}> 
  <FormControl  isRequired p={2} >

<Heading fontSize={"xl"} mt={5} >Create your EmployMe profile</Heading>
<Text>Search & apply to jobs from India's No.1 Job Site</Text>
  <FormLabel mt={5}>Name</FormLabel>
  <Input type='name' name="name" onChange={handleChange} value={state.name}  /> 
  <FormLabel mt={5}>Email address</FormLabel>
  <Input type='email' name="email" onChange={handleChange} value={state.email}  /> 
  <FormLabel mt={5}>Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange} value={state.password} /> 
  {/* <FormLabel >Retry Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange}  /> */}
  <FormLabel mt={5}>Mobile Number</FormLabel>
  <Input type="number" name="number" onChange={handleChange} value={state.number} />
  <FormLabel mt={5}>Work Status</FormLabel>

<Flex flexDirection={["column","row","row","row"]}   justifyContent={"space-between"} gap={2} >

<Flex flexDirection={["column","column","column","row"]} border={"1px solid lightgray"} _hover={{boxShadow:"md" ,cursor:"pointer" }}  borderRadius={"10px"} p={2} value="Exp" name="Exp" onClick={(e) => handleStatus("experienced")} > 
<Box>
  <Heading size="sm" >I am Experienced</Heading>
  <Text>I have work Experience </Text>
  <Text>(Excluding internship)</Text>
</Box>
<Image ml={2} mt={["10px","10px","10px",""]} w={[  "30%","30%", "50%"  ,"20%"]} src="https://static.naukimg.com/s/7/104/assets/images/briefcase.bdc5fadf.svg" />
</Flex>

<Flex flexDirection={["column","column","column","row"]}  border={"1px solid lightgray"} _hover={{boxShadow:"lg" ,cursor:"pointer" }}   borderRadius={"10px"} p={2} value="fresh" name="fresh"  onClick={(e) => handleStatus("fresher")} > 
<Box >
  <Heading size="sm" >I am Fresher</Heading>
  <Text>I am a Student /</Text>
  <Text>Haven't worked after graduation</Text>
</Box>
<Image ml={2}  mt={["10px","10px","10px",""]} w={[  "30%","30%", "50%"  ,"20%"]}   src="https://static.naukimg.com/s/7/104/assets/images/schoolbag.a54cbf7a.svg" />
</Flex>

</Flex>
<FormLabel mt={5}>City</FormLabel>
<Input type='text' name="city" value={state.city} onChange={handleChange}  />
  <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} isDisabled={state.status?false:true} type='submit'mt={5} >Register Now</Button>
  
  </FormControl>
  </form>

  </Box>

  </Flex>

</Box>:

<Box width="80%" p={10}   margin="auto" >
<Flex flexDirection={["column","column","row","row"]} gap={20}  > 
<Box w={"50%"} boxShadow={"2xl"}  h={"500px"} textAlign={"center"} position={"sticky"} top={"10vh"}  mt={50} bgColor={"white"} borderRadius={"10px"} p={5}  >

<Heading fontSize={"xl"} >From Campus to Senior Level Hiring</Heading>
<Box mt={2} lineHeight={10}  >
<Text>Bouquet of solutions to meet all your hiring needs</Text>
</Box>

<Image margin={"auto"} src="https://static.naukimg.com/s/5/117/i/loginFormImage.f7f800ccb930349b460a.png" width={"70%"} mt={10} />

    </Box>
<Box borderRadius={"10px"}  boxShadow={"2xl"} mt={50}  bgColor={"white"} w="50%" p={5}> 
<form onSubmit={handleAdminSubmit}> 
  <FormControl  isRequired p={2} >

<Heading fontSize={"xl"} mt={5} >Create your EmployMe profile</Heading>
<Text  mt={5}>Find the best talent for ypur Company</Text>
  <FormLabel mt={5}>Name</FormLabel>
  <Input type='name' name="name" onChange={handleAdminChange} value={adminState.name}  /> 
  <FormLabel mt={5}>Email address</FormLabel>
  <Input type='email' name="email" onChange={handleAdminChange} value={adminState.email}  /> 
  <FormLabel mt={5}>Password</FormLabel>
  <Input type="password" name="password" onChange={handleAdminChange} value={adminState.password} /> 
  {/* <FormLabel >Retry Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange}  /> */}
  <FormLabel mt={5}>Mobile Number</FormLabel>
  <Input type="number" name="number" onChange={handleAdminChange} value={adminState.number} />
 
<FormLabel mt={5}>Company Name</FormLabel>
<Input type='text' name="company" value={adminState.company} onChange={handleAdminChange}  />


<FormLabel mt={5}>Designation</FormLabel>
<Input type='text' name="designation" value={adminState.designation} onChange={handleAdminChange}  />




  <Button  color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} type='submit'mt={5} >Register Now</Button>
 
  </FormControl>
  </form> </Box>
  </Flex>
</Box>   }




</Box>
 
 )

}




export default Signup