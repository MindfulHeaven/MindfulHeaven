import AnxietyPic from '../assets/images/anxiety.png'
import DepressionPic from '../assets/images/depression.png'
import StressPic from '../assets/images/stress.png'
import SelfReliefPic from '../assets/images/self-relief.png'
import { Link } from 'react-router-dom'

const SelfAssessmentCard = ({ picture, cardName, linkTo, bgColor }) => {
    return (
        <Link to={linkTo}>
            <div className='flex flex-col items-center w-60 h-64 rounded-2xl shadow-sm' style={{ backgroundColor: bgColor }}>
                <div className='w-40 h-52 pt-4 overflow-visible'>
                    <img src={picture} alt={cardName} className='w-44 h-40 hover:scale-105 drop-shadow-md' />
                </div>
                <h1 className='text-center text-xl font-jaldi text-[1.6rem] my-4 font-medium'>{cardName}</h1>
            </div>
        </Link>
    )
}

const ReliefActivityCard = ({ picture, cardName, linkTo }) => {
    return (
        <Link to={linkTo}>
            <div className='flex justify-between items-center  m-auto w-[35rem] bg-[#eaf3fa] my-10 rounded-xl p-4'>
                <h1 className='ml-8 text-center text-xl font-jaldi font-medium text-[1.6rem]'>{cardName}</h1>
                <img src={picture} alt="self-relief" className='w-52 h-40 pt-4 drop-shadow-md hover:scale-105' />
            </div>
        </Link>
    )
}

function SelfAssessmentHome() {
    return (
        <section id="self-assessment" className='mt-36'>
            <div className='text-3xl font-kavoon text-center w-full'>
                <h1>Self Assessment</h1>
            </div>
            <div className='flex justify-center items-center mt-10 gap-10'>
                <SelfAssessmentCard
                    picture={AnxietyPic}
                    cardName='Anxiety'
                    linkTo='/anxiety-test'
                    bgColor='#f4edd9' />
                <SelfAssessmentCard
                    picture={DepressionPic}
                    cardName='Depression'
                    linkTo='/depression-test'
                    bgColor='#e7e4f2' />
                <SelfAssessmentCard
                    picture={StressPic}
                    cardName='Stress'
                    linkTo='/stress-test'
                    bgColor='#f4edd9' />
            </div>
            <ReliefActivityCard
                picture={SelfReliefPic}
                cardName='Relief Activities'
                linkTo='/relief-activities' />
        </section>
    )
}

export default SelfAssessmentHome