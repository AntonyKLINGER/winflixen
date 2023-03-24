import React from 'react'
import styles from '../styles/Wintips.module.css'

export default function TipsRank({datas}){
    return (
        <div className={`flex aligncenter toColumn ${styles.rank_liner}`}>
            <div className="w60 wm100 mRight10 mRnone">
                <span className={styles.matchMRank}>{datas.match}</span>
                <span className={styles.pronoMRank}>{datas.prono}</span>
            </div>
            <div className="w40 wm100 mmTop10">
                <div className={`${styles.rankST} flex`}>
                    <div className={styles.percentOK} style={{ width: `${datas.stat}` }}></div>
                </div>
            </div>
        </div>
    )
}