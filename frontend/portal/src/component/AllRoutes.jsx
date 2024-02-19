import React from 'react'
import { Routes , Route ,Router } from 'react-router-dom'
import Login from "../Pages/Login.jsx"
import Signup from "../Pages/Signup.jsx"

const AllRoutes = () => {
 
   return( 
        <Routes> 
    <Route  path='/login' element={<Login/>}  />
    <Route path="/signup" element={<Signup/>}  />
    </Routes>
   
   )

}

export default AllRoutes