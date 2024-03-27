import BgPic from '../assets/images/testpage.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const pss10Ques = [
    'In the last month, how often have you been upset because of something that happened unexpectedly?',
    'In the last month, how often have you felt that you were unable to control the important things in your life?',
    'In the last month, how often have you felt nervous and stressed?',
    'In the last month, how often have you felt confident about your ability to handle your personal problems?',
    'In the last month, how often have you felt that things were going your way?',
    'In the last month, how often have you found that you could not cope with all the things that you had to do?',
    'In the last month, how often have you been able to control irritations in your life?',
    'In the last month, how often have you felt that you were on top of things?',
    'In the last month, how often have you been angered because of things that happened that were outside of your control?',
    'In the last month, how often have you felt difficulties were piling up so high thatyou could not overcome them?'
]

const values = (index) => {
    if(index === 3 || index === 4 || index === 6 || index === 7){
        return [4, 3, 2, 1, 0]
    }
    else{
        return [0, 1, 2, 3, 4]
    }
} 

const QueForm = ({ formData, setFormData }) => {
    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
    return (
        <>
            {pss10Ques.map((que, index) => {
                const value = values(index)
                return (
                    <div key={index * index} className="border-2 flex flex-col gap-4 p-4 rounded-md w-[35rem] bg-[#eae0e0]">
                        <h1 className="text-lg font-bold">Q{index + 1} {que}</h1 >
                        <div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index}`} className="cursor-pointer" required value={value[0]} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index}`} >Never</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 1}`} className="cursor-pointer" required value={value[1]} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 1}`} >Almost never</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 2}`} className="cursor-pointer" required value={value[2]} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 2}`} >Sometimes</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 3}`} className="cursor-pointer" required value={value[3]} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 3}`} >Fairly often</label>
                            </div>
                            <div className="ml-4 flex items-center gap-2">
                                <input type="radio" name={`q${index + 1}`} id={`q${index + 1}-${index + 4}`} className="cursor-pointer" required value={value[4]} onChange={changeHandler} />
                                <label htmlFor={`q${index + 1}-${index + 4}`} >Very often</label>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
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
        q7: 0,
        q8: 0,
        q9: 0,
        q10: 0
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
        nevigate(`StressResult/${result}`)
    }
    return (
        <form className="flex flex-col justify-center items-center m-4 rounded-md p-4 gap-4" onSubmit={handleSubmit}>
            <QueForm formData={formData} setFormData={setFormData} />
            <div className='border-2 flex flex-col gap-4 p-4 rounded-md w-[35rem] bg-[#eae0e0]'>
                <div className='w-20 h-20 self-center'>
                    <img src={BgPic} alt="test" />
                </div>
                <div className='self-center'>
                    <h1 className='text-md font-bold my-2'>Thank you for taking time to complete your Personal Assessment</h1>
                </div>
                <button
                    className='rounded-2xl text-md px-4 py-1 bg-[#efb399] hover:bg-[#da9273] self-center'
                    type='submit'
                >
                    Submit Assessment
                </button>
            </div>
        </form>
    )
}

function StressTestPss() {
    return (
        <>
            <div>
                <Form />
            </div>
        </>
    )
}

export default StressTestPss