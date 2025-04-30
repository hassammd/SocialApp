import { faCommentDots, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { faHeartBroken, faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { auth } from "../firebase"
import { getAuth } from "firebase/auth"

const AllPosts = ({ ProfileName, postTitle, postDescription, timeAgo }) => {

    const auuth = getAuth
    // console.log('this is outh', auth.currentUser)

    return (
        <>


            <div className="rounded-lg flex flex-col gap-4 justify-center text-left p-10 pt-10 pb-10 mt-10 bg-white">
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
                <div className="flex gap-4 items-center">

                    <div className="flex gap-4 items-center">

                        <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faHeart} /> 1.2k</p>
                        <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faCommentDots} /> 200</p>
                        <p className="cursor-pointer flex gap-2 items-center"><FontAwesomeIcon icon={faShareNodes} /> 17</p>
                    </div>
                    <input className="w-full h-8 bg-gray-100 rounded-full pl-5 focus:outline-0" type="text" placeholder="Write your comment" />
                </div>
            </div>

        </>
    )
}
export default AllPosts