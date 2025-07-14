import React, { useContext } from 'react'
import { AuthContext } from '../controllers/AuthProvider';
import { Navigate } from 'react-router';

const TutorAuth = ({children}) => {
 const {isLoggedIn, userInfo} = useContext(AuthContext);
  return (isLoggedIn && userInfo?.role === 'tutor' ? children : <Navigate to='/login' />)

}

export default TutorAuth;
