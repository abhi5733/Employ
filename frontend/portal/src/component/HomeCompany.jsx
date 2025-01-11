import React from 'react'
import { Box , Button, Flex, Grid, GridItem, Heading, Image, Input, Text, useToast } from '@chakra-ui/react'
import { LiaIndustrySolid } from "react-icons/lia";
import { FcStatistics } from "react-icons/fc";
import { FaRocket } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { FcEngineering } from "react-icons/fc";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaChevronRight , FaHome } from "react-icons/fa";


const HomeCompany = () => {
  return (
    <Box mt={20}   >
  <Flex flexDirection={["column","column","row","row"]} justifyContent="space-around" >
     
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <FaHome style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex  mt={[2,2,"",""]} alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"}  > <LiaIndustrySolid style={{margin:"10",fontSize:"30px"}} />  <Text style={ {margin:"10" , fontWeight:"bold"}}>MNC</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex  mt={[2,2,"",""]} alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <FcStatistics style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Data Science</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex  mt={[2,2,"",""]} alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > < FaRocket  style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Start Up</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex  mt={[2,2,"",""]} alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <IoMdPeople  style={{margin:"10", fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>HR</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex  mt={[2,2,"",""]} alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <FcEngineering style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Engineer</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     
  </Flex>
  <Flex display={["none","none","flex","flex"]} flexDirection={["column","column","row","row"]} justifyContent="space-around" mt={10} >
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <FaArrowUpRightDots style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Marketing</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <MdCurrencyRupee style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Banking</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <FaGraduationCap style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Fresher</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <RiShoppingBag3Fill style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Sales</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     <Flex alignItems="center" boxShadow='xs' borderRadius="5px" p={5} bgColor={"white"} border={"1px solid lightgray"} > <FaHome style={{margin:"10" , fontSize:"30px"}} />  <Text style={{margin:"10" , fontWeight:"bold"}}>Remote</Text> <FaChevronRight style={{margin:"10"}}/> </Flex>
     
  </Flex>
 </Box>
  )
}

export default HomeCompany