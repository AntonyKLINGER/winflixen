import React from 'react'
import Image from 'next/legacy/image'
import styles from '../styles/TicketMyWin.module.css'
import { WINFLIX_URL } from '../config'

export default function Ticket({data}){

    console.log(data)

    return (
        <>
            <div className={`${styles.ticket} wm100`}>
                <div className="flex aligncenter space-between">
                    <span className={styles.titleTicket}>
                        <span className={styles.statusTicket}>Win</span>
                        <span>Ticket {data.date}</span>
                    </span>
                    <span className={styles.statusTick} style={{ color: data.status == "Validé" || data.status == "Perdu" ? "white" : "rgb(166, 166, 166)", backgroundColor: data.status == "Validé" ? "#19bb19" : data.status == "Perdu" ? "red" : "#f2f2f2" }}>{data.status == "false" ? "In progress" : data.status}</span>
                </div>
                <div className={styles.contentTicket}>
                    {data.pronos.map((prono, i) => {
                        return (
                            <div key={i} className={styles.pronoTicket}>
                                <div className="flex aligncenter">
                                    <div className="w60">
                                        <span className={styles.matchTicket}>{prono.match}</span>
                                        <span className={styles.choixTicket}><span className={styles.rounder} style={{ backgroundColor: prono.color == "win" ? "#19bb19" : prono.color == "loose" ? "red" : "#AAA" }}></span>{prono.prono}</span>
                                    </div>   
                                    <div className="w20">
                                        <span className={styles.dateTicket}>{prono.date}</span>
                                        <span className={styles.score}>{prono.score}</span>
                                    </div> 
                                    <div className="w20" style={{ textAlign: 'right' }}>
                                        <span className={styles.cote}>{prono.cote}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={styles.boxGains}>
                        <div>              
                            <div className="flex aligncenter space-between mBot5">
                                <span>Odd total</span><span className={styles.totalOdd}>{data.cote_totale}</span>
                            </div>
                            <div className="flex aligncenter space-between mBot6">
                                <span>Bet</span>
                                <span className="flex aligncenter">                                
                                    <div className={styles.coin}>
                                        <Image src={`https://wp.winflix.net/wp-content/uploads/2019/12/wincoin-1.png`} alt="wincoin" layout="fill" />
                                    </div><span className={styles.totalMise}>{data.mise_totale}</span>
                                </span>
                            </div>  
                            <div className="flex aligncenter space-between">
                                <span>Possible win</span><span style={{ color: data.status == "Validé" ? "#19bb19" : data.status == "Perdu" ? "red" : "#000" }}><strong>{data.gain_potentiel}</strong></span>
                            </div>                      
                        </div>
                    </div>
                    <span className={styles.rappel}>© The ticket was created thanks to winflix freebet.</span>
                </div>
            </div>
        </>
    )
}