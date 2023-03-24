import React, { useEffect, useContext } from 'react'
import {UserContext} from '../UserContext'
import Link from 'next/link'
import Image from 'next/legacy/image'
import ReviewSidebar from '../components/ReviewSidebar'
import Skeleton from '@mui/material/Skeleton'
import { RedButton } from '../components/Buttons'
import PronoBoxHome from '../components/PronoBoxHome'
import BlogPost from '../components/BlogPost'
import LinkMenuTeam from '../components/LinkMenuTeam'
import { SidebarCTA } from '../components/CTA'
import styles from '../styles/Sidebar.module.css'
import { WINFLIX_URL } from '../config'

export default function Sidebar(){

    const {sub, setSub} = useContext(UserContext)
    const [avis, setAvis] = React.useState([])
    const [loadAvis, setLoadAvis] = React.useState(false)

    let newDate = new Date()
    let jour = newDate.getDate()
    let mois = String(newDate.getMonth() + 1).padStart(2, '0');
    let annee = newDate.getFullYear()

    const [date, setDate] = React.useState(`${jour}/${mois}/${annee}`)

    useEffect(() => {
        const fetchAvis = async () => {
            const rep = await fetch('https://wp.winflix.net/api/reviews/')
            const json = await rep.json()
            setAvis(json)
            setLoadAvis(true)
        }
        fetchAvis()
    }, [])

    return (
        <div>
            <div className={`${styles.boxWinbot} app-content relative mBot30`}>
                <span className="app-title-h2">Find out the first <span className={styles.blue}>bot</span> from Winflix on Pronos live !</span>
                <p>Accedi to the bot of the telegram (<strong>/start</strong> initiare).</p>
                <Link href="/prediction-live-football">                
                    <div className={styles.winBot}>
                        <Image src={`https://winflix.net/en/wp-content/uploads/2022/09/telegram-en.png`} alt="winbot telegram" layout='fill' />
                    </div>
                </Link>  
            </div>

            <div className="app-content mBot30">
                <span className="app-title-h2">Find predictions by leagues</span>
                <div className="mTop10">
                    <ul className={`${styles.appList}`}>
                    <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-5.png`} value="Predictions Bundesliga" href="/soccer-predictions/prediction-bundesliga-1/" /></li>
                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-4.png`} value="Predictions Serie A" href="/soccer-predictions/prediction-serie-a/" /></li>
                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-1.png`} value="Predictions Ligue 1" href="/soccer-predictions/prediction-ligue-1/" /></li>
                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-3.png`} value="Predictions La Liga" href="/soccer-predictions/prediction-la-liga/" /></li>                        
                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-2.png`} value="Predictions Premier League" href="/soccer-predictions/prediction-premier-league/" /></li>                        
                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-15.png`} value="Predictions Jupiler Pro" href="/soccer-predictions/prediction-jupiler-pro-league/" /></li>
                    </ul>  
                </div>
            </div>
            {sub.status != "active" && (
            <div className="mBot30">
                <SidebarCTA />
            </div>
            )}
        </div>
    )
}


