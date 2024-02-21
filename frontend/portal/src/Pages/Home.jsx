import { Box , Button, Flex, Image, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronRight , FaHome } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import Company from '../component/Company';
const Home = () => {

  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true); 
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
  }, []);



  return (
    <Box style={{height:"1000px" , width:"80%" , border:"1px solid black" , margin:"auto", boxShadow:'dark-lg'  }} >
    {/* 1st */}
    <Box style={{textAlign:"center"  , padding:"50px"}} >
      <Text style={{margin:"10px" , fontSize:"50px" , fontWeight:"bold"}}>Find Your Dream Job Now</Text>
      <Text style={{margin:"10px" , fontWeight:"normal"}}>5 lakh + job for you to explore</Text>
      <Box style={{ position:"relative", height:"60px" , }} ><Input style={{width:"60%" , height:"100%" , borderRadius:"50px" , border:"0",  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"  }} />    <Button style={{position:"absolute" , right:"21%" , borderRadius:"50px", height:"80%" ,top:"10%"}} >Search</Button> </Box> 
   
    </Box>
{/* 2 nd */}

 <Box mt={20} >
  <Flex justifyContent="space-around" >
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     
  </Flex>
  <Flex justifyContent="space-around" mt={10} >
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5}  > <FaHome style={{margin:"10"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     
  </Flex>
 </Box>
 {/* 3 rd  */}

<Box textAlign="center" border={"1px solid black"} mt="50px" position={"relative"} >

<Text fontSize="30px" fontWeight="bold" >Top companies hiring now</Text>

<Flex overflow="hidden" mt={10}  width="100%" border="1px solid black" gap={5}  ref={scrollContainerRef}  >
 {showLeftButton &&  <FaAnglesLeft onClick={scrollLeft}   style={{position:"absolute", left:"10px" ,  zIndex:"1"  , top:"60%" , border:"1px solid black" , fontSize:30 , borderRadius:"50%" , padding:5 , backgroundColor:"white" }} />}
   { showRightButton &&    <FaAnglesRight  onClick={scrollRight} style={{position:"absolute", right:"10px" ,  zIndex:"1"  , top:"60%" , border:"1px solid black" , fontSize:30 , borderRadius:"50%" , padding:5 ,  backgroundColor:"white"}}   />
     
      }

<Company/>


  
</Flex>

</Box>

    </Box>
  )
}

export default Home