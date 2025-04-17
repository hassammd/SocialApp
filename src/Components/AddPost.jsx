import { faUser } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const AddPost = () => {
    return (

        <>
            <div className="bg-white flex flex-col gap-4 justify-center p-10 pt-10 pb-10">
                <div className=" flex justify-left gap-3 ">
                    <div className="bg-gray-100 flex flex-col items-center justify-center w-10 h-10 rounded-full">

                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input type="text" className="bg-gray-100 rounded-full pl-5" placeholder="What on Your Mind?" />

                </div>
                <hr className="bg-gray-100 h-1" />

            </div>

        </>
    )
}

export default AddPost