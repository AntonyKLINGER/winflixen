import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../components/Sidebar'
import PronoNext from '../components/PronoNextMatch'
import PronoBoxResult from '../components/PronoBoxResult'
import { HeaderCTA, OutilsCTA } from '../components/CTA'
import { RedButton } from '../components/Buttons'
import styles from '../styles/PronoJour.module.css'
import { WINFLIX_URL } from '../config'

export default function PronosticsFoot({datas}){

    const {user, setUser, sub} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const [dateJour, setDateJour] = React.useState(datas.date)
    const [formatDate, setFormatDate] = React.useState("jour")
    const [wintips, setWintips] = React.useState(null)
    const [loadWintips, setLoadWintips] = React.useState(false)
    const [dates, setDates] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [open, setOpen] = React.useState(null)
    const [loadJ, setLoadJ] = React.useState(false)
    const router = useRouter()

    useEffect(() => {
   
        const path = router.asPath

        const repl01 = path.replaceAll('/football/predictions/prediction-', '').replaceAll("-", "/")
        const repl = repl01.substring(0, repl01.length-1)
        setDateJour(repl)
        const pls = `${repl.split('/')[2]}-${repl.split('/')[1]}-${repl.split('/')[0]}`
        const date = new Date(pls)
        let day = String(date.getDate());
        let year = date.getFullYear();
        let dateLocal = date.toLocaleString('fr-FR', {
            month: 'long'
        })
        const formatDat = `${day}-${dateLocal.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}-${year}`;
        setFormatDate(formatDat)



        const fetchWintips = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/wintips/fr/all/?date=${formatDat}`)
            const json = await req.json()
            setWintips(json)
            setLoadWintips(true)
        }
        fetchWintips()

    }, [datas, dateJour])


    useEffect(() => {
        let date = new Date()
        let date1 = new Date()
        let date2 = new Date()
        let date3 = new Date()
        let datem1 = new Date()
        let datem2 = new Date()
        let datem3 = new Date()
        date1.setDate(date1.getDate() + 1);
        date2.setDate(date2.getDate() + 2);
        date3.setDate(date3.getDate() + 3);
        datem1.setDate(datem1.getDate() - 1);
        datem2.setDate(datem2.getDate() - 2);
        datem3.setDate(datem3.getDate() - 3);
        let now = (date.getDate())+'/'+(date.getMonth()+1)
        let demain = String((date1.getDate())).padStart(2, '0')+'/'+String((date1.getMonth()+1)).padStart(2, '0')+'/'+(date1.getFullYear())
        let apresdemain = String((date2.getDate())).padStart(2, '0')+'/'+String((date2.getMonth()+1)).padStart(2, '0')+'/'+(date2.getFullYear())
        let apresdemain2 = String((date3.getDate())).padStart(2, '0')+'/'+String((date3.getMonth()+1)).padStart(2, '0')+'/'+(date3.getFullYear())
        let hier = String((datem1.getDate())).padStart(2, '0')+'/'+String((datem1.getMonth()+1)).padStart(2, '0')+'/'+(datem1.getFullYear())
        let avanthier = String((datem2.getDate())).padStart(2, '0')+'/'+String((datem2.getMonth()+1)).padStart(2, '0')+'/'+(datem2.getFullYear())
        let avanthier2 = String((datem3.getDate())).padStart(2, '0')+'/'+String((datem3.getMonth()+1)).padStart(2, '0')+'/'+(datem3.getFullYear())
        setDates(prev => {
            return {
                avanthier2: avanthier2,
                avanthier: avanthier,
                hier: hier,
                now: now,
                demain: demain,
                apresdemain: apresdemain,
                apresdemain2: apresdemain2
            }
        })
        setLoad(true)
    }, [])

    return (
        <div className="appInfos">
            <Head>
                <title>Football predictions from {dateJour} ⊳ Winflix</title>
                <meta name="description" content={`Looking for the best ${dateJour} football predictions? Today you will find the 5 best football sports bets here!`} />
                <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/pronostics-foot/pronostic-foot-du-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/vorhersagen/fussballvorhersagen-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/pronostico/pronostico-del-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en/football/predictions/prediction-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/pronostics-foot/pronostic-foot-du-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/vorhersagen/fussballvorhersagen-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/pronostico/pronostico-del-${loadJ && dateJour.replaceAll("/", "-")}/`} />
                <link rel="alternate" hrefLang="en" href={`https://winflix.net/en/football/predictions/prediction-${loadJ && dateJour.replaceAll("/", "-")}/`} />
            </Head>
            <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/">
                <span itemProp="name">Football Predictions Website</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/football/">
                <span itemProp="name">Football</span></a>
                <meta itemProp="position" content="2" />
              </li>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href={`${router.asPath}`}>
                <span itemProp="name">{`All football predictions of the day ${dateJour}`}</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className={`app-title-h2 ${styles.title}`}>Daily Football Prediction: Who to Bet?</h1>
                            <p>If you're wondering which soccer game to bet on today and looking for the best soccer prediction of the day, then you've come to the right place. On this page you will find our football predictions for the matches of the day The selection of predictions for this day of {dateJour} is divided into 2 parts: The WinTips, these are the winning and reliable predictions that are published daily by our team of experienced forecasters and bettors are created, as well as the best predictions for each football game of the day.</p>
                            <h2>What's the football prediction for {dateJour} ?</h2>
                            <p>WinTips are a selection of predictions with a very high reliability rate. For the {dateJour}, the Winflix team has created a selection of predictions that are accessible in WinTips (VIP). Today {loadWintips && wintips.length} football matches are offered in Pono SAFE for your sports betting, here is the list of today's safe predictions.</p>
                            <h3>All WinTips (pronos of the experts) available :</h3>
                            <div className="flex space-between wrap mTop20">
                            {(loadWintips && wintips.length > 0) && wintips.map((tips, index) => {
                                return (
                                    <div key={index} className={`${styles.itemTips} flex aligncenter w49 wm100`}>
                                        <div className="w65">
                                            <span className={styles.pronoExp}><span className="material-icons" data-icon="star"></span>Tips from the experts</span>
                                            <div className={styles.matchtips}>
                                                <span className={styles.matchName}>
                                                    {tips.match}
                                                </span>
                                                <span className={`${styles.quickp} ${styles.tleft}`}>
                                                    {dateJour} • Football
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w35 text-right">
                                            {sub.status != "active" ? (
                                            <Link href="/vip" passHref legacyBehavior>
                                                <a className={styles.btnTipsLock}>                                                  
                                                    VIP Register
                                                    <span className="material-icons" data-icon="lock"></span>
                                                </a>
                                            </Link>
                                            ) : (
                                                <Link href="/football-tips-prediction" passHref legacyBehavior>
                                                    <a className={styles.btnTips}>                                                  
                                                        Discover
                                                        <span className="material-icons" data-icon="rotate_right"></span>
                                                    </a>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                            </div>                          
                        </div>
                        <OutilsCTA />
                        <div className="app-content mTop30 mBot30">
                            <h2>Who bet? The football of the day prediction list</h2>
                            <p>Out of the 7 matches of the day, the Winflix team can offer you all their football predictions with a success rate of over 84%! Want to know who to bet on today? On which team and on which day does Pono play? Bet on reliability with your bet of the day and join the Winflix community!</p>
                            <div className={`flex aligncenter mBot20 ${styles.menuPro}`}>
                                <Link href={`/football/predictions/prediction-${load && dates.avanthier2.replaceAll('/', '-')}/`} className={styles.dateSelector}>{load && dates.avanthier2.slice(0, -5)}</Link>
                                <Link href={`/football/predictions/prediction-${load && dates.avanthier.replaceAll('/', '-')}/`} className={styles.dateSelector}>{load && dates.avanthier.slice(0, -5)}</Link>
                                <Link href={`/football/predictions/prediction-${load && dates.hier.replaceAll('/', '-')}/`} className={styles.dateSelector}>{load && dates.hier.slice(0, -5)}</Link>
                                <Link href="/football/predictions/" className={styles.dateSelector}>Today</Link>
                                <Link href={`/football/predictions/prediction-${load && dates.demain.replaceAll('/', '-')}/`} className={styles.dateSelector}>{load && dates.demain.slice(0, -5)}</Link>
                                <Link href={`/football/predictions/prediction-${load && dates.apresdemain.replaceAll('/', '-')}/`} className={styles.dateSelector}>{load && dates.apresdemain.slice(0, -5)}</Link>
                                <Link href={`/football/predictions/prediction-${load && dates.apresdemain2.replaceAll('/', '-')}/`} className={styles.dateSelector}>{load && dates.apresdemain2.slice(0, -5)}</Link>
                            </div>
                            {datas.map((leagues, index) => {
                                return (
                                    <>
                                    <React.Fragment key={index}>
                                    <h2 className={`app-title-h2-medium flex aligncenter mCenter mBot20 ${styles.titleLeagues}`}>
                                        <div className={`teamflag mRight10 ${styles.flagLeague}`}>
                                            <Image src={`${WINFLIX_URL}/wp-content/themes/winflix/img/${leagues.flag}`} alt={`Prediction of the day ${leagues.title}`} layout="fill" />
                                        </div>
                                        Predictions of the day {leagues.title}
                                    </h2>
                                    {leagues.matchs.map((match, index) => {
                                        return (
                                            <div key={index} className="mBot20" itemScope itemType="https://schema.org/SportsEvent">
                                                <div style={{ display: 'none' }}>
                                                    <span itemProp="sport">Football</span>
                                                    <span itemProp="location">{leagues.title.split("-")[0]}</span>
                                                    <span itemProp="startDate">{dateJour && dateJour.replaceAll("/", "-").split("-")[2]+'-'+dateJour.replaceAll("/", "-").split("-")[1]+'-'+dateJour.replaceAll("/", "-").split("-")[0]}</span>
                                                    <div itemProp="competitor" itemScope itemType="https://schema.org/SportsTeam">
                                                        <meta itemProp="name" content={match.title.split('Prediction ')[1].split("-")[0]} />
                                                    </div>
                                                    <div itemProp="competitor" itemScope itemType="https://schema.org/SportsTeam">
                                                        <meta itemProp="name" content={match.title.split('Prediction ')[1].split("-")[1]} />
                                                    </div>
                                                </div>
                                                <div className={`w100 wm100 mBot10 relative ${styles.match_day}`}>
                                                    <div className={styles.nostyle}>
                                                        <div className="flex aligncenter toColumn">
                                                            <Link href={match.url} passHref className={`w40 wm100 mmBot20 mCenter ${styles.nostyle}`}>
                                                                <div className="flex aligncenter mCenter" style={{ gap: '5px' }}>
                                                                    <div className={styles.flagteam}>
                                                                        <Image src={`https://winflix.net/logo/logo_${match.teamA_id}.png`} layout="fill" objectFit="contain" />
                                                                    </div>
                                                                    <div className={styles.flagteam}>
                                                                        <Image src={`https://winflix.net/logo/logo_${match.teamB_id}.png`} layout="fill" objectFit="contain" />
                                                                    </div>
                                                                    <span className={styles.leaguelink}>
                                                                        <span className="material-icons" data-icon="done"></span>
                                                                        Prediction available
                                                                    </span>
                                                                </div>
                                                                <h3 itemProp="name">{match.title} <span>{match.metas}</span></h3>
                                                            </Link>
                                                            <div className="w60 wm100">
                                                                {sub && (
                                                                <div className="flex aligncenter">
                                                                <Link href={match.url.replaceAll("prediction-", "statistics-")} passHref className={`w20 text-center ${styles.sepBet}`}>
                                                                    <span className={styles.titleBet}>Stats</span>
                                                                    <span className={`material-icons ${styles.iconBet}`} style={{ color: sub.status == "active" ? 'green' : 'red' }} data-icon="query_stats"></span>
                                                                </Link>
                                                                <Link href={match.url.replaceAll("prediction-", "exact-result-")} passHref className={`w20 text-center ${styles.sepBet}`}>
                                                                    <span className={styles.titleBet}>Score</span>
                                                                    <span className={`material-icons ${styles.iconBet}`} style={{ color: sub.status == "active" ? 'green' : 'red' }}  data-icon="scoreboard"></span>
                                                                </Link>
                                                                <Link href={match.url.replaceAll("prediction-", "")} passHref className={`w20 text-center ${styles.sepBet}`}>
                                                                    <span className={styles.titleBet}>Proba</span>
                                                                    <span className={`material-icons ${styles.iconBet}`} style={{ color: sub.status == "active" ? 'green' : 'red' }}  data-icon="equalizer"></span>
                                                                </Link>
                                                                <Link href={match.url.replaceAll("prediction-", "highlights-goals-")} passHref className={`w20 text-center ${styles.sepBet}`}>
                                                                    <span className={styles.titleBet}>Goals</span>
                                                                    <span className={`material-icons ${styles.iconBet}`} style={{ color: sub.status == "active" ? 'green' : 'red' }}  data-icon="sports_soccer"></span>
                                                                </Link>
                                                                <Link href={match.url} passHref className={`w20 text-center ${styles.sepBet}`}>
                                                                    <span className={styles.titleBet}>Predic.</span>
                                                                    <span className={`material-icons ${styles.iconBet}`} style={{ color: sub.status == "active" ? 'green' : 'red' }}  data-icon="rocket_launch"></span>
                                                                </Link>
                                                            </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {sub.status != "active" && (
                                                            <>
                                                                <Link href="/vip" className={styles.onlyMembers}><span className="material-icons" data-icon="lock"></span></Link>
                                                                <Link href="/vip" className={styles.ctaUnlock}><span className="material-icons" data-icon="lock_open"></span>Become a VIP to unlock everything</Link>
                                                            </>
                                                        )}
                                                    </div> 
                                                </div>
                                            </div>
                                        )
                                    })}
                                    </React.Fragment>
                                    </>
                                )                               
                            })}
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
