import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../authContext'
import { useAuthDispatch } from '../authContext'

function Header() {
    const { isAuthenticated } = useAuth();
    const dispatch = useAuthDispatch();
    const nevigate = useNavigate()
    console.log(isAuthenticated)
    const handleLogout = () => {
        console.log("Logout function called")
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
        <div id="header" className="flex justify-between p-6 bg-[#f7f7ef] box-border shadow-md sticky top-0 w-full z-10">
            <div id="logo" className="font-extrabold text-2xl font-markoOne">
                <Link to='/' onClick={scrollToTop}>MindfulHeaven</Link>
            </div>
            {isAuthenticated ?
                <>
                    <div className="flex justify-between items-center gap-16 text-lg font-semibold">
                        <Link to="/#self-assessment" onClick={() => scrollToView('self-assessment')} className='hover:text-slate-600'>Self Assessment</Link>
                        <Link to="/awareness-portal" onClick={scrollToTop} className='hover:text-slate-600'>Awareness Portal</Link>
                        <Link to="/#therapy"  onClick={() => scrollToView('therapy')} className='hover:text-slate-600'>Therapy</Link>
                    </div>
                    <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                        <button
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </> :
                <>
                    <div className="flex justify-between items-center gap-16 text-lg font-semibold">
                        <Link to="#self-assessment" onClick={() => scrollToView('self-assessment')} className='hover:text-slate-600'>Self Assessment</Link>
                        <Link to="/awareness-portal" onClick={scrollToTop} className='hover:text-slate-600'>Awareness Portal</Link>
                        <Link to="#therapy" onClick={() => scrollToView('therapy')} className='hover:text-slate-600'>Therapy</Link>
                    </div>
                    <div className="px-6 rounded-full bg-[#efb399] hover:bg-[#e3a286] flex items-center">
                        <Link to='/login'>
                            Login
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}

export default Header