
import { getDatabase, ref, onValue } from "firebase/database"
import { auth } from "../firebase"
import AddPost from "../Components/AddPosts"
import Menu from "../Components/Navbar"
import { useEffect, useState } from "react"
import AllPosts from "../Components/AllPosts"


const Home = () => {
    const [posts, setPosts] = useState([])
    console.log(posts)

    useEffect(() => {

        const db = getDatabase()
        const useRef = ref(db, 'users')
        onValue(useRef, (snapshot) => {
            const usersData = snapshot.val()
            console.log("these are all users", usersData)
            const allPosts = []

            if (usersData) {
                Object.entries(usersData).forEach(([key, value]) => {
                    const usrPost = value.posts
                    const newPost = Object.entries(usrPost)
                    newPost.forEach(([key, value]) => {
                        console.log(value)
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
                                    postDescription={items.postDescription} />

                            })
                        }

                    </div>
                </div>



            </main >


        </>
    )
}
export default Home