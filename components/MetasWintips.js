import React, { useEffect, useContext } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { WINFLIX_URL } from '../config'
import styles from '../styles/Wintips.module.css'
import {UserContext} from '../UserContext'

export default function MetasWintips ({datas}){

    const {user, setUser, sub, setSub} = React.useContext(UserContext)

    return (
        <div className={`w49 wm100 mBot20 ${styles.winTips}`}>
            <div className="flex aligncenter space-between mBot10">
                <span className={`${styles.titleWinTips} flex aligncenter`}>
                    <div className="teamflag mRight10">
                        <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                    </div>
                    <span>
                        <span className={styles.mentions}>Reserved for members</span>
                        {datas.title}
                    </span>
                </span>
                <span className={styles.datePr}>
                    {datas.date}
                </span>
            </div>
            <div className={styles.contentWintips}>
                <div className="flex aligncenter space-between">
                    <span className={styles.preWinTips}>
                        Total predictions analyzed
                    </span>
                    <span className={styles.nbWinTips}>{datas.total}</span>
                </div>
                <div className="flex aligncenter space-between">
                    <span className={styles.preWinTips}>
                        Predictions selected by experts
                    </span>
                    <span className={styles.nbWinTips}>{datas.pronos}</span>
                </div>
                <div className="flex aligncenter space-between">
                    <span className={styles.preWinTips}>
                        Possible earnings when choosing
                    </span>
                    <span className={styles.nbWinTips}>{datas.gain_pot.toFixed(0)}€</span>
                </div>
            </div>
            <div className="mTop10 text-right">
                {sub.status == "active" ? (
                    <Link href={datas.url.replaceAll('https://wpen.winflix.net', '')} passHref className={styles.tagGreen}>
                        Go to WinTips
                    </Link>                    
                ) : (
                    <Link href="/vip" passHref className={styles.tagGreen}>
                        🔐 Become a VIP to access it!
                    </Link>                    
                )}

            </div>
        </div>
    )
}