import React from 'react'
import "../styles/Signup.css"
import {getFunction } from "../redux/action"
import { useDispatch, useSelector } from 'react-redux'
import { Get } from '../redux/actionType'
const Signup = () => {

    const dispatch = useDispatch()
    const store = useSelector((store)=>store.count)
  
    const handleClick = ()=>{

        dispatch(getFunction({type:Get,payload:5}))
    
    }

  return (
<>
<div id='signup' >Signup</div>
<h1>{store}</h1>

  <button onClick={handleClick} >Add</button>
  </>
    )
}

export default Signup