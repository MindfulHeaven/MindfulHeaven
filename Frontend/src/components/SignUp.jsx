import { useState } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../assets/images/login-signup.png'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const onButtonClick = () => {
        setUsernameError('')
        setEmailError('')
        setPasswordError('')

        if(username === ''){
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

        // if all fields entered correctly then backend signup procedure as below
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