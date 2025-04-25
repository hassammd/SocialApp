import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import PostComponent from "./PostComponent"

const AddPost = () => {

    const [postsTitle, setPostsTitle] = useState("")
    const [postDescription, setPostDescription] = useState('')
    const [postValidation, setPostValidation] = useState({})
    console.log(postValidation)
    const [post, setPost] = useState([
        {
            title: 'Post Title',
            description: 'Post Description'
        },
        {
            title: 'Second Post',
            description: "Second Post Description"
        }

    ])



    const postHandler = (e) => {
        e.preventDefault()
        const err = {}
        if (postsTitle.trim() === '') {
            err.title = "Enter post title"
        } if (postDescription.trim() === '') {
            err.description = "Enter Post Description"
        } if (err) {
            setPostValidation(err)
        } else {
            setPostValidation()
        } if (Object.entries(err).length == 0) {


            setPost([{ title: postsTitle, description: postDescription }, ...post])
            setPostsTitle("");
            setPostDescription("");
        }

    }

    return (

        <>
            <div className="rounded-lg bg-white flex flex-col gap-4 justify-center p-10 pt-10 pb-10">
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
            {
                post.map((items) => {
                    return <PostComponent title={items.title} description={items.description} />
                })
            }

        </>
    )
}

export default AddPost