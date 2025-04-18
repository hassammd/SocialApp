import { useState } from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RouteLayout from './Components/RouteLayout'
import Home from './Pages/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'


function App() {




  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<RouteLayout />}>
          <Route path='home' element={<Home />} />

        </Route>
      </>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
