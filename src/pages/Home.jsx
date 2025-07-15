import React, { useContext } from 'react'
import Hero from '../components/users/home/Hero'
import AvailableStudySession from '../components/users/home/AvailableStudySession'
import PlatformFeatures from '../components/users/home/PlatformFeatures'
import HowItWorks from '../components/users/home/HowItWorks'
import WhyNexLearn from '../components/users/home/WhyNexLearn'
import CallToAction from '../components/users/home/CallToAction'
import { AuthContext } from '../controllers/AuthProvider'

const Home = () => {
  const {isLoggedIn}=useContext(AuthContext);
  return (
    <>  
        <Hero />
        <AvailableStudySession />
        <PlatformFeatures />
        <HowItWorks />
        <WhyNexLearn />
        {!isLoggedIn && <CallToAction />}
    </>
  
)}

export default Home
