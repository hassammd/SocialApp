import { useEffect, useState } from "react"
import AddPost from "./AddPost"
import { getDatabase, ref, onValue, get } from "firebase/database"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"



const Profile = () => {

    const [profileData, setProfileData] = useState({})
    console.log(profileData)


    useEffect(() => {

        const user = auth.currentUser

        if (user) {
            const db = getDatabase()
            const useRef = ref(db, 'users/' + user.uid)
            onValue(useRef, (userData) => {
                const data = userData.val()
                setProfileData(data)
            })
        }
    }, [])

    // useEffect(() => {





    // })




    return (

        <>

            <div className="bg-gray-200 h-70 flex items-center justify-center relative">

                <h2>User Profile</h2>
                <div className="flex items-end absolute -bottom-18 left-10 gap-3">
                    <div className="border border-gray-300 rounded-full bg-gray-100 h-30 w-30  flex justify-center items-center">
                        <span>Image</span>
                    </div>
                    <div>
                        <h2>{profileData.name}</h2>
                        <span>@username</span>
                    </div>

                </div>
            </div>




        </>
    )
}
export default Profile