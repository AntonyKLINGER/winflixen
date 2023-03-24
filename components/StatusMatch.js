import React, { useEffect } from 'react'
import Image from 'next/legacy/image'
import styles from '../styles/StatusMatch.module.css'
import Link from 'next/link'
import { WINFLIX_URL } from '../config'
import Router, { useRouter } from 'next/router'

export default function StatusMatch({datas, id}){

    const router = useRouter()

    const [liveData, setLiveData] = React.useState({
        statusDisplay: <span className='material-icons sync'>sync</span>,
        goalsHomeTeam: <span className='material-icons sync'>sync</span>,
        goalsAwayTeam: <span className='material-icons sync'>sync</span>,
        halftime: ""
    })

    const [purl, setPurl] = React.useState(`${WINFLIX_URL}/api/pages/fr/?slug=${datas.homeTeam.team_url}-${datas.awayTeam.team_url}-${datas.date.replaceAll("/", "-")}-${datas.league_name.toLowerCase().replaceAll(" ", "-").replaceAll("ü", "u")}`)

    useEffect(() => {
        if(datas.statusShort == "FT" || datas.statusShort == "NS" || datas.statusShort == "PST"){
            setLiveData(prev => {
                const hour = datas.event_date.split("T")[1]
                const hours = hour.split("+")[0].slice(0,5)
                return {
                    statusDisplay: datas.statusShort == "FT" ? "Finish" : datas.statusShort == "NS" ? hours : "Coming",
                    goalsHomeTeam: datas.goalsHomeTeam,
                    goalsAwayTeam: datas.goalsAwayTeam,
                    halftime: datas.score.halftime
                }
            })
        }
        else{
            const getLive = async () => {
                const fetcher = await fetch(purl)
                const json = await fetcher.json()
                setLiveData(prev => {
                    return {
                        statusDisplay: json.datas.statusShort == "PEN" ? "Penalties" : json.datas.statusShort == "AET" ? "Extra time" : json.datas.statusShort == "1H" || json.datas.statusShort == "2H" ? json.datas.elapsed+"'" : json.datas.statusShort == "HT" ? "Halftime" : "",
                        goalsHomeTeam: json.datas.goalsHomeTeam,
                        goalsAwayTeam: json.datas.goalsAwayTeam,
                        halftime: json.datas.score.halftime
                    }
                })
            } 
            getLive()
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if(datas.elapsed > 0 && datas.statusShort != "FT" && datas.statusShort != "NS" && datas.statusShort != "PST"){
                const getLive = async () => {
                    const fetcher = await fetch(purl)
                    const json = await fetcher.json()
                    setLiveData(prev => {
                        return {
                            statusDisplay: json.datas.statusShort == "PEN" ? "Penalties" : json.datas.statusShort == "AET" ? "Extra time" : json.datas.statusShort == "1H" || json.datas.statusShort == "2H" ? json.datas.elapsed+"'" : json.datas.statusShort == "HT" ? "Halftime" : "",
                            goalsHomeTeam: json.datas.goalsHomeTeam,
                            goalsAwayTeam: json.datas.goalsAwayTeam,
                            halftime: json.datas.score.halftime
                        }
                    })
                }
                getLive()
            }
        }, 1000);      
        return () => clearInterval(interval);
    }, [router.route])

    return (
        <div className={styles.appStatus}>
            <div className="flex justicenter aligncenter">
                <Link href={`/soccer-predictions/prediction-${datas.homeTeam.team_url}`} passHref className={styles.linkToTeam}>
                <div className={`${styles.appMetasTeam} text-center`}>
                    <div className={styles.appFlagTeam}>
                        <Image src={`https://winflix.net/logo/logo_${datas.homeTeam.team_id}.png`} alt={`logo team ${datas.homeTeam.team_name}`} layout="fill" />
                    </div>                   
                    <span>{datas.homeTeam.team_name}</span>
                </div>
                </Link>
                <div className="w30 text-center">
                    <span className={`${styles.appMetasStatus} ${(liveData.statusDisplay != "Penalties" && liveData.statusDisplay != "Extra time" && liveData.statusDisplay != "Halftime" && liveData.statusDisplay != "Finish" && liveData.statusDisplay != "Reported" && liveData.halftime != null) && styles.cogreen}`}>{liveData.statusDisplay}</span>
                    <span className={styles.appMetasScoreHT}>{liveData.halftime}</span>
                    <span className={styles.appMetasScore}>
                        <span>{liveData.goalsHomeTeam}</span>
                        <span>{liveData.goalsAwayTeam}</span>
                    </span>
                </div>
                <Link href={`/soccer-predictions/prediction-${datas.awayTeam.team_url}`} passHref className={styles.linkToTeam}>
                <div className={`${styles.appMetasTeam} text-center`}>
                    <div className={styles.appFlagTeam}>
                        <Image src={`https://winflix.net/logo/logo_${datas.awayTeam.team_id}.png`} alt={`logo team ${datas.awayTeam.team_name}`} layout="fill" />
                    </div>  
                    <span>{datas.awayTeam.team_name}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}