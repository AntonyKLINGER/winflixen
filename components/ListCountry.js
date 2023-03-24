import React, { useContext, useEffect } from 'react'
import { MenuContext } from '../MenuContext'
import { WINFLIX_URL } from '../config'
import Link from 'next/link'
import Image from 'next/legacy/image'
import LinkMenu from '../components/LinkMenu'
import LinkMenuTeam from '../components/LinkMenuTeam'
import styles from '../styles/Header.module.css'
import Skeleton from '@mui/material/Skeleton'

export default function ListCountry(props){

    const {translate, setTranslate, infosCountry, setInfosCountry, teams, setTeams, league, setLeague, paysDatas, setPaysDatas, openMenu} = useContext(MenuContext)
    const [paysLoad, setPaysLoad] = React.useState(false)

    function backTo(){
        setTranslate("0%")
    }

    function navTo(a, b, c, d){
        fetch(`${WINFLIX_URL}/api/menu/teams.php?pays=${a}&paysg=${b}&payst=${c}`)
        .then(res => res.json())
        .then(data => {
            setTeams(data)
            const n = d+' - '+c
            setLeague(n)
        })
        setTranslate("-66.6%")
    }


    useEffect(() => {    
        if(infosCountry[1] != ''){  
            fetch(`${WINFLIX_URL}/api/menu/country.php?pays=${infosCountry[1]}&paysg=${infosCountry[2]}&payst=${infosCountry[3]}`)
            .then(res => res.json())
            .then(data => {
                setPaysDatas(data)
                setPaysLoad(true)
            })
        }
    }, [infosCountry])    

    return (
        <div className={styles.appmCountry}>
            <a className={styles.appmTitleBack} onClick={backTo}>
                <span className="material-icons" data-icon="chevron_left"></span>
                Back
            </a>
            <span className={styles.appmSub}>
                {paysLoad ? (
                    <div className="flex aligncenter">
                        <div className={styles.appmFlag}>
                            <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/${paysDatas[0].drapeau}`} layout="fill" alt="logo pays" />
                        </div>
                        Predictions {infosCountry[3]}
                    </div>
                ) : (
                    <>
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li> 
                    </>
                )}  
            </span>
            <ul className={styles.appmPrimary}>
                {paysLoad ? (
                    <li onClick={openMenu}><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/${paysDatas[0].drapeau}`} value={`Predictions ${infosCountry[3]}`} href={`/soccer-predictions/prediction-${infosCountry[1]}`} /></li>
                ) : (
                    <>
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li> 
                    </>
                )}                
                {paysLoad ? 
                    paysDatas.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className="flex aligncenter space-between" onClick={() => navTo(`${infosCountry[1]}-${index+1}`, `${infosCountry[2]}`, `${infosCountry[3]}`, `${item.nom_fr}`)}>
                                    <div className="flex aligncenter">
                                        <div className={styles.flagTeam}>
                                            <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/${item.drapeau}`} layout="fill" alt={`Predictions ${item.nom_fr}`} />
                                        </div>
                                        Predictions {item.nom_fr}
                                    </div>
                                    <span className="material-icons" data-icon="chevron_right"></span>
                                </a>
                            </li>
                        )
                    })
                : (
                    <>  
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>   
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>   
                    </>
                )}
            </ul> 
            <span className={styles.appmTitle}>Die wichtigsten Werkzeuge</span>
            <ul className={styles.appmPrimary}>
                <li onClick={openMenu}><LinkMenu icon="timer" value="Livescore" href="/football/" /></li>
                <li onClick={openMenu}><LinkMenu icon="done_all" value="Results" href="/results/" /></li>
                <li onClick={openMenu}><LinkMenu icon="settings_suggest" value="Predictions Tools" href="/top-5-predictions-tools/" /></li>
                <li onClick={openMenu}><LinkMenu icon="tips_and_updates" value="WinTips" href="/football-tips-prediction/" /></li>
                <li onClick={openMenu}><LinkMenu icon="smart_toy" value="WinBot" href="/prediction-live-football/" /></li>
                <li onClick={openMenu}><LinkMenu icon="calculate" value="WinOdds" href="/winodds/" /></li>
                <li onClick={openMenu}><LinkMenu icon="equalizer" value="WinScore" href="/winscore/" /></li>
                <li onClick={openMenu}><LinkMenu icon="difference" value="WinComparator" href="/wincomparator/" /></li>
                <li onClick={openMenu}><LinkMenu icon="add_task" value="WinGoal" href="/wingoal/" /></li>
                <li onClick={openMenu}><LinkMenu icon="emoji_events" value="WinRank" href="/winrank/" /></li>
                <li onClick={openMenu}><LinkMenu icon="login" value="Einloggen" href="/login/" /></li>
            </ul>
        </div>
    )
}