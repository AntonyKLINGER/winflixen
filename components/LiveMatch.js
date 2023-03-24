import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Live.module.css'
import { UserContext } from '../UserContext';

export default function LiveMatch({item}){

    const {user, setUser} = React.useContext(UserContext)
    const {sub, setSub} = React.useContext(UserContext)
    const [percent, setPercent] = React.useState(0)
    const [load, setLoad] = React.useState(false)
    const [odds, setOdds] = React.useState([0, 1, 2])
    const [loadOdds, setLoadOdds] = React.useState(false)
    const [pronos, setPronos] = React.useState("À venir")
    const [loadPronos, setLoadPronos] = React.useState(false)

    useEffect(() => {
        const getOdds = async () => {
            const fetcher = await fetch(`https://winflix.net/datas/odds/odds_${item.id}.json`)
            const json = await fetcher.json()
            if(json.api.odds[0] && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin") && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets.find((odd) => odd.label_name == "Match Winner")){
                if(json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin") && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets.find((odd) => odd.label_name == "Match Winner").values[0] && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets.find((odd) => odd.label_name == "Match Winner").values[1] && json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets.find((odd) => odd.label_name == "Match Winner").values[2]){
                    setOdds(json.api.odds[0].bookmakers.find((item) => item.bookmaker_name == "Bwin").bets.find((odd) => odd.label_name == "Match Winner").values)
                }
            }
            setLoadOdds(true)
        }
        getOdds()
    }, [])

    useEffect(() => {
        const getPronos = async () => {
            const fetcher = await fetch(`https://winflix.net/datas/predictions/prediction_${item.id}.json`)
            const json = await fetcher.json()
            if(json.api.predictions[0].match_winner){
                setPronos(json.api.predictions[0].match_winner)
            }
            setLoadPronos(true)
        }
        getPronos()
    }, [])


    useEffect(() => {
        const getPercent = async () => {
            if(pronos != 'À venir'){
                const fetcher = await fetch(`https://wpen.winflix.net/api/pronos/stats/?id=${item.id}&prono=${pronos.replace(' ', '')}`)
                const json = await fetcher.json()
                setPercent(json)
                setLoad(true)
            }
        }
        getPercent()
    
    }, [pronos])

    return (
        <>
        <div className={`flex ${styles.appMatch}`} itemScope itemType="https://schema.org/SportsEvent">
            <div className="disnone">
                <span itemProp="name">Live and Predictions {item.teamA_name} {item.teamB_name}</span>
                <span itemProp="startDate">{item.date}</span>
                <div itemProp="location" itemScope itemType="https://schema.org/Place">
                    <span itemProp="name">{item.league_name}</span>
                    <span itemProp="address">{item.country}</span>
                </div>
                <span itemProp="url">{item.urlProno}</span>
            </div>
            <Link href={item.urlProno.replace('https://winflix.net/en', '')} passHref legacyBehavior>
                <a className={`w40 wm47 flex aligncenter ${styles.linkMatch}`}>
                    <span id={`timer_${item.fixture_id}`} className={`${styles.matchStatus}`}>{item.time}</span>
                    <h3 className={`${styles.matchTeams} mmTop15`}>
                        <div className={`flex aligncenter ${styles.matchTeam}`}>
                            <div className="flagTeamLive">
                                <Image src={`https://winflix.net/logo/logo_${item.teamA_id}.png`} alt="logo team" layout="fill" />
                            </div>                                             
                            <span>{item.teamA_name}</span>
                        </div>
                        <div className={`flex aligncenter ${styles.matchTeam}`}>
                            <div className="flagTeamLive">
                                <Image src={`https://winflix.net/logo/logo_${item.teamB_id}.png`} alt="logo team" layout="fill" />
                            </div>  
                            <span>{item.teamB_name}</span>
                        </div>
                    </h3>
                    <div className={`${styles.matchScores} mmTop15`}>
                        <span id={`score1_${item.fixture_id}`} className={styles.matchScore}>{item.goals_home}</span>
                        <span id={`score2_${item.fixture_id}`} className={styles.matchScore}>{item.goals_away}</span>
                    </div>
                </a>
            </Link>
            <div className="w60 mLeft20 mLnone wm53">
                <div className="flex aligncenter">
                    <div className={`w30 ${styles.borderR} ${styles.mobileAjust}`}>
                        <span className={styles.tableTitle}>Prediction</span>
                        {sub.status == 'active' ? (
                        <>
                        <div className={styles.appBar}>
                            <div className={styles.barInside} style={{ width: `${percent.percent}%` }}>
                                <span>                                   
                                    {percent.percent}%                                   
                                </span>    
                            </div> 
                        </div>
                        <span className={styles.pronoDesc}>
                            {(loadPronos && pronos) ? pronos == "1" ? item.teamA_name : pronos == "2" ? item.teamB_name : pronos == "1 N" ? item.teamA_name+' or draw' : pronos == "N 2" ? item.teamB_name+' oder draw' : 'coming.' : 'coming.'}
                        </span>
                        </>
                        ) : (
                        <>
                        <div className={styles.appBar}>
                            <div className={styles.barInside} style={{ width: "67%" }}>
                                <span>
                                    <span className={`material-icons ${styles.lockedWhite}`} data-icon="lock"></span>
                                </span>    
                            </div> 
                        </div>
                        <span className={styles.pronoDesc}>
                            Prediction is
                            <Link href="/vip/" passHref legacyBehavior>
                                <a className={styles.miniLink}>only for VIPs.</a>
                            </Link>
                        </span>
                        </>
                        )}
                    </div>
                    {sub.status == "active" ? (
                        <Link href={item.urlProno} passHref legacyBehavior>
                            <a className={`w20 wm30 text-center ${styles.borderR2} ${styles.tableSE} noM`}>
                                <span className={`material-icons ${styles.unlocked}`} data-icon="lock_open"></span>
                                <span className={styles.tableTitle}>Live bet</span>
                                <span className={`material-icons ${styles.tableIcon}`} data-icon="done_all"></span>
                            </a>
                        </Link>
                    ) : (
                        <Link href="/vip/" passHref legacyBehavior>
                            <a className={`w20 wm30 text-center ${styles.borderR2} ${styles.tableSE} noM`}>
                                <span className={`material-icons ${styles.locked}`} data-icon="lock"></span>
                                <span className={styles.tableTitle}>Live bet</span>
                                <span className={`material-icons ${styles.tableIcon}`} data-icon="done_all"></span>
                            </a>
                        </Link>
                    )}

                    {sub.status == "active" ? (
                    <Link href={item.urlSE} passHref legacyBehavior>
                        <a className={`w20 wm30 text-center mRight20 mRnone mmTop15 ${styles.tableSE}`}>
                            <span className={`material-icons ${styles.unlocked}`} data-icon="lock_open"></span>
                            <span className={styles.tableTitle}>Exact result</span>
                            <span className={`material-icons ${styles.tableIcon}`} data-icon="signal_cellular_alt"></span>
                        </a>
                    </Link>
                    ) : (
                        <Link href={item.urlSE} passHref legacyBehavior>
                            <a className={`w20 wm30 text-center mRight20 mRnone mmTop15 ${styles.tableSE}`}>
                                <span className={`material-icons ${styles.locked}`} data-icon="lock"></span>
                                <span className={styles.tableTitle}>Exact result</span>
                                <span className={`material-icons ${styles.tableIcon}`} data-icon="signal_cellular_alt"></span>
                            </a>
                        </Link>                        
                    )}
                    <div className="w20 wm25 text-center mmTop10">
                        <span className={styles.tableOdd}>{(loadOdds && odds[0].odd) ? odds[0].odd : 'x'}</span>
                        <span className={styles.tableOdd}>{(loadOdds && odds[1].odd) ? odds[1].odd : 'x'}</span>
                        <span className={styles.tableOdd}>{(loadOdds && odds[2].odd) ? odds[2].odd : 'x'}</span>
                    </div>
                    <div className="w10 noM">
                        <Link href={item.urlProno} passHref legacyBehavior>
                            <a className={styles.tableMore}>
                                <span className={`material-icons ${styles.moreBtn}`} data-icon="more_vert"></span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}