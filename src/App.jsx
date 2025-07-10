import React from 'react'
import Home from './pages/Home'
import Navbar from './components/nav/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/footer/Footer'

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
