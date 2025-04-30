
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
    const parms = useParams()
    console.log('this is useParms', parms)



    useEffect(() => {

        const db = getDatabase()
        const useRef = ref(db, 'users')
        onValue(useRef, (snapshot) => {
            const usersData = snapshot.val()

            const allPosts = []

            if (usersData) {
                Object.entries(usersData).forEach(([key, value]) => {
                    const usrPost = value.posts
                    const newPost = Object.entries(usrPost)
                    newPost.forEach(([key, value]) => {

                        allPosts.push(value)
                    })


                })
                setPosts(allPosts)
            }
        })

    }, [])



    return (
        <>
            <main className="bg-blue-50 pt-5">
                <div className="grid grid-cols-3">
                    <div className="flex items-start justify-center sticky top-0"><Menu /></div>

                    <div>

                        {
                            Object.entries(posts).map(([key, items]) => {

                                return <AllPosts
                                    ProfileName={items.ProfileName}
                                    postTitle={items.postTitle}
                                    postDescription={items.postDescription}
                                    timeAgo={moment(items.postDate).fromNow()}
                                />

                            })
                        }

                    </div>
                </div>



            </main >


        </>
    )
}
export default Home