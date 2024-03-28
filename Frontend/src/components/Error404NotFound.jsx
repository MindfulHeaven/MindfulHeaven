import { Link } from 'react-router-dom'
import BgPic from '../assets/images/404Error.png'

function Error404NotFound() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return ( 
        <div id='error-404-not-found' className='pt-12 flex flex-col h-[100vh] w-[100vw] box-border justify-center items-center'>
            <div className='flex flex-col justify-center items-center gap-4 w-[50vw]'>
                <h1 className='text-3xl font-extrabold'>Oops! Page not found!</h1>
                <p className='text-xl self-center w-[38vw]'>We are very sorry for inconvenience. It looks like you're trying to access  a page that has been deleted or never even existed.</p>
                <Link to='/' onClick={scrollToTop} className='font-semibold px-4 py-2 shadow-2xl bg-blue-400 text-white rounded-md hover:bg-blue-500'>Back to Home</Link>
            </div>
            <div>
                <img src={BgPic} alt="404 not found" />
            </div>
        </div>
    )
}

export default Error404NotFound