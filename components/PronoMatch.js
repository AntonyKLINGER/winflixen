import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { UserContext } from '../UserContext'
import Skeleton from '@mui/material/Skeleton'
import styles from '../styles/InfosMatch.module.css'
import { WINFLIX_URL } from '../config'

export default function PronoMatch({id, home, away, date}){

    const [prono, setProno] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const {sub, setSub} = React.useContext(UserContext)
 
    useEffect(() => {

        const fetchProno = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/pronos/fr/predictions/?id=${id}`)
            const json = await fetcher.json()
            setProno(json)
            setLoad(true)
        }

        fetchProno()
    }, [id])

    return (
        <div className="flex justicenter">
            {load ? sub.status == 'active' ? (
                <div className="flex aligncenter justicenter w60 appItemResultat mBot20 wm100m mTop20 wm100">
                    <div className="w20 appResultatMetas text-center">
                        <span className="material-icons" data-icon="sports_soccer"></span>
                        <span className="resultat-type">Football</span>
                        <span className="resultat-date">{prono[0].datas.date != "//" ? prono[0].datas.date : date}</span>
                    </div>
                    <div className="w60 app-resultat-prono mRight10">
                        <span className={`resultat-match ${styles.pronoMatch}`}>{prono[0].datas.homeTeam.team_name ? prono[0].datas.homeTeam.team_name : home} - {prono[0].datas.awayTeam.team_name ? prono[0].datas.awayTeam.team_name : away}</span>
                        <span className={`${styles.resultatProno} resultat-prono`}>{prono[0].datas.prediction ? prono[0].datas.prediction : "Coming."}</span>
                    </div>
                    <div className="w20 app-resultat-odds">
                        {prono[0].datas.result == "wait" ? 
                            (
                                <Link href="/" passHref legacyBehavior>   
                                    <a className={`${styles.oddsBox} pronoWait`}>    
                                        <span>{prono[0].datas.odd}</span>
                                        <span className="material-icons" data-icon="hourglass_top"></span>
                                    </a>       
                                </Link>
                            ) : prono[0].datas.result == "win" ? (
                                <Link href="/" passHref legacyBehavior>       
                                    <a className={`${styles.oddsBox} pronoWin`}>      
                                        <span>{prono[0].datas.odd}</span>
                                        <span className="material-icons" data-icon="done"></span>
                                    </a> 
                                </Link>                               
                            ) : (
                                <Link href="/" passHref legacyBehavior>             
                                    <a className={`${styles.oddsBox} pronoLoose`}>
                                        <span>{prono[0].datas.odd}</span>
                                        <span className="material-icons" data-icon="clear"></span>
                                    </a>
                                </Link>                                    
                            )
                        }

                    </div>
                </div>
            ) : 
            (
                <div className="flex aligncenter justicenter w60 appItemResultat mBot20 wm100m mTop20 wm100">
                    <div className="w20 appResultatMetas text-center">
                        <span className="material-icons" data-icon="sports_soccer"></span>
                        <span className="resultat-type">Football</span>
                        <span className="resultat-date">{prono[0].datas.date}</span>
                    </div>
                    <div className="w60 app-resultat-prono mRight10">
                        <span className={`resultat-match ${styles.pronoMatch}`}>{prono[0].datas.homeTeam.team_name} - {prono[0].datas.awayTeam.team_name}</span>
                        <Link href="/vip/" style={{ color: 'red' }} className={`${styles.resultatProno} resultat-prono`}>🔐 Prediction only for VIPs</Link>
                    </div>
                    <div className="w20 app-resultat-odds">
                        <Link href="/" passHref legacyBehavior>             
                            <a className={`${styles.oddsBox} pronoLoose`}>
                                <span className="material-icons" data-icon="lock" style={{ marginLeft: '0px' }}></span>
                            </a>
                        </Link>                                    
                    </div>
                </div>                
            )
            : (
                <div className="flex aligncenter justicenter w60 appItemResultat mBot20 wm100m mTop20">
                    <div className="w20 appResultatMetas text-center">
                        <span className="material-icons" data-icon="sports_soccer"></span>
                        <span className="resultat-type mBot5">Football</span>
                        <Skeleton variant="rectangular" animation="wave" width={85} height={10} radius="30" />
                    </div>
                    <div className="w60 app-resultat-prono mRight10">
                        <span className={`resultat-match ${styles.pronoMatch}`}><Skeleton variant="rectangular" animation="wave" width={255} height={15} radius="30" /></span>
                        <span className={`${styles.resultatProno} resultat-prono`}><Skeleton variant="rectangular" animation="wave" width={255} height={15} radius="30" /></span>
                    </div>
                    <div className="w20 app-resultat-odds">
                        <Link href="/" className={`${styles.oddsBox} pronoWait`}>
                            <Skeleton variant="rectangular" animation="wave" width={255} height={30} radius="30" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}