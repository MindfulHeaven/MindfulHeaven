import { Link, useNavigate } from 'react-router-dom'
import Picture from '../assets/images/banner.png'
import { useState } from 'react'
import { useAuthDispatch } from '../authContext'
import swal from 'sweetalert'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const dispatch = useAuthDispatch()
    const nevigate = useNavigate()

    const onButtonClick = async () => {
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
        login()
    }

    const login = async () => {
        try{
            const response = await fetch(import.meta.env.VITE_REACT_APP_BASE_URL_AUTHENTICATION+"login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: `${email}`,
                    password: `${password}`
                }),
            })
            // console.log(await response.json())
            const responseData = await response.json()
            if (!response.ok) {
                if(response.status === 400){
                    throw new Error("Username or Password is incorrect");
                }
                else{
                    throw new Error('Error logging in! Try Again!');
                }
            }
            if(responseData.user){
                const token = responseData.user
                dispatch({ type: 'LOGIN', payload: { token, email } })
                localStorage.setItem('token', token)
                localStorage.setItem('email', email)

                nevigate('/')
            }
            else{
                alert('Invalid Credentials')
            }
        }
        catch(error){
            const err = error;
            // console.log(err);
            swal({
                text: err.message,
                icon: 'warning',
                button: 'Try again!',
                dangerMode: true
            })
        }
    }

    return (
        <div id="login" className="flex box-border max-[400px]:justify-center max-[400px]:items-center max-[400px]:h-[100vh]">
            <div className="flex flex-col justify-center items-center border-r-2 min-h-[100vh] min-w-[50vw] max-[690px]:min-w-[30vh] max-[400px]:hidden">
                <img src={Picture} alt="picture" className='w-[36rem] drop-shadow-2xl max-[690px]:w-[30vh]' />
                <p className='text-xl text-center font-semibold font-markoOne max-[690px]:text-sm'>Welcome back to your peaceful place</p>
                <p className='text-xl font-semibold font-markoOne text-center max-[690px]:text-sm   '>Log in to MindfulHeaven</p>
                <h1 className='text-2xl font-bold font-markoOne mt-4 text-center max-[690px]:text-sm'>@MinfulHeaven</h1>
            </div>
            <div className='flex justify-center items-center m-auto'>
                <div className='flex flex-col justify-center border-2 h-[30rem] rounded-lg px-14 gap-8 shadow-md max-[690px]:w-[40vh]'>
                    <div className='self-center'>
                        <h1 className='text-xl font-bold underline max-[690px]:text-lg text-center'>Login to your account</h1>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            id="user-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 rounded-md px-4 py-1 w-60 max-[690px]:w-32 max-[690px]:text-sm'
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
                            className='border-2 rounded-md px-4 py-1 w-60 max-[690px]:w-32 max-[690px]:text-sm'
                            placeholder='Enter your password'
                        />
                        <label className="text-xs text-red-500 pl-2">{passwordError}</label>
                    </div>
                    <div className='self-center'>
                        <button
                            className='px-8 py-1 text-white rounded-lg bg-blue-400 hover:bg-blue-500 max-[690px]:text-sm'
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