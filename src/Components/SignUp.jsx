import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { data } from "react-router-dom"

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [signUpError, setSignUpError] = useState({})






    //validation config
    const validationConfig = {

        name: [{ required: true, message: 'Enter name' }],
        email: [{ required: true, message: 'Enter email' }, { pattern: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/, message: 'Enter valid email' }],
        Password: [{ required: true, message: 'Enter password' },
        { passwordPattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, message: "Password must include uppercase, lowercase, number, and special character (@#$&*)" },
        { minlength: 8, message: "password must be atleast 8 characters" }
        ],


        confirmPassword: [{ required: true, message: 'Enter confirmed password' }]




    }


    //validation config




    const SignUpHander = (e) => {
        e.preventDefault()

        const userData = { name, email, Password, confirmPassword }
        const error = {}
        console.log(userData)
        Object.entries(userData).forEach(([key, value]) => {

            if (validationConfig[key]) {

                for (let rule of validationConfig[key]) {
                    if (rule.required && !value) {
                        error[key] = rule.message
                        break
                    } if (rule.pattern && !rule.pattern.test(value)) {
                        error[key] = rule.message
                        break
                    } if (rule.minlength && value && value.length < rule.minlength) {
                        error[key] = rule.message
                        break
                    }
                    if (rule.passwordPattern && value && !rule.passwordPattern.test(value)) {
                        error[key] = rule.message
                    }
                }

                if (Password && confirmPassword && Password !== confirmPassword) {
                    error.confirmPassword = "Passwords do not match";
                }
            } if (Object.entries(error).length > 0) {
                setSignUpError(error)
            } if (Object.entries(error).length == 0) {
                setSignUpError('')
            }
        })




    }




    return (
        <>


            <div className="w-full max-w-md m-auto bg-white p-8">
                <h2 className="text-2xl font-bold mb-6">Sign up</h2>
                <form action="" onSubmit={SignUpHander} className="flex flex-col items-start gap-6">

                    <div className="flex flex-col  gap-2 items-start relative w-full">
                        <label className="text-sm font-medium" htmlFor="">Name</label>
                        <input onChange={(e) => setName(e.target.value)} className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none" type="text" placeholder="Name" value={name} />
                        <FontAwesomeIcon className="text-gray-400 absolute bottom-3 left-2 w-4" icon={faUser} />
                        <span className="absolute top-17 text-xs text-red-500">{signUpError.name}</span>
                    </div>
                    <div className="flex flex-col  gap-2 items-start relative w-full">
                        <label className="text-sm font-medium" htmlFor="">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none" type="text" placeholder="Email" value={email} />
                        <FontAwesomeIcon className="text-gray-400 absolute bottom-3 left-2 w-4" icon={faEnvelope} />
                        <span className="absolute top-17 text-xs text-red-500">{signUpError.email}</span>
                    </div>
                    <div className="flex flex-col  gap-2 items-start relative w-full">
                        <label className="text-sm font-medium" htmlFor="">Password</label>
                        <FontAwesomeIcon className="text-gray-400 absolute bottom-3 left-2 w-4" icon={faLock} />
                        <input onChange={(e) => setPassword(e.target.value)} className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none" type="password" placeholder="Password" value={Password} />
                        <span className="absolute top-17 text-xs text-red-500">{signUpError.Password}</span>
                    </div>
                    <div className="flex flex-col  gap-2 items-start relative w-full">
                        <label className="text-sm font-medium" htmlFor="">Confirm Password</label>
                        <FontAwesomeIcon className="text-gray-400 absolute bottom-3 left-2 w-4" icon={faLock} />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-8 border-b border-gray-300 text-sm py-2 focus:outline-none" type="password" placeholder="Confirm Password" value={confirmPassword} />
                        <span className="absolute top-17 text-xs text-red-500">{signUpError.confirmPassword}</span>

                    </div>
                    <div className="w-full">
                        <button className="w-full w-full text-white bg-gradient-to-r from-green-400 to-blue-500 py-2 rounded-md hover:from-green-500 hover:to-blue-600">Sign Up</button>
                    </div>


                    <div className="w-full">
                        <span className="w-100 cursor-pointer">LOGIN</span>
                    </div>
                </form>


            </div>

        </>
    )
}
export default SignUp