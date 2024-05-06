import { useEffect, useState, useRef } from 'react'
import UserPic from '../assets/images/user.jpg'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Past records of your self-assessments',
            font: {
                size: 22,
                weight: 'bold',
                color: 'black'
            },
            padding: {
                top: 30,
                bottom: 30
            }
        },
    },
};



function UserProfile() {
    const [userData, setUserData] = useState({})
    const [userSessionBookingDetails, setuserSessionBookingDetails] = useState([])
    const [sessionsDetails, setSessionsDetails] = useState([])

    useEffect(() => {
        fetch_user_details()
    }, [])
    useEffect(() => {
        fetch_user_sessions_details()
    }, [])

    const fetch_user_details = async () => {
        try {
            const url = 'http://localhost:1818/getDetails/' + localStorage.getItem("token");
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            })
            const responseData = await response.json()
            setUserData(responseData)
        }
        catch (err) {
            console.error(err)
        }
    }

    const fetch_user_sessions_details = async () => {
        try {
            const url = 'http://localhost:8000/user-sessions/' + localStorage.getItem("token");
            const response = await fetch(url, {
                method: 'GET'
            })
            const responseData = await response.json()
            const sessions = responseData.sessionDetails
            const bookingSessionsDetails = responseData.bookingDetails
            setSessionsDetails(sessions)
            setuserSessionBookingDetails(bookingSessionsDetails)
            console.log(responseData)
        }
        catch (err) {
            console.error(err)
        }
    }

    const labels = [1, 2, 3, 4, 5, 6, 7];
    const depression = userData.depressionScores
    const anxiety = userData.anxietyScores
    const stress = userData.stressScores
    const data = {
        labels,
        datasets: [
            {
                label: 'Depression',
                data: depression,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Anxiety',
                data: anxiety,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Stress',
                data: stress,
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgba(255, 205, 86, 0.5)',
            },
        ],
    };

    return (
        <>
            <div className="flex w-full max-[433px]:flex-col max-[700px]:flex-col">
                <div className="border-r-2 w-[50vw] h-[100vh] flex flex-col justify-center items-center max-[433px]:w-full max-[433px]:border-0 max-[433px]:h-[36vh] max-[700px]:w-full max-[433px]:border-r-0">
                    <div className="overflow-hidden">
                        <img src={UserPic} alt="" className=" hover:scale-110" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-4xl font-extrabold font-markoOne max-[433px]:text-xl">Hey {userData.name}</h1>
                        <p className="text-xl max-[433px]:text-lg">Email: {userData.email}</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <div className='h-[40vh] w-[50vw] flex justify-center items-center max-[433px]:h-auto max-[433px]:w-full'>
                        <Line options={Options} data={data} />
                    </div>
                    <div className='p-4 flex flex-col gap-2 border-t-2 mt-10 w-full'>
                        <h1 className='text-center text-2xl font-bold max-[433px]:text-lg'>Your Therapy Sessions Details : </h1>
                        {sessionsDetails.map((session, index) => {
                            return (
                                <div key={index} className='border-y-2 flex flex-col pl-4'>
                                    <p>Booked on : {userSessionBookingDetails[index]?.createdAt.split('T')[0]}</p>
                                    <p>From : {session?.startTime}</p>
                                    <p>To : {session?.endTime}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile