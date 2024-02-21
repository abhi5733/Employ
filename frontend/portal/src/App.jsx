import { useState } from 'react'
import AllRoutes from './component/AllRoutes'
import Navbar from './component/Navbar'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { Box } from '@chakra-ui/react'

function App(){

  const [count, setCount] = useState(0)

  return (
    <Box>
     <Navbar/>
     <AllRoutes />
     </Box>

      
  )
}

export default App
