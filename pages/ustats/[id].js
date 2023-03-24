import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { HeaderCTA } from '../../components/CTA'
import Sidebar from '../../components/Sidebar'
import Ticket from '../../components/TicketMyWin'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { UserContext } from '../../UserContext'
import { WINFLIX_URL } from '../../config'
import styles from '/styles/myWin.module.css'
import moment from 'moment'

export default function CheckMyWin(){

    const router = useRouter()
    const { id } = router.query

    const dater = new Date();
    const yearX = dater.getFullYear();
    const monthX = dater.getMonth();
    const dayX = dater.getDate();
    
    const target = moment([yearX, monthX, dayX]);
    const weekNo = target.isoWeek();
    
    const [loadW, setLoadW] = React.useState(true)
    const [week, setWeek] = React.useState(weekNo)
    const [year, setYear] = React.useState(2023)
    const [between, setBetween] = React.useState({start: '', end: ''})
    const [tickets, setTickets] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [userdata, setUserData] = React.useState({})
    const [userLoad, setUserLoad] = React.useState(false)
    const [totals, setTotals] = React.useState()
    const [cotemax, setCotemax] = React.useState(0)

    useEffect(() => {
        const userfetch = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/user/infos/?id=${id}`)
            const json = await fetcher.json()
            setUserData(json)
            setUserLoad(true)
        }
        userfetch()
    }, [])

    // useEffect(() => {
    //     const date = new Date();
    //     const year = date.getFullYear();
    //     const month = date.getMonth();
    //     const day = date.getDate();
        
    //     const target = new Date(year, month, day);
    //     const dayNum = target.getUTCDay() || 7;
    //     target.setUTCDate(target.getUTCDate() + 4 - dayNum);
    //     const yearStart = new Date(Date.UTC(target.getUTCFullYear(),0,1));
    //     const weekNo = Math.ceil((((target - yearStart) / 86400000) + 1)/7);
    //     setWeek(weekNo)

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

    //console.log(`${WINFLIX_URL}/api/tickets/show/?user=${id}&lang=FR&start=${between.start.replaceAll('/', '-')}&end=${between.end.replaceAll('/', '-')}`)

    useEffect(() => {
        setLoad(false)
        if(loadW && week != ""){
            const getTickets = async () => {
                let cotes = 0
                let currentCote = 0
                const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/show/?user=${id}&lang=EN&start=${between.start.replaceAll('/', '-')}&end=${between.end.replaceAll('/', '-')}`)
                const json = await fetcher.json()
                if(json.length > 0){
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

    return (
        <div className={styles.appMyResults}>
            <Head>
                <title>All tickets from Winflix Players | Winflix Best Prediction Tipster</title>
                <meta name="description" content="Need to find the best base site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts.93% Fiablite and VIP recommended!" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="mCenter">
                            <Link href="/winrank" className="backto"><span className="material-icons">keyboard_backspace</span>Back to WinRank</Link>
                            <Link href="/football" className="backto mLeft10"><span className="material-icons">add_circle</span>Create a ticket</Link>
                        </div>
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2 flex aligncenter" style={{ marginTop: '0px' }}>
                                <div className="iconTitle mRight10">
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/mywin-icon.png`} alt="icon stats joueur" layout="fill" />
                                </div>
                                Tickets from {userLoad ? userdata.user_login.split('@')[0] : "..."} 
                            </h1>
                            <p>On this page you can find all Winflix tickets that {userLoad ? userdata.user_login.split('@')[0] : "..."}  Be created thanks to its weekly giveaways! The results are automatically updated every minute.</p>
                        </div>
                        <div className="app-content">
                            <span className={styles.titleRank}>
                                <span className="material-icons">query_stats</span>
                                Tickets tracking
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
                                                <span className={styles.titleRef}>Results in numbers {userLoad ? userdata.user_login.split('@')[0] : "..."}</span>
                                            </div>
                                            <div className="flex mwrap">
                                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                                    <span className="material-icons">done_all</span>
                                                    <span className={styles.typeRef}>Tickets won</span>
                                                    <span className={styles.numberRef}>
                                                        {tickets.filter((item) => { return item.status == "Validé" }).length}
                                                    </span>
                                                </div>
                                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                                    <span className="material-icons">thumb_down_alt</span>
                                                    <span className={styles.typeRef}>Tickets loses</span>
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
                                                            (totals/(tickets.filter((item) => { return item.status != "false" })).length).toFixed(2) : 0
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

