import React from 'react'
import { Routes , Route ,Router } from 'react-router-dom'
import Login from "../Pages/Login.jsx"
import Signup from "../Pages/Signup.jsx"
import Home from '../Pages/Home.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import Profile from '../Pages/Profile.jsx'
import CompleteProfile from '../Pages/CompleteProfile.jsx'
import Jobs from '../Pages/Jobs.jsx'


const AllRoutes = () => {
 
   return( 
        <Routes> 
         
    <Route  path='/' element={   <Home/>  }  />
    <Route  path='/login' element={<Login/>}  />
    <Route path="/signup" element={<Signup/>}  />
    <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}  />
    <Route path="/completeProfile" element={<CompleteProfile/>}  />
    <Route path="/jobs"  element={<PrivateRoute>  <Jobs/> </PrivateRoute>}  />
    </Routes>
   
   )

}

export default AllRoutes