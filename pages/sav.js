import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../components/Sidebar'
import { HeaderCTA, OutilsCTA } from '../components/CTA'
import { RedButton } from '../components/Buttons'
import styles from '../styles/SAV.module.css'
import { WINFLIX_URL } from '../config'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function SAV(){

    const {user, setUser, loadUser, setLoadUser} = React.useContext(UserContext)
    const [load, setLoad] = React.useState(false)
    const [ediload, setEdiload] = React.useState(false)
    const [tickets, setTickets] = React.useState([])
    const [last, setLast] = React.useState(null) 
    const [edit, setEdit] = React.useState(null)
    const [ch, setCh] = React.useState(false)
    const [remember, setRemember] = React.useState(null)
    const [reponse, setReponse] = React.useState("")

    useEffect(() => {
        if(user.user_id != 1 && loadUser){
            Router.push("/devenir-vip/")
        }
    }, [user])

    useEffect(() => {
        const getTickets = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/admin/`)
            const json = await fetcher.json()
            setTickets(json)
            const laster = json.slice(0,1)
            setLast(laster[0].id)
            setRemember(laster[0])
            setLoad(true)
        }
        getTickets()
    }, [])

    useEffect(() => {
        const geter = async () => {
            setCh(false)
            const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/admin/edit/?id=${last}`)
            const json = await fetcher.json()
            setEdit(json)
            setEdiload(true)
            setRemember(json[0])
            setCh(true)
        }
        geter()
    }, [last])

    const cloturer = (id) => {
        fetch(`${WINFLIX_URL}/api/tickets/admin/close/?id=${id}`)
        .then(resp => resp.json())
        .then(data => {
            const geter = async () => {
                setCh(false)
                const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/admin/edit/?id=${last}`)
                const json = await fetcher.json()
                setEdit(json)
                setEdiload(true)
                setRemember(json[0])
                setCh(true)
            }
            geter()
            const getTickets = async () => {
                const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/admin/`)
                const json = await fetcher.json()
                setTickets(json)
            }
            getTickets()
        })
    }

    const handleChange= (e) => {
        setReponse(prev => e.target.value)
    }

    const answer = async (id) => {
        const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/admin/reponse/?id=${id}&lang=FR&content=${reponse.replaceAll("&", "et")}`)
        const json = await fetcher.json()
        setReponse("")
        const geter = async () => {
            setCh(false)
            const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/admin/edit/?id=${last}`)
            const json = await fetcher.json()
            setEdit(json)
            setEdiload(true)
            setRemember(json[0])
            setCh(true)
        }
        geter()
    }

    return (
        <div className={styles.appSAV}>
            <Head>
                <title>Administration | SAV Tickets</title>
                <meta name="description" content="Winflix a développé les meilleurs outils pour aider les parieurs à optimiser leur paris sportif. Retrouve ici le TOP 5 des outil d’aide !" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}>Administration des tickets</h1>                       
                                {load && (
                                    <>
                                    <TableContainer component={Paper} elevation={3} sx={{ marginTop: '20px' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>N°</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Sujet</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Langue</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Editer</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tickets.map((row, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer", '&:hover': { background: "#F9F9F9" } }}
                                            onClick={() => setLast(row.id)}
                                        >
                                            <TableCell>#{row.id}</TableCell>
                                            <TableCell>{row.id_user}</TableCell>
                                            <TableCell dangerouslySetInnerHTML={{ __html: row.sujet }}></TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.langue}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell align="right" onClick={() => setLast(row.id)}><span style={{ cursor: "pointer" }}>Editer</span></TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                    </Table>
                                </TableContainer> 
                            </>)}
                        </div>
                    </div>
                    <div className={`w35 wm100 ${styles.fixed}`}>
                        {ediload && edit != null ? ch ? (
                        <>
                            <span className={styles.status} onClick={edit[0].status != "Clôt" ? () => cloturer(edit[0].id) : undefined} style={{ color: "orange", backgroundColor: "#FFEDCB", cursor: "pointer" }}>{edit[0].status != "Clôt" ? "Clôturer" : "Clôt" }</span>
                            <span className={styles.title}>Édition du ticket #{edit[0].id}</span>
                            <span className={styles.sujet}><strong>Sujet :</strong> <span dangerouslySetInnerHTML={{ __html: edit[0].sujet.replaceAll("|", "'")}}></span></span>
                            <div className={styles.conversation}>
                                {edit[0].conv.map((ticket, i) => {
                                    return (
                                        <div key={i} className={`${styles.conv} ${ticket.author != "user" && styles.admin}`}>
                                            <span className={styles.author}><strong>Auteur :</strong> {ticket.author.charAt(0).toUpperCase() + ticket.author.slice(1)} <i>({ticket.date})</i></span>
                                            <span className={styles.text} dangerouslySetInnerHTML={{ __html : ticket.content}}></span>
                                        </div>
                                    )
                                })}
                            </div>
                            <textarea placeholder="Écrire une réponse..." value={reponse} onChange={handleChange} className={styles.textarea}></textarea>
                            <div className="text-right">
                                <Button variant="contained" className="mTop10" onClick={() => answer(edit[0].id)} disableElevation>Répondre</Button> 
                            </div>   
                        </>
                        ) : (
                            <span style={{ fontSize: "12px" }}>Chargement de l'édition...</span>
                        ) : (
                            <span style={{ fontSize: "12px" }}>Chargement de l'édition...</span>
                        )}                    
                    </div>
                </div>
            </div>
        </div>
    )
}