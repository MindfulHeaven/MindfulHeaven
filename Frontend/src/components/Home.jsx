import HeadingHome from './HeadingHome'
import SelfAssessmentHome from './SelfAssessmentHome'
import TherapyHome from './TherapyHome'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function Main() {
    const location = useLocation()
    const [name, setName] = useState('')

    useEffect(() => {
        get_details()
    }, [])

    async function get_details(){
        try{
            const url = import.meta.env.VITE_REACT_APP_BASE_URL_AUTHENTICATION+"getDetails/"+localStorage.getItem("token");
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            const responseData = await response.json()
            setName(responseData.name)
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        if (location.hash === '#self-assessment') {
            const element = document.getElementById('self-assessment');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        if (location.hash === '#therapy') {
            const element = document.getElementById('therapy');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location])
    return (
        <div id='main' className='box-border'>
            <HeadingHome name={name}/>
            <SelfAssessmentHome />
            <TherapyHome />            
        </div>
    )
}

export default Main