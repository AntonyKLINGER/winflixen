import React, { useEffect, useContext } from 'react'
import styles from '../styles/InfosMatch.module.css'
import { VueMatch } from '../components/VueMatch'
import Skeleton from '@mui/material/Skeleton'
import { WINFLIX_URL } from '../config'

export default function Others({league_id, fixture_id, league_name_fr}){

    const [live, setLive] = React.useState(null)
    const [loadLive, setLoadLive] = React.useState(false)
    const [champer, setChamper] = React.useState(null)
    const [loadC, setLoadC] = React.useState(false)

    useEffect(() => {
        const fetchApi = async () => {
            const rep = await fetch(`${WINFLIX_URL}/api/fixtures/live/list/live.json`)
            const json = await rep.json()
            setLive(json)
            setLoadLive(true)
        }
        fetchApi()
    }, [])

    useEffect(() => {
        if(loadLive){
            const champx = live.filter((item, index) => (item.league_id == league_id && item.id != fixture_id))
            setChamper(champx)
            setLoadC(true)
        }
    }, [live, fixture_id])

    return (
        <>
        {(loadC && champer.length > 0) && (
        <div className="app-content mBot30">
            <span className="app-title-h2-medium" style={{ marginTop: '0px !important', lineHeight: '1.5em' }}>Check out the other games available in {league_name_fr}</span>
            <div className="mTop20">
            {loadC ? champer.slice(0,5).map((match, i) => {
                return <div key={i} className={`w100 mBot10 ${styles.vuematch}`}><VueMatch st="fullsize" data={match} /></div>
            }) : (
                <>
                    <div className={`w32 mBot10 ${styles.vuematch2} wm100`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                    <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                    <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                </>
            )}
            </div>
        </div>   
        )}
        </>     
    )
}