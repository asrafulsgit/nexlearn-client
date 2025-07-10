import React from 'react'
import Hero from '../components/users/home/Hero'
import AvailableStudySession from '../components/users/home/AvailableStudySession'
import PlatformFeatures from '../components/users/home/PlatformFeatures'
import HowItWorks from '../components/users/home/HowItWorks'
import WhyNexLearn from '../components/users/home/WhyNexLearn'
import CallToAction from '../components/users/home/CallToAction'

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
