import { Box, Button, Divider, Flex , FormControl, FormLabel, Grid, Heading, Image , Input, Radio, RadioGroup, Select, Text , useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoBriefcase } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import axios from 'axios';
import { FaChevronDown, FaChevronUp, FaPen } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginFunction, loadingFunction , logged, loginFunction, stoploadingFunction } from '../redux/action'



const InfoComponent = ({data , load , setModal , modal , handleUserChange ,job , setJob,jobDescription , setData ,edit,setEditJob,jobList , editId , editInfo ,  setJobDescription } ) => {

const toast = useToast()
const user = useSelector((store)=>store.user); 
const dispatch = useDispatch()


     // handling user submit
    
      const  handleUserSubmit = async (e) => {
      
        try{ 
       e.preventDefault()
       console.log(data)
    
       const datas = await axios.put(`${import.meta.env.VITE_URL}/admin/updateUser` , data , {
    // user Information passed in headers 
          headers:{
            authorization : localStorage.getItem("token") ,
            "user": localStorage.getItem("role")
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
        setModal(false)
        console.log(err)
     
      }
      
      }

      // posting new Job 

      const handlePostJob = async (e)=>{
        e.preventDefault()
        if(jobDescription.postTitle==null){
          toast({
            description: "Please select a job title",
            status: 'error',
            position:"top",
            duration: 2000,
            isClosable: true,
          })
        }else if(jobDescription.employment_type==null){
       toast({
          description: "Please select your employment type",
          status: 'error',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
        }else{
        try{
          dispatch(loadingFunction())
          setJob(false)
          setModal(false)
          // console.log(,"jobDescription")
          setJobDescription((prev)=>({...prev,company_name:data.company_name}))
       
        // console.log("job posted",jobDescription)
        const datas = await axios.post(`${import.meta.env.VITE_URL}/admin/postJob` , jobDescription , { headers:{
          authorization : localStorage.getItem("token") 

        }})
        setJobDescription({})
        dispatch(stoploadingFunction())
     
        toast({
          description: "Job Posted successfully",
          status: 'success',
          position:"top",
          duration: 2000,
          isClosable: true,
        })
    
   setData(datas.data.admin)
        console.log(datas.data.admin,"data")

        }catch(err){
          dispatch(stoploadingFunction())
          setJob(false)
          setModal(false)
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
      }
    
      // Edit job Posted

      const handleEditJob = async ()=>{

        try{
         dispatch(loadingFunction())
          const data = await axios.put(`${import.meta.env.VITE_URL}/admin/updateJob`, editInfo , { headers:{
            authorization : localStorage.getItem("token") 
          }})
         dispatch(stoploadingFunction())
          setJob(false)
          setModal(false)
          setEditJob(false)
           console.log(data,"data")
          toast({
            description: "Job Updated successfully",
            status: 'success',
            position:"top",
            duration: 2000,
            isClosable: true,
          })

          

        }catch(err){

          dispatch(stoploadingFunction())
          console.log(err)

          setJob(false)
          setModal(false)
          setEditJob(false)

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
   <Box>
    {/******************** Info Box *********************************/}
    <Box > 
              <Flex alignItems={"center"} width={"100%"} justifyContent={"center"} > 
                <Heading>{data?.name}</Heading> 
                 <FaPen isDisabled={load?true:false} onClick={()=>load?"null":setModal((prev)=>!prev)}  style={{marginLeft:"10px" , cursor:"pointer"  }} /> </Flex>
              
              <Box h={"2px"}
              width={"100%"}
              bg={"gray.300"} 
              m={"20px auto"} />
              <Flex  flexDirection={["column","column","row","row"]} h={"50%"}  > 
                <Box  w={["100%","100%","50%","50%"]}  >
                <Flex  mt={"20px"}  alignItems={"center"} ><FaLocationDot style={{ fontSize:"30px" , marginRight:"10px"}}/>  <Text fontSize={"20px"} >{user=="user"?data?.city:data.company_name}</Text> </Flex>   
               <Flex mt={"20px"} alignItems={"center"}  >  <IoBriefcase style={{ mt:"100px" ,    fontSize:"30px" ,marginRight:"10px"}} />  <Text  fontSize={"20px"}>{user=="user"?data?.status:data.designation}</Text> </Flex>   
              
                </Box>
              
                <Box  w={["100%","100%","50%","50%"]}  >
              <Flex  mt={"20px"}  alignItems={"center"} > <FaEnvelope style={{ fontSize:"30px" ,  marginRight:"10px"}} /> <Text  fontSize={"20px"}>{data?.email?data.email:""}</Text> </Flex>  
             <Flex  mt={"20px"}  alignItems={"center"} > <FaPhoneAlt style={{fontSize:"30px" , marginRight:"10px"}} />  <Text  fontSize={"20px"}>{data?.number}</Text> </Flex> 
                </Box>
              </Flex>
             {user=="user"?"": <Box>  <Box  h={"2px"}
              width={"100%"}
              bg={"gray.300"} 
              m={"20px auto"}  mt={"50px"}/>
              <Button  onClick={()=>{ setJob((prev)=>!prev), setModal((prev)=>!prev)}} color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} >Post Job</Button>
               </Box> }
              </Box>

              {/*************************** Info / job Modal ***************************************/}

              {modal &&    <Box zIndex={102} bgColor={"white"} position={"fixed"} p={2} margin={"auto"} w={["90%", "80%", "50%", "40%"]} h={user === "user" ?"":"100%"} top={user === "user" ? ["50%", "50%", "50%", "50%"] : job ? "50%" : "50%"} left="50%" transform="translate(-50%, -50%)" boxShadow='2xl'  borderRadius={"10px"}   display={modal?"block":"none"} >
             <Box  position={"relative"} top={"10px"} left={["85%","93%","93%","93%"]} _hover={{cursor:"pointer"}} onClick={()=>{setModal((prev)=>!prev),setJob(false),setEditJob(false)}} > <ImCancelCircle style={{fontSize:"25px"}}  /> </Box>
                      {user=="user"?<form onSubmit={handleUserSubmit}> 
              <FormControl  isRequired p={2} >
            
            <Heading fontSize={"xl"} mt={[1,2,2,1]} > Basic Details </Heading>
            
              <FormLabel  mt={[1,2,2,1]}>Name</FormLabel>
              <Input type='name' name="name" onChange={handleUserChange} value={data.name}  /> 
              <FormLabel  mt={[1,2,2,1]}>Email address</FormLabel>
              <Input type='email' name="email" onChange={handleUserChange} disabled value={data.email}  /> 
              <FormLabel  mt={[1,2,2,1]}>Mobile Number</FormLabel>
              <Input type="number" name="number" onChange={handleUserChange} value={data.number} />
              
              <FormLabel>Experience</FormLabel>
               <Flex >
               <RadioGroup defaultValue={data.status=="fresher"?"fresher":"experienced"}  >
             <Radio   value="fresher"   name="status" onChange={handleUserChange}>Fresher</Radio> 
              <Radio ml={["0px","20px","20px","20px"]}  value="experienced"    name="status" onChange={handleUserChange} >Experienced</Radio>
            
            </RadioGroup>
               </Flex>
            
            <FormLabel  mt={[1,2,2,1]}>City</FormLabel>
            <Input type='text' name="city" value={data.city} onChange={handleUserChange}  />
              <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} isDisabled={data.status?false:true} type='submit'mt={5} >Update</Button>
              
              </FormControl>
              {/* job Modal */}
              </form>:job?<form onSubmit={edit?handleEditJob:handlePostJob}> 
              <FormControl  isRequired p={2} >
            
           {edit?<Heading fontSize={"xl"}  mt={[1,2,2,1]} >Edit your Job</Heading>:<Heading fontSize={"xl"}  mt={[1,2,2,1]} > Post a New Job </Heading>}
              <FormLabel mt={[1,2,2,1]}>Company Name</FormLabel>
              <Input height={"30px"} type='text' name="company_name" onChange={handleUserChange} disabled value={edit?editInfo.company_name:data.company_name}  /> 
              <FormLabel  mt={[1,2,2,1]}>Post Title</FormLabel>
              {/* <Input type='text' name="postTitle" value={edit?editInfo.postTitle:jobDescription.postTitle} onChange={handleUserChange}    />  */}
              <Select
              height={"30px"}
                 mt={[1,2,2,1]}
                 onChange={handleUserChange} // Replace with your handler function
                 name="postTitle"
                 defaultValue={"choose"}
                 width={"50%"}
                 value={edit?editInfo.postTitle:jobDescription.postTitle}
                 required
                >
                 <option disabled value="choose">Choose a job title</option>
                 <option value="Software Engineer">Software Engineer</option>
                 <option value="Frontend Developer">Frontend Developer</option>
                 <option value="Backend Developer">Backend Developer</option>
                 <option value="Full Stack Developer">Full Stack Developer</option>
                 <option value="Data Scientist">Data Scientist</option>
                 <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                 <option value="AI Specialist">AI Specialist</option>
                 <option value="DevOps Engineer">DevOps Engineer</option>
                 <option value="Cloud Architect">Cloud Architect</option>
                 <option value="QA Engineer">QA Engineer</option>
                 <option value="Product Manager">Product Manager</option>
                <option value="IT Support Specialist">IT Support Specialist</option>
                </Select>
     <FormLabel  mt={[1,2,2,1]}>Description</FormLabel>
              <Input height={"30px"} type="text" name="description" value={edit?editInfo.description:jobDescription.description} onChange={handleUserChange} />
              <FormLabel>Employment Type</FormLabel>
              <Select height={"30px"}  mt={[1,2,2,1]} onChange={handleUserChange} required name="employment_type" defaultValue={"choose"} width={"50%"} value={edit?editInfo.employment_type:jobDescription.employment_type} >
                <option disabled value="choose"  >Choose any one</option>
                  <option  value="Full-time">Full-time</option>
                  <option  value="Part-time" >Part-time</option>
                  <option  value="Contract" >Contract</option>
                  <option  value="Internship" >Internship</option>
                </Select>
            
            <FormLabel  mt={[1,2,2,1]}>Tags</FormLabel>
            <Input height={"30px"} type='text' name="tags"  value={edit?editInfo.tags:jobDescription.tags}  onChange={handleUserChange}  />
            <FormLabel  mt={[1,2,2,1]}>Vacancy</FormLabel>
            <Input height={"30px"} type='number' name="vacancy"  value={edit?editInfo.vacancy:jobDescription.vacancy} onChange={handleUserChange}  />
            <FormLabel  mt={[1,2,2,1]}>Salary</FormLabel>
            <Flex gap={5}> 
              <Box> 
            <FormLabel  mt={[1,2,2,1]}>Minimum Salary</FormLabel>
            <Input height={"30px"}  type='number' name="minSalary"  value={edit?editInfo?.salary?.min:jobDescription?.salary?.min} onChange={handleUserChange}  />
            </Box>
            <Box> 
            <FormLabel  mt={[1,2,2,1]}>Maximum Salary</FormLabel>
            <Input height={"30px"}  type='number'  name="maxSalary"  value={edit?editInfo?.salary?.max:jobDescription?.salary?.max} onChange={handleUserChange}  />
            </Box>
            </Flex>
            <Button height={"30px"} isDisabled={load?true:false} color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} type='submit'mt={5} >Post</Button>
              
              </FormControl>
              </form>:<form onSubmit={handleUserSubmit}> 
              <FormControl  isRequired p={1} >
            
            <Heading fontSize={"xl"}  mt={[1,2,2,1]} > Basic Details </Heading>
            
              <FormLabel  mt={[1,2,2,1]}>Name</FormLabel>
              <Input type='text' name="name" height={"30px"} onChange={handleUserChange} value={data.name}  /> 
              <FormLabel  mt={[1,2,2,1]}>Email address</FormLabel>
              <Input type='email' name="email" height={"30px"} onChange={handleUserChange} disabled value={data.email}  /> 
              <FormLabel  mt={[1,2,2,1]}>Mobile Number</FormLabel>
              <Input type="number" name="number" height={"30px"} onChange={handleUserChange} value={data.number} />
              
              <FormLabel>Company Name</FormLabel>
              <Input type="text" name="company_name" height={"30px"} onChange={handleUserChange} value={data.company_name} />
            
              <FormLabel>designation</FormLabel>
              <Input type="text" name="designation" height={"30px"} onChange={handleUserChange} value={data.designation} />
            
            <FormLabel  mt={[1,2,2,1]}>Company Loaction</FormLabel>
            <Input type='text' name="CompanyLoaction" height={"30px"} value={data.CompanyLoaction} onChange={handleUserChange}  />

            <FormLabel  mt={[1,2,2,1]}>Company Address</FormLabel>
            <Input type='text' name="address" height={"30px"} value={data.address} onChange={handleUserChange}  />
            
            <FormLabel  mt={[1,2,2,1]}>Pin Code</FormLabel>
            <Input type='number' name="pin_code" height={"30px"} value={data.pin_code} onChange={handleUserChange}  />
            
            {/* isDisabled={data.status?false:true}  */}
              <Button color={"white"} _hover={{bgColor:"orange"}}   bgColor={"darkorange"} type='submit' mt={[1,2,2,1]} >Update</Button>
              
              </FormControl>
              </form>}
            
               </Box>    }

   </Box>
  )
}

export default InfoComponent