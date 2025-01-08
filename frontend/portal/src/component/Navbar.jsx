import React, { useEffect, useState } from 'react'
import "../styles/Navbar.css"
import { Link } from 'react-router-dom'
import { Box, Button, Center, Divider, Flex, Image, Input, Text } from '@chakra-ui/react'
import { FaChevronDown ,  FaChevronUp  } from "react-icons/fa";
import logo from "../assets/EmployMe2.jpg"
import {useDispatch,useSelector} from "react-redux"
import { handleLogout, userFunction } from '../redux/action';

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector((store)=>store.user);
   const token = useSelector((store)=>store.token)
   const load = useSelector((store)=>store.load)
    
  

    const Logout = ()=>{

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch( handleLogout())

    }
   


    return (
                                                                                                                                                                                                                                                                                                                       
    <Box id='navbar' style={{ position:"sticky" , top:"0px" , zIndex:100  , backgroundColor:"white" ,boxShadow:"dark-lg" }} height={["60px" , "10vh"  , "10vh" , "10vh" ]} >
          <Flex style={{  alignItems:"center"  }} width={["90%", "80%" , "80%" , "80%"]} height={"90%"} >                           
        <Flex style={{fontSize:"20"    ,justifyContent:"space-evenly" , alignItems:"center"   }} height={"90%"} width={["20%" , "50%" , "50%" ,"50%" ]} > 
        <Link to="/" > <Image  width={["100px" ,"100px" ,"100px" ,"150px"  ]} src={logo} alt='Logo' /> </Link>  
   <Link to="/jobs" > <Text display={["none" , "block" , "block" , "block"]} fontSize={[5,10,10,20]} fontWeight={"semibold"} > Jobs </Text> </Link>
   <Link to="/profile" > <Text display={["none" , "block" , "block" , "block"]} fontSize={[5,10,10,20]} fontWeight={"semibold"} > Profile </Text>  </Link> 
   </Flex>
   {/* logout button */}
   {token==null?
   <Flex style={{   alignItems:"center" }} justifyContent={["center","flex-end","flex-end","flex-end"]}  height={"90%"} width={["80%" , "50%" , "50%" ,"50%" ]} > 
   <Link to="/login" >  <Button borderRadius={"50px"} display={["none" , "block" , "block" , "block"]} width={["none", "50px" , "80px" , "100px"]} color={"blue"} bgColor={"white"}  >Login</Button> </Link>
   <Link to="/signup" >    <Button style={{margin:"5px"}} display={["none" , "block" , "block" , "block"]} width={["none", "50px" , "80px" , "100px"]}  color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} borderRadius={"50px"} >Register</Button> </Link>
    <Center height='50px'  >
    <Divider  orientation='vertical' />
    </Center> 

{user=="user"?
    <Flex display={["none" , "flex" , "flex" , "flex"]} alignItems={"center"} onClick={()=>dispatch(userFunction("admin"))}  > 
      <Link to="/login">  <Text style={{marginLeft:"20px"  }}  fontSize={[5,10,10,20]}    _hover={{  borderBottomWidth: 5, borderBottomColor: 'orange' ,cursor:"pointer" }}  >For Employers</Text> </Link>
    <FaChevronDown style={{margin:"5px"  }}      />
     </Flex>:
     <Flex display={["none" , "flex" , "flex" , "flex"]} alignItems={"center"} onClick={()=>dispatch(userFunction("user"))}  > 
     <Text style={{marginLeft:"20px"  }}  fontSize={[5,10,10,20]}    _hover={{  borderBottomWidth: 5, borderBottomColor: 'orange' ,cursor:"pointer" }}  >For Job Seekers</Text>
   <FaChevronDown style={{margin:"5px"  }}      />
    </Flex> }

     <Box display={["block" , "none" , "none" , "none"]} style={{ position:"relative", width:"90%" }} height={[ "100%" ,"80%" ,"60px" ,"60px"  ]} ><Input backgroundColor={"#f8f8fc"}  width={[ "100%" , "60%"  ,"60%" , "60%"]}  style={{ height:"100%"  , border:"0", border:"1px solid black"  , boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"  }}  borderRadius={["20px" , "50px" , "50px" , "50px" ]} />    <Button style={{position:"absolute" , height:"60%" }} top={["20%" , "10%" , "10%" , "10%"]} borderRadius={["10px" , "50px" , "50px" , "50px" ]} right= {[ "5%","2%","2%", "21%"]}   width={[ "30%" ,  "auto" , "auto" , "auto"]}  >Search</Button> </Box> 
   </Flex>: <Button onClick={Logout} >Logout</Button>}
   </Flex>
   </Box>
  

    )
}

export default Navbar