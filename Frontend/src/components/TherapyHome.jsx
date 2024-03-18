import IndividualTherapyPic from '../assets/images/individual.png'
import TeenTherapyPic from '../assets/images/teen.png'
import CoupleTherapyPic from '../assets/images/couple.png'
import { Link } from 'react-router-dom'

const TherapyCard = ({ picture, cardName, linkTo, bgColor }) => {
    return (
        <Link to={linkTo}>
            <div className='flex flex-col items-center w-60 h-60 rounded-2xl shadow-sm' style={{ backgroundColor: bgColor }}>
                <div className='w-40 h-40'>
                    <img src={picture} alt={cardName} className='w-40 h-40 hover:scale-105 drop-shadow-md' />
                </div>
                <h1 className='text-center text-xl font-jaldi font-medium text-[1.5rem] mt-4'>{cardName}</h1>
            </div>
        </Link>
    )
}

function TherapyHome() {
    return (
        <section id="therapy" className='mt-32'>
            <div className='text-3xl font-kavoon text-center w-full'>
                <h1>Therapy</h1>
            </div>
            <div className='flex justify-center items-center my-10 gap-10'>
                <TherapyCard
                    picture={IndividualTherapyPic}
                    cardName='Individual'
                    linkTo='/therapy'
                    bgColor='#e7e4f2' />
                <TherapyCard
                    picture={TeenTherapyPic}
                    cardName='Teen'
                    linkTo='/therapy'
                    bgColor='#f4edd9' />
                <TherapyCard
                    picture={CoupleTherapyPic}
                    cardName='Couple'
                    linkTo='/therapy'
                    bgColor='#e7e4f2' />
            </div>
        </section>
    )
}

export default TherapyHome