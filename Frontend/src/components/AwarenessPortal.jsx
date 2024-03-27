import Poster from '../assets/images/awareness-portal-poster.png'
import { Link } from 'react-router-dom'
import { blogsInfo } from '../utils/blogs'

function AwarenessPortal() {
    return (
        <div id="awareness-portal" className='box-border'>
            <div className="w-full overflow-hidden max-h-[45vh]">
                <img src={Poster} alt="Awareness Portal Poster" className='w-full h-[45vh]' />
            </div>
            <div className='flex justify-center items-center flex-wrap m-4'>
                {blogsInfo.map((blog, index) => {
                    return (
                        <Link to={blog?.link} target='_blank' className='group' key={index*index}>
                            <div className='m-4 flex flex-col bg-[#f5f7f5] rounded-lg w-64 h-[30rem] shadow-md'>
                                <div className='overflow-hidden h-56 w-64 rounded-t-lg'>
                                    <img src={blog?.imageURL} alt={blog?.title} className='h-56 w-64 group-hover:scale-110 transform transition duration-500' />
                                </div>
                                <div className='flex flex-col justify-around h-64 p-4'>
                                    <p className='text-resultGreen font-extrabold'>{blog?.category}</p>
                                    <h1 className='text-xl font-extrabold group-hover:text-red-600 w-56'>{blog?.title}</h1>
                                    <p className='justify-self-end'>{blog?.date}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })
                }
            </div>
        </div>
    )
}

export default AwarenessPortal