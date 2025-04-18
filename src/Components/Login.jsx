import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onAuthMod }) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState({})
    console.log(loginError)

    const navigate = useNavigate()


    //error handling


    //error handling





    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = { userName, password }
        const error = {}
        if (!userInfo.userName) {
            error.userName = "Enter username"
        } if (!userInfo.password) {
            error.password = "Enter password"
        } if (error) {
            setLoginError(error)
        } if (Object.keys(error).length === 0) {
            setLoginError('')
            navigate('/home')

        }
        // Add login logic here (e.g., API call)

    };

    return (
        <div className="w-full max-w-md m-auto bg-white p-8">
            <h3 className="text-2xl font-bold mb-6">Login</h3>

            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6">
                <div className="flex flex-col gap-2 items-start relative w-full">
                    <label className="text-sm font-medium" htmlFor="username">
                        Username
                    </label>
                    <FontAwesomeIcon
                        className="text-gray-400 absolute bottom-3 left-2 w-4"
                        icon={faUser}
                    />
                    <input
                        id="username"
                        className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none"
                        type="text"
                        placeholder="Type your username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <span className="absolute top-17 text-xs text-red-500">{loginError.userName}</span>
                </div>

                <div className="flex flex-col gap-2 items-start relative w-full">
                    <label className="text-sm font-medium" htmlFor="password">
                        Password
                    </label>
                    <FontAwesomeIcon
                        className="text-gray-400 absolute bottom-10 left-2 w-4"
                        icon={faLock}
                    />
                    <input
                        id="password"
                        className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none"
                        type="password"
                        placeholder="Type your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="absolute top-17 text-xs text-red-500">{loginError.password}</span>
                    <a
                        href="/forgot-password"
                        className="w-full text-sm text-right text-blue-500 hover:underline"
                    >
                        Forgot Password?
                    </a>
                </div>

                <div className="w-full">
                    <button
                        type="submit"
                        className="w-full text-white bg-gradient-to-r from-green-400 to-blue-500 py-2 rounded-md hover:from-green-500 hover:to-blue-600"
                    >
                        LOGIN
                    </button>
                </div>

                <div className="w-full">
                    <span onClick={() => navigate('/signup')} className="w-100 cursor-pointer">SIGN UP</span>
                </div>
            </form>
        </div>
    );
};

export default Login;