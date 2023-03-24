import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../components/Sidebar'
import { HeaderCTA, OutilsCTA } from '../components/CTA'
import { RedButton } from '../components/Buttons'
import styles from '../styles/Suivi.module.css'
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

export default function SuiviBankroll(){

    const {user, setUser, loadUser, setLoadUser} = React.useContext(UserContext)
    const [value, setValue] = React.useState(2);
    const [datas, setDatas] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [dates, setDates] = React.useState({})
    const [lodate, setLodate] = React.useState(false)
    const [insert, setInsert] = React.useState({
        date: "01/01/2023",
        cote: "1.45",
        resultat: "0 ou 1"
    })
    const [change, setChange] = React.useState(false)

    useEffect(() => {
        if(user.user_id != 1 && loadUser){
            Router.push("/devenir-vip/")
        }
    }, [user])

    const handleChange = (event) => {
        const {name, type, value} = event.target
        setInsert(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const handleClick = (i, start) => { 
      setLoad(false)
      fetch(`${WINFLIX_URL}/api/admin/suivi/?start=${start}`)
      .then(resp => resp.json())
      .then(data => {
        setValue(i)
        setDatas(data)
        setLoad(true)
      })
    };

    useEffect(() => {
        const loadDatas = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/admin/suivi/`)
            const json = await fetcher.json()
            setDatas(json)
            setLoad(true)
        }
        loadDatas()
    }, [change])

    useEffect(() => {
        let date = new Date()
        let now = (date.getFullYear())+'-'+String((date.getMonth()+1)).padStart(2, '0')+'-'
        let hierDate = new Date(date.setMonth(date.getMonth()-1))
        let avantDate = new Date(date.setMonth(date.getMonth()-2))
        let hier = (hierDate.getFullYear())+'-'+String((hierDate.getMonth()+1)).padStart(2, '0')+'-'
        let avanthier = (avantDate.getFullYear())+'-'+String((avantDate.getMonth()+2)).padStart(2, '0')+'-'
        setDates(prev => {
            return {
                avanthier: avanthier,
                hier: hier,
                now: now
            }
        })
        setLodate(true)
    }, [])

    const go = async () => {
        const fetcher = await fetch(`${WINFLIX_URL}/add_suivi.php/?date=${insert.date}&cote=${insert.cote}&result=${insert.resultat}`)
        const json = await fetcher.json()
        if(json.message == "success"){
            setInsert({
                date: "01/01/2023",
                cote: "1.45",
                resultat: "0 ou 1"
            })
            setChange(prev => !prev)
        }
    }   
    

    return (
        <div className={styles.appSuivi}>
            <Head>
                <title>Administration | Suivi Bankroll</title>
                <meta name="description" content="Winflix a développé les meilleurs outils pour aider les parieurs à optimiser leur paris sportif. Retrouve ici le TOP 5 des outil d’aide !" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}>Suivi du bankroll</h1>
                                {lodate && (
                                    <Stack direction="row" spacing={1} sx={{ marginTop: '10px'}}>
                                        <Chip label="Novembre 2022"  variant={value == 0 ? "outlined" : "empty"} onClick={() => handleClick(0, `${dates.avanthier}`)} />
                                        <Chip label="Décembre 2022"  variant={value == 1 ? "outlined" : "empty"} onClick={() => handleClick(1, `${dates.hier}`)} />
                                        <Chip label="Janvier 2023"  variant={value == 2 ? "outlined" : "empty"} onClick={() => handleClick(2, `${dates.now}`)} />
                                    </Stack>  
                                )}                              
                                {load ? (
                                    <>
                                    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                        <TableCell>Date du safe</TableCell>
                                        <TableCell align="right">Cote</TableCell>
                                        <TableCell align="right">Résultat</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {datas.map((row, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: row.resultat == 1 ? "rgba(0,200,0,1)" : "red" }}
                                        >
                                            <TableCell component="th" scope="row" sx={{ color : "white" }}>
                                            {row.date}
                                            </TableCell>
                                            <TableCell align="right" sx={{ color : "white" }}>{row.odd}</TableCell>
                                            <TableCell align="right" sx={{ color : "white" }}>{row.resultat}</TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                    </Table>
                                </TableContainer>       
                                <div className="mTop40 flex space-between">
                                    <TextField
                                    id="outlined-basic-small"
                                    label="Date du prono"
                                    type="text"
                                    autoComplete="current-subjet"
                                    size="small"
                                    name="date"
                                    value={insert.date}
                                    sx={{ width: '24%' }}
                                    onChange={handleChange}
                                    inputProps={{style: {fontSize: 14}}}
                                    className={styles.textField}
                                    />
                                    <TextField
                                    id="outlined-basic-small"
                                    label="Cote du prono"
                                    type="text"
                                    autoComplete="current-subjet"
                                    size="small"
                                    name="cote"
                                    value={insert.cote}
                                    sx={{ width: '24%' }}
                                    onChange={handleChange}
                                    inputProps={{style: {fontSize: 14}}}
                                    className={styles.textField}
                                    />
                                    <TextField
                                    id="outlined-basic-small"
                                    label="Résultat du prono"
                                    type="text"
                                    autoComplete="current-subjet"
                                    size="small"
                                    name="resultat"
                                    value={insert.resultat}
                                    sx={{ width: '24%' }}
                                    onChange={handleChange}
                                    inputProps={{style: {fontSize: 14}}}
                                    className={styles.textField}
                                    />
                                    <Button variant="contained" onClick={go} className="mmTop20" disableElevation>Ajouter le prono</Button>      
                                </div>
                                </>                                 
                                ) : (
                                    <span style={{ display: "block", textAlign: "center", padding: "20px", fontSize: "12px" }}>Chargement...</span>
                                )}         
                        </div>
                    </div>
                    <div className="w35 wm100">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}