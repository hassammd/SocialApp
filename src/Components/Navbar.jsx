import { faFlag } from "@fortawesome/free-regular-svg-icons"
import { faCartPlus, faHouse, faPeopleGroup, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>

            <ul className="flex flex-col justify-left items-start gap-2 color-red-100">
                <li><Link to={'home'}><span><FontAwesomeIcon icon={faHouse} /></span> Home</Link></li>
                <li><Link><FontAwesomeIcon icon={faUserGroup} />Friends</Link></li>
                <li><Link><FontAwesomeIcon icon={faPeopleGroup} />Groups</Link></li>
                <li><Link><FontAwesomeIcon icon={faCartPlus} />Marketplace</Link></li>
                <li><Link><FontAwesomeIcon icon={faFlag} />Pages</Link></li>

            </ul>

        </>
    )
}

export default Navbar