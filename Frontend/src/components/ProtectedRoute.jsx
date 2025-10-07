import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null = loading
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    try {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token')
      
      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      // Token exists, user is authenticated
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state - show spinner
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-8 h-8 border-4 border-[#3c6e71] border-t-transparent rounded-full animate-spin mx-auto !mb-4'></div>
          <p className='text-gray-400'>Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Authenticated - show the protected content
  return children
}

export default ProtectedRoute
