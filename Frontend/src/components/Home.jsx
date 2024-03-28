import HeadingHome from './HeadingHome'
import SelfAssessmentHome from './SelfAssessmentHome'
import TherapyHome from './TherapyHome'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Main() {
    const location = useLocation()

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
            <HeadingHome />
            <SelfAssessmentHome />
            <TherapyHome />            
        </div>
    )
}

export default Main