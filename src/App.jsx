import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import RouteLayout from './Components/RouteLayout'
import Home from './Pages/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Profile from './Components/Profile'
import ProtectedRoute from './Components/ProtectedRoute'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />


        <Route element={<ProtectedRoute />}>

          <Route element={<RouteLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>

      </>
    )
  )

  return <RouterProvider router={router} />
}

export default App
