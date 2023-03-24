import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import ReviewSidebar from '../components/ReviewSidebar'
import Skeleton from '@mui/material/Skeleton'
import { RedButton } from '../components/Buttons'
import PronoBoxHome from '../components/PronoBoxHome'
import BlogPost from '../components/BlogPost'
import styles from '../styles/Sidebar.module.css'
import { WINFLIX_URL } from '../config'

export default function SidebarHome({pronos}){

    const [blogs, setBlogs] = React.useState(null)
    const [actus, setActus] = React.useState(null)
    const [loadBlog, setLoadBlog] = React.useState(false)
    const [loadActus, setLoadActus] = React.useState(false)

    const [avis, setAvis] = React.useState([])
    const [loadAvis, setLoadAvis] = React.useState(false)

    let newDate = new Date()
    let jour = newDate.getDate()
    let mois = String(newDate.getMonth() + 1).padStart(2, '0');
    let annee = newDate.getFullYear()

    const [date, setDate] = React.useState(`${jour}/${mois}/${annee}`)

    useEffect(() => {
        const fetchBlog = async () => {
            const rep = await fetch(`${WINFLIX_URL}/api/blog/fr/?limit=4`)
            const json = await rep.json()
            setBlogs(json)
            setLoadBlog(true)
        }
        fetchBlog()
    }, [])

    useEffect(() => {
        const fetchActus = async () => {
            const rep = await fetch(`${WINFLIX_URL}/api/blog/fr/?limit=4&cat=40`)
            const json = await rep.json()
            setActus(json)
            setLoadActus(true)
        }
        fetchActus()
    }, [])

    useEffect(() => {
        const fetchAvis = async () => {
            const rep = await fetch('https://wp.winflix.net/api/reviews/')
            const json = await rep.json()
            setAvis(json)
            setLoadAvis(true)
        }
        fetchAvis()
    }, [])

    return (
        <div>
            <div className={`${styles.boxWinbot} app-content relative mBot30`}>
                <span className="app-title-h2">Scopri il primo <span className={styles.blue}>bot</span> di Winflix su Pronos dal vivo !</span>
                <p>Accedi al bot del telegramma (<strong>/start</strong> iniziare).</p>
                <Link href="/previsioni-calcio-diretta">                
                    <div className={styles.winBot}>
                        <Image src={`https://wpit.winflix.net/wp-content/uploads/2022/08/telegram.jpg`} alt="winbot telegram" layout='fill' />
                    </div>
                </Link>  
            </div>

            <div className="app-content mBot30">
                <h2>La migliore prognosi calcistica della giornata ({date})</h2>
                <p>Con un'analisi dettagliata basata sulle statistiche, la nostra prognosi e software di previsione specializzate nel calcio utilizza il nostro algoritmo per garantirti, ogni giorno le migliori statistiche di calcio per le tue previsioni e le migliori opzioni di gioco per ogni partita.</p>
                {pronos.map((prono, index) => {
                    return <PronoBoxHome key={index} data={prono} />
                })}
                <p>Chi scommettere?Quale squadra scommettere?Su quale opzione scommessa (1N2, doppia possibilità, numero di gol, marcatori ecc ...? Metti alla prova i nostri strumenti di analisi direttamente sulla competizione pronunciata dal calcio e segui l'evoluzione delle tue prestazioni!</p>
            </div>

            <div className="app-content mBot30">
                <h2 className="mBot20">I migliori pronostici e strumenti per le scommesse sportive di calcio di successo</h2>
                {loadBlog && blogs.map((single, index) => {
                    return <BlogPost key={index} datas={single} />
                })}
            </div>
            
            <div className="app-content mBot30">
                <h2 className="mBot20">Una prognosi calcistica vincente tiene conto delle statistiche e delle notizie</h2>
                {loadActus && actus.map((single, index) => {
                    return <BlogPost key={index} datas={single} />
                })}
            </div>
        </div>
    )
}


