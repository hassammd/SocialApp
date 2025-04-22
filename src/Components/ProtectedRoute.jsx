import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Outlet, useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser) {
                setUser(currentUser)

            } else {
                navigate('/')
            }
            setLoading(false)
            return () => unsubscribe()
        })
    }, [navigate])

    if (loading) {

        return <p>Loading...</p>
    }

    return <Outlet />

}
export default ProtectedRoute