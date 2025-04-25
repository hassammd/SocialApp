import { useEffect, useState } from "react"
import AddPost from "./AddPost"
import { getDatabase, ref, onValue, get, set, update } from "firebase/database"
import { auth } from "../firebase"
import { getStorage, ref as filestoregeRef, uploadBytes, getDownloadURL } from "firebase/storage"



const Profile = () => {


    const profileImageUploadHandler = async (file) => {
        if (!file) return;
        try {
            const storage = getStorage()
            //set image reference
            const imageRef = filestoregeRef(storage, `profileImages/${auth.currentUser.uid}`)
            //uploading image
            await uploadBytes(imageRef, file)
            //download image url
            const downloadUrl = await getDownloadURL(imageRef)
            //update the user's data in firebase
            const db = getDatabase()
            const updateRef = ref(db, `users/${auth.currentUser.uid}`)
            await update(updateRef, {
                imageUrl: downloadUrl
            })

        } catch (err) {

            console.log("Upload failed:", err.code || err.message || err);
        }

    }









    const [profileData, setProfileData] = useState({})
    console.log(profileData)

    //read data from the firebase database
    useEffect(() => {

        const user = auth.currentUser

        if (user) {
            const db = getDatabase()
            const useRef = ref(db, 'users/' + user.uid)
            onValue(useRef, (snapshot) => {
                const data = snapshot.val()
                setProfileData(data)
            })
        }
    }, [])

    //read data from the firebase database






    return (

        <>

            <div className="bg-white">

                <div className="bg-gray-200 h-70 flex items-center justify-center relative">

                    <h2>User Profile</h2>

                </div>
                <div className="flex flex-col items-start pl-20 -mt-16 mb-15 pb-10 relative">
                    <div className="border border-gray-300 rounded-full bg-gray-100 h-30 w-30  flex justify-center items-center">
                        <span><img src={profileData.imageUrl} alt="" /></span>
                        {/* <button type="file"></button> */}
                    </div>
                    <input onChange={(e) => profileImageUploadHandler(e.target.files[0])} type="file" accept="image/*" />

                    <div className="flex flex-col items-start">
                        <h2 className="font-bold">{profileData.name}</h2>
                        <span>@username</span>
                        <p>{profileData.bio}</p>

                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">

                            <span className="text-blue-600">{profileData.followers}</span>
                            <p className="text-sm">followers</p>
                        </div>
                        <div className="flex gap-2 items-center">

                            <span className="text-blue-600">{profileData.following}</span>
                            <p className="text-sm">following</p>
                        </div>
                    </div>
                </div>
                <div>


                </div>
            </div>
            <div className="w-2/5 sm:w-full m-auto rounded-sm"><AddPost /></div>




        </>
    )
}
export default Profile