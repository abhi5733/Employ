import { Box , Button, Flex, Grid, GridItem, Heading, Image, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronRight , FaHome } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import Company from '../component/Company';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LiaIndustrySolid } from "react-icons/lia";
import { FcStatistics } from "react-icons/fc";
import { FaRocket } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { FcEngineering } from "react-icons/fc";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import HomeCompany from '../component/HomeCompany';
import { useSelector } from 'react-redux';




const Home = () => {

// console.log(,"url")

  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true); 
  const[searchQuery,setSearchQuery] = useState("")
  const[searchData,setSearchData] = useState([])
  const[toggleSearch,setToggleSearch] = useState(false)
  const[id,setId] = useState("") // Id of user who will search the jobs
  const toast = useToast()
  const user = useSelector((store)=>store.user);
  const token = useSelector((store)=>store.token);
  const navigate = useNavigate()

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


useEffect(() => {
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
  }, []) ;


  const handleSearchJobs = async()=>{
    if(user=="admin"){
      return toast({
        description: "Admin Can't use this Search Functionality",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    }                                                                                           
    if(searchQuery === ""){
return toast({
  description: "Please Enter a Search Query",
  status: 'error',
  position:"top",
  duration: 2000,
  isClosable: true,
})
    }if(!token){
      toast({
        description: "Login First",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
 return navigate("/login")
    }
 
    try{
// console.log(searchQuery,"searchQuery")
const data = await axios.get(`${import.meta.env.VITE_URL}/admin/searchJobs`,{

  headers:{
    authorization : localStorage.getItem("token"),
    params:searchQuery
  }
}) ;
console.log(data,"data")
setToggleSearch(true)
setId(data.data.Id)
setSearchData(data.data.jobs)
setSearchQuery("")
toast({
  description: "Job Retreived Successfully",
  status: 'success',
  position:"top",
  duration: 2000,
  isClosable: true,
})

    }catch(err){
      setToggleSearch(false)
      console.log(err)
      toast({
        description: "Something Went wrong",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    }

  }


  return (
 
  <Box backgroundColor={"#f8f8fc"} > 
    <Box style={{width:"80%" , margin:"auto", boxShadow:'dark-lg'  }} >
    {/* 1st */}
    <Box style={{textAlign:"center" }}   padding={["5px","50px","50px","50px"]} >
      <Text w={"100%"}  style={{margin:"10px"  , fontWeight:"bold"}} fontSize={["20px","50px","50px","50px"]}>Find Your Dream Job Now</Text>
      <Text style={{margin:"10px" }} fontWeight={"semibold"} fontSize={["12px","30px","40px","40px"]} >5 lakh + job for you to explore</Text>
      <Box style={{ position:"relative", height:"60px"}} mt={10} >
      <Input placeholder={"Enter Text / designation / companies"} onChange={(e)=>setSearchQuery(e.target.value)}   value={searchQuery} style={{ borderRadius:"50px" , border:"0",  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"  }}  height={[ "80%" ,"100%" , "100%" ,"100%"]} width={[ "100%","80%","60%","60%"]} bgColor={"white"} />
      <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  onClick={handleSearchJobs} style={{position:"absolute" , borderRadius:"50px",top:"10%"}} height={[ "60%" ,"80%" , "80%" ,"80%"]} right={[ "5%" , "10%" ,"21%" ,"21%"]} zIndex={5} >Search</Button>
       </Box> 
   
    </Box>
{/* 2 nd */}

 {toggleSearch && searchData.length>0?<Box> 
  <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={20} >
  {searchData.map((el)=>{
    return <GridItem  width={"300px"}p={5} bgColor={"white"} borderRadius={"5px"} boxShadow={"md"} >
         {/* <Heading fontSize={"large"} >Posted_by</Heading> */}
       <Image width={"100%"} src={el.posted_by.CompanyPic} /> 
       <Heading fontSize={"large"} >Company Name</Heading>
    <Text>{el.company_name}</Text>
    <Heading fontSize={"large"} >Job Title</Heading>
    <Text>{el.postTitle}</Text>
  
    <Heading fontSize={"large"} >employment_type</Heading>
    <Text>{el.employment_type}</Text>
    <Heading fontSize={"large"} >Vacancy</Heading>
    <Text>{el.vacancy}</Text>
    {/* Passing Job Data to Jobs Page*/}
<Link to="/jobs"  state={{ data: el , id }} > <Button  color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} >View Job</Button> </Link>
    </GridItem>
  })}
  </Grid>
   </Box>:<HomeCompany/> }
 {/* 3 rd  */}

<Box textAlign="center"  mt="50px" position={"relative"} >

<Text fontSize="30px" fontWeight="bold" >Top companies hiring now</Text>

<Flex overflow="hidden" p={2} mt={10}  width="100%"  gap={5}  ref={scrollContainerRef}  >
 {showLeftButton &&  <FaAnglesLeft onClick={scrollLeft}   style={{position:"absolute", left:"10px" ,  top:"55%" , border:"1px solid lightgray" , fontSize:40 , borderRadius:"50%" , padding:10 , backgroundColor:"white"  }} />}
   { showRightButton &&    <FaAnglesRight  onClick={scrollRight} style={{position:"absolute", right:"10px"  , top:"55%" , border:"1px solid lightgray"  , fontSize:40 , borderRadius:"50%" , padding:10 ,  backgroundColor:"white" ,  }}   />
     
      }

<Company/>


  
</Flex>

</Box>

    </Box>
    </Box>
  )
}

export default Home