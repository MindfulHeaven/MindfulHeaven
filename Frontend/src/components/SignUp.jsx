import { useState } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../assets/images/login-signup.png'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const nevigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const onButtonClick = async () => {
        setUsernameError("")
        setEmailError("")
        setPasswordError("")

        if (username === "") {
            setUsernameError('Please enter name')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }

        signup()
    }

    const signup = async () => {
        try{
            const response = await fetch(`http://localhost:1818/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: `${username}`,
                    email: `${email}`,
                    password: `${password}`
                })
            })
            console.log(response)
            if(response.status === 201){
                nevigate('/login')
            }
            else{
                alert('Something went wrong try again!')
            }
        }
        catch(error){
            console.log(error)
            alert('Something went wrong try again!')
        }
    }

    return (
        <div id="login" className="flex box-border">
            <div className='flex justify-center items-center m-auto'>
                <div className='flex flex-col justify-center border-2 h-[30rem] rounded-lg px-14 gap-8 shadow-md'>
                    <div className='self-center'>
                        <h1 className='text-xl font-bold underline'>Sign up to get started</h1>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            id="user-name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='border-2 rounded-md px-4 py-1 w-60'
                            placeholder='Enter your name'
                            required
                        />
                        <label className="text-xs text-red-500 pl-2">{usernameError}</label>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            id="user-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 rounded-md px-4 py-1 w-60'
                            placeholder='Enter your email'
                            required
                        />
                        <label className="text-xs text-red-500 pl-2">{emailError}</label>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            id="user-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-2 rounded-md px-4 py-1 w-60'
                            placeholder='Enter your password'
                            required
                        />
                        <label className="text-xs text-red-500 pl-2">{passwordError}</label>
                    </div>
                    <div className='self-center'>
                        <button
                            className='px-8 py-1 text-white rounded-lg bg-blue-400 hover:bg-blue-500'
                            onClick={onButtonClick}
                        >
                            Signup
                        </button>
                    </div>
                    <div className='self-center'>
                        <h4 className='text-sm'>Already have an account - <Link className='text-blue-500 underline' to='/login'>Login</Link> </h4>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center border-l-2 min-h-[100vh] min-w-[50vw]">
                <img src={Picture} alt="picture" className='w-[32rem] drop-shadow-2xl' />
                <h1 className='text-2xl font-bold font-markoOne mt-2'>@MinfulHeaven</h1>
            </div>
        </div>
    )
}

export default SignUp