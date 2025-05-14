import { faCommentDots, faEllipsisVertical, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getDatabase, onValue, ref, remove, update } from "firebase/database"
import { useState } from "react"
import { auth } from "../firebase"

const PostComponent = ({ postData }) => {
    console.log('this is post data', postData)


    const [openPostId, setOpenPostId] = useState(null)
    const [postError, setPostError] = useState()
    const [userPosts, setUserPosts] = useState()

    const toggleMenu = (id) => {
        if (openPostId === id) {
            setOpenPostId(null)

        } else {
            setOpenPostId(id)
        }

    }


    //post Edit Handler 


    const editPostHandler = (id) => {



    }


    //post Edit Handler 
    //delete post handler

    const deletePostHandler = async (id) => {


        try {

            const db = getDatabase()
            const userId = auth.currentUser.uid
            const postRef = ref(db, `users/${userId}/posts/${id}`)

            await remove(postRef)
        } catch (err) {
            setPostError("items not fount")
        }

    }
    //delete post handler


    return (
        <>

            {

                postData.map((items, key) => {


                    return <div key={key} className="relative rounded-lg flex flex-col gap-4 justify-center text-left p-10 pt-10 pb-10 mt-10 bg-white">
                        <span onClick={() => toggleMenu(items.id)} className="absolute top-4 right-4 cursor-pointer"><FontAwesomeIcon icon={faEllipsisVertical} /></span>
                        {
                            openPostId === items.id && <div className="absolute w-26 p-2 top-4 right-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"><ul>
                                <li className="cursor-pointer hover:bg-gray-200 pl-2 text-sm" onClick={() => editPostHandler(items.id)}> Edit</li>
                                <li className="cursor-pointer hover:bg-gray-200 pl-2 text-sm" onClick={() => deletePostHandler(items.id)}>Delete</li>
                            </ul></div>
                        }

                        <div className="flex items-center gap-3 ">
                            <span className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full"><FontAwesomeIcon icon={faUser} /></span>
                            <div className="flex flex-col">

                                <span className="font-bold">{items.userProfileName}</span>
                                <span className="text-sm">{items.timeAgo}</span>
                            </div>
                        </div>
                        <h2 className="font-bold">{items.title}</h2>
                        <p>{items.description}</p>
                        <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className="flex gap-4 items-center">

                            <div className="flex gap-4 items-center">

                                <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faHeart} />{items.likes}</p>
                                <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faCommentDots} /> 200</p>
                                <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faShareNodes} /> 17</p>
                            </div>
                            <input className="w-full h-8 bg-gray-100 rounded-full pl-5 focus:outline-0" type="text" placeholder="Write your comment" />
                        </div>
                    </div>
                })
            }



        </>
    )
}
export default PostComponent