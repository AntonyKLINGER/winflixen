import React, { useEffect } from 'react'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Tools.module.css'

export default function WinScore({item}){

    return (
        <div className={`${styles.winscoreBox} w100`}>
            <div className="flex aligncenter toColumn w100">
                <div className="w55 flex aligncenter wm100">  
                    <div className="w70 wm100">
                        <div className="flex">
                            <span className={`${styles.probabox} ${item.type}`}>
                                <span className="material-icons" data-icon="bar_chart"></span>
                                {item.probability.toFixed(2)}%
                            </span>
                            <div>
                                <div className={`flex aligncenter ${styles.matchTeam}`}>
                                    <div className="flagTeamLive">
                                        <Image src={`https://winflix.net/logo/${item.logo_a}`} alt="logo team" layout="fill" />
                                    </div>      
                                    <span className={styles.teamName}>{item.team_a}</span>   
                                    <div className="flex aligncenter">
                                        <span className={styles.oddBox}>
                                            <span className={styles.typeOdd}>1</span>
                                            <span className={styles.valueOdd}>{item.odd1}</span>
                                        </span>
                                        <span className={styles.oddBox}>
                                            <span className={styles.typeOdd}>1X</span>
                                            <span className={styles.valueOdd}>{item.odd1N}</span>
                                        </span>
                                    </div>                                    
                                </div>
                                <div className={`flex aligncenter ${styles.matchTeam} mTop10`}>
                                    <div className="flagTeamLive">
                                        <Image src={`https://winflix.net/logo/${item.logo_b}`} alt="logo team" layout="fill" />
                                    </div>      
                                    <span className={styles.teamName}>{item.team_b}</span> 
                                    <div className="flex aligncenter">
                                        <span className={styles.oddBox}>
                                            <span className={styles.typeOdd}>2</span>
                                            <span className={styles.valueOdd}>{item.odd2}</span>
                                        </span>
                                        <span className={styles.oddBox}>
                                            <span className={styles.typeOdd}>X2</span>
                                            <span className={styles.valueOdd}>{item.oddN2}</span>
                                        </span>
                                    </div>                                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w45 wm100 mmTop20 flex aligncenter">
                    <div className="w80 mRight30 mLeft10 mLnone mmRight10">
                        <fieldset className={styles.fieldset}>
                            <legend><span className={styles.topTitle}>Exact score + close relatives</span></legend>
                            <div className="flex wrap">
                                {item.scores.map((score, i) => {
                                    return (
                                    <div key={i} className={styles.topscore}>
                                        <span className={styles.topNumber}>#{i+1}</span>
                                        <span className={styles.topScore}>{score}</span>
                                    </div>
                                    )
                                })}
                            </div>
                        </fieldset>                                       
                    </div>
                    <div className="w20">
                        <div className={styles.boxDiff}>
                            <span className={styles.titleDiff}>Goals diff</span>
                            <span className={styles.diffbut}>
                                <span className="material-icons" data-icon="analytics"></span>
                                {item.diffbut}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}