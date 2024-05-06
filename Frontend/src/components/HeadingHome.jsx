import Picture1 from '../assets/images/Picture1.png'

const featuresList = [
    'Self Mental Health Assessment Tests',
    'Tracking solutions of Mental Health Issues',
    'Brief Articles & Advices for Better Mental Health',
    'Therapy To Get Professional Help'
]

const FeatureSection = () => {
    return (
        <div className='flex flex-col justify-center items-center font-jaldi'>
            <p className='text-center text-2xl font-bold mb-2 max-[433px]:text-xl'>What you can get here?</p>
            <ul className='border-2 w-[28rem] py-4 pl-10 rounded-lg bg-[#efb399] list-disc text-xl  max-[625px]:w-[22rem] max-[433px]:text-xs max-[433px]:w-[15rem] max-[433px]:pl-6'>
                {featuresList.map((feature, index) => {
                    return (
                        <li key={index}>{feature}</li>
                    )
                })}
            </ul>
        </div>
    )
}

function HeadingHome({ name }) {
    return (
        <section id='home-heading' className='pt-20 pl-4 flex justify-between max-[864px]:flex-col max-[864px]:justify-center max-[864px]:items-center max-[625px]:pl-0 max-[433px]:pt-8 max-[433px]:p-0'>
            <div className='flex flex-col justify-center p-4 w-[38rem] pl-14 max-[625px]:w-[22rem] max-[433px]:w-[18rem]'>
                <h1 className='text-3xl pb-2 font-semibold font-kavoon text-center max-[433px]:text-xl'>Hey {name},</h1>
                <h1 className='text-4xl font-semibold font-kavoon text-center max-[433px]:text-2xl'>You deserve to be Happy.</h1>
                <h2 className='text-xl py-4 font-semibold text-center max-[433px]:text-lg'>Discover, Assess, and Improve Your Mental Health Today</h2>
                <FeatureSection />
            </div>
            <div className='w-[38rem] max-[625px]:w-[28rem] max-[433px]:w-[18rem] max-[433px]:pl-10'>
                <img src={Picture1} alt="picture1" className='drop-shadow-2xl' />
            </div>
        </section>
    )
}

export default HeadingHome