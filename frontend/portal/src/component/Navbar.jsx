import React, { useState } from 'react'
import "../styles/Navbar.css"
import { Link } from 'react-router-dom'
import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import { FaChevronDown ,  FaChevronUp  } from "react-icons/fa";

const Navbar = () => {

    const[Logo,setLogo] = useState(false)

    const handleChange = ()=>{
        setLogo((prev)=>!prev)
    }


    return (
  
    <Box id='navbar' style={{ position:"sticky" , top:"0px" , zIndex:100  , backgroundColor:"white"}}  >
        <Flex style={{width:"80%" , border:"1px solid black" , alignItems:"center"}} > 
        <Flex style={{width:"50%" ,fontSize:"20"  ,   border:"1px solid black"  ,justifyContent:"space-evenly"  }} > 
        <Link to="/" >  <Text >Logo</Text> </Link>  
   <Link to="/login" > <Text fontFamily="serif" >Login</Text> </Link>
   <Link to="/signup" >   <h1 >Signup</h1> </Link> </Flex>
   <Flex style={{width:"50%" ,   border:"1px solid black"  ,justifyContent:"flex-end" ,alignItems:"center" }} > 
    <Button >Login</Button>
    <Button style={{margin:"5px"}} >Register</Button>
    <Center height='50px'  >
    <Divider orientation='vertical' />
    </Center>
      <Text style={{marginLeft:"20px" }} >For Employers</Text>
     { Logo ?<FaChevronDown style={{margin:"5px" }} onClick={handleChange}  />:<FaChevronUp style={{margin:"5px" }} onClick={handleChange} />  }

   </Flex>
   </Flex>
    </Box>
  

    )
}

export default Navbar