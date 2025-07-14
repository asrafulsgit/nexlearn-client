import React, { useContext, useEffect, useState } from 'react'
import Navbar from './components/users/nav/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/users/footer/Footer'
import Toastify from './additionals/Toastify'
import ScrollVehaviour from './additionals/ScrollVehaviour'
import { AuthContext } from './controllers/AuthProvider'
import Loader from './additionals/Loader'

const App = () => {
     const {loading} = useContext(AuthContext);
     const [showLoader, setShowLoader] = useState(true)
  
     
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 500)
      return () => clearTimeout(timer)
    }, [])
  
    if (loading || showLoader) {
      return (<Loader />)
    }
     
  return (
    <>
      <ScrollVehaviour />
      <Toastify />
       <>
          <Navbar />
          <Outlet />
          <Footer />
       </>
    </>
  )
}

export default App
