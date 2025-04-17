import AddPost from "../Components/AddPost"
import Menu from "../Components/Menu"

const Home = () => {
    return (
        <>
            <main className="bg-blue-50 pt-5">
                <div className="grid grid-cols-3">
                    <div className="flex items-center justify-center"><Menu /></div>
                    <div><AddPost /></div>
                    <div></div>
                </div>



            </main>


        </>
    )
}
export default Home