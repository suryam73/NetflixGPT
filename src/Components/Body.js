import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './Login'
import Bower from './Bower'

const Body = () => {

  const [loggedInStatus, setLoggedInStatus] = useState(localStorage.getItem('isLoggedIn'));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedInStatus(localStorage.getItem('isLoggedIn'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/brower',
      element: loggedInStatus ? <Bower /> : <Navigate to='/' />
    }
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
