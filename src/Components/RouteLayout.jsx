import { Outlet, Route, Routes } from "react-router-dom"
import Login from "./Login"
import Home from "../Pages/Home"
import Navbar from "./Navbar"
import Header from "./Header"

const RouteLayout = () => {

    return (

        <>
            <Header />
            <Outlet />

        </>
    )
}
export default RouteLayout