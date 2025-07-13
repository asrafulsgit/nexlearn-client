import React from 'react'
import Navbar from './components/users/nav/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/users/footer/Footer'
import Toastify from './additionals/Toastify'
import ScrollVehaviour from './additionals/ScrollVehaviour'

const App = () => {
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
