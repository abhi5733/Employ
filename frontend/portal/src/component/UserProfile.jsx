import { Box, Button, Flex , Heading, Image , Text, useToast} from '@chakra-ui/react'
import React from 'react'
import placeholder from "../assets/placeholderImage.png"
import { Link } from 'react-router-dom'
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { LiaIndustrySolid } from "react-icons/lia";
import { IoBookSharp } from "react-icons/io5";
import { IoBriefcase } from "react-icons/io5";



const UserProfile = ({state , viewJob ,setViewJob ,jobData ,showRightButton , showLeftButton , scrollContainerRef, latestJobs , handleApplyJob , handleViewJob ,  scrollRight ,  scrollLeft}) => {
  return (

    <Box width={[ "90%","80%","80%","80%"]}  margin={"20px auto"} >
      
      <Flex flexDirection={["column","column","column","row"]} gap={5} >
    
    {/******************************* Left Box **********************************************/}
    <Box width={[ "100%","100%","100%", "30%"]} height={"600px"} bgColor={"white"} border={"2px solid orange"}  borderRadius={"10px"}  textAlign={"center"}  p={5} >
      
     <Image src={state?.profilePic?state.profilePic:placeholder} height={"200px"} borderRadius={"100%"} margin={" 5px auto"} /> 
    <Text mt={"10px"}>{state?.name}</Text> 
      
      <Link to="/completeProfile" >  <Button bgColor={"darkorange"}  mt={"10px"} color={"white"} _hover={{bgColor:"orange"}} >Complete Profile</Button> </Link>
    
    <Box  mt={"50px"}>
      <Flex mt={"10px"} w={"100%"} ><FaHome style={{ fontSize:"30px" }} /> <Text marginLeft={"10px"} fontSize={"20px"}>Home</Text>  </Flex>
      <Flex  mt={"10px"} > <MdOutlineWork style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Jobs</Text>  </Flex>
      <Flex  mt={"10px"} > <LiaIndustrySolid style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Companies</Text>  </Flex>
      <Flex  mt={"10px"} >  <IoBookSharp style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Blogs</Text>  </Flex>
    </Box>
    
    </Box>
    {/********************************** Middle Box ****************************************************/}
    {/* view Job info */}
    <Box width={[ "100%","100%","100%", "60%"]}> 
    {viewJob?<Box bgColor={"white"} p={10} border={"1px solid orange"} width={"100%"} >
      <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} onClick={()=>{setViewJob(false)}} >Back</Button>
      <Box >
        <Heading mt={2} fontSize={"large"} >Company Name</Heading>
        <Text mt={2} >{jobData.company_name}</Text>
        <Heading mt={2} fontSize={"large"}>Post Title</Heading>
        <Text mt={2}>{jobData.postTitle}</Text>
        <Heading mt={2} fontSize={"large"}>Description</Heading>
        <Text mt={2}>{jobData.description}</Text>
        <Heading mt={2} fontSize={"large"}>Employment Type</Heading>
        <Text mt={2}>{jobData.employment_type}</Text>
        <Heading  mt={2} fontSize={"large"}>Salary</Heading>
      <Flex gap={5}> <Text mt={2}> <b>min : </b> ₹ {jobData.salary.min}</Text> 
       <Text mt={2}><b>max : </b> ₹ {jobData.salary.max}</Text></Flex>  
    <Button isDisabled={state.myJobs.includes(jobData._id)?true:false} onClick={()=>state.myJobs.includes(jobData._id)?"":handleApplyJob(jobData)} >{state.myJobs.includes(jobData._id)?"Already Applied":"Apply Job"}</Button>
      </Box>
      </Box>:<Box  width={"100%"}>
    <Box  display={["none","none","block","block"]} height={"300px"}  p={2} > 
    <Image   height={"100%"} width={"100%"} src={"https://static.naukimg.com/s/0/0/i/mock-interview-promotion/desktop/dashboard/no-tag.png"}/>
    </Box>
    <Box  boxShadow='2xl' bgColor={"white"} borderRadius={"10px"} border={"2px solid orange"}  mt={2}  height={"300px"}  >
      <Heading p={2} fontSize={"x-large"} >Recent Posted jobs for you</Heading>
    
    <Box  position={"relative"} > 
    <Flex w={"100%"} gap={"10px"} overflow="hidden"  p={2}  ref={scrollContainerRef}    > 
    {showLeftButton &&  <FaAnglesLeft onClick={scrollLeft}   style={{position:"absolute", left:"10px" ,  zIndex:"1"  , top:"35%" , border:"1px solid lightgray" , fontSize:40 , borderRadius:"50%" , padding:10 , backgroundColor:"white"  }} />}
       { showRightButton &&    <FaAnglesRight  onClick={scrollRight} style={{position:"absolute", right:"10px" ,  zIndex:"1"  , top:"35%" , border:"1px solid lightgray"  , fontSize:40 , borderRadius:"50%" , padding:10 ,  backgroundColor:"white" ,  }}   />
         
          }
    { latestJobs.length>0?latestJobs.map((el)=>{
    
    return <Flex flexDirection={"column"} justifyContent={"space-evenly"} p={2}  minwidth={"200px"} flexShrink={0}  border={"0.2px solid gray"} borderRadius={"5px"} >
  
    <Heading fontSize={"medium"} mt={"10px"} >{el.company_name}</Heading>
    <Flex mt={"10px"} alignItems={"center"} > 
    <IoBriefcase />  <Text ml={"5px"}>{el.postTitle}</Text> </Flex>
    <Flex  mt={"10px"} alignItems={"center"} >  <IoBriefcase /> <Text ml={"5px"}>{el.employment_type}</Text> </Flex>
    <Button mt={"5px"} width={["80%","","",""]} color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} onClick={()=>{setViewJob(true),handleViewJob(el)}}>View Job</Button>
    </Flex>
    
    }):<Box>  <Text fontSize={"20px"}>No Jobs to Show</Text></Box>}
    
    </Flex>
    </Box>
    
    
    </Box>
    
    </Box>}
    </Box>
    {/********************************** Right Box *********************************************/}
    <Box border={"2px solid orange"}  borderRadius={"10px"}width={[ "100%","100%","100%", "30%"]} bgColor={"white"}  p={2} > 
    <Text color={"blue.400"} >Needs Attention </Text>
    <Text fontWeight={"bold"} fontSize={"15px"} >Where are you in your job search journey?</Text>
    <Text bgColor={"#f8f8fc"} border={"1px solid gray"} mt={"10px"} p={2} borderRadius={50} >Actively searching jobs</Text>
    <Text  bgColor={"#f8f8fc"}  border={"1px solid gray"} mt={"10px"} p={2} borderRadius={50}>Preparing for interviews</Text>
    <Text  bgColor={"#f8f8fc"}  border={"1px solid gray"} mt={"10px"} p={2} borderRadius={50}>Appearing for  an interviews</Text>
    <Text  bgColor={"#f8f8fc"}  border={"1px solid gray"} mt={"10px"} p={2} borderRadius={50}>Received a job offer</Text>
    <Text   bgColor={"#f8f8fc"} border={"1px solid gray"} mt={"10px"} p={2} borderRadius={50}>Casually exploring jobs</Text>
    <Text   bgColor={"#f8f8fc"} border={"1px solid gray"} mt={"10px"} p={2} borderRadius={50}>Not looking for jobs</Text>
    </Box>
    
    </Flex>
    
    </Box>

  )
}

export default UserProfile