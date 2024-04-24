import { Box, Button, Divider, Flex , FormControl, FormLabel, Grid, Heading, Image , Input, Radio, RadioGroup, Select, Text , useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import dpImage from "../assets/abhidp.jpg"
import axios from "axios"
import pdf from "../uploads/hello.pdf"
import { FaChevronDown, FaChevronUp, FaPen } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";

const CompleteProfile = () => {

  const fileInputRef = useRef(null);
  const [data,setData] = useState({})  // user information
  const [moreData , setMoreData] = useState({})  // other data 
  const[resume,setResume] = useState(false)
  const [file, setFile] = useState(null);
  const [modal,setModal] = useState(false) ;
  const [hovered, setHovered] = useState(false);
  const[photoModal,setPhotoModal] = useState(false);
const[resumeDown,setResumeDown] = useState(false)
const[uploadResume,setUploadResume] = useState(false)
const[skillsDown,setSkillsDown] = useState(false)
const[expandResume,setExpandResume] = useState(false)
const[addSkills,setAddSkills] = useState(false)

  const toast = useToast()

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };

  // handling input when we press button 
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoModal = ()=>{

    setPhotoModal((prev)=>!prev)
    setFile(null)
    setHovered(false)

  } 

  // handle Resume

  const handleSubmit = async (e) => {
    e.preventDefault();
  if(file){
      console.log(1)
   
    const formData = new FormData();
    formData.append('resume', file);
    // formData.Userid = data._id
    // console.log(formData)
    try {
      const response = await axios.post('http://localhost:7300/admin/uploadResume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization" : localStorage.getItem("token"),
          "Userid" : data._id
        }
      });
      console.log('File uploaded successfully:', response.data);
      setMoreData(response.data)
      setFile(null)
      setUploadResume(false)
      toast({
        description: "Resume uploaded successfully",
        status: 'success',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }else{
    toast({
      description: "Choose you file for upload first",
      status: 'error',
      position:"top",
      duration: 2000,
      isClosable: true,
    })
  }
};

// handle Photo Submit

  const handleSubmitPhoto = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', file);
    // formData.Userid = data._id
    // console.log(formData)
    try {
     
      // http://localhost:7300/
      const response = await axios.post('https://employme-b4ru.onrender.com/admin/uploadPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization" : localStorage.getItem("token"),
          "Userid" : data._id
        }
      });

      console.log('File uploaded successfully:', response.data);
      setData(response.data)
  handlePhotoModal()
  toast({
    description: "File uploaded Successfully.",
    status: 'success',
    position:"top",
    duration: 2000,
    isClosable: true,
  })
    } catch (error) {
      toast({
        description: "Something went wrong",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
      console.error('Error uploading file:', error);
    }
    
  };


  useEffect(()=>{

    // getting user data from backend
   const req1 =  axios.get("http://localhost:7300/admin/", {
      headers:{
        authorization : localStorage.getItem("token")
      }
    })
   

const req2 =  axios.get("http://localhost:7300/admin/get", {
  headers:{
    authorization : localStorage.getItem("token")
  }
})

//  making request simultaneously . 

    axios.all([req1,req2]).then(axios.spread((res1,res2)=>{
    console.log(res1.data[0]),setData(res1.data[0]),console.log(res2.data[0]),
    setMoreData(res2.data[0])
    })).catch((err1,err2)=>{
      toast({
        description: "Something went wrong",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      }),
    console.log(err1,err2)
    })

  },[])

  const handleChange = (e)=>{
    const {name,value} = e.target
    if(moreData.skills.includes(value)){
      toast({
        description: "Already added that skill",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    }else{
    moreData.skills.push(value)
    // setMoreData({...moreData })
    console.log(moreData)
    }
}


  // handling skill change

  const handleSkill = async ()=>{

    try{

    console.log(moreData)
  const data = await axios.patch("http://localhost:7300/admin/update" , moreData , {
      headers:{
        authorization : localStorage.getItem("token")
      }
    })

    toast({
      description: "Skills Updated successfully",
      status: 'success',
      position:"top",
      duration: 2000,
      isClosable: true,
    })
    setMoreData(data.data)
    // console.log(data , moreData)
  
  }catch(err){
  
  console.log(err)
  toast({
    description: "Already added that skill",
    status: 'error',
    position:"top",
    duration: 2000,
    isClosable: true,
  })
  
  }

}

// handling change 

const handleUserChange = (e)=>{
console.log(1)
  const {value , name} =  e.target
  
  setData({...data, [name]:value})
     
  }


  // handling user submit

  const  handleUserSubmit = async (e) => {
  
    try{ 
   e.preventDefault()
   console.log(data)

   const datas = await axios.put("http://localhost:7300/admin/updateUser" , data , {

      headers:{
        authorization : localStorage.getItem("token")
      }
  
    })

    toast({
      description: "Changes updated successfully",
      status: 'success',
      position:"top",
      duration: 2000,
      isClosable: true,
    })

    setModal(false)

    console.log(datas)

  }catch(err){
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


  return (
    <> 
    
    <Box bgColor={"#f8f8fc"} border={"1px solid black"} minH={"100vh"}   > 
     {modal && <Box mt={"-10vh"} w="100vw" position={"absolute"} zIndex={101}  h={"100%"} bgColor={"black"} opacity={"0.5"} onClick={()=>setModal((prev)=>!prev)}  /> }
 {photoModal && <Box mt={"-10vh"} w="100vw" position={"absolute"} zIndex={101}  h={"100%"} bgColor={"black"} opacity={"0.5"} onClick={handlePhotoModal}  /> }
    <Box    width={"80%"} margin={"auto"}>

    {/* /////////////////////////////////////////////////////  Top - Portion    /////////////////////////////////////////////////////////////// */}
      <Flex   boxShadow='2xl' bgColor={"white"} mt={50} borderRadius={"10px"}  p={5} position={"relative"} >
      {photoModal && <Box p={5} textAlign={"center"} zIndex={102} boxShadow='2xl'  borderRadius={"10px"} top={"200px"}  bgColor={"white"} position={"absolute"}  width={"500px"} left={"50%"} right={"50%"} transform={"translate(-50%,-50%)"}  >
      <Box  position={"relative"} top={"10px"} left={"93%"} _hover={{cursor:"pointer"}} onClick={handlePhotoModal} > <ImCancelCircle style={{fontSize:"25px"}}  /> </Box>
         <Heading>Profile Photo Upload</Heading>
         <Text mt={2}>Profile with photo has 40% higher chances of getting noticed by recruiters.</Text>
         <Image margin = {"10px auto"} src={data.profilePic==""?dpImage:data.profilePic}
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
       {file !== null? <Button onClick={handleSubmitPhoto} >Save</Button>:<Button onClick={handleButtonClick}>Choose Photo</Button>}

        </Box>}
 
        <Box w={"30%"} >
    
          {!hovered && (
                  <Box  w={"200px"} ml={"10%"} h={"250px"} borderRadius={"50%"} overflow={"hidden"} >
        <Image
          src={data.profilePic==""?dpImage:data.profilePic}
          w="100%"
          h="100%"
          margin="auto"
          onMouseEnter={() => setHovered(true)}
        />
        </Box>
      )} {hovered && (
        <Box textAlign={"center"} w={"200px"} ml={"10%"} h={"250px"}  borderRadius={"50%"} position={"relative"} overflow={"hidden"} _hover={{cursor:"pointer"}}  bgColor={"black"} >
          <FaPen  style={{marginLeft:"10px" , cursor:"pointer" , position:"absolute",top:"20%" ,color:"white" , left:"40%" , zIndex:"10"  }} onClick={handlePhotoModal} />
  <Heading color={"white"} position={"absolute"} top={"50%"} left={"50%"} transform="translate(-50%,-50%)" zIndex={"10"} > Change Photo</Heading>
      <Image
      src={data.profilePic==""?dpImage:data.profilePic}
          w="100%"
          opacity={"0.5"}
          h="100%"
          margin="auto"
          onMouseLeave={() => setHovered(false)}
        />
         </Box>
      )}
        {/* <Image src={dpImage} _hover={{border:"1px solid green" , cursor:"pointer" , src:"https://www.shutterstock.com/image-photo/coimbatore-india-march-20th-2021-260nw-2007769664.jpg" , w:"100%" , h:"100%" }} w="100%" h={"100%"}  margin={"auto"}  />   </Box> */}
   
     </Box>
     {/* Box 2 */}
        <Box w={"70%"}  p={5} position={"relative"} >

             {/* modal */}
      {modal &&    <Box zIndex={102} bgColor={"white"} position={"absolute"} p={2} w={"500px"} top={"-10vh"} boxShadow='2xl'  borderRadius={"10px"} border={"1px solid white"}  display={modal?"block":"none"} >
 <Box  position={"relative"} top={"10px"} left={"93%"} _hover={{cursor:"pointer"}} onClick={()=>setModal((prev)=>!prev)} > <ImCancelCircle style={{fontSize:"25px"}}  /> </Box>
           <form onSubmit={handleUserSubmit}> 
  <FormControl  isRequired p={2} >

<Heading fontSize={"xl"} mt={5} > Basic Details </Heading>

  <FormLabel mt={5}>Name</FormLabel>
  <Input type='name' name="name" onChange={handleUserChange} value={data.name}  /> 
  <FormLabel mt={5}>Email address</FormLabel>
  <Input type='email' name="email" onChange={handleUserChange} disabled value={data.email}  /> 
  <FormLabel mt={5}>Mobile Number</FormLabel>
  <Input type="number" name="number" onChange={handleUserChange} value={data.number} />
  
  <FormLabel>Experience</FormLabel>
   <Flex >
   <RadioGroup defaultValue={data.status=="fresher"?"fresher":"experienced"}  >
 <Radio   value="fresher"   name="status" onChange={handleUserChange}>Fresher</Radio> 
  <Radio ml={"20px"}  value="experienced"    name="status" onChange={handleUserChange} >Experienced</Radio>

</RadioGroup>
   </Flex>

<FormLabel mt={5}>City</FormLabel>
<Input type='text' name="city" value={data.city} onChange={handleUserChange}  />
  <Button isDisabled={data.status?false:true} type='submit'mt={5} >Update</Button>
  
  </FormControl>
  </form>

   </Box>    }

 
 {/*  */}

          <Flex alignItems={"center"} width={"100%"} justifyContent={"center"} > <Heading>{data.name}</Heading>  <FaPen onClick={()=>setModal((prev)=>!prev)}  style={{marginLeft:"10px" , cursor:"pointer"  }} /> </Flex>
          
          <Box h={"1px"}
          width={"100%"}
          bg={"gray.300"} 
          m={"20px auto"} />
          <Flex h={"50%"}  > 
            <Box w={"50%"}  >
             <Flex alignItems={"center"} ><FaLocationDot style={{marginRight:"10px"}}/>  <Text>{data.city}</Text> </Flex>  
             <Flex alignItems={"center"}  >  <IoBriefcase style={{marginRight:"10px"}} />  <Text>{data.status}</Text> </Flex>  
          
            </Box>
            <Box
        width="1px"
        height="100%" // Adjust height as needed
        bg="gray.300" // Background color of the line
        margin="0 20px" // Adjust margin as needed
      />
            <Box w={"50%"}  >
          <Flex alignItems={"center"} > <FaEnvelope style={{marginRight:"10px"}} /> <Text>{data.email}</Text> </Flex>  
         <Flex alignItems={"center"} > <FaPhoneAlt style={{marginRight:"10px"}} />  <Text>{data.number}</Text> </Flex> 
            </Box>
          </Flex>
         
        </Box>
      </Flex>

<Box mb={5}> 

  {/* /////////////////////////////////////// Resume  ////////////////////////////////////////////////////// */}

  <Flex mt={10} p={2} borderRadius={5} border={"1px solid black"} justifyContent={"space-between"} > <Heading fontSize={"20px"} >Resume</Heading>  
   {resumeDown==false?<FaChevronDown onClick={()=>setResumeDown((prev)=>!prev)} style={{margin:"5px" , border: "1px solid black" }} />:<FaChevronUp onClick={()=>setResumeDown((prev)=>!prev)} style={{margin:"5px" , border: "1px solid black" }}/>}  </Flex> 
{resumeDown && <Box  margin={"auto"} p={2}  bgColor={"white"}  >
  
  <Text>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</Text>
  <Box width={expandResume?"100%":moreData.resume==""?"auto":"500px"} height={expandResume?"800px":moreData.resume==""?"auto":"600px"}  margin={"10px auto"}  > 
  {/* {console.log(moreData.resume?"true":"false")} */}
  {moreData.resume!=="" && <iframe  src={moreData.resume} width={"100%"} height="80%" frameborder="0"></iframe>  } 
   {uploadResume?<form onSubmit={handleSubmit}>
      <Input type="file" accept=".pdf" onChange={handleFileChange} />
      <Button type="submit">Upload Resume</Button>
      </form>:moreData && moreData.resume!==""?<> <Button m={5} p={5} onClick={()=>setUploadResume((prev)=>!prev)} >Update Resume</Button> <Button onClick={()=>setExpandResume((prev)=>!prev)} >{expandResume?"Back":"Expand"}</Button> </>:<Button m={5}  p={5} onClick={()=>setUploadResume((prev)=>!prev)} >Upload Resume</Button> }

      </Box>
  
</Box>}

      {/* ////////////////////////////////////////////   Skills /////////////////////////////////////////////////// */}
      <Flex mt={10} p={2} borderRadius={5} border={"1px solid black"} justifyContent={"space-between"} > <Heading fontSize={"20px"} >My Skills</Heading>    {skillsDown==false?<FaChevronDown onClick={()=>setSkillsDown((prev)=>!prev)} style={{margin:"5px" , border: "1px solid black" }} />:<FaChevronUp onClick={()=>setSkillsDown((prev)=>!prev)} style={{margin:"5px" , border: "1px solid black" }}/>}  </Flex> 
 { skillsDown &&  <Box bgColor={"white"} p={2} >
<Grid gap={10} textAlign={"center"} gridTemplateColumns={"repeat(6,1fr)"} > 
{moreData.skills.length>0 ? moreData.skills.map((el)=>{
  return <Box p={2}  bgColor={"gray.200"} borderRadius={"5px"} w={"100px"}  >{el}</Box>
}):<Text>No skills added as of now</Text>}
</Grid>



 {addSkills && <>  <Heading mt={5}  fontSize={15}>Choose your skill</Heading>
  <Select mt={5} onChange={handleChange} name="skills" defaultValue={"choose"} >
  <option disabled value="choose"  >Choose any one</option>
    <option  value="MERN Developer"> MERN Developer</option>
    <option  value="Backend Developer" >Backend Developer</option>
    <option  value="Devops Engineer" >Devops Engineer</option>
  </Select>
  <Button mt={2} onClick={handleSkill} >Save</Button>  </>  }
  <Button mt={2} onClick = {()=>setAddSkills((prev)=>!prev)} >{addSkills?"Back":"Add More Skills"}</Button>
</Box> }
</Box>
    
    </Box>
    </Box>

    
    </>)
}

export default CompleteProfile




