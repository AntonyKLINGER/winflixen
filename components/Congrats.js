import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '../components/CTA'
import Sidebar from '../components/Sidebar'
import Ticket from '../components/TicketMyWin'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { UserContext } from '../UserContext'
import { WINFLIX_URL } from '/config'
import styles from '/styles/myWin.module.css'

export default function Congrats({ticket, setToView}){

    const {user, setUser} = useContext(UserContext)

    const close = async () => {
        const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/win/view.php?id=${user.user_id}&lang=EN&ticket=${ticket.id_ticket}`)
        const json = await fetcher.json()
        if(json.message == "success"){
            console.log('done');
            setToView(prev => {
                return prev.filter((item) => item.id_ticket != ticket.id_ticket)
            })
        }
    }

    return (        
        <div className={styles.contenter}>
            <div className="text-center">
            <span className={`material-icons ${styles.winIcon}`} data-icon="local_fire_department"></span>
                <span className={styles.youWin}>Your ticket has been validated !</span>
            </div>
            <Ticket data={ticket} />
            <div className="text-center mTop20">
                <span onClick={close} className={styles.close}>
                    Close
                </span>
            </div>
        </div>        
    )
}