import { Box, Button, Flex , Heading, Image , Text, useToast} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import dpImage from "../assets/abhidp.jpg"
import { Link } from 'react-router-dom'
import axios from "axios"
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { LiaIndustrySolid } from "react-icons/lia";
import { IoBookSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { adminLoginFunction, loadingFunction, logged, loginFunction, stoploadingFunction } from '../redux/action'
import loader from "../assets/loader.gif"

const Profile = () => {

  
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const user = useSelector((store)=>store.user); 
  const [jobList,setJobList] = useState([]) 
  const dispatch = useDispatch()
  const toast = useToast()
  const[applicant,setApplicant] = useState(false)
  const load = useSelector((store)=>store.load)
  const[applicantData,setApplicantData] = useState([])
  const[resume,setResume] = useState(false)
  const[viewJob , setViewJob] = useState(false)
  const[jobData,setJobData] = useState({})
  // scroll to left

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // scroll to right 

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };


  const [state,setState] = useState({})

  const[latestJobs,setLatestJobs] = useState([])

  useEffect(()=>{
// Dynamically rendering between user and admin Data .
  axios.get(`${import.meta.env.VITE_URL}/admin${user=="user"?"/":"/adminData"}`, {
      headers:{
        authorization : localStorage.getItem("token")
      }
    }).then((res)=>{console.log(res.data[0]),setState(res.data[0])})
    .catch((err)=>console.log(err))

    if(user=="admin"){

      // getting all jobs 

  const getPostedJobs = async ()=>{

    try{
      // setShowJobs((prev)=>!prev)
      dispatch(loadingFunction())
      const jobs = await axios.get(`${import.meta.env.VITE_URL}/admin/getJob`, {
        headers:{
          authorization : localStorage.getItem("token")
        }
      })
      dispatch(stoploadingFunction())
      toast({
        description: "Jobs Retrieved Successfully",
        status: 'success',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
      setJobList(jobs.data.jobsPosted)
      console.log(jobs.data.jobsPosted,"jobs")

    }catch(err){
      dispatch(stoploadingFunction())
      toast({
        description: "Something went wrong",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
      
      console.log(err)
    }

  }
  getPostedJobs()

    }else{

      const handleLatestJobs = async ()=>{

        try{
          dispatch(loadingFunction())
          const latestJobs = await axios.get(`${import.meta.env.VITE_URL}/admin/getLatestJobs`, {
            headers:{
              authorization : localStorage.getItem("token")
            }
          })
          dispatch(stoploadingFunction())
          console.log(latestJobs , "latestJobs") ;
          setLatestJobs(latestJobs.data)
        }catch(err){
        dispatch(stoploadingFunction())
        console.log(err)
        }

      }

      handleLatestJobs()

    }
  

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        // Check if scrolled to the leftmost position
        setShowLeftButton(container.scrollLeft > 0);
        // Check if scrolled to the rightmost position
        setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };

  },[])

   // getting all job applicant 
 

    const handleAllApplicants = async (id)=>{

      try{
        console.log(id)
        // setShowJobs((prev)=>!prev)
        dispatch(loadingFunction())
        const jobs = await axios.get(`${import.meta.env.VITE_URL}/admin/getAllApplicant/${id}`, {
          headers:{
            authorization : localStorage.getItem("token")
          }
        })
  dispatch(stoploadingFunction())
        toast({
          description: "Jobs Retrieved Successfully",
          status: 'success',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
        setApplicantData(jobs.data.applicants)
        console.log(jobs.data.applicants,"jobs")
  
      }catch(err){
        dispatch(stoploadingFunction())
        toast({
          description: "Something went wrong",
          status: 'error',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
        
        console.log(err)
      }
  
    }

    // View Job 


    const handleViewJob = (el)=>{
    console.log(el,"el")
    setJobData(el)
    }


    // Apply for Job 

    const handleApplyJob = async (el)=>{
console.log(el,"el")
      try{
        dispatch(loadingFunction()) 
        const apply = await axios.put(`${import.meta.env.VITE_URL}/admin/applyJob`,el, {
          headers:{
            authorization : localStorage.getItem("token")
          }
        })
        dispatch(stoploadingFunction())
        toast({
          description: "Applied Successfully",
          status: 'success',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
        console.log(apply)
        setState(apply.data.user)
      }catch(err){

        console.log(err)
        dispatch(stoploadingFunction())
        toast({
          description: "Something went wrong",
          status: 'error',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
      }

    }

  
 


// console.log(state)
  return (
<Box p={5} w={"100vw"} h={"90vh"} backgroundColor={"#f8f8fc"} > 
          { load &&  <Image position="absolute" zIndex={200} src={loader} left={"50%"} top={"50%"} transform={"translate(-50%,-50%)"}    margin={"auto"} h={"500px"} w={"500px"}  /> }
  
  {user=="user"?<Box width={"80%"}  margin={"20px auto"} >
  
  <Flex gap={5} >

{/******************************* Left Box **********************************************/}
<Box width={"30%"} bgColor={"white"} border={"2px solid orange"}  borderRadius={"10px"}  textAlign={"center"}  p={5} >
  
 <Image src={state?.profilePic?state.profilePic:dpImage} height={"200px"} borderRadius={"100%"} margin={" 5px auto"} /> 
<Text mt={"10px"}>{state?.name}</Text> 
  
  <Link to="/completeProfile" >  <Button bgColor={"darkorange"}  mt={"10px"} color={"white"} _hover={{bgColor:"orange"}} >Complete Profile</Button> </Link>

<Box  mt={"50px"}>
  <Flex mt={"10px"} w={"100%"}  > <FaHome style={{ fontSize:"30px" }} /> <Text marginLeft={"10px"} fontSize={"20px"}>Home</Text>  </Flex>
  <Flex  mt={"10px"} > <MdOutlineWork style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Jobs</Text>  </Flex>
  <Flex  mt={"10px"} > <LiaIndustrySolid style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Companies</Text>  </Flex>
  <Flex  mt={"10px"} >  <IoBookSharp style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Blogs</Text>  </Flex>
</Box>

</Box>
{/********************************** Middle Box ****************************************************/}
{/* view Job info */}
<Box width={"60%"}> 
{viewJob?<Box p={10} border={"1px solid orange"} width={"100%"} >
  <Button  onClick={()=>{setViewJob(false)}} >Back</Button>
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
<Box   height={"300px"}  p={2} > 
<Image height={"100%"} width={"100%"} src={"https://static.naukimg.com/s/0/0/i/mock-interview-promotion/desktop/dashboard/no-tag.png"}/>
</Box>
<Box  boxShadow='2xl' borderRadius={"10px"} border={"2px solid orange"}  mt={10}  height={"300px"}  >
  <Heading p={2} fontSize={"x-large"} >Recent Posted jobs for you</Heading>

<Box mt={"30px"} position={"relative"} > 
<Flex w={"100%"} gap={"10px"} overflow="hidden"  p={2}  ref={scrollContainerRef}    > 
{showLeftButton &&  <FaAnglesLeft onClick={scrollLeft}   style={{position:"absolute", left:"10px" ,  zIndex:"1"  , top:"35%" , border:"1px solid lightgray" , fontSize:40 , borderRadius:"50%" , padding:10 , backgroundColor:"white"  }} />}
   { showRightButton &&    <FaAnglesRight  onClick={scrollRight} style={{position:"absolute", right:"10px" ,  zIndex:"1"  , top:"35%" , border:"1px solid lightgray"  , fontSize:40 , borderRadius:"50%" , padding:10 ,  backgroundColor:"white" ,  }}   />
     
      }
{ latestJobs.length>0?latestJobs.map((el)=>{

return <Box p={2}  minwidth={"200px"} flexShrink={0}  border={"0.2px solid gray"} borderRadius={"5px"} >
<Image width={"50%"}  src={el.logo} />
<Heading fontSize={"medium"} mt={"10px"} >{el.company_name}</Heading>
<Flex mt={"10px"} alignItems={"center"} > 
<FaMapMarkerAlt />  <Text ml={"5px"}>{el.postTitle}</Text> </Flex>
<Text>{el.employment_type}</Text>
<Button onClick={()=>{setViewJob(true),handleViewJob(el)}}>View Job</Button>
</Box>

}):<Box>  <Text fontSize={"20px"}>No Jobs to Show</Text></Box>}

</Flex>
</Box>


</Box>

</Box>}
</Box>
{/********************************** Right Box *********************************************/}
<Box border={"2px solid orange"}  borderRadius={"10px"} width={"30%"} bgColor={"white"}  p={2} > 
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

</Box>:<Box   width={"80%"}  margin={"20px auto"} > 
<Flex gap={5}>  <Box width={"20%"} bgColor={"white"} border={"2px solid orange"}  borderRadius={"10px"}  textAlign={"center"}  p={5} >
  
 <Image src={state?.profilePic?state.profilePic:dpImage} height={"200px"} borderRadius={"100%"} margin={" 5px auto"} /> 
<Text mt={"10px"}>{state?.name}</Text> 
  
 {applicant?<Link to="/profile" >  <Button bgColor={"darkorange"}  onClick={()=>setApplicant(false)} mt={"10px"} color={"white"} _hover={{bgColor:"orange"}} >Back</Button> </Link>:<Link to="/completeProfile" >  <Button bgColor={"darkorange"}  mt={"10px"} color={"white"} _hover={{bgColor:"orange"}} >View Profile</Button> </Link>}

<Box  mt={"50px"}>
  {/* <Flex mt={"10px"}  w={"100%"}  > <FaHome style={{ fontSize:"30px" }} /> <Text marginLeft={"10px"} fontSize={"20px"}>Home</Text>  </Flex>
  <Flex  mt={"10px"} > <MdOutlineWork style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Jobs</Text>  </Flex>
  <Flex  mt={"10px"} > <LiaIndustrySolid style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Companies</Text>  </Flex>
  <Flex  mt={"10px"} >  <IoBookSharp style={{ fontSize:"30px" }} /> <Text  marginLeft={"10px"} fontSize={"20px"}>Blogs</Text>  </Flex> */}
</Box>

</Box> 
{/* jobs posted */}
{applicant?<Box width={"80%"}  margin={"20px auto"} > 
  {applicantData.length>0?applicantData.map((el)=>{
  return  <Box>
      <Text>{el.name}</Text>
      <Text>{el.email}</Text>
      <Text>{el.number}</Text>
      {resume?<Button onClick={()=>setResume(false)} >Back</Button>:<Button onClick={()=>setResume(true)} >View Resume</Button>}
      {resume && 
      <Box > 
       {el?.resume!=""?<iframe src={el?.resume}  style={{width:"100%" , height:"500px" , border:"1px solid red"}} ></iframe>
        :<Text>Resume Not uploaded Yet</Text>}</Box> }
    </Box>
  }):<Text>No Applicants Yet</Text>}
</Box>:
<Box p={10} border={"2px solid orange"} textAlign={"center"} bgColor={"white"} borderRadius={"10px"} width={"100%"}>
<Text fontSize={"x-large"} fontWeight={"bold"} >Jobs Posted</Text>
{jobList.length>0?jobList.map((el)=>{
  return <Box key={el._id} p={2} border={"1px solid lightgray"} mt={5} borderRadius={"10px"}  >
    <Text fontSize={"large"} fontWeight={"bold"} >{el.employment_type}</Text>
    
    <Text fontSize={"medium"} >{el.description}</Text>
    <Button onClick={()=>{handleAllApplicants(el._id),setApplicant(true)}}>View Applicants</Button>
  </Box>
}):<Box>No Jobs Posted Yet</Box> }
</Box>}
 </Flex> </Box>}
</Box>
)

}

export default Profile