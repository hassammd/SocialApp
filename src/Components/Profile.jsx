import AddPost from "./AddPost"

const Profile = () => {
    return (

        <>

            <div className="bg-gray-200 h-70 flex items-center justify-center relative">

                <h2>User Profile</h2>
                <div className="flex items-end absolute -bottom-18 left-10 gap-3">
                    <div className="border border-gray-300 rounded-full bg-gray-100 h-30 w-30  flex justify-center items-center">
                        <span>Image</span>
                    </div>
                    <div>
                        <h2>Profile Name</h2>
                        <span>@username</span>
                    </div>

                </div>
            </div>




        </>
    )
}
export default Profile