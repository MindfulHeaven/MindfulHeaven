import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import TherapistImg from '../assets/images/therapist.jpg'
import swal from 'sweetalert'

function ScheduleSession() {
    const { therapistId } = useParams()
    const [therapist, setTherapist] = useState({});
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState('');
    const [sessionDetails, setSessionsDetails] = useState([]);
    const [therapistBookingsDetails, setTherapistSessionBookingDetails] = useState([]);

    useEffect(() => {
        getTherapistDetails()
    }, [])

    useEffect(() => {
        fetch_therapist_sessions_details()
    }, [])

    async function getTherapistDetails() {
        try {
            const URL = 'http://localhost:8000/therapists/' + therapistId
            const response = await fetch(URL)
            const responseData = await response.json()
            setTherapist(responseData)
        }
        catch (error) {
            console.error(error)
        }

    }

    const fetch_therapist_sessions_details = async () => {
        try {
            const url = 'http://localhost:8000/therapist-sessions/' + therapistId;
            const response = await fetch(url, {
                method: 'GET'
            })
            const responseData = await response.json()
            const sessions = responseData.sessionDetails
            const bookingSessionsDetails = responseData.bookingDetails
            setSessionsDetails(sessions)
            setTherapistSessionBookingDetails(bookingSessionsDetails)
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/schedule-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('token'),
                    therapistId: therapistId,
                    startTime: new Date(startTime).toISOString(),
                    endTime: new Date(endTime).toISOString()
                }),
            });

            console.log(response);
            const data = await response.json();
            if (response.status === 201) {
                setMessage('Session scheduled successfully');
                swal('Session scheduled successfully! Check your e-mail for detalis.')
                sendConfirmationMail();
                // console.log('Session scheduled successfully:', data);
            }
            else if (response.status === 400) {
                setMessage(data.error)
            }
            else if (response.status === 409) {
                setMessage(data.error)
            }
        } catch (error) {
            swal({
                text: error.message,
                icon: 'warning',
                button: 'Try again!',
                dangerMode: true
            })
            setMessage(error.message);
            // console.error('Error scheduling session:', error);
        }
    };

    const sendConfirmationMail = async () => {
        try{
            const response = await fetch(`http://localhost:8000/send-confirmation-mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: localStorage.getItem('email'),
                    therapistName: therapist.name,
                    therapistNumber: therapist.number,
                    therapistEmail: therapist.email, 
                    startTime: startTime,
                    endTime: endTime
                }),
            });

        }
        catch(err){
            console.log(err);
        }
    }

    const dateFormatter = (dateString) => {
        if(dateString){
            // Create a Date object from the string
            const date = new Date(dateString);
    
            // Format the date and time
            const formattedDate = date.toISOString().split('T')[0] + ' - ' + date.toISOString().split('T')[1].substring(0, 8);
            // Output: "2024-04-08 - 09:00:00"
            return formattedDate;
        }
    }

    return (
        <>
            <div className='flex'>
                <div className='flex flex-col justify-center border-r-2 w-[50vw] p-4'>
                    <div className='border-2 p-4 rounded-lg flex flex-col items-center shadow-md font-markoOne mt-[5vh]'>
                        <img src={TherapistImg} alt="img" className='w-56 h-56' />
                        <h1 className='text-3xl font-extrabold'>{therapist?.name}</h1>
                        <p className='text-lg font-semibold'>{therapist?.address}</p>
                        <p className='text-lg font-semibold'>Contact : {therapist?.number}</p>
                        <p className='text-lg font-semibold'>E-mail : {therapist?.email}</p>
                        <p className='text-lg font-semibold bg-resultGreen px-4 rounded-md'>{therapist?.ratings} ⭐</p>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-center text-2xl font-bold mt-6 p-4'>Therapist scheduled sessions: </h1>
                        {sessionDetails.map((session, index) => {
                            return (
                                <div className='flex p-4 gap-4 justify-around border-y-2' key={index}>
                                    <p>From : {dateFormatter(session?.startTime)}</p>
                                    <p>To : {dateFormatter(session?.endTime)}</p>
                                </div>
                            )
                        })}
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
                                min={new Date().toISOString().substring(0, 16)}
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
                                min={new Date().toISOString().substring(0, 16)}
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
