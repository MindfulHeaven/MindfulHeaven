import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../authContext'
import { useAuthDispatch } from '../authContext'
import { useEffect, useState } from 'react'

function Header() {
    const { isAuthenticated } = useAuth();
    const dispatch = useAuthDispatch();
    const nevigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            nevigate('/login')
        }
    }, [isAuthenticated])

    const handleLogout = async () => {
        await fetch(import.meta.env.VITE_REACT_APP_BASE_URL_AUTHENTICATION+"logout", {
            method: 'POST',
            headers: {
                "Content-Type": "application-json",
            },
            credentials: 'include',
            body: JSON.stringify({
                "user": localStorage.getItem('token')
            })
        })
        dispatch({ type: 'LOGOUT' });

        localStorage.removeItem('token');
        localStorage.removeItem('email');

        nevigate('/login');
    }

    const scrollToView = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div id="header" className="flex justify-between p-6 bg-[#f7f7ef] box-border shadow-md sticky top-0 w-full z-10 max-[864px]:flex-col max-[864px]:justify-center max-[864px]:items-center">
            <div id="logo" className="font-extrabold text-2xl font-markoOne max-[433px]:text-xl">
                <Link to='/' onClick={scrollToTop}>MindfulHeaven</Link>
            </div>
            {isAuthenticated ?
                <>
                    <div className="flex justify-between items-center gap-16 text-lg font-semibold max-[433px]:text-sm">
                        <Link to="/#self-assessment" onClick={() => scrollToView('self-assessment')} className='hover:text-slate-600'>Self Assessment</Link>
                        <Link to="/awareness-portal" onClick={scrollToTop} className='hover:text-slate-600'>Awareness Portal</Link>
                        <Link to="/#therapy" onClick={() => scrollToView('therapy')} className='hover:text-slate-600'>Therapy</Link>
                    </div>
                    <div className='flex gap-4 max-[433px]:text-sm'>
                        <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                            <Link to='/userprofile'>
                                Profile
                            </Link>
                        </div>
                        <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                            <button
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </> :
                <>
                    <div className="flex justify-between items-center gap-16 text-lg font-semibold">
                        <Link to="#self-assessment" onClick={() => scrollToView('self-assessment')} className='hover:text-slate-600'>Self Assessment</Link>
                        <Link to="/awareness-portal" onClick={scrollToTop} className='hover:text-slate-600'>Awareness Portal</Link>
                        <Link to="#therapy" onClick={() => scrollToView('therapy')} className='hover:text-slate-600'>Therapy</Link>
                    </div>
                    <div className='flex gap-4'>
                        <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                            <Link to='/userprofile'>
                                Profile
                            </Link>
                        </div>
                        <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                            <Link to='/login'>
                                Login
                            </Link>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Header