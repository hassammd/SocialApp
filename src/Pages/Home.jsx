
import { getDatabase, ref, onValue } from "firebase/database"
import { auth } from "../firebase"
import AddPost from "../Components/AddPosts"
import Menu from "../Components/Navbar"
import { useEffect, useState } from "react"
import AllPosts from "../Components/AllPosts"
import moment from "moment"
import { useParams } from "react-router-dom"


const Home = () => {
    const [posts, setPosts] = useState([])
    const [alluserName, setAllUserName] = useState([])
    const parms = useParams()
    console.log('all userName', alluserName)




    useEffect(() => {

        const db = getDatabase()
        const useRef = ref(db, 'users')
        onValue(useRef, (snapshot) => {
            const usersData = snapshot.val()
            console.log('this is user Data,', usersData)

            const allPosts = []
            const allusers = []

            if (usersData) {
                Object.entries(usersData).forEach(([key, value]) => {
                    const usrPost = value.posts
                    //getging user
                    const userName = value.name
                    if (value.name) {
                        allusers.push(value.name)
                    }
                    //getging user
                    const newPost = Object.entries(usrPost)
                    newPost.forEach(([key, value]) => {

                        allPosts.push(value)
                    })


                })
                setPosts(allPosts)
                setAllUserName(allusers)
            }
        })

    }, [])



    return (
        <>
            <main className="bg-blue-50 pt-20">
                <div className="flex gap-6 justify-center">
                    <div className="flex  items-start justify-center sticky top-0 col-span-1 w-[20%]   "><Menu /></div>

                    <div className="w-[50%]">

                        {
                            Object.entries(posts).map(([key, items]) => {

                                return <AllPosts
                                    key={key}
                                    ProfileName={items.ProfileName}
                                    postTitle={items.postTitle}
                                    postDescription={items.postDescription}
                                    timeAgo={moment(items.postDate).fromNow()}
                                />

                            })
                        }

                    </div>
                    <div className="w-[20%]  ">
                        <div className="bg-white p-10 sticky top-28 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                            <h3 className="font-bold mb-10">Other Users</h3>
                            <div className="flex flex-col gap-4">
                                {
                                    alluserName.map((items) => {
                                        return (

                                            <div className="flex gap-2 flex-row items-center ">
                                                <div className="bg-gray-200 w-10 h-10 rounded-full"></div>
                                                <p>{items}</p>

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>



            </main >


        </>
    )
}
export default Home