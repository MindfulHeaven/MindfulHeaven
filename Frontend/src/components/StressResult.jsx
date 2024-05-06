import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

ChartJS.register(ArcElement, Tooltip, Legend)


function StressResult({ }) {
    const { score } = useParams();
    const chartRef = useRef(null);
    useEffect(() => {
        return () => {
          if (chartRef.current) {
            chartRef.current.destroy();
          }
        };
     }, []);
    function getBackgroundColors(score) {
        let backgroundColors;
        switch (true) {
            case (score < 14):
                backgroundColors = ['#0ac72c', 'rgba(243, 244, 244, 1)'];
                break;
            case (score >= 14 && score < 27):
                backgroundColors = ['#ffff10', 'rgba(243, 244, 244, 1)'];
                break;
            case (score >= 27 && score <= 40):
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
                data: [score, 40 - score],
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
            <div className='flex flex-col items-center justify-start pt-10 w-full h-[80vh] bg-slate-200 max-[433px]:h-auto max-[900px]:h-auto'>
                <h1 className='text-2xl font-bold max-[433px]:text-lg'>Your Assessment Result</h1>
                <div className='w-80 h-80 bg-white my-4 rounded-lg p-4 shadow-md max-[433px]:w-50'>
                    <Doughnut
                        ref={chartRef}
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
                  <div className='flex gap-4 max-[433px]:flex-col max-[630px]:flex-col'>
                      <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#0ac72c]'>
                          <span>0-13</span>
                          <span>Low Stress</span>
                      </div>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#ffff10]'>
                        <span>14-26</span>
                        <span>Moderate Stress</span>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-lg p-2 bg-[#ea0f0e]'>
                        <span>27-40</span>
                        <span>High perceived stress</span>
                    </div>
                </div>
                <div className='flex gap-4 my-4 text-lg max-[433px]:flex-col max-[433px]:justify-center max-[433px]:items-center max-[630px]:flex-col'>
                    <div className='flex flex-col justify-center items-center shadow-md p-4 rounded-lg bg-slate-50 max-[433px]:w-48'>
                        <p className='max-[433px]:text-sm max-[630px]:text-sm'>If you want professional help</p>
                        <Link to='/therapy' className='bg-[#efb399] hover:bg-[#e3a286] p-2 rounded-2xl mt-2 max-[433px]:text-sm max-[630px]:text-sm'>Get therapy now</Link>
                    </div>
                    <div className='flex flex-col justify-center items-center shadow-md p-4 rounded-lg bg-slate-50 max-[433px]:w-48'>
                        <p className='max-[433px]:text-sm max-[630px]:text-sm'>Or find videos or articles to calm yourself</p>
                        <Link to='/awareness-portal' className='bg-[#efb399] hover:bg-[#e3a286] p-2 rounded-2xl mt-2 max-[433px]:text-sm max-[630px]:text-sm'>Go to awareness portal</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StressResult