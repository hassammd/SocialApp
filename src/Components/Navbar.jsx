import { faFlag } from "@fortawesome/free-regular-svg-icons"
import { faCartPlus, faHouse, faPeopleGroup, faRightFromBracket, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { auth } from "../firebase"

const Navbar = () => {

    const navigate = useNavigate()
    //logout 

    const logoutHandler = () => {

        signOut(auth).then(() => {
            console.log('Singout Successfully')
            navigate('/')
        }).catch((err) => { console.log(err) })


    }


    //logout 





    return (
        <>
            <div className="bg-white p-10 sticky top-28 w-full rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">

                <ul className=" flex flex-col justify-left items-start gap-2 sticky top-30 color-red-100">
                    <li><Link className="flex items-center gap-2 justify-center" to={'/home'}><span><FontAwesomeIcon icon={faHouse} /></span> Home</Link></li>
                    <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faUserGroup} />Friends</Link></li>
                    <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faPeopleGroup} />Groups</Link></li>
                    <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faCartPlus} />Marketplace</Link></li>
                    <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faFlag} />Pages</Link></li>
                    <li><Link onClick={logoutHandler} className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faRightFromBracket} />Logout</Link></li>

                </ul>
            </div>

        </>
    )
}

export default Navbar