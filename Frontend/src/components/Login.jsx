import { Link } from 'react-router-dom'
import Picture from '../assets/images/banner.png'
import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onButtonClick = () => {
        setEmailError('')
        setPasswordError('')

        // Check if the user has entered both fields correctly
        if ('' === email) {
            setEmailError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            return
        }

        // if all fields entered correctly then backend login procedure as below
    }

    return (
        <div id="login" className="flex box-border">
            <div className="flex flex-col justify-center items-center border-r-2 min-h-[100vh] min-w-[50vw]">
                <img src={Picture} alt="picture" className='w-[36rem] drop-shadow-2xl' />
                <h1 className='text-2xl font-bold font-markoOne mt-4'>@MinfulHeaven</h1>
            </div>
            <div className='flex justify-center items-center m-auto'>
                <div className='flex flex-col justify-center border-2 h-[30rem] rounded-lg px-14 gap-8 shadow-md'>
                    <div className='self-center'>
                        <h1 className='text-xl font-bold underline'>Login to your account</h1>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            id="user-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 rounded-md px-4 py-1 w-60'
                            placeholder='Enter your email'
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
                        />
                        <label className="text-xs text-red-500 pl-2">{passwordError}</label>
                    </div>
                    <div className='self-center'>
                        <button
                            className='px-8 py-1 text-white rounded-lg bg-blue-400 hover:bg-blue-500'
                            onClick={onButtonClick}
                        >
                            Login
                        </button>
                    </div>
                    <div className='self-center'>
                        {/* Add forgot password procedure if link clicked */}
                        <Link className='text-sm underline text-blue-500'>Forgot password?</Link>
                        <h4 className='text-sm'>Didn't have account yet? <Link className='text-blue-500 underline' to='/signup'>Sign up</Link> </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login