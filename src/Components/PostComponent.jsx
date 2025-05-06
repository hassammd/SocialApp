import { faCommentDots, faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PostComponent = ({ postData }) => {



    return (
        <>

            {
                postData.map((items, key) => {


                    return <div key={key} className="rounded-lg flex flex-col gap-4 justify-center text-left p-10 pt-10 pb-10 mt-10 bg-white">
                        <div className="flex items-center gap-3">
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