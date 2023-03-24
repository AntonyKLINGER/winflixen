import React, { useEffect, useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { HeaderCTA } from '../components/CTA'
import Sidebar from '../components/Sidebar'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'
import Skeleton from '@mui/material/Skeleton'
import {UserContext} from '../UserContext'
import Review from '../components/Review'
import styles from '../styles/AvisMembres.module.css'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

export default function ReviewsMembers(){

    const [avis, setAvis] = React.useState([])
    const [limit, setLimit] = React.useState(10)
    const [addTrig, setAddTrig] = React.useState(false);
    const [loadAvis, setLoadAvis] = React.useState(false)
    const {user, setUser} = React.useContext(UserContext)
    const initialReview = {
        pseudo: "",
        note: "",
        avis: "",
        date: ""
    };
    const [review, setReview] = React.useState(initialReview);
    

    useEffect(() => {
        const fetchAvis = async () => {
            const rep = await fetch(`${WINFLIX_URL}/api/reviews/?limit=${limit}`)
            const json = await rep.json()
            setAvis(json)
            setLoadAvis(true)
        }
        fetchAvis()
    }, [limit, addTrig])

    const more = () => {
        setLimit(prev => prev+5)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
    }

    const addReview = async () => {
        const fetcher = await fetch(`${WINFLIX_URL}/add-review-admin.php?pseudo=${review.pseudo}&avis=${review.avis}&note=${review.note}&date=${review.date}`)
        const json = await fetcher.json()
        setReview(initialReview);
        setAddTrig(prev => !prev);
    }

    return (
        <div className={styles.appReviews}>
            <Head>
                <title>Avviso su Winflix → 748 Note e commenti 2021 Disponibile</title>
                <meta name="description" content="> 748 recensioni Winflix disponibili sul servizio di prognosi del calcio offerto da Winflix.net / Consulta le recensioni online" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/avis-membres/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/avis-membres/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/" />
            </Head>
            <div className="app-boxed">
                <div style={{ display: "none"}} itemScope itemType="https://schema.org/WebPage">
                    <span itemProp="name">Avviso su Winflix 🏆 → il sito affidabile della prognosi del calcio!</span>    
                    <p itemProp="description">Hai bisogno di trovare il miglior sito di base ⚽?Scelto Winflix, un servizio di prognosi affidabile, progettato da esperti di scommesse sportive.93% Fiablite e VIP consigliato!</p>
                    <div itemProp="breadcrumb">
                        <a href="https://winflix.net/it/">Accoglienza</a>
                        <a href="https://winflix.net/avis-membres">Recensioni di Winflix</a>
                    </div>
                </div>
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        {user.user_id == 1 && (
                            <div className={`app-content mBot30 ${styles.textField}`}>
                                <h2>Ajouter un avis (Administrateur)</h2>
                                <div className="mTop20 space-between flex aligncenter">
                                    <TextField
                                        id="outlined-text-input"
                                        label="Pseudo"
                                        type="text"
                                        autoComplete="current-text"
                                        name="pseudo"
                                        value={review.pseudo}
                                        size="small"
                                        sx={{ width: '32%', fontSize: '14px' }}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="outlined-text-input"
                                        label="Note"
                                        type="text"
                                        autoComplete="current-text"
                                        name="note"
                                        value={review.note}
                                        size="small"
                                        sx={{ width: '32%', fontSize: '14px' }}
                                        onChange={handleChange}
                                    />
                                    <input type="date" name="date" onChange={handleChange} value={review.date} className={styles.dater} />                                    
                                </div>
                                <div>
                                    <textarea onChange={handleChange} className={styles.textArea} placeholder="Contenu de l'avis" name="avis" value={review.avis}></textarea>
                                </div>
                                <Button onClick={addReview} variant="contained" className="mTop15" disableElevation>Ajouter l'avis</Button> 
                            </div>
                        )}
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}>Tutti i membri membri di Winflix</h1>
                            <p className="mBot20">Dal lancio di Winflix, è possibile inviare liberamente una revisione o consultare le recensioni su Winflix.I membri possono presentare un parere nell'area dei membri.Per presentare un parere, devi essere un membro e aver veramente testato il servizio.Chiediamo regolarmente ai nostri membri di venire a presentare un'opinione nel loro spazio per mantenere le opinioni su Winflix aggiornate ogni mese.</p>
                            <div className={styles.avis}>
                            {loadAvis ? avis.map((review, index) => {
                                return <Review key={index} datas={review} />
                            }) : (
                                <div className="app-review flex aligncenter flex-start mBot20">
                                    <div className="w20 text-center mRight10">
                                        <Skeleton variant="circular" sx={{ marginBottom: '5px' }} animation="wave" width={35} height={35} />
                                        <Skeleton variant="rectangle" sx={{ marginBottom: '5px' }} m="10" animation="wave" width={35} />
                                        <Skeleton variant="rectangle" animation="wave" width={55}/>
                                    </div>
                                    <div className="w80">                        
                                        <Skeleton variant="rectangle" animation="wave" height={65} />
                                    </div>
                                </div>
                            )}
                            {(loadAvis && avis.length > 0) && (
                                <div className="text-center">
                                    <Button onClick={more} variant="contained" className="mmTop15" disableElevation>Carica più recensioni</Button> 
                                </div>
                            )}
                            </div>
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

