import React, { useEffect, useState } from 'react'
import "../styles/Navbar.css"
import { Link } from 'react-router-dom'
import { Box, Button, Center, Divider, Flex, Image, Input, Text } from '@chakra-ui/react'
import { FaChevronDown ,  FaChevronUp  } from "react-icons/fa";
import logo from "../assets/EmployMe2.jpg"
import {useDispatch,useSelector} from "react-redux"
import { handleLogout, userFunction } from '../redux/action';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";


const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector((store)=>store.user);
   const token = useSelector((store)=>store.token)
   const load = useSelector((store)=>store.load)
   const[hamburger,setHamburger] = useState(false)
    
  

    const Logout = ()=>{

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch( handleLogout())

    }
   


    return (
                      

    <Box   id='navbar' style={{ position:"sticky" , top:"0px"  , backgroundColor:"white" ,boxShadow:"dark-lg" , zIndex:"100"}} height={["60px" , "10vh"  , "10vh" , "10vh" ]} >

          <Flex zIndex={10} display={["none","flex","flex","flex"]} style={{  alignItems:"center" , justifyContent:"space-between"   }}  width={["90%", "80%" , "80%" , "80%"]} height={"90%"} >                           
        <Flex style={{fontSize:"20"    ,justifyContent:"space-evenly" , alignItems:"center"   }} height={"90%"} width={["20%" , "50%" , "50%" ,"50%" ]} > 
        <Link to="/" > <Image  width={["100px" ,"100px" ,"100px" ,"150px"  ]} height={"100%"} src={logo} alt='Logo' /> </Link>  
   {user=="user"?<Link to="/jobs" > <Text display={["none" , "block" , "block" , "block"]} fontSize={[5,20,20,20]} fontWeight={"semibold"} > Jobs </Text> </Link>:""}
   <Link to="/profile" > <Text display={["block" , "block" , "block" , "block"]} fontSize={[5,20,20,20]} fontWeight={"semibold"} > Profile </Text>  </Link> 
   </Flex>
   {/* logout button */}
   {token==null?
   <Flex style={{   alignItems:"center" }} justifyContent={["center","flex-end","flex-end","flex-end"]}  height={"90%"} width={["80%" , "50%" , "50%" ,"50%" ]} > 
   <Link to="/login" >  <Button borderRadius={"50px"} display={["none" , "block" , "block" , "block"]} width={["none", "80px" , "80px" , "100px"]} color={"blue"} bgColor={"white"}  >Login</Button> </Link>
   <Link to="/signup" >    <Button style={{margin:"5px"}} display={["none" , "block" , "block" , "block"]} width={["none", "80px" , "80px" , "100px"]}  color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} borderRadius={"50px"} >Register</Button> </Link>
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

     <Box display={["block" , "none" , "none" , "none"]} style={{ position:"relative", width:"90%" }} height={[ "100%" ,"80%" ,"60px" ,"60px"  ]} >
      <Input backgroundColor={"#f8f8fc"}  width={[ "100%" , "60%"  ,"60%" , "60%"]}  style={{ height:"100%"  , border:"0", border:"1px solid black"  , boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"  }}  borderRadius={["20px" , "50px" , "50px" , "50px" ]} /> 
      <Button style={{position:"absolute" , height:"60%" }} top={["20%" , "10%" , "10%" , "10%"]} borderRadius={["10px" , "50px" , "50px" , "50px" ]} right= {[ "5%","2%","2%", "21%"]}   width={[ "30%" ,  "auto" , "auto" , "auto"]}  >Search</Button> </Box> 
   </Flex>: <Button  color={"white"}  _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  onClick={Logout} >Logout</Button>}
   </Flex>


{/* for mobile screen */}
<Flex  bgColor={"white"}  p={2} w={"100%"} alignItems={"center"}  justifyContent={"space-between"} display={["flex","none","none","none"]}>

<Link to="/" > <Image  width={["100px" ,"100px" ,"100px" ,"150px"  ]} src={logo} alt='Logo' /> </Link>  
<GiHamburgerMenu onClick={()=>setHamburger(true)} style={{fontSize:"20px"}} />
{hamburger?<Box zIndex={"1000"} onClick={()=>setHamburger(false)} pos={"fixed"} top={"0"} left={"0"} right={"0"} w={"100vw"} h={"100vh"}     bgColor="rgba(0, 0, 0, 0.5)" >
  <Flex  bgColor={"white"} p={2}  pos={"relative"} flexDirection={"column"}  justifyContent={"space-between"} > 
   <MdOutlineCancel style={{fontSize:"20px" ,  position:"absolute" , right:"10px" , top:"10px"}} />
   {user=="user"?
    <Flex  w={"100%"} justifyContent={"center"}  display={["flex" , "flex" , "flex" , "flex"]} alignItems={"center"} onClick={()=>dispatch(userFunction("admin"))}  > 
      <Link to="/login">  <Text style={{marginLeft:"20px"  }}  fontSize={[20,10,10,20]}  _hover={{  borderBottomWidth: 5, borderBottomColor: 'orange' ,cursor:"pointer" }} >For Employers</Text> </Link>
    <FaChevronDown style={{margin:"5px"  }}      />
     </Flex>:
     <Flex  w={"100%"}  justifyContent={"center"} display={["flex" , "flex" , "flex" , "flex"]} alignItems={"center"} onClick={()=>dispatch(userFunction("user"))}  > 
     <Text style={{marginLeft:"20px"  }}  fontSize={[20,10,10,20]}    _hover={{  borderBottomWidth: 5, borderBottomColor: 'orange' ,cursor:"pointer" }}  >For Job Seekers</Text>
   <FaChevronDown style={{margin:"5px"  }}      />
    </Flex> }
   {user=="user"?<Link to="/jobs" > <Text mt={5} ml={2} display={["block" , "block" , "block" , "block"]} fontSize={[20,10,10,20]} fontWeight={"semibold"} > Jobs </Text> </Link>:""}
   <Link to="/profile" > <Text mt={5}  ml={2} display={["block" , "block" , "block" , "block"]} fontSize={[20,10,10,20]} fontWeight={"semibold"} > Profile </Text>  </Link> 
  {/* logout button */}
  {token==null?
  <> 
   <Link  to="/login" >  <Text mt={5}  ml={2} display={["block" , "block" , "block" , "block"]} fontSize={[20,10,10,20]} fontWeight={"semibold"} > Login </Text>  </Link>
   <Link  to="/signup" >    <Text mt={5}  ml={2} display={["block" , "block" , "block" , "block"]} fontSize={[20,10,10,20]} fontWeight={"semibold"} >Register</Text>  </Link>




      </>: <Button mt={5}  w={["100px","50px","",""]}  h={["40px","","",""]}  color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  onClick={Logout} >Logout</Button>}

  </Flex>

</Box> :""}
</Flex>

   </Box>
   

    )
}

export default Navbar