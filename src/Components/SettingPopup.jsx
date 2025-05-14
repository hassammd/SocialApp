import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getDatabase, ref, update } from "firebase/database"
import { useEffect, useState } from "react"
import { auth } from "../firebase"

const SettingPopup = ({ profileData, onClose }) => {
    const [updatedName, setUpdatedName] = useState('')
    const [updatedBio, setUpdatedBio] = useState('')
    const [updatedUserName, setUserName] = useState('')

    useEffect(() => {
        if (profileData) {
            setUpdatedName(profileData.name || '')
            setUpdatedBio(profileData.bio || '')
            setUserName(profileData.username || '')
        }
    }, [profileData])

    const profileSettingHandler = (e) => {
        e.preventDefault()

        const db = getDatabase()
        const profileRef = ref(db, `users/${auth.currentUser.uid}`)
        update(profileRef, {
            name: updatedName,
            bio: updatedBio,
            username: updatedUserName

        })
            .then(() => alert('Profile updated'))
            .catch((err) => console.log(err))
    }

    return (
        <div className="bg-blue-50 w-100 p-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 rounded shadow-md">
            <div className="relative w-full flex flex-col items-center justify-center">
                <form className="w-full flex flex-col gap-3" onSubmit={profileSettingHandler}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="text-sm pl-2 py-1 text-gray-700 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="username"
                        value={updatedUserName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="text-sm pl-2 py-1 text-gray-700 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Bio"
                        value={updatedBio}
                        onChange={(e) => setUpdatedBio(e.target.value)}
                        className="text-sm pl-2 py-1 text-gray-700 border border-gray-300 rounded"
                    />
                    <button type="submit" className="w-full bg-white border rounded py-1 text-sm hover:bg-gray-100">
                        Update
                    </button>
                </form>

                <span

                    className="absolute -top-6 -right-6 cursor-pointer text-gray-700 hover:text-red-500"
                >
                    <FontAwesomeIcon icon={faXmark} onClick={onClose} />
                </span>
            </div>
        </div>
    )
}

export default SettingPopup
