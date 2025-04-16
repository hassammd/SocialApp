const Header = () => {
    return (
        <>
            <header className="bg-white rounded-t-[2vw]  flex gap-3 justify-between items-center pl-10 pr-10 pt-7 pb-7">

                <div>
                    <div>LOGO</div>
                </div>
                <div className="w-150">
                    <input className="w-150 bg-gray-100 pl-3 pr-3 pt-1 pb-1" type="text" name="" id="" placeholder="Search.." />
                </div>
                <div>
                    <span>Profile</span>
                </div>
            </header>
        </>
    )
}

export default Header