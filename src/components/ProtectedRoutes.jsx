import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const {user,accessToken} = useSelector((state) => state.user)
    
return (user && accessToken) ? children : <Navigate to="/login" />;


}

export default ProtectedRoutes