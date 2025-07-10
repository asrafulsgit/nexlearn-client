import React from 'react'
import Hero from '../components/home/Hero'
import Navbar from '../components/nav/Navbar'
import AvailableStudySession from '../components/home/AvailableStudySession'
import PlatformFeatures from '../components/home/PlatformFeatures'
import HowItWorks from '../components/home/HowItWorks'
import WhyNexLearn from '../components/home/WhyNexLearn'
import CallToAction from '../components/home/CallToAction'

const Home = () => {
  return (
    <>  
        <Hero />
        <AvailableStudySession />
        <PlatformFeatures />
        <HowItWorks />
        <WhyNexLearn />
        <CallToAction />
    </>
  
)}

export default Home
