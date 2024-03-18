import { Link } from 'react-router-dom'
import BgPic from '../assets/images/testpage.png'
import { Outlet } from 'react-router-dom'

function AnxietyTest() {
    return ( 
        <>
            <div className='flex flex-col justify-center items-center h-[65vh] box-border'>
                <div className='rounded-xl flex flex-col justify-center items-center p-8 gap-6 bg-[#eae0e0]'>
                    <div className='w-44 h-44'>
                        <img src={BgPic} alt="test" />
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-xl font-bold my-2'>Take the test with the following in mind</h1>
                        <p className='text-lg'>Over the last 2 weeks, how often you bothered by each problems in questions?
                        </p>
                    </div>
                    <Link 
                        className='rounded-2xl px-4 py-1 bg-[#efb399] hover:bg-[#da9273]'
                        to='phq9'
                    >
                        Continue
                    </Link>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AnxietyTest