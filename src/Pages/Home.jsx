
import AddPost from "../Components/AddPost"
import Menu from "../Components/Navbar"

const Home = () => {

    return (
        <>
            <main className="bg-blue-50 pt-5">
                <div className="grid grid-cols-3">
                    <div className="flex items-start justify-center sticky top-0"><Menu /></div>
                    <div><AddPost /></div>
                    <div></div>
                </div>



            </main>


        </>
    )
}
export default Home