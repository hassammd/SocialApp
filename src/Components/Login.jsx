import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState({})
    const [firebaseLoginErr, setFirebaseLoginErr] = useState('')
    console.log(loginError)

    const navigate = useNavigate()


    //error handling

    const configHandler = {

        email: [{ required: true, message: 'Enter email' }],
        password: [{ required: true, message: 'Enter password' }, { invalidEmail: true, message: "Invalid Email" }]
    }

    //error handling





    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = { email, password }
        const error = {}

        Object.entries(userInfo).forEach(([key, value]) => {

            if (configHandler) {
                for (let rule of configHandler[key]) {

                    if (rule.required && !value) {
                        error[key] = rule.message
                        console.log(error)
                    } if (Object.entries(error).length > 0) {
                        setLoginError(error)
                    }

                }
            }
        })
        if (Object.entries(error).length <= 0) {
            setLoginError('')

            try {

                await signInWithEmailAndPassword(auth, email, password)
                console.log('login successfully')
                navigate('/profile')
            } catch (error) {
                console.log(error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        setFirebaseLoginErr('Invalid email format');
                        break;
                    case 'auth/user-not-found':
                        setFirebaseLoginErr('No account found with this email');
                        break;
                    case 'auth/wrong-password':
                        setFirebaseLoginErr('Incorrect password');
                        break;
                    case 'auth/too-many-requests':
                        setFirebaseLoginErr('Too many attempts. Try again later.');
                        break;
                    case 'auth/user-disabled':
                        setFirebaseLoginErr('Account disabled. Contact support.');
                        break;
                    default:
                        setFirebaseLoginErr('Invalid Credential');

                }
            }

        }



    };

    return (
        <div className="w-full max-w-md m-auto bg-white p-8">
            <h3 className="text-2xl font-bold mb-6">Login</h3>

            {firebaseLoginErr && <p className="bg-red-100 pt-1 pb-1 mb-8">{firebaseLoginErr}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6">
                <div className="flex flex-col gap-2 items-start relative w-full">
                    <label className="text-sm font-medium" htmlFor="username">
                        Email
                    </label>
                    <FontAwesomeIcon
                        className="text-gray-400 absolute bottom-3 left-2 w-4"
                        icon={faUser}
                    />
                    <input
                        id="username"
                        className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none"
                        type="text"
                        placeholder="Type your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="absolute top-17 text-xs text-red-500">{loginError.email}</span>
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