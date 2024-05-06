import AnxietyPic from '../assets/images/anxiety.png'
import DepressionPic from '../assets/images/depression.png'
import StressPic from '../assets/images/stress.png'
import SelfReliefPic from '../assets/images/self-relief.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SelfAssessmentCard = ({ picture, cardName, linkTo, bgColor }) => {
    return (
        <Link to={linkTo}>
            <div className='flex flex-col items-center w-60 h-64 rounded-2xl shadow-sm max-[864px]:w-40 max-[864px]:h-56 max-[625px]:w-28 max-[625px]:h-44 max-[433px]:w-44' style={{ backgroundColor: bgColor }}>
                <div className='w-40 h-52 pt-4 overflow-visible max-[864px]:w-32 max-[625px]:w-20'>
                    <img src={picture} alt={cardName} className='w-44 h-40 hover:scale-105 drop-shadow-md max-[864px]:w-32 max-[864px]:h-36 max-[625px]:w-20 max-[625px]:h-24' />
                </div>
                <h1 className='text-center text-xl font-jaldi text-[1.6rem] my-4 font-medium'>{cardName}</h1>
            </div>
        </Link>
    )
}

const ReliefActivityCard = ({ picture, cardName, linkTo }) => {
    return (
        <Link to={linkTo}>
            <div className='flex justify-between items-center m-auto w-[35rem] bg-[#eaf3fa] my-10 rounded-xl p-4 max-[864px]:w-[30rem] max-[625px]:w-[24rem] max-[433px]:w-[15rem] max-[433px]:flex-col'>
                <h1 className='ml-8 text-center text-xl font-jaldi font-medium text-[1.6rem]'>{cardName}</h1>
                <img src={picture} alt="self-relief" className='w-52 h-40 pt-4 drop-shadow-md hover:scale-105 max-[864px]:w-44 max-[625px]:w-40' />
            </div>
        </Link>
    )
}

function SelfAssessmentHome() {
    const [scores, setScores] = useState({ depression: 0, anxiety: 0, stress: 0 })
    const scoresObject = { scores, setScores }
    return (
        // <FormScoreContext.Provider value={scoresObject}>
        <section id="self-assessment" className='mt-36'>
            <div className='text-3xl font-kavoon text-center w-full max-[433px]:text-xl'>
                <h1>Self Assessment</h1>
            </div>
            <div className='flex justify-center items-center mt-10 gap-10 max-[433px]:flex-col'>
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
                linkTo='/awareness-portal' />
        </section>
        // </FormScoreContext.Provider>
    )
}

export default SelfAssessmentHome