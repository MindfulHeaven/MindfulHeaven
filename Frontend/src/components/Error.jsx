import { useRouteError } from "react-router-dom"
import Error404NotFound from "./Error404NotFound"
import ErrorPic from '../assets/images/error.png'

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const GeneralError = ({status, statusText}) => {
    return(
        <div id='error-404-not-found' className='pt-12 flex flex-col h-[100vh] w-[100vw] box-border justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-4 w-[50vw]'>
                <h1 className='text-3xl font-extrabold'>{status} Oops! Something Went Wrong!</h1>
                <p className='text-xl self-center w-[38vw]'>{statusText}</p>
                <Link to='/' onClick={scrollToTop} className='font-semibold px-4 py-2 shadow-2xl bg-blue-400 text-white rounded-md hover:bg-blue-500'>Back to Home</Link>
            </div>
            <div>
                <img src={ErrorPic} alt="404 not found" className="w-[50vw] h-[40vh]"/>
            </div>
        </div>
    )
}

function Error() {
    const error = useRouteError()
    const { status, statusText } = error
    return (
        <div id='error'>
            {status === 404 ? 
                <Error404NotFound />
                :
                <GeneralError status={status} statusText={statusText}/>
            }
        </div>
    )
} 

export default Error