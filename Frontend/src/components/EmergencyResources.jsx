const IndiaResources = [
    {
        location: 'All-India',
        organisation: 'GOVT MH Rehabilitation HELPLINE "KIRAN"',
        number: ['18005990019'],
        timing: '24 / 7',
        notes: ['']
    },
    {
        location: 'All-India',
        organisation: 'VANDREVALA FOUNDATION',
        number: ['+91-9999666555'],
        timing: '24 / 7',
        notes: ['Email : help@vandrevalafoundation.com', 'if you don’t get through and expect a call-back']
    },
    {
        location: 'All-India',
        organisation: 'FORTIS HOSPITAL NATIONAL HELPLINE',
        number: ['+91-8376804102'],
        timing: '24 / 7',
        notes: ['Multilingual']
    },
    {
        location: 'BANGALORE',
        organisation: 'SAHAI',
        number: ['080-25497777'],
        timing: '',
        notes: ['']
    },
    {
        location: 'CHENNAI',
        organisation: '	SNEHA',
        number: ['044-2464-0050'],
        timing: '',
        notes: ['Email : help@snehaindia.org']
    },
    {
        location: 'DELHI',
        organisation: 'SANJIVINI SOCIETY FOR MENTAL HEALTH',
        number: ['01140769002', '01141092787', '01124311918', '01124318883', '01143001456'],
        timing: 'Daily : 10 AM to 4 PM',
        notes: ['']
    },
    {
        location: 'GANGTOK',
        organisation: 'SIKKIM HELPLINE NUMBER',
        number: ['1800-3453225', '03592-202111'],
        timing: '24 / 7',
        notes: ['']
    },
    {
        location: 'HYDERABAD',
        organisation: 'ONE LIFE',
        number: ['+91-7893078930'],
        timing: '24/7',
        notes: ['']
    },
    {
        location: 'KOLKATA',
        organisation: 'DEFEAT DEPRESSION',
        number: ['+91-9830027975'],
        timing: '',
        notes: ['']
    },
    {
        location: 'KOLKATA',
        organisation: 'LIFELINE FOUNDATION',
        number: ['+91-9088030303'],
        timing: 'Daily : 10AM to 10PM',
        notes: ['Email : contact@lifelinefoundation.in', 'Site: www.lifelinefoundation.in']
    },
    {
        location: 'MUMBAI',
        organisation: 'AASRA',
        number: ['+91-9820466726'],
        timing: '24 / 7',
        notes: ['Languages: English, Hindi']
    },
    {
        location: 'MUMBAI',
        organisation: 'SAMARITANS',
        number: ['+91-8422984528', '+91-8422984529', '+91-8422984530'],
        timing: 'Daily : 5PM to 8PM',
        notes: ['Email : talk2samaritans@gmail.com']
    },
    {
        location: 'MUMBAI',
        organisation: 'BMC-MPOWER',
        number: ['1800 120 820050'],
        timing: '24 / 7',
        notes: ['Have fielded calls related to anxiety, depression, financial worries, COVID-19 from across India']
    }
]

function EmergencyResources() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-full h-80 justify-center items-center gap-4 flex-wrap bg-gradient-to-b from-[#6295c3] from-10% to-[#2fc8b6] to-90% text-white">
                <h1 className="text-4xl font-extrabold">Get Help Now</h1>
                <h2 className="text-lg">If you are in a crisis or any other person may be in danger the following resources can provide you with immediate help.</h2>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="py-10">
                    <p className="text-2xl font-bold">Emergency Resources</p>
                </div>
                <div className="flex flex-col w-[65vw] mb-8">
                    <h1 className="text-2xl font-bold">India</h1>
                    <p className="text-red-500 my-2 font-bold">Emergency : 112</p>
                    <table className="rounded-lg my-2 self-start">
                        <tbody className="">
                            <tr>
                                <th className="border-2 p-2">Location</th>
                                <th className="border-2 p-2">Organisation</th>
                                <th className="border-2 p-2">Number</th>
                                <th className="border-2 p-2">Timing</th>
                                <th className="border-2 p-2">Notes</th>
                            </tr>
                            {IndiaResources.map((resource, index) => {
                                return (
                                    <tr key={index} className="border-2">
                                        <td className="border-2 p-2">{resource.location}</td>
                                        <td className="border-2 p-2">{resource.organisation}</td>
                                        <td className="border-2 p-2">{resource.number.map(num => <li key={num + index} className="list-none">{num}</li>)}</td>
                                        <td className="border-2 p-2">{resource.timing}</td>
                                        <td className="border-2 p-2">{resource.notes.map(note => <li className="list-none">{note}</li>)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmergencyResources