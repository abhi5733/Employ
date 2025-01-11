import { Box, Button, Flex , Heading, Image , Text, useToast} from '@chakra-ui/react'
import React from 'react'
import placeholder from "../assets/placeholderImage.png"
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { LiaIndustrySolid } from "react-icons/lia";
import { IoBookSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const AdminProfile = ({state ,applicant,setApplicant ,resume ,setResume ,jobList ,handleAllApplicants,applicantData}) => {

  return (
<Box  width={[ "90%","80%","80%","80%"]}  margin={"20px auto"} > 
<Flex  flexDirection={["column","column","column","row"]}  gap={5}>  <Box height={["auto","auto","auto","500px"]} width={[ "100%","100%","100%", "30%"]} bgColor={"white"} border={"2px solid orange"}  borderRadius={"10px"}  textAlign={"center"}  p={5} >
  
 <Image src={state?.profilePic?state.profilePic:placeholder} height={"200px"} borderRadius={"100%"} margin={" 5px auto"} /> 
<Text mt={"10px"}>{state?.name}</Text> 
  
 {applicant?<Link to="/profile" >  <Button bgColor={"darkorange"}  onClick={()=>setApplicant(false)} mt={"10px"} color={"white"} _hover={{bgColor:"orange"}} >Back</Button> </Link>:<Link to="/completeProfile" >  <Button bgColor={"darkorange"}  mt={"10px"} color={"white"} _hover={{bgColor:"orange"}} >View Profile</Button> </Link>}

<Box  mt={"50px"}>
 
</Box>

</Box> 
{/* jobs posted */}
{applicant?<Box p={2} backgroundColor={"white"} width={["100%","100%","100%","80%"]}  borderRadius={10} border={"2px solid orange"} > 
  {applicantData.length>0?applicantData.map((el)=>{
  return  <Box border={"1px solid lightgray"} p={2} mt={5} borderRadius={"10px"}  >
      <Text><b>Name : </b>{el.name}</Text>
      <Text><b>Email : </b>{el.email}</Text>
      <Text><b>Number : </b>{el.number}</Text>
      {resume?<Button mt={2} color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  onClick={()=>setResume(false)} >Back</Button>:<Button  mt={2} color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} onClick={()=>setResume(true)} >View Resume</Button>}
      {resume && 
      <Box w="100%" > 
       {el?.resume!=""?<iframe src={el?.resume}  style={{width:"100%" , height:"500px" , border:"1px solid red",marginTop:"5px"}} ></iframe>
        :<Text>Resume Not uploaded Yet</Text>}</Box> }
    </Box>
  }):<Text><b> No Applicants Yet </b></Text>}
</Box>:
<Box p={10} border={"2px solid orange"}  bgColor={"white"} borderRadius={"10px"} width={"100%"}>
<Text fontSize={"x-large"} fontWeight={"bold"} textAlign={"center"} >Jobs Posted</Text>
{jobList.length>0?jobList.map((el)=>{
  return <Box key={el._id} p={2} border={"1px solid lightgray"} mt={5} borderRadius={"10px"}  >
    <Text fontSize={"large"} ><b>Title : </b> {el.postTitle}</Text>
    <Text fontSize={"medium"} ><b>Company Name : </b>{el.company_name}</Text>

    <Text fontSize={"medium"} ><b>Description : </b>{el.description}</Text>
    <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  mt={2} onClick={()=>{handleAllApplicants(el._id),setApplicant(true)}}>View Applicants</Button>
  </Box>
}):<Box>No Jobs Posted Yet</Box> }
</Box>}
 </Flex> </Box> 
  )
}

export default  AdminProfile