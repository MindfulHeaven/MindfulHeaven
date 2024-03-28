import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TherapistImg from '../assets/images/therapist.jpg'

function SuggestTherapist() {
    const { category } = useParams()
    const [therapists, setTherapists] = useState([])
    const nevigate = useNavigate()

    useEffect(() => {
        getTherapists()
        console.log(therapists)
    }, [])

    async function getTherapists() {
        const response = await fetch(`http://localhost:8000/suggesttherapist`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                category: `${category}`,
                type: `Depression`
            })
        })
        const responseData = await response.json()
        setTherapists(responseData)
    }

    const handleContact = (id) => {
        nevigate(`${id}`)
    }

    return (
        <div>
            {therapists.length === 0 ?
                <div>Searching for therapists...</div>
                :
                <div className='flex flex-wrap m-4 gap4 justify-around'>
                    {therapists.map((therapist, index) => (
                        <div key={index} className='group flex flex-col shadow-md overflow-hidden m-2 rounded-md w-64 h-[32rem] bg-gray-100'>
                            <div className='w-64 h-56 overflow-hidden'>
                                <img src={TherapistImg} alt="therapist img" className='group-hover:scale-110' />
                            </div>
                            <div className='flex flex-col p-4 justify-around h-72 w-56 text-wrap'>
                                <h3 className='text-xl font-extrabold group-hover:text-resultGreen'>{therapist?.therapistName}</h3>
                                <p className='text-lg font-bold'>{therapist?.therapistAddress}</p>
                                <p className='font-bold'>Contact: {therapist?.therapistNumber}</p>
                                <p className='font-bold group-hover:underline'>{therapist?.therapistEmail}</p>
                                <p className='font-bold bg-resultGreen pl-2 py-1 w-14 rounded-md'>{therapist?.therapistRatings} ★</p>
                                <button className='rounded-lg bg-orange-100 hover:bg-orange-200 px-2 py-2 w-56' onClick={() => handleContact(therapist?.therapistId)}>Schedule Therapy Session</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default SuggestTherapist;
