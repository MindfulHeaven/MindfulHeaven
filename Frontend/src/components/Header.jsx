import { Link, Navigate } from 'react-router-dom'

function Header() {
    const isLoggedIn = false
    return (
        <div id="header" className="flex justify-between p-6 bg-[#f7f7ef] box-border shadow-md sticky top-0 w-full z-10">
            <div id="logo" className="font-extrabold text-2xl font-markoOne">
                <Link to='/'>MindfulHeaven</Link>
            </div>
            <div className="flex justify-between items-center gap-16 text-lg font-semibold">
                <Link to="#self-assessment" className='hover:text-slate-600'>Self Assessment</Link>
                <Link to="/awareness-portal" className='hover:text-slate-600'>Awareness Portal</Link>
                <Link to="#therapy" className='hover:text-slate-600'>Therapy</Link>
            </div>
            <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                {isLoggedIn ?
                    <Link>
                        Logout
                    </Link>
                    :
                    <Link
                        to="/login"
                    >
                        Login
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header