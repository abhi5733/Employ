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
import placeholder from "../assets/placeholderImage.png"
import UserProfile from '../component/UserProfile'
import AdminProfile from '../component/AdminProfile'
import { IoBriefcase } from "react-icons/io5";

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
  const [state,setState] = useState({})
  const[latestJobs,setLatestJobs] = useState([])
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

  return (
<Box p={5} w={[ "auto" ,"auto" , "auto" ,"100vw"]} h={user=="user"? [ "auto" ,"auto" , "auto" ,"90vh"] :""} backgroundColor={"#f8f8fc"} > 
          { load &&  <Image position="absolute" zIndex={200} src={loader} left={"50%"} top={"50%"} transform={"translate(-50%,-50%)"}    margin={"auto"} h={"500px"} w={"500px"}  /> }
  
  {user=="user"? <UserProfile state={state} viewJob={viewJob} setViewJob={setViewJob} jobData={jobData} showRightButton={showRightButton} showLeftButton={showLeftButton} scrollContainerRef={scrollContainerRef} latestJobs={latestJobs} handleApplyJob={handleApplyJob} handleViewJob={handleViewJob} scrollRight={scrollRight} scrollLeft={scrollLeft}  />
  :<AdminProfile state={state} applicant={applicant} setApplicant={setApplicant} resume={resume} setResume={setResume} jobList={jobList} handleAllApplicants={handleAllApplicants} applicantData={applicantData} />}
</Box>
)

}

export default Profile