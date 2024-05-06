import { Link } from 'react-router-dom'
import Instagram from '../assets/icons/instagram.png'
import Facebook from '../assets/icons/facebook.png'
import Linkedin from '../assets/icons/linkedin.png'

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <div id="footer" className="bg-[#f7f7ef] p-4 w-full box-border shadow-lg sticky top-0">
            <div className='flex justify-between  max-[625px]:flex-col max-[625px]:justify-center max-[625px]:items-center'>
                <p className="px-2 font-markoOne text-2xl font-extrabold cursor-pointer" onClick={scrollToTop}>MindfulHeaven</p>
                <div id="explore" className="flex flex-col max-[625px]:flex-row max-[625px]:gap-4 max-[433px]:text-sm max-[433px]:flex-col max-[433px]:items-center">
                    <h1 className='font-bold'>EXPLORE</h1>
                    <Link to='/awareness-portal' onClick={scrollToTop}>Awareness Portal</Link>
                    <Link to='/#self-assessment'>Self Assessment</Link>
                    <Link to='/awareness-portal' onClick={scrollToTop}>Relief Tools</Link>
                    <Link to='/#therapy'>Therapy</Link>
                </div>
                <div className='flex flex-col mt-6 max-[625px]:flex-row max-[625px]:gap-4 max-[433px]:text-sm'>
                    <Link to='/aboutus'>About Us</Link>
                    <Link to='/contactus'>Contact Us</Link>
                </div>
                <div className='flex flex-col'>
                    <h1 className='font-bold pl-4'>FOLLOW US</h1>
                    <div className='flex gap-4 pt-4'>
                        <Link to='https://instagram.com' target='_blank'><img className='h-8 w-8' src={Instagram} /></Link>
                        <Link to='https://linkedin.com' target='_blank'><img className='h-8 w-8' src={Linkedin} /></Link>
                        <Link to='https://facebook.com' target='_blank'><img className='h-8 w-8' src={Facebook} /></Link>
                    </div>
                </div>
            </div>
            <div className="m-auto w-[35rem] font-bold text-center pt-4 max-[625px]:w-[22rem] max-[433px]:w-[12rem]">
                <p>If you are in a life threatening situation - don't use this site. Call <u className='text-[#eb8458]'>112</u> or <Link to='/emergency-resources' onClick={scrollToTop} className='text-[#eb8458] underline'>use these resources</Link> to get immediate help</p>
            </div>
        </div>
    )
}

export default Footer