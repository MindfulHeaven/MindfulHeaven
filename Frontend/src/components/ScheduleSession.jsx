import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TherapistImg from '../assets/images/therapist.jpg'

function ScheduleSession() {
    const { therapistId } = useParams()
    const [therapist, setTherapist] = useState({});
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getTherapistDetails()
    }, [])

    async function getTherapistDetails() {
        try {
            const URL = 'http://localhost:8000/therapists/' + therapistId
            const response = await fetch(URL)
            // console.log(response)
            const responseData = await response.json()
            // console.log(responseData)
            setTherapist(responseData)
        }
        catch (error) {
            console.error(error)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    therapistId: therapistId,
                    startTime: startTime,
                    endTime: endTime
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to schedule session');
            }

            const data = await response.json();
            setMessage('Session scheduled successfully');
            console.log('Session scheduled successfully:', data);
        } catch (error) {
            setMessage('Error scheduling session: ' + error.message);
            console.error('Error scheduling session:', error);
        }
    };
    return (
        <>
            <div className='flex'>
                <div className='flex flex-col justify-center border-r-2 h-[35rem] w-[50vw] p-4'>
                    <div className='border-2 p-4 rounded-lg flex flex-col items-center shadow-md font-markoOne'>
                        <img src={TherapistImg} alt="img" className='w-56 h-56' />
                        <h1 className='text-3xl font-extrabold'>{therapist?.name}</h1>
                        <p className='text-lg font-semibold'>{therapist?.address}</p>
                        <p className='text-lg font-semibold'>Contact : {therapist?.number}</p>
                        <p className='text-lg font-semibold'>E-mail : {therapist?.email}</p>
                        <p className='text-lg font-semibold bg-resultGreen px-4 rounded-md'>{therapist?.ratings} ⭐</p>
                    </div>
                </div>
                <div className='w-[60vw] flex flex-col justify-center items-center'>
                    <h2 className='text-3xl font-extrabold p-12'>Schedule a Session</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col border-2 p-8 rounded-lg w-[30rem]'>
                        <div className='text-xl p-4'>
                            <label htmlFor="startTime">Start Time:</label>
                            <input
                                type="datetime-local"
                                id="startTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className='px-4 border-2 rounded-md ml-2'
                                required
                            />
                        </div>
                        <div className='text-xl p-4'>
                            <label htmlFor="endTime">End Time:</label>
                            <input
                                type="datetime-local"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className='px-4 border-2 rounded-md ml-2'
                                required
                            />
                        </div>
                        <button className='border-2 text-lg self-center px-4 py-1 rounded-md bg-cyan-300 hover:bg-cyan-400' type="submit">Schedule Session</button>
                    </form>
                    {message && <p className='mt-6 text-2xl'>{message}</p>}
                </div>
            </div>
        </>
    )
}

export default ScheduleSession
