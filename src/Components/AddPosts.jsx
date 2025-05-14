import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import PostComponent from "./PostComponent"
import { auth } from "../firebase"
import { ref, getDatabase, push, onValue, ref as imageRef } from 'firebase/database'

import moment from "moment"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
// import { ref as postRef, getDatabase as postDatebse, value } from "firebase/database"
const AddPost = () => {

    const [postsTitle, setPostsTitle] = useState("")
    const [postDescription, setPostDescription] = useState('')
    const [postValidation, setPostValidation] = useState({})
    const [postData, setpostData] = useState([])
    const [userUpdatedName, setUserUpdatedName] = useState()


    //read posts data from realtime database

    useEffect(() => {


        const postDb = getDatabase()
        const userRef = ref(postDb, `users/${auth.currentUser.uid}`)
        const UpdatedData = onValue(userRef, (snpahsot) => {
            const userInfo = snpahsot.val()
            const updatedName = userInfo.name
            setUserUpdatedName(updatedName)

        })
        const postRef = ref(postDb, `users/${auth.currentUser.uid}/posts`)

        onValue(postRef, (snapshot) => {
            const data = snapshot.val()
            console.log('This is data', data)

            if (data) {
                const postArray = Object.entries(data).map(([key, value]) => ({

                    id: key,
                    title: value.postTitle,
                    description: value.postDescription,
                    likes: value.likes,
                    postDate: value.postDate,
                    timeAgo: moment(value.postDate).fromNow(),
                    userProfileName: userUpdatedName || "Anonymous user"

                }))

                postArray.sort((a, b) => b.postDate - a.postDate)
                setpostData(postArray)
            }
        })
    }, [userUpdatedName])



    //read posts data from realtime database

    const postHandler = async (e) => {
        e.preventDefault()
        const err = {}
        if (postsTitle.trim() === '') {
            err.title = "Enter post title"
        } if (postDescription.trim() === '') {
            err.description = "Enter Post Description"
        } if (err) {
            setPostValidation(err)
        } else {
            setPostValidation({})
        } if (Object.entries(err).length == 0) {

            //post image upload


            //post image upload


            // setPost([{ title: postsTitle, description: postDescription }, ...post])
            setPostsTitle("");
            setPostDescription("");
            //save posts in database
            try {
                const db = getDatabase()
                const postRef = ref(db, `users/${auth.currentUser.uid}/posts`)


                await push(postRef, {
                    postTitle: postsTitle,
                    postDescription: postDescription,
                    likes: 0,
                    comments: [""],
                    ProfileName: auth.currentUser.displayName || "Anonymous user",
                    postDate: Date.now()
                })
            } catch (err) {
                console.log(err)

            }
        }

    }

    return (

        <>
            <div className="md:w-full rounded-lg bg-white flex flex-col gap-4 justify-center p-10 pt-10 pb-10">

                <form className="flex flex-col gap-4" action="" onSubmit={postHandler}>

                    <div className=" flex justify-left gap-3 ">
                        <div className="bg-gray-100 flex flex-col items-center justify-center w-12 h-10 rounded-full">

                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input type="text" value={postsTitle} className="w-full bg-gray-100 rounded-full pl-5 focus:outline-0" placeholder="What on Your Mind?" onChange={(e) => setPostsTitle(e.target.value)} />
                    </div>
                    <p className="text-red-400 text-sm text-left">{postValidation.title}</p>
                    <div>
                        <textarea className="w-full bg-gray-100 rounded-xl pl-5 pt-5 focus:outline-0" value={postDescription} placeholder="Description" rows={4} name="" id="" onChange={(e) => setPostDescription(e.target.value)}></textarea>

                        <p className="text-red-400 text-sm text-left">{postValidation.description}</p>

                    </div>
                    <div className="flex justify-end ">

                        <button type="submit" className="w-20 bg-blue-200">Post</button>
                    </div>
                </form>
                <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

            </div>



            <PostComponent postData={postData} />


        </>
    )
}

export default AddPost