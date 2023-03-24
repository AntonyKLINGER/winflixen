import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { WINFLIX_URL } from '../config'
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart, Line } from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton'

export default function GraphResults(props){

    const [datas, setDatas] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [data, setData] = React.useState(null)
    const [benef, setBenef] = React.useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const fetcher = await fetch(`https://wpen.winflix.net/api/graph/values.php?year=${props.year}&month=${props.month}`)
            const json = await fetcher.json()
            setDatas(json)

            setData(prevData => {
                return {
                    ...prevData,
                    labels: json.labels,
                    datasets: [
                        {
                            label: `Bankroll in € ${props.name}`,
                            data: json.values,
                            fill: true,
                            color: "#000",
                            backgroundColor: [
                                'rgba(255,0,0,0.1)'
                            ],
                            borderColor: [
                                'rgba(255,0,0,0.8)'
                            ],
                            borderWidth: 3,
                            tension: 0.5,
                        },
                    ],
                }
            })
            setLoad(true)
        }
        fetchData()
        .catch(console.error)
    }, [props])

    return (
        <div>
            {load ? (
                <div>
                    <Line options={{elements: { point: {radius: 0} }}} data={data} />
                    <div className="text-center">
                        <span className={styles.graphTitle}><span className="material-icons" data-icon="auto_graph"></span>Benefit {props.name} : +{datas.benef}€</span>
                    </div>                 
                </div>
                
            ) : (
                <div>
                    <Skeleton animation="wave" variant="rectangular" height={350} />
                </div>
            )}
        </div>
    )
}