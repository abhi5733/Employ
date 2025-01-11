import React, { useState } from 'react'
import  "../styles/Login.css"
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input ,  useToast ,  Flex, Heading, Icon ,Text , Image } from '@chakra-ui/react'
import axios from "axios"
import { useDispatch , useSelector } from 'react-redux'
import { adminLoginFunction, loadingFunction, logged, loginFunction, stoploadingFunction } from '../redux/action'
import { IoMdCheckmark } from "react-icons/io";
import loader from "../assets/loader.gif"
// import { loading, stopLoading } from '../redux/actionType'
import loginImage from "../assets/EmployImage1.jpg"
import {useNavigate} from "react-router-dom"

const Login = () => {
const navigate = useNavigate()
const user = useSelector((store)=>store.user)
const load = useSelector((store)=>store.load)
const login = useSelector((store)=>store.login)

  const dispatch= useDispatch() 
  const toast =  useToast()
  const[state,setState] = useState({})

  const handleChange = (e)=>{

    const {value , name} =  e.target

    setState({...state, [name]:value})
   
  }

//  handling user login 
  const  handleSubmit = async (e)=>{
    try{
    e.preventDefault() ;
    dispatch(loadingFunction()) ;
  const res  = await  dispatch(loginFunction(state)) ;
    if(res.status==200){
  console.log(res);
  localStorage.setItem("token" , res.data.token);
  localStorage.setItem("role", "user");  // storing the role 

   dispatch(logged());
    
   toast({
      description: "Login Successfull.",
      status: 'success',
      position:"top",
      duration: 2000,
      isClosable: true,
    });
    dispatch(stoploadingFunction());
     navigate("/profile") 
  }else{
    toast({
      description: "Login failed.",
      status: 'error',
      position:"top",
      duration: 2000,
      isClosable: true,
    });
    dispatch(stoploadingFunction());
    
  }
  }catch(err){
   console.log(err);
   toast({
      description: "Login failed.",
      status: 'error',
      position:"top",
      duration: 2000,
      isClosable: true,
    });
    dispatch(stoploadingFunction())}
  }
 




// handling admin login 



const  handleAdminSubmit = async (e)=>{
  e.preventDefault() ;
  dispatch(loadingFunction()) ;
  try{


const res  = await  dispatch(adminLoginFunction(state)) ;
  if(res.status==200){
console.log(res);
localStorage.setItem("token" , res.data.token);
localStorage.setItem("role", "admin");  // storing the role 
 dispatch(logged());
  
 toast({
    description: "Login Successfull.",
    status: 'success',
    position:"top",
    duration: 2000,
    isClosable: true,
  });
  dispatch(stoploadingFunction());
   navigate("/profile") 
}else{

  toast({
    description: "Login failed.",
    status: 'error',
    position:"top",
    duration: 2000,
    isClosable: true,
  });
  dispatch(stoploadingFunction());
  
}
}catch(err){
 console.log(err);
 toast({
    description: "Login failed.",
    status: 'error',
    position:"top",
    duration: 2000,
    isClosable: true,
  });
  dispatch(stoploadingFunction())}
}

  return (
    
  <Box bgColor={"#f8f8fc"} > 
    { load &&  <Image position="absolute" src={loader} left={"50%"} top={"50%"} transform={"translate(-50%,-50%)"}   margin={"auto"} h={"500px"}  w={"500px"}  /> }
   
  {user=="user"?
  <Box width="80%" margin="auto"  >
                        {/* loader Image */}

  <Flex flexDirection={["column","column","row","row"]} width={"100%"} gap={5}   >

    <Box w={[ "100%","100%","50%","50%"]} boxShadow={"2xl"} h={"500px"} mt={[10 ,10,100,100]} bgColor={"white"} borderRadius={"10px"} p={5}  >

<Heading fontSize={"xl"} >New to EmployMe ?</Heading>
<Box mt={2} lineHeight={10}  >

  <Flex alignItems={"center"} > <Icon as={IoMdCheckmark} m={2} /> <Text>One click apply using naukri profile.</Text> </Flex>
  <Flex alignItems={"center"} > <Icon as={IoMdCheckmark}  m={2} /> <Text>Get relevant job recommendations.</Text> </Flex>
  <Flex alignItems={"center"}> <Icon as={IoMdCheckmark}  m={2} /> <Text>Showcase profile to top companies and consultants.</Text> </Flex>
  <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  mt={2}>Register for free</Button>

</Box>

<Image  src={loginImage} height={["100px","100px" , "100px" ,"200px"]} width={"50%"} mt={10} />

    </Box>

  <Box w={[ "100%","100%","50%","50%"]} m={"auto"} boxShadow={"2xl"} h={"500px"} bgColor={"white"} borderRadius={"10px"}   mt={[10 ,10,100,100]} p={5} > 
  <form onSubmit={handleSubmit}> 
  <FormControl  isRequired >
<Heading fontSize={"xl"} >Login</Heading>
  <FormLabel mt={5} >Email address</FormLabel>
  <Input type='email' name="email" onChange={handleChange} value={state.email}  /> 
  <FormErrorMessage>Email is required.</FormErrorMessage>
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <FormLabel mt={5} >Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange} value={state.password} /> 
  
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <Button type='submit'mt={5}  color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}>Submit</Button>
  </FormControl>
  </form>
  </Box>
 
  </Flex>

  </Box>:
  <Box width="80%" margin="auto"> 
   {/* { load &&  <Image position="absolute" src={loader} left={"50%"} top={"50%"} transform={"translate(-50%,-50%)"}   margin={"auto"} h={"500px"}  w={"500px"}  /> } */}
  
  <Flex  flexDirection={["column","column","row","row"]} width={"100%"} gap={5} >

    <Box w={[ "100%","100%","50%","50%"]} boxShadow={"2xl"}   mt={[10 ,10,100,100]} bgColor={"white"} borderRadius={"10px"} p={5}  >

<Heading fontSize={"xl"} >From Campus to Senior Level Hiring</Heading>
<Box mt={2} lineHeight={10}  >
<Text>Bouquet of solutions to meet all your hiring needs</Text>
</Box>

<Image  src="https://static.naukimg.com/s/5/117/i/loginFormImage.f7f800ccb930349b460a.png" width={"50%"} mt={10} />

    </Box>

  <Box  w={[ "100%","100%","50%","50%"]} m={"auto"} boxShadow={"2xl"} h={"500px"} bgColor={"white"} borderRadius={"10px"}    mt={[10 ,10,100,100]} p={5} > 
  <form onSubmit={handleAdminSubmit}> 
  <FormControl  isRequired >
<Heading fontSize={"xl"} >Login</Heading>
  <FormLabel mt={5} >Email address</FormLabel>
  <Input type='email' name="email" onChange={handleChange} value={state.email}  /> 
  <FormErrorMessage>Email is required.</FormErrorMessage>
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <FormLabel mt={5} >Password</FormLabel>
  <Input type="password" name="password" onChange={handleChange} value={state.password} /> 
  
  {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} type='submit'mt={5} >Submit</Button>
  </FormControl>
  </form>
  </Box>
 
  </Flex>

  </Box>
  
}
  </Box>
  
  
  )
}

export default Login