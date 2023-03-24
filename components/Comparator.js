import React, { useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Tools.module.css'

export default function Comparator({item}){

    return (
        <div className={`${styles.winscoreBox} w100`}>
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
                <div className={`w85 wm100 mmTop20 flex aligncenter toColumn ${styles.gapper}`}>
                    <div className="w33 wm100">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>Goal difference 8 games</span></legend>
                            <div className="flex aligncenter">
                                <div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GS</span>
                                            <span className={styles.topScore}>{item.diffbuts8_bm_home}</span>
                                        </div>
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GC</span>
                                            <span className={styles.topScore}>{item.diffbuts8_be_home}</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GS</span>
                                            <span className={styles.topScore}>{item.diffbuts8_bm_away}</span>
                                        </div>
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GC</span>
                                            <span className={styles.topScore}>{item.diffbuts8_be_away}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diffbutColor} ${item.diffbuts8_type}`}>
                                 {item.diffbuts8_moy.toFixed(2)}
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                    <div className="w33 wm100">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>Goal difference 5 games</span></legend>
                            <div className="flex aligncenter">
                                <div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GS</span>
                                            <span className={styles.topScore}>{item.diffbuts5_bm_home}</span>
                                        </div>
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GC</span>
                                            <span className={styles.topScore}>{item.diffbuts5_be_home}</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GS</span>
                                            <span className={styles.topScore}>{item.diffbuts5_bm_away}</span>
                                        </div>
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GC</span>
                                            <span className={styles.topScore}>{item.diffbuts5_be_away}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diffbutColor} ${item.diffbuts5_type}`}>
                                    {item.diffbuts5_moy.toFixed(2)}
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                    <div className="w33 wm100">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>Goal difference 3 games</span></legend>
                            <div className="flex aligncenter">
                                <div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GS</span>
                                            <span className={styles.topScore}>{item.diffbuts3_bm_home}</span>
                                        </div>
                                        <div className={`${styles.topscore} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GC</span>
                                            <span className={styles.topScore}>{item.diffbuts3_be_home}</span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GS</span>
                                            <span className={styles.topScore}>{item.diffbuts3_bm_away}</span>
                                        </div>
                                        <div className={`${styles.topscore} ${styles.butMoy} ${styles.diffbutBox}`}>
                                            <span className={styles.topNumber}>GC</span>
                                            <span className={styles.topScore}>{item.diffbuts3_be_away}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.diffbutColor} ${item.diffbuts3_type}`}>
                                    {item.diffbuts3_moy.toFixed(2)}
                                </div>
                            </div>
                        </fieldset>                                       
                    </div>
                </div>
            </div>
        </div>
    )
}