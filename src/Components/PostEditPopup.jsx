import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getDatabase, onValue, ref, update } from "firebase/database"
import { useEffect, useState } from "react"
import { auth } from "../firebase"

const PostEditPopup = ({ postData, editPostHandler, key }) => {

    const [postTitle, setPostTitle] = useState('')
    const [postDescription, setPostDescription] = useState('')


    const items = postData[0]

    console.log('these ara items', items.id)



    useEffect(() => {

        if (items) {

            setPostTitle(items.title)
            setPostDescription(items.description)

        }


    }, [items])
    const updatePostHandler = async (e) => {
        e.preventDefault()

        try {

            const userId = auth.currentUser.uid
            const db = getDatabase()
            const postRef = ref(db, `users/${userId}/posts/${items.id}`)

            await update(postRef, {
                postTitle: postTitle,
                postDescription: postDescription
            })


        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className=" fixed top-1/2 left-1/2 z-9  rounded-lg bg-white flex flex-col gap-4 justify-center p-10 pt-10 pb-10">

                <span className="absolute  top-3  right-4 cursor-pointer text-gray-700 hover:text-red-500">
                    <FontAwesomeIcon icon={faXmark} onClick={editPostHandler} />
                </span>
                <form onSubmit={updatePostHandler} className="flex flex-col gap-4" action="">

                    <div className=" flex justify-left gap-3 ">
                        <div className="bg-gray-100 flex flex-col items-center justify-center w-12 h-10 rounded-full">

                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} className="w-full bg-gray-100 rounded-full pl-5 focus:outline-0" placeholder="What on Your Mind?" />
                    </div>
                    <p className="text-red-400 text-sm text-left"></p>
                    <div>
                        <textarea className="w-full bg-gray-100 rounded-xl pl-5 pt-5 focus:outline-0" value={postDescription} onChange={(e) => setPostDescription(e.target.value)} placeholder="Description" rows={4} name="" id="" ></textarea>

                        {/* <p className="text-red-400 text-sm text-left">des</p> */}

                    </div>
                    <div className="flex justify-end ">

                        <button type="submit" className="w-20 bg-blue-200">Post</button>
                    </div>
                </form>
                <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

            </div>

        </>
    )
}

export default PostEditPopup