import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Bower from './Bower'

const Body = () => {

const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<Login/>
    }
    ,
    {
        path:'/brower',
        element:<Bower/>
    }
])

  return (
    <div>
<RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body