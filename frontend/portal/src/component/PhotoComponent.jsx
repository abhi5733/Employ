import { Box, Button, Divider, Flex , FormControl, FormLabel, Grid, Heading, Image , Input, Radio, RadioGroup, Select, Text , useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dpImage from "../assets/abhidp.jpg"
import companyLogo from "../assets/logoPlaceholder.png"
import placeholder from "../assets/placeholderImage.png"
import { FaPen } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { adminLoginFunction, loadingFunction, logged, loginFunction, stoploadingFunction } from "../redux/action"
import axios from 'axios';




const PhotoComponent = ({data,setData,photoModal , handlePhotoModal , handleFileChange , file}) => {
     
     const toast = useToast()
    const dispatch= useDispatch() 
      const fileInputRef = useRef(null);
   
      const [hovered, setHovered] = useState(false);
      const load = useSelector((store)=>store.load)
      const user = useSelector((store)=>store.user); 
      const[toggle,setToggle] = useState(false)



        
          const handleButtonClick = () => {
            fileInputRef.current.click();
          };
        
      
        // handle Photo Submit
        
        const handleSubmitPhoto = async (e) => {
        
            e.preventDefault();
            const formData = new FormData();
            formData.append('photo', file);
            // formData.Userid = data._id
            // console.log(formData)
            try {
            //  User information passed in Headers
              handlePhotoModal()
              dispatch(loadingFunction())
              const response = await axios.post(`${import.meta.env.VITE_URL}/admin/uploadPhoto`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "authorization" : localStorage.getItem("token"),
                  "Userid" : data._id,
                  "user": localStorage.getItem("role") ,
                  "toggle" : toggle
                }
              });
           
         dispatch(stoploadingFunction())
              console.log('File uploaded successfully:', response.data);
              setData(response.data)
          
          toast({
            description: "File uploaded Successfully.",
            status: 'success',
            position:"top",
            duration: 2000,
            isClosable: true,
          })
            } catch (error) {
              handlePhotoModal()
              dispatch(stoploadingFunction())
              toast({
                description: "Something went wrong here",
                status: 'error',
                position:"top",
                duration: 2000,
                isClosable: true,
              })
              console.error('Error uploading file here:', error);
            }
            
          };
        

      

  return (
   <Box>
   
   
    {/*********************  Photo Box *********************************/}

     <Box w={"30%"} >
        
              {!hovered && (
                      <Box  w={"200px"} ml={"10%"} h={"250px"} border={"1px solid orange"} borderRadius={"50%"} overflow={"hidden"} >
            <Image
            src={toggle?data?.CompanyPic?data.CompanyPic:companyLogo:data?.profilePic?data.profilePic:placeholder}
              w="100%"
              h="100%"
              margin="auto"
              onMouseEnter={() => setHovered(true)}
            />
            </Box>
          )} {hovered && (
            <Box  onClick={load?"null":handlePhotoModal}  textAlign={"center"} w={"200px"} cursor={"pointer"} border={"1px solid orange"} ml={"10%"} h={"250px"}  borderRadius={"50%"} position={"relative"} overflow={"hidden"} _hover={{cursor:"pointer"}}  bgColor={"black"} >
              <FaPen   style={{marginLeft:"10px" , position:"absolute",top:"20%" ,color:"white" , left:"40%" , zIndex:"10"  }} />
      <Heading color={"white"} position={"absolute"} top={"50%"} left={"50%"} transform="translate(-50%,-50%)" zIndex={"10"} > Change Photo</Heading>
          <Image
          src={toggle?data?.CompanyPic?data.CompanyPic:companyLogo:data?.profilePic?data.profilePic:placeholder}
              w="100%"
              opacity={"0.5"}
              h="100%"
              margin="auto"
              onMouseLeave={() => setHovered(false)}
            />
             </Box>
          )}

         {user=="user"?"":toggle?<Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  mt={"10px"}  isDisabled={load?true:false} onClick={()=>setToggle((prev)=>!prev)} >Show Profile Pic</Button>:<Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  mt={"10px"}  isDisabled={load?true:false} onClick={()=>setToggle((prev)=>!prev)} >Show Company Logo</Button>}
            
       
         </Box>

         {/***************************Photo Modal***************************************/}

  {photoModal && <Box p={5} textAlign={"center"} zIndex={102} boxShadow='2xl'  borderRadius={"10px"} top={"200px"}  bgColor={"white"} position={"absolute"}  width={"500px"} left={"50%"} right={"50%"} transform={"translate(-50%,-50%)"}  >
      <Box  position={"relative"} top={"10px"} left={"93%"} _hover={{cursor:"pointer"}} onClick={handlePhotoModal} > <ImCancelCircle style={{fontSize:"25px"}}  /> </Box>
         <Heading>Profile Photo Upload</Heading>
        { user=="user"?<Text mt={2}>Profile with photo has 40% higher chances of getting noticed by recruiters.</Text>:""}
         <Image  border={"1px solid orange"} margin = {"10px auto"} src={toggle?data?.CompanyPic?data.CompanyPic:companyLogo:data?.profilePic?data.profilePic:placeholder}
          w="200px"
          h="200px"
          borderRadius={"50%"} />
       
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange} 
        accept="image/jpeg, image/png"
      />
       {file !== null? <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} isDisabled={load?true:false} onClick={handleSubmitPhoto} >Save</Button>:<Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} onClick={handleButtonClick}>Choose Photo</Button>}

        </Box>}

   </Box>
  )
}

export default PhotoComponent