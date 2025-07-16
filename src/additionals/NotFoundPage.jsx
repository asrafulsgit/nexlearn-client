import React, { useContext } from 'react'
import { Link } from 'react-router'
import NotFoundImage from '../assets/NotFound.jpg'
const NotFoundPage = () => {

  return (
      <> 
       <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <img
        src={NotFoundImage || ''} 
        alt="404 Not Found"
        className="w-72 h-auto mb-6"
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
      </>
  )
}

export default NotFoundPage
