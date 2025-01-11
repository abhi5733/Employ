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
import { adminLoginFunction, loadingFunction, logged, loginFunction, stoploadingFunction } from '../redux/action'
import { useDispatch, useSelector } from 'react-redux'
import loader from "../assets/loader.gif"
import PhotoComponent from '../component/PhotoComponent'
import InfoComponent from '../component/InfoComponent'
import placeholder from "../assets/placeholderImage.png"
import companyLogo from "../assets/logoPlaceholder.png"
const CompleteProfile = () => {

  const dispatch= useDispatch() 
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
const load = useSelector((store)=>store.load)
  const user = useSelector((store)=>store.user); 
  const toast = useToast()
  const [job,setJob] = useState(false)
const[jobDescription,setJobDescription] = useState({})
const[showJobs,setShowJobs] = useState(false)
const[jobList,setJobList] = useState([])
const[edit,setEditJob] = useState(false)
const[editId,setEditId] = useState("")
const[editInfo,setEditInfo] = useState({})
  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  };



  const handlePhotoModal = ()=>{

    setPhotoModal((prev)=>!prev)
    // setModal((prev)=>!prev)
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
      dispatch(loadingFunction())
      const response = await axios.post(`${import.meta.env.VITE_URL}/admin/uploadResume`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "authorization" : localStorage.getItem("token"),
          "Userid" : data._id
        }
      });
      console.log('File uploaded successfully:', response.data);
      // setMoreData(response.data)
      setData(response.data)
      setFile(null)
      setUploadResume(false)
      dispatch(stoploadingFunction())
      toast({
        description: "Resume uploaded successfully",
        status: 'success',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      dispatch(stoploadingFunction())
      console.error('Error uploading file:', error);
    }
  }else{
    dispatch(stoploadingFunction())
    toast({
      description: "Choose you file for upload first",
      status: 'error',
      position:"top",
      duration: 2000,
      isClosable: true,
    })
  }
};



  useEffect(()=>{

    if(user=="user"){
  dispatch(loadingFunction())
    // getting user data from backend
    const getUserData = async ()=>{
      try{
        const req1 = await axios.get(`${import.meta.env.VITE_URL}/admin/`, {
          headers:{
            authorization : localStorage.getItem("token")
          }
        })
        dispatch(stoploadingFunction())
        console.log(req1.data[0]) , setData(req1.data[0])
        toast({
          description: "User Data Retrieved Successfully",
          status: 'success',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
      }catch(err){
        dispatch(stoploadingFunction())
        toast({
          description: "Something went wrong",
          status: 'error',
          position:"top",
          duration: 2000,
          isClosable: true})
          console.log(err)

        }

  }
  getUserData()
   

 
  }else{

  // getting admin data from backend
 const getAdminData = async ()=>{
  try{
    dispatch(loadingFunction())
  const req1 = await axios.get(`${import.meta.env.VITE_URL}/admin/adminData`, {
    headers:{
      authorization : localStorage.getItem("token")
    }
  
  })
  dispatch(stoploadingFunction())

  toast({
    description: "Admin Data Retrieved Successfully",
    status: 'success',
    position:"top",
    duration: 2000,
    isClosable: true,
  })
  console.log(req1.data[0]) , setData(req1.data[0]) , setJobDescription({company_name:req1.data[0].company_name})
}catch(err){
  dispatch(stoploadingFunction())
  toast({
    description: "Something went wrong",
    status: 'error',
    position:"top",
    duration: 2000,
    isClosable: true})
    console.log(err)

  }

}
getAdminData()
}


  

  },[])

  const handleChange = (e)=>{
    const {name,value} = e.target
    if(data.skills.includes(value)){
      toast({
        description: "Already added that skill , Press Save Now",
        status: 'error',
        position:"top",
        duration: 2000,
        isClosable: true,
      })
    }else{
     data.skills.push(value)
    // setData((prevData) => ({
    //   ...prevData, 
    //   skills: [...prevData.skills, value], // Add the new value to the skills array
    // }))
    // setMoreData({...moreData })
    // console.log(moreata)
    }
}


  // handling skill change

  const handleSkill = async ()=>{

    try{

    // console.log(moreData)
  const datas = await axios.patch(`${import.meta.env.VITE_URL}/admin/update` , data , {
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
    // setMoreData(data.data)
    setData(datas.data)
    // console.log(data , moreData)
  
  }catch(err){
  
  console.log(err)
  toast({
    description: "Couldnt added that skill",
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

  if(edit){
 
    if(name=="minSalary" || name=="maxSalary"){
      setEditInfo((prevData)=>({ ...prevData, salary:{...prevData.salary,[name=="minSalary"?"min":"max"]:value}}))
    }else{
      setEditInfo(prevData=>({...prevData,[name]:value}))
    }
  }else if(job){

  if(name=="minSalary" || name=="maxSalary"){
    setJobDescription((prevData)=>({ ...prevData, salary:{...prevData.salary,[name=="minSalary"?"min":"max"]:value}}))
  }else{
    setJobDescription(prevData=>({...prevData,[name]:value}))
  }
}else{
  setData({...data, [name]:value})
}
  }


  // getting all jobs 

  const getPostedJobs = async ()=>{

    try{
      setShowJobs(true)
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

    // delete Job posted
  
        

        const handleDelete =  async (el)=>{
          // console.log(el.posted_by)
          try{
            dispatch(loadingFunction())
            await axios.delete(`${import.meta.env.VITE_URL}/admin/deleteJob/${el._id}`, {
        headers:{
          authorization : localStorage.getItem("token"),
          adminId: el.posted_by
        }})
        dispatch(stoploadingFunction())
        toast({
          description: "Job Deleted Successfully",
          status: 'success',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
        getPostedJobs()
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
        



  return (
    <> 
    
    <Box bgColor={"#f8f8fc"} border={"1px solid white"} minH={"90vh"}   > 
        { load &&  <Image position="absolute" zIndex={200} src={loader} left={"50%"} top={"50%"} transform={"translate(-50%,-50%)"}    margin={"auto"} h={"500px"} w={"500px"}  /> }
      
     { (modal && !load) && <Box mt={"-10vh"} w="100vw" position={"absolute"} zIndex={101}  h={"100%"} bgColor={"black"} opacity={"0.5"} onClick={()=>{setModal((prev)=>!prev),setJob(false),setEditJob(false)}}  /> }
 {photoModal && !load && <Box mt={"-10vh"} w="100vw" position={"absolute"} zIndex={101}  h={"100%"} bgColor={"black"} opacity={"0.5"} onClick={handlePhotoModal}  /> }
    <Box    width={"80%"} margin={"auto"}>

    {/* /////////////////////////////////////////////////////  Top - Portion    /////////////////////////////////////////////////////////////// */}
      <Flex  flexDirection={["column","row","row","row"]} border={"2px solid orange"}  bgColor={"white"} mt={50} borderRadius={"10px"} justifyContent={"space-between"} p={5} position={"relative"} >
      {/******************************  Photo Component  ***************************************/}
    <PhotoComponent data={data} file={file} setData={setData} photoModal={photoModal} handlePhotoModal={handlePhotoModal} handleFileChange={handleFileChange} />
    
        <Box w={[ "100%","70%","70%","70%"]}  p={5} position={"relative"} >
          {/*************************************** Info Component ******************************************************/}
  <InfoComponent  data={data}  load={load} setModal={setModal} modal={modal} handleUserChange={handleUserChange} job={job} setJob ={setJob} jobDescription={jobDescription}setData={setData} edit={edit} setEditJob={setEditJob} jobList={jobList} editId={editId} editInfo={editInfo}  setJobDescription={ setJobDescription} />
    
        </Box>
      </Flex>
{user=="user"?<Box mb={5}> 

  {/* /////////////////////////////////////// Resume  ////////////////////////////////////////////////////// */}

  <Flex mt={10} p={2} borderRadius={5} border={"2px solid orange"} bgColor={"white"}  justifyContent={"space-between"} > <Heading fontSize={"20px"} >Resume</Heading>  
   {resumeDown==false?<FaChevronDown onClick={()=>!load?setResumeDown((prev)=>!prev):""} style={{margin:"5px" }} />:<FaChevronUp onClick={()=>!load?setResumeDown((prev)=>!prev):""} style={{margin:"5px" }}/>}  </Flex> 

{resumeDown && <Box  margin={"auto"} p={2}  bgColor={"white"}  >
  
  <Text>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</Text>
  <Box width={expandResume?"100%":data?.resume==""?"auto":["100%","500px","500px","500px"]} height={expandResume?"800px":data?.resume==""?"auto":"600px"}  margin={"10px auto"}  > 
  {/* Displaying Resume in Iframe here */}
  {data?.resume!=="" && <iframe  src={data?.resume} width={"100%"} height="80%" frameborder="0"></iframe>} 
   {uploadResume?<form onSubmit={handleSubmit}>
      <Input type="file" accept=".pdf" isDisabled={load} onChange={handleFileChange} />
      <Button isDisabled={load?true:false} type="submit">Upload Resume</Button>
      </form>:data && data?.resume?<> <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} m={5} p={5} isDisabled={load?true:false} onClick={()=>setUploadResume((prev)=>!prev)} >Update Resume</Button>
       <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} isDisabled={load?true:false} onClick={()=>setExpandResume((prev)=>!prev)} >{expandResume?"Back":"Expand"}</Button> 
       </>:<Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} isDisabled={load?true:false} m={5}  p={5} onClick={()=>setUploadResume((prev)=>!prev)} >Upload Resume</Button> }

      </Box>
  
</Box>}

      {/* ////////////////////////////////////////////   Skills /////////////////////////////////////////////////// */}
      <Flex mt={10} p={2} borderRadius={5} border={"2px solid orange"} bgColor={"white"} justifyContent={"space-between"} > <Heading fontSize={"20px"} >My Skills</Heading> 
         {skillsDown==false?<FaChevronDown onClick={()=>!load?setSkillsDown((prev)=>!prev):""} style={{margin:"5px"  }} />
         :<FaChevronUp onClick={()=>!load?setSkillsDown((prev)=>!prev):""} style={{margin:"5px"  }}/>}  </Flex> 
 { skillsDown &&  <Box bgColor={"white"} p={2} >
<Grid gap={10} textAlign={"center"} gridTemplateColumns={["repeat(2,1fr)","repeat(6,1fr)","repeat(6,1fr)","repeat(6,1fr)"]} > 
{data?.skills?.length>0 ?data.skills.map((el)=>{
  return <Box p={2}  bgColor={"gray.200"} borderRadius={"5px"} w={"100px"}  >{el}</Box>
}):<Text>No skills added as of now</Text>}
</Grid>



 {addSkills && <>  <Heading mt={5}  fontSize={15}>Choose your skill</Heading>
  <Select mt={5} onChange={handleChange} name="skills" width={"50%"} defaultValue={"choose"} >
  <option disabled value="choose"  >Choose any one</option>
    <option  value="MERN Developer"> MERN Developer</option>
    <option  value="Backend Developer" >Backend Developer</option>
    <option  value="Devops Engineer" >Devops Engineer</option>
  </Select>
  <Button   _hover={{bgColor:"orange"}}  color={"white"} bgColor={"darkorange"}  mt={5} onClick={handleSkill} >Save</Button>  </>  }
  <Button   _hover={{bgColor:"orange"}}  color={"white"} bgColor={"darkorange"}  mt={5} onClick = {()=>setAddSkills((prev)=>!prev)} >{addSkills?"Back":"Add More Skills"}</Button>
</Box> }
</Box>:
// Show all Posted jobs
<Box>
<Flex mt={10} p={2} borderRadius={5} border={"2px solid orange"} bgColor={"white"}  justifyContent={"space-between"} > <Heading fontSize={"20px"} >Job Posted</Heading>  
{!showJobs?<FaChevronDown onClick={()=>!load?getPostedJobs():""} style={{margin:"5px" }} />:<FaChevronUp onClick={()=>!load?setShowJobs(false):""} style={{margin:"5px" }}/>}  </Flex> 
{showJobs && jobList.length>0?<Box bgColor={"white"}>
  {jobList.map((el,ind)=> <Box mt={"10px"} p={5} border={"2px solid orange"} key={el._id}>  
    <Flex justifyContent={"space-around"} >
      <Box width={"30%"} >
        <Image width={"100%"} borderRadius={"5px"} src={data?.CompanyPic||companyLogo} />
      </Box>
      <Box width={"50%"}> 
        <Flex h={"100%"}  flexDirection={"column"} justifyContent={"space-between"} > 
      <Box>
      <Text><b> Description :</b> {el.description}</Text>
      <Text><b> Company Name : </b> {el.company_name}</Text>
      </Box>
     <Box mt={"20px"}>
      <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} onClick={()=>{  setEditInfo(el) , setJob((prev)=>!prev) , setEditJob(prev=>true) , setModal(true)}} >Edit</Button>
      <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"}  ml={"10px"} onClick={()=>handleDelete(el)} >Delete</Button>
      </Box>
      </Flex>
      </Box>
    
    </Flex>
  </Box>)}
  </Box>:showJobs&&jobList.length==0?<Box>
    <Text>No jobs Posted Yet </Text>
    </Box>:""}
</Box> }
    
    </Box>
    </Box>

    
    </>)
}

export default CompleteProfile


