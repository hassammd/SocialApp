import { faCommentDots, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { faHeartBroken, faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { getAuth } from "firebase/auth"
import { getDatabase, ref } from "firebase/database"

const AllPosts = ({ ProfileName, postTitle, postDescription, timeAgo }) => {

    const [comments, setComments] = useState('')
    const [allComments, setAllComments] = useState([])



    const commentHandler = (e) => {
        e.preventDefault()
        if (comments.trim() !== "") {

            setAllComments([...allComments, comments])
            console.log('all comment added', allComments)
        }

    }

    useEffect(() => {

        const db = getDatabase()


    })

    return (
        <>





            <div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg flex flex-col gap-4 justify-center text-left mb-10 p-10 pt-10 pb-10 bg-white">
                <div className="flex gap-2 items-center">
                    <p className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full">  <span><FontAwesomeIcon icon={faUser} /></span></p>
                    <div className="flex flex-col">

                        <span className="font-bold">{ProfileName}</span>
                        <p className="text-sm">{timeAgo}</p>
                    </div>

                </div>
                <h2 className="font-bold">{postTitle}</h2>
                <p>{postDescription}</p>
                <hr class="h-px  bg-gray-200 border-0 dark:bg-gray-700" />
                <div className="flex gap-4 items-center justify-between">

                    <div className="flex gap-4 items-center">

                        <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faHeart} /> 1.2k</p>
                        <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faCommentDots} /> 200</p>
                        <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faShareNodes} /> 17</p>
                    </div>
                    <div className="flex items-center">
                        <form className="flex items-center gap-2" action="" onSubmit={commentHandler}>

                            <input onChange={(e) => setComments(e.target.value)} className="w-full h-8 bg-gray-100 rounded-full pl-5 focus:outline-0" type="text" placeholder="Write your comment" />
                            <button className="bg-gray-100 pt-1 pl-4 pr-4 pb-1">add</button>
                        </form>
                    </div>
                </div>

            </div>

        </>
    )
}
export default AllPosts