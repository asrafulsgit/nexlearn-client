import React, { useContext } from 'react'
import loaderImage from '../assets/loader.svg'
const Loader = () => {
   
  return (
    <div className={`w-[100%] h-[100vh]  bg-white flex justify-center items-center`}>
       <img src={loaderImage} alt="loading" className='w-18 h-18' />
    </div>
  )
}

export default Loader
