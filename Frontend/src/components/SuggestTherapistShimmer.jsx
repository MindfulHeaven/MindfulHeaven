function SuggestTherapistShimmer() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <>
            <div className='flex flex-wrap m-4 gap4 justify-around'>
                {array.map((index) => (
                    <div key={index} className='group flex flex-col shadow-md overflow-hidden m-2 rounded-md w-64 h-[32rem] bg-gray-100'>
                        <div className='w-64 h-56 overflow-hidden'>
                            <img className='group-hover:scale-110 bg-slate-400' />
                        </div>
                        <div className='flex flex-col p-4 justify-around h-72 w-56 text-wrap'>
                            <h3 className='text-xl font-extrabold w-56 group-hover:text-resultGreen bg-slate-400 p-2 rounded-md'></h3>
                            <p className='text-lg font-bold p-2 bg-slate-400 w-56 rounded-md'> </p>
                            <p className='font-bold bg-slate-400 w-56 p-2 rounded-md'> </p>    
                            <p className='font-bold group-hover:underline w-56 p-2 bg-slate-400 rounded-md'> </p>
                            <p className='font-bold bg-slate-400 pl-2 py-1 w-14 rounded-md'> </p>
                            <button className='rounded-lg px-2 py-2 w-56 bg-slate-400'> </button>
                        </div>
                    </div>
                ))}
            </div>  
        </>
    )
}

export default SuggestTherapistShimmer;