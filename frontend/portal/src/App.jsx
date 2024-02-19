import { useState } from 'react'
import AllRoutes from './component/AllRoutes'
import Navbar from './component/Navbar'
import Signup from './Pages/Signup'
import Login from './Pages/Login'

function App(){

  const [count, setCount] = useState(0)

  return (
    <div> 
     <Navbar/>
     <AllRoutes />
  

      </div>
  )
}

export default App
