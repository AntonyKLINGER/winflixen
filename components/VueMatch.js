import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'
import IconButton from '@mui/material/IconButton';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import styles from '../styles/Home.module.css'
import { motion } from "framer-motion"

export function VueMatch({data, st}){

    const datas = data
    console.log(st)

    return (
        <Link href={datas.urlProno.replace('https://winflix.net/en', '')} className={`${styles.linkBox} mBot20 w100`} passHref legacyBehavior>
            <motion.div whileTap={{ scale: 0.97 }} className={`${styles.pronoBox} w100 ${st == "fullsize" ? styles.tomax : ""}`}>
                <div className="flex aligncenter">
                    <div className={styles.countryBox}>
                        <div className="flex aligncenter">
                            <div className={styles.miniBox}>
                                <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/soccer-ball-1.png`} alt="football" layout="fill" />
                            </div>    
                            <div className={styles.miniBoxCountry}>
                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/${datas.flag}`} alt="drapeau" layout="fill" />
                            </div>                                    
                        </div>
                    </div>
                    <span className={styles.leagueBox}>
                        {datas.country} - {datas.league_name}
                    </span>
                    <span className={styles.hourBox}>
                        {datas.time}
                    </span>
                </div>
                <div className="flex aligncenter mTop10">
                    <span className={styles.scoreBox}>{datas.goals_home}</span>
                    <div className="flex aligncenter mLeft15">
                        <div className={styles.miniBox}>
                            <Image src={`https://winflix.net/logo/logo_${datas.teamA_id}.png`} alt={`pronostici ${datas.teamA_name}`} layout="fill" />
                        </div>       
                        <span className={styles.nameBox}>{datas.teamA_name}</span>                            
                    </div>
                </div>
                <div className="flex aligncenter mTop5">
                    <span className={styles.scoreBox}>{datas.goals_away}</span>
                    <div className="flex aligncenter mLeft15">
                        <div className={styles.miniBox}>
                            <Image src={`https://winflix.net/logo/logo_${datas.teamB_id}.png`} alt={`pronostici ${datas.teamB_name}`} layout="fill" />
                        </div>       
                        <span className={styles.nameBox}>{datas.teamB_name}</span>                            
                    </div>
                </div>
                <div className={styles.goBox}>
                <Link href={datas.urlProno.replace('https://winflix.net/en', '')} className={styles.goLink}>
                    <IconButton aria-label="fingerprint" color="error" size="small" sx={{ color: "red" }}>
                        <QueryStatsIcon />
                    </IconButton>
                </Link>
                </div>
            </motion.div>
        </Link>
    )
}