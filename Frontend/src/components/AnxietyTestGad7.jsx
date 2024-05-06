import BgPic from '../assets/images/testpage.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const gad7Ques = [
    'Feeling nervous, anxious, or on edge',
    'Not being able to stop or control worrying',
    'Worrying too much about different things',
    'Trouble relaxing',
    'Being so restless that it is hard to sit still',
    'Becoming easily annoyed or irritable',
    'Feeling afraid, as if something awful might happen'
]

const QueForm = ({ formData, setFormData }) => {
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    return (
        <>
            {gad7Ques.map((que, index) => {
                return (
                    <div key={index * index} className="border-2 flex flex-col gap-4 p-4 rounded-md w-[35rem] bg-[#eae0e0] max-[433px]:w-[18rem]">
                        <h1 className="text-lg font-bold max-[433px]:text-sm">Q{index + 1} {que}</h1 >
                        <div className='max-[433px]:text-sm'>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index}`} className="cursor-pointer" required value={0} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index}`} >Not at all</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 1}`} className="cursor-pointer" required value={1} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 1}`} >Several Days</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 2}`} className="cursor-pointer" required value={2} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 2}`} >More than half the days</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 3}`} className="cursor-pointer" required value={3} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 3}`} >Nearly every day</label>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}


async function update_anxiety_score(result){
    try{
        const response = await fetch(`http://localhost:1818/update_anxiety_score`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: localStorage.getItem('token'),
                score: result
            })
        })
        console.log(response)
        if(!response.ok) throw new Error('can not update score on backend')
        const responseData = await response.json()
        console.log(responseData)
    }
    catch(err){
        console.error(err)
    }
}

const Form = () => {
    // const [inputValues, setInputValues] = useState([])
    const [formData, setFormData] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        q6: 0,
        q7: 0
    })
    const nevigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        let result = 0
        Object.keys(formData).forEach(function (key, index) {
            formData[key] = Number(formData[key]);
            result += formData[key]
        });
        console.log(formData);
        update_anxiety_score(result)
        nevigate(`AnxietyResult/${result}`)
    }
    return (
        <form className="flex flex-col justify-center items-center m-4 rounded-md p-4 gap-4" onSubmit={handleSubmit}>
            <QueForm formData={formData} setFormData={setFormData} />
            <div className='border-2 flex flex-col gap-4 p-4 rounded-md w-[35rem] bg-[#eae0e0] max-[433px]:w-[18rem]'>
                <div className='w-20 h-20 self-center'>
                    <img src={BgPic} alt="test" />
                </div>
                <div className='self-center'>
                    <h1 className='text-md font-bold my-2 text-center max-[433px]:text-sm'>Thank you for taking time to complete your Personal Assessment</h1>
                </div>
                <button
                    className='rounded-2xl text-md px-4 py-1 bg-[#efb399] hover:bg-[#da9273] self-center max-[433px]:text-sm'
                    type='submit'
                >
                    Submit Assessment
                </button>
            </div>
        </form>
    )
}

function AnxietyTestGad7() {
    return (
        <>
            <div>
                <Form />
            </div>
        </>
    )
}

export default AnxietyTestGad7