import React, { useContext, useState } from 'react'
import { AuthContext } from '../controllers/AuthProvider';
import { Navigate } from 'react-router';

const AdminAuth = ({children}) => {
  const {isLoggedIn, userInfo} = useContext(AuthContext);
  return (isLoggedIn && userInfo?.role === 'admin' ? children : <Navigate to='/login' />)

}

export default AdminAuth;
