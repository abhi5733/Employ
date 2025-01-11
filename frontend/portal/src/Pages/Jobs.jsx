import { Box , Button, Flex, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useLocation } from "react-router-dom";

const Jobs = () => {
  const[data,setData] = useState({})  // for storing Job Data
  const location = useLocation();
  const[job,setJob] = useState([])
  const  datas = location?.state?.data || {}; // Destructure state data
  const id = location?.state?.id || "" ;
  const toast = useToast()
  const[myJob,setMyJob] = useState(false)



useEffect(()=>{

// Get all My jobs

    axios.get(`${import.meta.env.VITE_URL}/admin/getMyJob`, {
      "headers":{
        "Authorization":localStorage.getItem("token")
      }
    }).then((res)=>{
      console.log(res.data.myJobs);
      setJob(res.data.myJobs)
    })
    .catch((err)=>{
      console.log(err)
    })

  } , [myJob] )

// apply jobs

  const handleApplyJob =(data)=>{

   axios.put(`${import.meta.env.VITE_URL}/admin/applyJob`,data ,{
      "headers":{
        "Authorization":localStorage.getItem("token")
      }}).then((res) =>{console.log(res),toast({
        description: "Job Applied successfully",
        status: 'success',
        position:"top",
        duration: 2000,
        isClosable: true,
      }) , datas.applicants.push(id) , setData("") })
      .catch((err) =>{console.log(err),
        err.response.status=="500"?(toast({
          description: "Already Applied for Job",
          status: 'success',
          position:"top",
          duration: 2000,
          isClosable: true,
        }) , datas.applicants.push(id) , setData("") ):toast({
          description: "Something went wrong",
          status: 'error',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
       })

  }





  return (
<Box backgroundColor={"#f8f8fc"}  >{ (!myJob &&  Object.keys(datas).length !== 0)? <Box height={"90vh"} width={"80%"} p={5} margin="auto"> 
<Flex> <Box width={"20%"} > <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  onClick={()=>setMyJob(true)} >Get All Jobs</Button> </Box>
 <Box width={"80%"} >
    <Heading mt={2} fontSize={"large"} >Company Name</Heading>
    <Text mt={2} >{datas.company_name}</Text>
    <Heading mt={2} fontSize={"large"}>Post Title</Heading>
    <Text mt={2}>{datas.postTitle}</Text>
    <Heading mt={2} fontSize={"large"}>Description</Heading>
    <Text mt={2}>{datas.description}</Text>
    <Heading mt={2} fontSize={"large"}>Employment Type</Heading>
    <Text mt={2}>{datas.employment_type}</Text>
    <Heading  mt={2} fontSize={"large"}>Salary</Heading>
    <Flex gap={5}> <Text mt={2}> <b>min : </b> ₹ {datas.salary.min}</Text> 
    <Text mt={2}><b>max : </b> ₹ {datas.salary.max}</Text></Flex>  
<Button mt={5} isDisabled={datas.applicants.includes(id)?true:false} onClick={()=>{datas.applicants.includes(id)?"":handleApplyJob(datas)}} >{datas.applicants.includes(id)?"Already Applied":"Apply Job"}</Button>
 </Box>  </Flex>

     </Box> 
 :<Box width={"80%"} p={2} margin="auto" >

  <Link to="/"><Button mt={["10px","","",""]} color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} onClick={()=>setMyJob(false)} >Go Back</Button> </Link> 
<Heading mt={["10px","","",""]}  textAlign={"center"} >All My Jobs</Heading>
    <Flex justifyContent={"space-evenly"} >

 <Grid p={2}  templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(3, 1fr)"]} gap={6} mt={20} > {
job.length>0 && job.map((el)=>{
 
  return <GridItem backgroundColor={"white"} width={["200px","200px","300px","300px"]}p={2} borderRadius={"5px"} boxShadow={"md"} >

    <Text><b>Company Name : </b>{el.company_name}</Text>
    <Text><b>Post Title :  </b>{el.postTitle}</Text>
   <Text><b>Description : </b>{el.description}</Text>
  
   {/* <Button onClick={()=>handleApply(el)} disabled={el.applicant.includes()}  >Apply</Button> */}
   </GridItem>
}) }   </Grid>

   </Flex>


    </Box>}
    </Box>
  )
}

export default Jobs