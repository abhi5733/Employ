import React from 'react'
import "../styles/Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
 
    return (
  

    <div id='navbar' >
   <Link to="/login" > <h1>Login</h1> </Link>
   <Link to="/signup" >   <h1>Signup</h1> </Link>
    </div>
  

    )
}

export default Navbar