import { useNavigate } from "react-router-dom"

const Header = () => {

    const navigate = useNavigate('')
    return (
        <>
            <header className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] sticky top-0 z-10 bg-white rounded-t-[2vw]  flex gap-3 justify-between items-center pl-10 pr-10 pt-7 pb-7">

                <div>
                    <div className="cursor-pointer" onClick={() => navigate('/home')}>LOGO</div>
                </div>
                <div className="w-150">
                    <input className="w-full bg-gray-100 pl-3 pr-3 pt-1 pb-1" type="text" name="" id="" placeholder="Search.." />
                </div>
                <div>
                    <span className="cursor-pointer" onClick={() => navigate('/profile')}>Profile</span>
                </div>
            </header>
        </>
    )
}

export default Header