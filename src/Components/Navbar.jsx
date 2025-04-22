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

            <ul className="flex flex-col justify-left items-start gap-2 color-red-100">
                <li><Link className="flex items-center gap-2 justify-center" to={'home'}><span><FontAwesomeIcon icon={faHouse} /></span> Home</Link></li>
                <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faUserGroup} />Friends</Link></li>
                <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faPeopleGroup} />Groups</Link></li>
                <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faCartPlus} />Marketplace</Link></li>
                <li><Link className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faFlag} />Pages</Link></li>
                <li><Link onClick={logoutHandler} className="flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faRightFromBracket} />Logout</Link></li>

            </ul>

        </>
    )
}

export default Navbar