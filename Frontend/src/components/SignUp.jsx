import { useState } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../assets/images/login-signup.png'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

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
            const response = await fetch(import.meta.env.VITE_REACT_APP_BASE_URL_AUTHENTICATION+"signup", {
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
                swal('You have registered to MindfulHeaven successfully.')
                nevigate('/login')
            }
            else{
                console.log('inside else');
                console.log(response.json);
                let errorMessage = await response.json();
                swal({
                    text: errorMessage.email,
                    icon: 'warning',
                    button: 'Try again!',
                    dangerMode: true
                })
            }
        }
        catch(error){
            console.log("Caught an error!");
            swal({
                text: error,
                icon: 'warning',
                button: 'Try again!',
                dangerMode: true
            })
        }
    }

    return (
        <div id="login" className="flex box-border max-[400px]:justify-center max-[400px]:items-center max-[400px]:h-[100vh]">
            <div className='flex justify-center items-center m-auto'>
                <div className='flex flex-col justify-center border-2 h-[30rem] rounded-lg px-14 gap-8 shadow-md max-[690px]:w-[40vh]'>
                    <div className='self-center'>
                        <h1 className='text-xl font-bold underline max-[690px]:text-lg text-center'>Sign up to get started</h1>
                    </div>
                    <div className='flex flex-col'>
                        <input
                            id="user-name"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='border-2 rounded-md px-4 py-1 w-60 max-[690px]:w-32 max-[690px]:text-sm'
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
                            className='border-2 rounded-md px-4 py-1 w-60 max-[690px]:w-32 max-[690px]:text-sm'
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
                            className='border-2 rounded-md px-4 py-1 w-60 max-[690px]:w-32 max-[690px]:text-sm'
                            placeholder='Enter your password'
                            required
                        />
                        <label className="text-xs text-red-500 pl-2">{passwordError}</label>
                    </div>
                    <div className='self-center'>
                        <button
                            className='px-8 py-1 text-white rounded-lg bg-blue-400 hover:bg-blue-500 max-[690px]:text-sm'
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
            <div className="flex flex-col justify-center items-center border-l-2 min-h-[100vh] min-w-[50vw] max-[690px]:min-w-[30vh] max-[400px]:hidden">
                <img src={Picture} alt="picture" className='w-[32rem] drop-shadow-2xl max-[690px]:w-[30vh]' />
                <p className='text-xl text-center max-[690px]:text-sm font-semibold font-markoOne'>Mindful living starts here</p>
                <p className='text-xl text-center max-[690px]:text-sm font-semibold font-markoOne'>Create your MindfulHeaven account</p>
                <h1 className='text-2xl text-center max-[690px]:text-sm font-bold font-markoOne mt-2'>@MinfulHeaven</h1>
            </div>
        </div>
    )
}

export default SignUp