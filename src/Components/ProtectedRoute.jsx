import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { onAuthStateChanged } from "firebase/auth"
import { Outlet, useNavigate } from "react-router-dom"

const ProtectedRoute = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                console.log('user is logedin')
            } else {
                navigate('/')
            }
            setLoading(false)
        })

        // Cleanup
        return () => unsubscribe()
    }, [navigate])

    if (loading) {
        return <p>Loading...</p>
    }

    return user ? <Outlet /> : null
}

export default ProtectedRoute
