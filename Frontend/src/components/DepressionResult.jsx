import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

ChartJS.register(ArcElement, Tooltip, Legend)


function DepressionResult({ }) {
    const { score } = useParams();
    function getBackgroundColors(score) {
        let backgroundColors;
        switch (true) {
            case (score < 5):
                backgroundColors = ['#0ac72c', 'rgba(243, 244, 244, 1)'];
                break;
            case (score >= 5 && score < 10):
                backgroundColors = ['#ffff10', 'rgba(243, 244, 244, 1)'];
                break;
            case (score >= 10 && score < 15):
                backgroundColors = ['#ff7519', 'rgba(243, 244, 244, 1)'];
                break;
            case (score >= 15 && score < 20):
                backgroundColors = ['#ff3911', 'rgba(243, 244, 244, 1)'];
                break;
            case (score >= 20 && score <= 27):
                backgroundColors = ['#ea0f0e', 'rgba(243, 244, 244, 1)'];
                break;
            default:
                backgroundColors = ['#000000', 'rgba(243, 244, 244, 1)']; // Default color if none of the cases match
        }
        return backgroundColors;
    }
    const colors = getBackgroundColors(score);
    const data = {
        datasets: [
            {
                label: '',
                data: [score, 27 - score],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                borderRadius: 4
            },
        ],
    }

    const guageText = {
        id: 'guageText',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, chartArea: { top, bottom, left, right, width } } = chart

            const xCoor = chart.getDatasetMeta(0).data[0].x
            const yCoor = chart.getDatasetMeta(0).data[0].y

            ctx.save()
            ctx.fillStyle = 'gray'
            ctx.font = 'bold 30px sans-serif'
            ctx.fillText(score, xCoor - 20, yCoor)
        }
    }

    return (
        <>
            <div className='flex flex-col items-center justify-start pt-10 w-full h-[80vh] bg-slate-200'>
                <h1 className='text-2xl font-bold'>Your Assessment Result</h1>
                <div className='w-80 h-80 bg-white my-4 rounded-lg p-4 shadow-md'>
                    <Doughnut
                        data={data}
                        width={'100rem'}
                        height={'100rem'}
                        options={{
                            maintainAspectRatio: true,
                            aspectRatio: 1.5,
                            rotation: -90,
                            circumference: 180,
                            responsive: true,
                            cutout: 70
                        }}
                        plugins={[guageText]}
                    />
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#0ac72c]'>
                        <span>1-4</span>
                        <span>Minimal Depression</span>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#ffff10]'>
                        <span>5-9</span>
                        <span>Mild Depression</span>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#ff7519]'>
                        <span>10-14</span>
                        <span>Moderate Depression</span>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#ff3911]'>
                        <span>15-19</span>
                        <span>MOderately Severe Depression</span>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#ea0f0e]'>
                        <span>20-27</span>
                        <span>Severe Depression</span>
                    </div>
                </div>
                <div className='flex gap-4 my-4 text-lg'>
                    <div className='flex flex-col justify-center items-center shadow-md p-4 rounded-lg bg-slate-50'>
                        <p>If you want professional help</p>
                        <Link to='/therapy' className='bg-[#efb399] hover:bg-[#e3a286] p-2 rounded-2xl mt-2'>Get therapy now</Link>
                    </div>
                    <div className='flex flex-col justify-center items-center shadow-md p-4 rounded-lg bg-slate-50'>
                        <p>Or find videos or articles to calm yourself</p>
                        <Link to='/awareness-portal' className='bg-[#efb399] hover:bg-[#e3a286] p-2 rounded-2xl mt-2'>Go to awareness portal</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DepressionResult