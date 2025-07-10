import React from 'react'
import Home from './pages/Home'
import Navbar from './components/users/nav/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/users/footer/Footer'

const App = () => {
  return (
    <>
       <Navbar />
       <Outlet />
       <Footer />
    </>
  )
}

export default App
