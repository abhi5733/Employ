import { Box , Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from "axios"


const Jobs = () => {

  const[job,setJob] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:7300/admin/getJob", {
      "headers":{
        "Authorization":localStorage.getItem("token")
      }
    }).then((res)=>{
      console.log(res.data);
      setJob(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })

  } , [] )

// apply jobs

  const handleApply=(data)=>{

    axios.put("http://localhost:7300/admin/apply",data ,{
      "headers":{
        "Authorization":localStorage.getItem("token")
      }}).then((res) => console.log(res) )
      .catch((err) => console.log(err) )

  }


// Get all jobs

const getMyJobs=()=>{

  axios.get("http://localhost:7300/admin/getMyJob", {
    "headers":{
      "Authorization":localStorage.getItem("token")
    }
  }).then((res)=>{
    console.log(res);
    setJob(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })


}



  return (

 <Box width={"80%"} border="1px solid black" margin="auto" >

  <Button onClick={getMyJobs} >Get My Jobs</Button>

    <Flex justifyContent={"space-evenly"} >

{
job.length>0 && job.map((el)=>{
  return <Box p={2} border="1px solid black" >
    <Text>{el.company_name}</Text>
   <Text>{el.post}</Text>
   <Text>{el.vacancy}</Text>
   <Button onClick={()=>handleApply(el)} disabled={el.applicant.includes()}  >Apply</Button>
  </Box>
})
}
   </Flex>


    </Box>
  )
}

export default Jobs