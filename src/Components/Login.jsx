import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { faFacebookF, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState({})
    const [firebaseLoginErr, setFirebaseLoginErr] = useState('')
    const [isLogedIn, setIsLogedIn] = useState(false)

    const navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()

    //error handling

    const configHandler = {

        email: [{ required: true, message: 'Enter email' }],
        password: [{ required: true, message: 'Enter password' }, { invalidEmail: true, message: "Invalid Email" }]
    }

    //error handling

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLogedIn(true)
                navigate('/profile')
            } else {
                navigate('/')
                console.log('user is not logedin')

            }

        })
    }, [])

    //login with google

    const singInWithGoogle = () => {

        signInWithPopup(auth, googleProvider).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
    }


    //login with google




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
        <>
            {!isLogedIn ? (<> < div className="w-full max-w-md m-auto bg-white p-8" >
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
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-center w-100 text-gray-600 text-sm">Or Sign Up Using</p>
                        <ul className="flex gap-2">
                            <li className="cursor-pointer bg-blue-500 text-white w-10 h-10 p-2 rounded-full flex items-center justify-center"><FontAwesomeIcon icon={faFacebookF} /></li>
                            <li className="cursor-pointer bg-black text-white w-10 h-10 p-2 rounded-full flex items-center justify-center"><FontAwesomeIcon icon={faXTwitter} /></li>
                            <li onClick={singInWithGoogle} className="cursor-pointer bg-red-400 text-white w-10 h-10 p-2 rounded-full flex items-center justify-center"><FontAwesomeIcon icon={faGoogle} /></li>
                        </ul>

                    </div>

                    <div className="w-full">
                        <span onClick={() => navigate('/signup')} className="w-100 cursor-pointer">SIGN UP</span>
                    </div>
                </form>
            </div > </>) : <p>Loading....</p>
            }

        </>


    );
};

export default Login;