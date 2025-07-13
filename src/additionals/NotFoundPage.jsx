import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// import Lottie from 'lottie-react'
// import animation from '../../../public/404.json'
const NotFoundPage = () => {

  return (
      <> 
      <div className={`h-[100vh]  w-[100%] flex flex-col gap-1.5 
       items-center inter-family overflow-hidden`}>
    
        {/* <Lottie animationData={animation} loop={true} 
        style={{ height: 350, width: 400  }} className='overflow-hidden' /> */}
      <Link to='/'>
      <button className="mt-3 px-5 cursor-pointer py-2 border-none rounded-[3px]
       bg-blue-700 text-white font-bold text-[16px]">
              Go Back Home
            </button></Link>
    </div>
      </>
  )
}

export default NotFoundPage
