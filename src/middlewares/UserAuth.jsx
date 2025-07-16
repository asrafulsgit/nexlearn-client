import React, { useContext } from 'react'
import { AuthContext } from '../controllers/AuthProvider'
import { Navigate } from 'react-router';

const UserAuth = ({children}) => {
  const {isLoggedIn, userInfo} = useContext(AuthContext);
  const isAuthFunc =()=>{
    if(userInfo?.role === 'student' || userInfo?.role === 'tutor' || userInfo?.role === 'admin'){
        return true
    }
    return false;
    }
  return (isLoggedIn && isAuthFunc() ? children : <Navigate to='/login' />)
}

export default UserAuth;
