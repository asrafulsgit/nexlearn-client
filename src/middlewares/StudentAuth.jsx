import React, { useContext } from 'react'
import { AuthContext } from '../controllers/AuthProvider'
import { Navigate } from 'react-router';

const StudentAuth = ({children}) => {
  const {isLoggedIn, userInfo} = useContext(AuthContext);
  return (isLoggedIn && userInfo?.role === 'student' ? children : <Navigate to='/login' />)
}

export default StudentAuth;
