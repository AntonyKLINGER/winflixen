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
import moment from 'moment'

export default function MyWin(){

    const dater = new Date();
    const yearX = dater.getFullYear();
    const monthX = dater.getMonth();
    const dayX = dater.getDate();
    
    const target = moment([yearX, monthX, dayX]);
    const weekNo = target.isoWeek();

    const {user, setUser, loadUser, setLoadUser} = React.useContext(UserContext)
    // const {credits, setCredits} = React.useContext(UserContext)
    const [credits, setCredits] = React.useState(null)
    const [loadCredits, setLoadCredits] = React.useState(false)
    const [loadW, setLoadW] = React.useState(true)
    const [week, setWeek] = React.useState(weekNo)
    const [year, setYear] = React.useState(2023)
    const [between, setBetween] = React.useState({start: '', end: ''})
    const [tickets, setTickets] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [totals, setTotals] = React.useState()
    const [cotemax, setCotemax] = React.useState(0)

    // useEffect(() => {
    //     let currentDate = new Date();
    //     let startDate = new Date(currentDate.getFullYear(), 0, 1);
    //     let days = Math.floor((currentDate - startDate) /
    //         (24 * 60 * 60 * 1000));
    //          
    //     let weekNumber = Math.ceil(days / 7);
    //     setWeek(weekNumber)

    //     setLoadW(true)
    // }, [])


    function getWeekDates(weekNumber, year) {
        // Créer un nouvel objet Date avec l'année en cours
        var now = new Date();
      
        // Obtenir le premier lundi de l'année
        var firstMonday = new Date(year, 0, 1);
        var firstMondayWeekDay = firstMonday.getDay();
        if (firstMondayWeekDay !== 1) {
          firstMonday.setDate(firstMonday.getDate() + (1 - firstMondayWeekDay + 7) % 7);
        }
      
        // Calculer le nombre de jours à ajouter pour arriver au début de la semaine désirée
        var addDays = weekNumber * 7 - 7;
      
        // Obtenir la date de début de la semaine en ajoutant le nombre de jours calculé au premier lundi de l'année
        var startDate = new Date(firstMonday.getFullYear(), firstMonday.getMonth(), firstMonday.getDate() + addDays);
      
        // Obtenir la date de fin de la semaine en ajoutant 6 jours à la date de début de la semaine
        var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
      
        // Formater les dates au format d/m/Y
        var startDateFormatted = String(startDate.getDate()).padStart(2, '0') + '/' + String((startDate.getMonth() + 1)).padStart(2, '0') + '/' + startDate.getFullYear();
        var endDateFormatted = String(endDate.getDate()).padStart(2, '0') + '/' + String((endDate.getMonth() + 1)).padStart(2, '0') + '/' + endDate.getFullYear();
      
        return {start: startDateFormatted, end: endDateFormatted};
    }

    useEffect(() => {
        setBetween(getWeekDates(week, year))
    }, [week])

    const navWeek = (step) => {
        if(step == "next"){
            if(parseInt(week)+1 > 52){
                setWeek(1)
                setYear(year => year+1)
            }
            else{
                setWeek(prevWeek => prevWeek+1)
            }
        }
        if(step == "prev"){
            if(parseInt(week)-1 < 1){
                setWeek(52)
                setYear(year => year-1)
            }
            else{
                setWeek(prevWeek => prevWeek-1)
            }
        }
    }

    useEffect(() => {
        setLoad(false)
        if(loadW && week != ""){
            const getTickets = async () => {
                let cotes = 0
                let currentCote = 0
                const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/show/?user=${user.user_id}&lang=IT&start=${between.start.replaceAll('/', '-')}&end=${between.end.replaceAll('/', '-')}`)
                const json = await fetcher.json()
                if(json.length > 0 && json.message != "empty"){
                    console.log(between.start, between.end)
                    json.map((item) => {
                        if(item.status != "false"){
                            cotes = parseFloat(item.cote_totale)+cotes
                            if(item.cote_totale > currentCote){
                                currentCote = item.cote_totale
                            }
                        }                   
                    })
                }
                setTotals(cotes)
                setCotemax(currentCote)
                setTickets(json)
                setLoad(true)
            }
            getTickets()
        }
    }, [between])

    useEffect(() => {
        const getCredits = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/user/credits/?user_id=${user.user_id}&lang=EN`)
            const json = await fetcher.json()
            setCredits(json.credits)
            setLoadCredits(true)
        }
        if(user && user.user_id != 0){
            getCredits()
        }        
    }, [user])

    useEffect(() => {
        if(user.user_id == 0 && loadUser){
            Router.push("/vip/")
        }
    }, [user])


    return (
        <div className={styles.appMyResults}>
            <Head>
                <title>Foot prediction results | Winflix 🏆 → the trusted site!</title>
                <meta name="description" content="Need to find the best predictions site ⚽ ? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Fiablite and VIP recommended!" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/mes-resultats/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/mywin/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/mywin/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/mywin/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/mywin/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/mywin/" />         
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/mywin/" />   
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="mCenter">
                            <Link href="/winrank" className="backto"><span className="material-icons">keyboard_backspace</span>Back to Winrank</Link>
                            <Link href="/football" className="backto mLeft10"><span className="material-icons">add_circle</span>Create a ticket</Link>
                        </div>
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2 flex aligncenter" style={{ marginTop: '0px' }}>
                                <div className="iconTitle mRight10">
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/mywin-icon.png`} alt="icon mywin" layout="fill" />
                                </div>
                                myWin, all your tickets
                            </h1>
                            <p>On this page you will find all the Winflix tickets created thanks to your weekly free bets! The results are automatically updated every minute.</p>
                            <span className={styles.freebets}>You still have {loadCredits ? credits : "..."} freebets</span>
                        </div>
                        <div className="app-content">
                            <span className={styles.titleRank}>
                                <span className="material-icons">query_stats</span>
                                Tracking your tickets
                            </span>
                            <div className={styles.ticketsFeed}>
                                <div className={`${styles.chooseWeek} w100 mBot20`}>
                                    <span className={styles.navWeek} onClick={() => navWeek('prev')}>
                                        <span className="material-icons">chevron_left</span>
                                    </span>
                                    <span className={styles.weekSelected}>
                                        <strong>Week {week}</strong>
                                        {between.start} - {between.end}
                                    </span>
                                    <span className={styles.navWeek} onClick={() => navWeek('next')}>
                                        <span className="material-icons">chevron_right</span>
                                    </span>
                                </div>
                                <div className="mTop30">
                                    {load ? tickets.length > 0 ? 
                                    (
                                        <>
                                        <div className={`app-content mBot30 ${styles.chiffresRef}`}>
                                        <div className={styles.allRef}>
                                            <div className="text-center mBot30">
                                                <span className={styles.titleRef}>Results of your tickets</span>
                                            </div>
                                            <div className="flex mwrap">
                                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                                    <span className="material-icons">done_all</span>
                                                    <span className={styles.typeRef}>Validate tickets</span>
                                                    <span className={styles.numberRef}>
                                                        {tickets.filter((item) => { return item.status == "Validé" }).length}
                                                    </span>
                                                </div>
                                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                                    <span className="material-icons">thumb_down_alt</span>
                                                    <span className={styles.typeRef}>Loses tickets</span>
                                                    <span className={styles.numberRef}>
                                                        {tickets.filter((item) => { return item.status == "Perdu" }).length}
                                                    </span>
                                                </div>
                                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                                    <span className="material-icons">functions</span>
                                                    <span className={styles.typeRef}>Odd average</span>
                                                    <span className={styles.numberRef}>
                                                        {
                                                            tickets.filter((item) => { return item.status != "false" }).length > 0 ? 
                                                            (totals/tickets.filter((item) => { return item.status != "false" }).length).toFixed(2) : 0
                                                        }
                                                    </span>
                                                </div>
                                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                                    <span className="material-icons">add_circle_outline</span>
                                                    <span className={styles.typeRef}>Odd max</span>
                                                    <span className={styles.numberRef}>
                                                        {cotemax}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid mTop20">
                                            {tickets.map((ticket, index) => {
                                                return <div key={index} className="grid-item"><Ticket data={ticket} /></div>
                                            })}
                                        </div>
                                        </>
                                    ) :
                                        (<span className={`${styles.nothing} mTop60`} style={{ display: "block"}}>No tickets for this week.</span>) : 
                                    <>    
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                    </>}                                          
                                </div>  
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