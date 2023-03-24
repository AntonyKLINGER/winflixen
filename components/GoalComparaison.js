import React, { useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Tools.module.css'

export default function GoalComparaison({item}){

    return (
        <div className={`${styles.winscoreBox} ${styles.wingoal} w100`}>
            <div className="flex aligncenter toColumn w100">
                <div className="w15 flex aligncenter wm100">  
                    <div className="w100 wm100">
                        <div className="flex noM">
                            <div>
                                <div className={`flex aligncenter ${styles.matchTeam} mTop5`}>
                                    <div className="flagTeamLive">
                                        <Image src={`https://winflix.net/logo/logo_${item.team_a_id}.png`} alt="logo team" layout="fill" />
                                    </div>      
                                    <span className={`${styles.teamName} ${styles.quickName}`}>{item.team_a}</span>                                      
                                </div>
                                <div className={`flex aligncenter ${styles.matchTeam} mTop10`}>
                                    <div className="flagTeamLive">
                                        <Image src={`https://winflix.net/logo/logo_${item.team_b_id}.png`} alt="logo team" layout="fill" />
                                    </div>      
                                    <span className={`${styles.teamName} ${styles.quickName}`}>{item.team_b}</span>                                      
                                </div>
                                <Link href={item.url} className={styles.goStats}>
                                <span className="material-icons" data-icon="query_stats"></span>
                                    Stats
                                </Link>
                            </div>
                        </div>
                        <div className="noDisplay">
                            <div className="flex justicenter relative">
                                <span className={`${styles.teamName} ${styles.quickName}`}>{item.team_a}</span> 
                                <div className={`flagTeamLive mmRight10`}>
                                    <Image src={`https://winflix.net/logo/logo_${item.team_a_id}.png`} alt="logo team" layout="fill" />
                                </div>   
                                <div className="flagTeamLive">
                                    <Image src={`https://winflix.net/logo/logo_${item.team_b_id}.png`} alt="logo team" layout="fill" />
                                </div> 
                                <span className={`${styles.teamName} ${styles.quickName}`}>{item.team_b}</span>  
                                <Link href={item.url} className={styles.goStats}>
                                <span className="material-icons" data-icon="query_stats"></span>
                                    Stats
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w85 wm100 mmTop20 flex aligncenter mwrap ${styles.gapper}`}>
                    <div className="w17 wm30">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>Average</span></legend>
                            <div className="">
                                <div className={`${styles.diffbutColor} ${item.taux_type} ${styles.mg}`}>
                                 {item.tauxMG.toFixed(1)}%
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                    <div className="w26 wm67">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>+2,5 goals in 8 games</span></legend>
                            <div className={`flex aligncenter ${styles.boxstats}`}>
                                <div className="wm50">
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>+2,5</span>
                                            <span className={styles.topScore}>{item.taux8_home.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>+2,5</span>
                                            <span className={styles.topScore}>{item.taux8_away.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diffbutColor} ${item.taux8_type}`}>
                                 {item.taux8.toFixed(1)}%
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                    <div className="w26 wm48">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>+2,5 goals in 5 games</span></legend>
                            <div className={`flex aligncenter ${styles.boxstats} ${styles.boxstatsSmall}`}>
                                <div className="wm50">
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>+2,5</span>
                                            <span className={styles.topScore}>{item.taux5_home.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>+2,5</span>
                                            <span className={styles.topScore}>{item.taux5_away.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diffbutColor} ${item.taux5_type}`}>
                                 {item.taux5.toFixed(1)}%
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                    <div className="w26 wm49">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>+2,5 goals in 3 games</span></legend>
                            <div className={`flex aligncenter ${styles.boxstats} ${styles.boxstatsSmall}`}>
                                <div className="wm50">
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>+2,5</span>
                                            <span className={styles.topScore}>{item.taux3_home.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>+2,5</span>
                                            <span className={styles.topScore}>{item.taux3_away.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diffbutColor} ${item.taux3_type}`}>
                                 {item.taux3.toFixed(1)}%
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                </div>
            </div>
        </div>
    )
}