import { Box, Button, Flex , Image , Text} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import dpImage from "../assets/abhidp.jpg"
import { Link } from 'react-router-dom'
import axios from "axios"

const Profile = () => {

  const [state,setState] = useState({})

  useEffect(()=>{

  axios.get("http://localhost:7300/admin/", {
      headers:{
        authorization : localStorage.getItem("token")
      }
    }).then((res)=>{console.log(res.data[0]),setState(res.data[0])})
    .catch((err)=>console.log(err))

  },[])

console.log(state)
  return (

<Box width={"80%"} border={"1px solid black"} margin={"20px auto"} >
  
  <Flex gap={5} >

<Box width={"30%"} border={"1px solid black"} textAlign={"center"} height={"200px"} p={2} >
  
  <Image src={state.profilePic?state.profilePic:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} height={"100px"} borderRadius={"100%"} margin={" 5px auto"} />
  <Text>{state.name}</Text>
  
  <Link to="/completeProfile" >  <Button>Complete Profile</Button> </Link>

</Box>
<Box width={"100%"} border={"1px solid black"}   height={"200px"} p={2} >

</Box>
<Box width={"30%"} border={"1px solid black"}  height={"200px"} p={2} > 

</Box>

</Flex>

</Box>

)

}

export default Profile