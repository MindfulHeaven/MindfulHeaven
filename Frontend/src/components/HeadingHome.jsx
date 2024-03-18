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
            <p className='text-center text-2xl font-bold mb-2'>What you can get here?</p>
            <ul className='border-2 w-[28rem] py-4 pl-10 rounded-lg bg-[#efb399] list-disc text-xl'>
                {featuresList.map((feature, index) => {
                    return (
                        <li key={index}>{feature}</li>
                    )
                })}
            </ul>
        </div>
    )
}

function HeadingHome() {
    return (
        <section id='home-heading' className='pt-20 pl-4 flex justify-between'>
            <div className='flex flex-col justify-center p-4 w-[38rem] pl-14'>
                <h1 className='text-4xl font-semibold font-kavoon text-center'>You deserve to be Happy.</h1>
                <h2 className='text-lg py-4 font-semibold text-center'>Basic info about website Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, placeat.</h2>
                <FeatureSection />
            </div>
            <div className='w-[38rem]'>
                <img src={Picture1} alt="picture1" className='drop-shadow-2xl' />
            </div>
        </section>
    )
}

export default HeadingHome