import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../../../components/Sidebar'
import Barchart from '../../../components/Barchart'
import MenuMatch from '../../../components/MenuMatch'
import Countdown from '../../../components/Countdown'
import StatusMatch from '../../../components/StatusMatch'
import PronoMatch from '../../../components/PronoMatch'
import Option from '../../../components/OptionStat'
import { HeaderCTA, OutilsCTA } from '../../../components/CTA'
import BetTicket from '../../../components/betTicket'
import Probabox from '../../../components/ProbaBox'
import PronosticsFoot from '../../../components/PronosticJour'
import styles from '../../../styles/PronosticMatch.module.css'
import { WINFLIX_URL } from '../../../config'
import Others from '../../../components/OtherMatchs'

export default function PronosticMatch({datas}){

    const router = useRouter()
    const path = router.asPath

    const [odds, setOdds] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [rank, setRank] = React.useState(null)
    const [loadRank, setLoadRank] = React.useState(false)
    const {user, setUser} = useContext(UserContext)
    const {sub, setSub} = useContext(UserContext)
    const {open, setOpen} = useContext(UserContext)
    const {ticket, setTicket} = useContext(UserContext)
    const {cote, setCote} = useContext(UserContext)
    const {timer, setTimer} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const [lastA, setLastA] = React.useState(null)
    const [loadA, setLoadA] = React.useState(false)
    const [lastB, setLastB] = React.useState(null)
    const [loadB, setLoadB] = React.useState(false)
    const [scores, setScores] = React.useState(null)
    const [loadScores, setLoadScores] = React.useState(false)
    const [moy, setMoy] = React.useState(0)

    const data = datas.datas

    useEffect(() => {
        const fetchScores = async () => {
            const req = await fetch(`https://wpen.winflix.net/api/score-exact/?id=${datas.fixture_id}`)
            const json = await req.json()
            setScores(json)
            setLoadScores(true)
        }

        fetchScores()
    }, [])

    useEffect(() => {
        const fetchOdds = async () => {
            const req = await fetch(`https://wpen.winflix.net/api/odds/?id=${datas.fixture_id}`)
            const json = await req.json()
            setOdds(json[0])
            setLoad(true)
        }

        fetchOdds()
    }, [])

    useEffect(() => {
        
        if(data !== undefined){
        const fetchLastA = async () => {
            const req = await fetch(`https://wpen.winflix.net/api/matchs/fr/all/?id=${data.homeTeam.team_id}&team=${data.homeTeam.team_name_api.replaceAll(' ', '_')}`)
            const json = await req.json()
            setLastA(json)
            setLoadA(true)
        }

        fetchLastA()
        }
    }, [])

    useEffect(() => {
        if(data !== undefined){
        const fetchLastB = async () => {
            const req = await fetch(`https://wpen.winflix.net/api/matchs/fr/all/?id=${data.awayTeam.team_id}&team=${data.awayTeam.team_name_api.replaceAll(' ', '_')}`)
            const json = await req.json()
            setLastB(json)
            setLoadB(true)
        }

        fetchLastB()
        }
    }, [])

    if(path.includes("pronostico-del-") == false){
    
    return (
        <div className="appInfos">

            {datas.slug.includes("prognose-tipp") ? (
                <Head>
                    <title>Prediction {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} 😎 Highly probable !</title>
                    <meta name="description" content={`✅ Looking for the best betting tips ${data.homeTeam.team_name} vs ${data.awayTeam.team_name} ${data.league_name_fr} for the game of ${data.date} → Check the reliable prediction here our experts!`} />
                    <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/pronostics-foot/pronostic-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                    <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/vorhersagen/prognose-tipp-${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                    <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/pronostico/pronostici-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                    <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en/football/predictions/prediction-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
                    <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/pronostics-foot/pronostic-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                    <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/vorhersagen/prognose-tipp-${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                    <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/pronostico/pronostici-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                    <link rel="alternate" hrefLang="en" href={`https://winflix.net/en/football/predictions/prediction-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
                </Head>
                
            ) : (
                <Head>
                    <title>Exact results {data.homeTeam.team_name} {data.awayTeam.team_name} from {data.date} 😎 probabilities</title>
                    <meta name="description" content={`What prediction for the exact score of ${data.homeTeam.team_name} vs ${data.awayTeam.team_name} of ${data.date} ?`} />
                    <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/pronostics-foot/score-exact-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                    <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/vorhersagen/genaues-ergebnis-${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                    <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/pronostico/risultato-esatto-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                    <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en/football/predictions/prediction-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
                    <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/pronostics-foot/score-exact-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                    <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/vorhersagen/genaues-ergebnis-${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                    <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/pronostico/risultato-esatto-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                    <link rel="alternate" hrefLang="en" href={`https://winflix.net/en/football/predictions/prediction-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
                </Head>
            )}
          
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>    
                {datas.slug.includes("prognose-tipp") ? (
                <>
                    <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
                        <li itemProp="itemListElement" itemScope
                            itemType="http://schema.org/ListItem">
                            <a itemProp="item" href="https://winflix.net/en/">
                            <span itemProp="name">Football Predictions Website</span></a>
                            <meta itemProp="position" content="1" />
                        </li>
                        <li itemProp="itemListElement" itemScope
                            itemType="http://schema.org/ListItem">
                            <a itemProp="item" href="https://winflix.net/en/football/predictions/">
                            <span itemProp="name">Soccer predictions</span></a>
                            <meta itemProp="position" content="2" />
                        </li>
                        <li itemProp="itemListElement" itemScope
                            itemType="http://schema.org/ListItem">
                            <a itemProp="item" href={`https://winflix.net/en${path}`}>
                            <span itemProp="name">Predictions {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : our prediction</span></a>
                            <meta itemProp="position" content="3" />
                        </li>
                    </ol>
                    <p className={`${styles.breadcrump} mTop30 mBot20`}><Link href="/football">Football</Link> {'>'} <Link href="/football/predictions/">Football Predictions</Link> {`> ${datas.title}`}</p> 
                </>
                ) : (
                <>
                    <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
                        <li itemProp="itemListElement" itemScope
                            itemType="http://schema.org/ListItem">
                            <a itemProp="item" href="https://winflix.net/en/">
                            <span itemProp="name">Football Predictions Website</span></a>
                            <meta itemProp="position" content="1" />
                        </li>
                        <li itemProp="itemListElement" itemScope
                            itemType="http://schema.org/ListItem">
                            <a itemProp="item" href="https://winflix.net/en/football/predictions/">
                            <span itemProp="name">Football Predictions</span></a>
                            <meta itemProp="position" content="2" />
                        </li>
                        <li itemProp="itemListElement" itemScope
                            itemType="http://schema.org/ListItem">
                            <a itemProp="item" href={`https://winflix.net/en${path}`}>
                            <span itemProp="name">Exact Results {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : our predictions</span></a>
                            <meta itemProp="position" content="4" />
                        </li>
                    </ol>
                    <p className={`${styles.breadcrump} mTop30 mBot20`}><Link href="/football">Football</Link> {'>'} <Link href="/football/predictions/">Football Predictions</Link> {`> ${datas.title}`}</p>         
                </>
                )} 
                    
                <div className="flex toColumn flex-start">
                        <div className="w65 relative mRight30 mRnone wm100">
                            {datas.slug.includes("prediction-") ? (
                            <>
                            <div itemScope itemType="https://schema.org/SportsEvent" style={{display: "none"}}>
                                <span itemProp="name">Betting Tips {data.homeTeam.team_name} {data.awayTeam.team_name} {data.date}</span>
                                <span itemProp="description">Reliable prediction for the game {data.homeTeam.team_name} {data.awayTeam.team_name} {data.league_name_fr} {data.date}</span>
                                <span itemProp="startDate" content={data.event_date}>{data.event_date}</span>
                                <span itemProp="homeTeam">{data.homeTeam.team_name}</span>
                                <span itemProp="awayTeam">{data.awayTeam.team_name}</span>
                                <span itemProp="sport">Football</span>
                                <div itemProp="location" itemScope itemType="http://schema.org/Place">
                                <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                                    <span itemProp="addressLocality">{data.venue}</span>
                                    <span itemProp="addressRegion">{data.country}</span>
                                    </div>
                                </div>
                                <span itemProp="competitor">{data.homeTeam.team_name}</span>
                                <span itemProp="competitor">{data.awayTeam.team_name}</span>
                                <span itemProp="eventStatus">{data.status}</span>
                            </div>   
                            <MenuMatch page="2" base={datas.guid} />
                            <div className="app-content relative mBot30">
                                <StatusMatch datas={data} id={datas.fixture_id} />
                                <h1>Predictions {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : our prediction</h1>
                                <p className="text-center mBot30">Find all the stats of the match to better understand stakes, form, latest results, average goals scored or conceded and for the team {data.homeTeam.team_name}  and for the team {data.awayTeam.team_name}. Compare teams' form or their average over the season.</p>
                                <div className="flex aligncenter justicenter app-secondary-menu-match">
                                    <Link href="#prono" passHref legacyBehavior><a className="app-deplace appActive">Prediction</a></Link>
                                    <Link href="#prevision" passHref legacyBehavior><a className="app-deplace">Stats</a></Link>
                                    <Link href="#analysis" passHref legacyBehavior><a className="app-deplace">Analyse</a></Link>
                                </div>
                            </div>
                            <div className="app-content mBot30" id="prono">
                                <div className="text-center">
                                    <span className="tag-winflix">Algorithm Winflix</span>
                                    <h2>Prediction {data.homeTeam.team_name} / {data.awayTeam.team_name}</h2>
                                    <PronoMatch id={datas.fixture_id} home={data.homeTeam.team_name} away={data.awayTeam.team_name} date={data.date} />
                                    <p>This prediction was given to you by the Winflix algorithm based on multiple criteria including statistics, analysis and rankings. Find all <Link href="/football/predictions/">predictions of the day</Link>.</p>
                                </div>
                            </div>
                            <div className="app-content mBot30" id="prevision">
                                <div className="text-center">
                                    <span className="app-title-h2">Possible outcome predictions</span>
                                    <p>Mathematical analysis of risks and opportunities. The percentage is the % chance of success. The higher the rate, the greater the probability.</p>
                                </div>
                                <div className={`${styles.cItem} mTop20`}>
                                    <span className={styles.cPop}>
                                        <span className="material-icons" data-icon="flag"></span>
                                        Result at the end of the game
                                    </span>
                                    <Option type={`${data.homeTeam.team_name} win the game`} odd={load ? odds.odds_1 : ""} prono="1" id={datas.fixture_id} />
                                    <Option type={`Pareggio`} odd={load ? odds.odds_N : ""} prono="N" id={datas.fixture_id} />
                                    <Option type={`${data.awayTeam.team_name} win the game`} odd={load ? odds.odds_2 : ""} prono="2" id={datas.fixture_id} />
                                    <Option type={`${data.homeTeam.team_name} or draw`} odd={load ? odds.odds_1N : ""} prono="1N" id={datas.fixture_id} />
                                    <Option type={`${data.awayTeam.team_name} or draw`} odd={load ? odds.odds_N2 : ""} prono="N2" id={datas.fixture_id} />
                                </div>
                                <div className={`${styles.cItem} mTop20`}>
                                    <span className={styles.cPop}>
                                        <span className="material-icons" data-icon="sports_soccer"></span>
                                        Number of goals in the game
                                    </span>
                                    <Option type={`+1,5 goals in the game`} odd={load ? odds.odds_o15 : ""} prono="o15" id={datas.fixture_id} />
                                    <Option type={`+2,5 goals in the game`} odd={load ? odds.odds_o25 : ""} prono="o25" id={datas.fixture_id} />
                                    <Option type={`-3,5 goals in the game`} odd={load ? odds.odds_u35 : ""} prono="u35" id={datas.fixture_id} />
                                    <Option type={`-4,5 goals in the game`} odd={load ? odds.odds_u45 : ""} prono="u45" id={datas.fixture_id} />
                                    <Option type={`Both teams score: Yes`} odd={load ? odds.odds_btts_yes : ""} prono="btts_yes" id={datas.fixture_id} />
                                    <Option type={`Both teams score: No`} odd={load ? odds.odds_btts_no : ""} prono="btts_no" id={datas.fixture_id} />
                                </div>
                                <div className={`${styles.cItem} mTop20`}>
                                    <span className={styles.cPop}>
                                        <span className="material-icons" data-icon="content_copy"></span>
                                        Double chance and number of goals
                                    </span>
                                    <Option type={`${data.homeTeam.team_name} or draw and +1,5 goals`} odd={load ? odds.odds_1N15 : ""} prono="1N15" id={datas.fixture_id} />
                                    <Option type={`${data.awayTeam.team_name} or draw and +1,5 goals`} odd={load ? odds.odds_N215 : ""} prono="N215" id={datas.fixture_id} />
                                    <Option type={`${data.homeTeam.team_name} or draw and -3,5 goals`} odd={load ? odds.odds_1N35 : ""} prono="1N35" id={datas.fixture_id} />
                                    <Option type={`${data.awayTeam.team_name} or draw and -3,5 goals`} odd={load ? odds.odds_N235 : ""} prono="N235" id={datas.fixture_id} />
                                </div>
                            </div>
                            {sub.status != 'active' && (
                            <div className="mBot30">
                                <OutilsCTA />
                            </div>   
                            )}                            
                            <div className="app-content mTop30 mBot30">
                                <div className="flex toColumn">
                                    <div className="w70 mRight30 mRnone wm100 mmBot20">
                                        <p>Are you looking for the best prediction for the opponents soccer match {data.homeTeam.team_name} - {data.awayTeam.team_name} ? <strong>Here are the 3 important criteria you should know:</strong></p>
                                        <p>The form of teams / Attractiveness of offensive potential / Form of defense of teams / Placement in league or stakes / Injured or absent players in the team / Results of the last matches of {data.homeTeam.team_name} e {data.awayTeam.team_name}.</p>
                                        <h2>Bet on 1 X 2: Which prediction {data.homeTeam.team_name} vs. {data.awayTeam.team_name} ?</h2>
                                        <p>You are looking for a reliable prediction to know who will win the game of {data.date}, taking into account the form of each team.</p>
                                    </div>
                                    <div className={`w30 wm100 ${styles.appMediaSeo}`}>
                                        <Image src={`${WINFLIX_URL}/image_cover.php?teamA=${data.homeTeam.team_id}&teamB=${data.awayTeam.team_id}&nameA=${data.homeTeam.team_name}&nameB=${data.awayTeam.team_name}`} layout="fill" alt="photo de couverture" />
                                    </div>
                                </div>
                            </div>
                            <div className="app-content mBot30" id="analysis">
                                <h3 className="app-title-h2 flex aligncenter">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} layout="fill" alt={`logo ${data.homeTeam.team_name}`} />
                                    </div>                                
                                    Form of {data.homeTeam.team_name}
                                </h3>
                                <p>{data.homeTeam.team_name} :  In the last 5 games, the team {(loadA && lastA.general != null) && lastA.general[0].stats[0].victoires} wins, {(loadA && lastA.general != null) && lastA.general[0].stats[0].nuls} draws {(loadA && lastA.general != null) && lastA.general[0].stats[0].defaites} loss. If you are looking for a prediction for this game, you must take into account that the team {data.homeTeam.team_name} has rated a form at {(loadA && lastA.general != null) && (lastA.general[0].stats[0].victoires*20)+(lastA.general[0].stats[0].victoires*5)}%.</p>
                                <h3 className="app-title-h2 flex aligncenter">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} layout="fill" alt={`logo ${data.awayTeam.team_name}`} />
                                    </div>                                
                                    Form of {data.awayTeam.team_name}
                                </h3>
                                <p>{data.awayTeam.team_name} :  In the last 5 games, the team {(loadB && lastB.general != null) && lastB.general[0].stats[0].victoires} wins, {(loadB && lastB.general != null) && lastB.general[0].stats[0].nuls} draws {(loadB && lastB.general != null) && lastB.general[0].stats[0].defaites} loss. If you are looking for a prediction for this game, you must take into account that the team {data.awayTeam.team_name} has rated a form at {(loadB && lastB.general != null) && (lastB.general[0].stats[0].victoires*20)+(lastB.general[0].stats[0].victoires*5)}%.</p>
                            </div>
                            <div className="app-content mBot30">
                                <h2>Predicted number of goals in the game: <br/> {data.homeTeam.team_name} vs. {data.awayTeam.team_name}</h2>
                                <p>Again we look at how many goals each team, {data.homeTeam.team_name} or {data.awayTeam.team_name}, scored in the last 5 games they played. A football prediction about the number of goals in the game or about the number of goals in this game {data.homeTeam.team_name} or {data.awayTeam.team_name} will score must take this criterion into account :</p>
                                <h3 className="app-title-h2 flex aligncenter">
                                    <span className="material-icons mRight8" data-icon="add_circle_outline"></span>
                                    Goals scored
                                </h3>
                                <p><strong>Prediction of the number of goals scored by {data.homeTeam.team_name}</strong><br />{data.homeTeam.team_name} scored {(loadA && lastA.general != null) && lastA.general[0].stats[0].buts_marques} in these last 5 games, i.e. an average of {(loadA && lastA.general != null) && lastA.general[0].stats[0].buts_in} goals per game. Its offensive potential in attack is {loadA && ((lastA.general[0].stats[0].buts_marques*10)/1.4).toFixed(0)}%.</p>
                                <p><strong>Prediction of the number of goals scored by {data.awayTeam.team_name}</strong><br />{data.awayTeam.team_name} scored {(loadB && lastB.general != null) && lastB.general[0].stats[0].buts_marques} in these last 5 games, i.e. an average of {(loadB && lastB.general != null) && lastB.general[0].stats[0].buts_in} goals per game. Its offensive potential in attack is {(loadB && lastB.general != null) && ((lastB.general[0].stats[0].buts_marques*10)/1.4).toFixed(0)}%.</p>
                                <h3 className="app-title-h2 flex aligncenter">
                                    <span className="material-icons mRight8" data-icon="remove_circle_outline"></span>
                                    Goals conceded
                                </h3>
                                <p><strong>Prediction of number of goals conceded by {data.homeTeam.team_name}</strong><br />{data.homeTeam.team_name} redeemed {(loadA && lastA.general != null) && lastA.general[0].stats[0].buts_encaisses} in these last 5 games, i.e. an average of {(loadA && lastA.general != null) && lastA.general[0].stats[0].buts_out} goals per game. Its defense potential is {loadA && (100-(lastA.general[0].stats[0].buts_encaisses*10)/1.4).toFixed(0)}%.</p>
                                <p><strong>Prediction of number of goals conceded by {data.awayTeam.team_name}</strong><br />{data.awayTeam.team_name} redeemed {(loadB && lastB.general != null) && lastB.general[0].stats[0].buts_encaisses} in these last 5 games, i.e. an average of {(loadB && lastB.general != null) && lastB.general[0].stats[0].buts_out} goals per game. Its defense potential is {(loadB && lastB.general != null) && (100-(lastB.general[0].stats[0].buts_encaisses*10)/1.4).toFixed(0)}%.</p>
                                <h3 className="app-title-h2 flex aligncenter">
                                    <span className="material-icons mRight8" data-icon="tips_and_updates"></span>
                                    Conclusion: what a prognosis for the number of goals ?
                                </h3>
                                <p>From purely mathematical prediction face based on the results of the last 5 football games played {data.homeTeam.team_name} and {data.awayTeam.team_name} we should have total {((loadA && lastA.general != null) && loadB) && ((lastA.general[0].stats[0].buts_in+lastB.general[0].stats[0].buts_out)/2 + (lastB.general[0].stats[0].buts_in+lastA.general[0].stats[0].buts_out)/2).toFixed(1)} in this game.</p>
                            </div>
                            </>
                            ) : (
                            <>
                            <div itemScope itemType="https://schema.org/SportsEvent" style={{display: "none"}}>
                                <span itemProp="name">Exact results {data.homeTeam.team_name} {data.awayTeam.team_name} {data.date}</span>
                                <span itemProp="description">Exact result of the game {data.homeTeam.team_name} {data.awayTeam.team_name} {data.league_name_fr} {data.date}</span>
                                <span itemProp="startDate" content={data.event_date}>{data.event_date}</span>
                                <span itemProp="homeTeam">{data.homeTeam.team_name}</span>
                                <span itemProp="awayTeam">{data.awayTeam.team_name}</span>
                                <span itemProp="sport">Football</span>
                                <div itemProp="location" itemScope itemType="http://schema.org/Place">
                                <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                                    <span itemProp="addressLocality">{data.venue}</span>
                                    <span itemProp="addressRegion">{data.country}</span>
                                    </div>
                                </div>
                                <span itemProp="competitor">{data.homeTeam.team_name}</span>
                                <span itemProp="competitor">{data.awayTeam.team_name}</span>
                                <span itemProp="eventStatus">{data.status}</span>
                            </div>                            
                            <MenuMatch page="3" base={datas.guid} />
                            <div className="app-content relative mBot30">
                                <StatusMatch datas={data} id={datas.fixture_id} />
                                <h1>{data.homeTeam.team_name} vs {data.awayTeam.team_name} : result predictions {data.date}</h1>
                                <p className="text-center mBot30">Find all the stats of the game to better understand the stakes, form, latest results, average goals scored or conceded, team {data.homeTeam.team_name} for {data.awayTeam.team_name} only. Compare teams' form or average across the season.</p>
                                <div className="flex aligncenter justicenter app-secondary-menu-match">
                                    <Link href="#" passHref legacyBehavior><a className="app-deplace appActive">Methode 1</a></Link>
                                    <Link href="#" passHref legacyBehavior><a className="app-deplace">Methode 2</a></Link>
                                </div>
                            </div>
                            <div className="app-content mBot30 text-center">
                                <span className="app-title-h2">The 2 methods offered by Winflix</span>
                                <p>How to find the exact score of {data.homeTeam.team_name} against {data.homeTeam.team_name} for the {data.date} in the league Winflix offers you 2 methods based on probabilities:</p>
                                <p>Probability of correct score based on match histories with high similarity rate compared to {data.homeTeam.team_name} vs. {data.awayTeam.team_name} match. Probability of the exact score based on the combined offensive-defensive potential history of {data.homeTeam_team_name} and {data.awayTeam.team_name} before this meeting.</p>
                                <p>A reliable accurate score in a football match like {data.homeTeam.team_name} vs. {data.awayTeam.team_name} must take into account the probability percentages given on this page.</p>
                            </div>
                            <div className="app-content mBot30 text-center">
                                <h2>Exact Result {data.homeTeam.team_name} vs {data.awayTeam.team_name} : Result Probabilities</h2>
                                <p>In this method, to get the exact result of the match between the football team from {data.homeTeam.team_name} vs. {data.awayTeam.team_name} from {data.date}, we use the similarity comparison method by making the prediction, by taking the 200 closest matches from {data.homeTeam.team_name} {data.awayTeam.team_name} under 15,000 in our databases.</p>
                                <div className="flex justicenter mTop20">
                                    <Probabox text="Exact scores" />
                                    <Probabox text="%" />
                                    <Probabox text="Odds" />
                                </div>
                                <div className="maxContentResult">
                                    <div className="content-result">
                                    {(loadScores && scores.scores.length > 0) && scores.scores.slice(0, 15).map((score, index) => {
                                        return (
                                            <>

                                            {index === 3 && (
                                                <>
                                                    <p>Sum of the probabilities of the first 3 exact results:
                                                        <span className={(scores.moy[0] > 38 && scores.moy[0] <= 42) ? "orange" : (scores.moy[0] < 38) ? "rouge" : (scores.moy[0] > 42) && "vert"}>
                                                            <strong>{scores.moy[0].toFixed(2)}%</strong>
                                                        </span>
                                                        <br />
                                                        <strong>Risk :</strong> Moderate = Green | High = Orange | Strong = Red
                                                    </p>
                                                </>
                                            )}

                                            <div key={index} className="flex justicenter">
                                                {sub.status == 'active' ? (
                                                    <Probabox text={score.score} />
                                                ) : (
                                                    <Probabox text="🔐 - 🔐" />
                                                )}                                               
                                                <Probabox text={`${score.sum.toFixed(2)}%`} />
                                                <Probabox text={score.odd} />
                                            </div>
                                            </>
                                        )
                                    })}
                                    </div>
                                </div>
                            </div>
                            {sub.status != "active" && (
                                <OutilsCTA />
                            )}                       
                            <div className="app-content mBot30 mTop30">
                                <h2>Predict {data.homeTeam.team_name} vs. {data.awayTeam.team_name} exact score : Probability to teams' offensive and defensive potential</h2>
                                <p>To find the exact result prediction of the game of {data.homeTeam.team_name} VS {data.awayTeam.team_name}, we describe the most important statistics for {data.date} :</p>
                                <ul className="appListUl">
                                    <li>{data.homeTeam.team_name} average {(loadA && lastA.general != null) && lastA.general[0].stats[0].buts_in} goals per game in the last 5 games</li>
                                    <li>{data.homeTeam.team_name} average payout {(loadA && lastA.general != null) && lastA.general[0].stats[0].buts_out} goals per game in the last 5 games</li>
                                    <li>% of games won by {data.homeTeam.team_name} if the club is playing at home : {(loadA && lastA.general != null) && lastA.domicile[0].percents.domicile[0].victoires}%</li>
                                    <li>% move to {data.homeTeam.team_name} if the club is playing at home : {(loadA && lastA.general != null) && lastA.domicile[0].percents.domicile[0].nuls}%</li>
                                    <li>% of matches lost to {data.homeTeam.team_name} if the club is playing at home : {(loadA && lastA.general != null) && lastA.domicile[0].percents.domicile[0].defaites}%</li>
                                    <li>{data.awayTeam.team_name} average score {(loadB && lastB.general != null) && lastB.general[0].stats[0].buts_in} goals per game in the last 5 games</li>
                                    <li>{data.awayTeam.team_name} conceded on average {(loadB && lastB.general != null) && lastB.general[0].stats[0].buts_out} goals per game in the last 5 games</li>
                                    <li>% of games won by {data.awayTeam.team_name} if the club is playing away : {(loadB && lastB.general != null) && lastB.exterieur[0].percents.exterieur[0].victoires}%</li>
                                    <li>% moves to {data.awayTeam.team_name} if the club is playing away : {(loadB && lastB.general != null) && lastB.exterieur[0].percents.exterieur[0].nuls}%</li>
                                    <li>% of games lost to {data.awayTeam.team_name} if the club is playing away : {(loadB && lastB.general != null) && lastB.exterieur[0].percents.exterieur[0].defaites}%</li>
                                </ul>
                                <p>Only based on statistics from {data.homeTeam.team_name} versus {data.awayTeam.team_name}, gives the form predictive statistical exact score : <span className="vert"><strong>{(loadScores && scores.scores.length > 0 && sub.status == "active") ? (<span>{scores.scores[0].score}</span>) : (<span>🔐-🔐 <Link href="/vip/" style={{ color: "green", textDecoration: 'none'}}>Only for VIP Members !</Link></span>)}</strong></span></p>
                            </div>
                            </>
                            )}

                    </div>
                    <div className="w35 wm100">
                        <div className="app-content mBot30">
                            <Link href={`/soccer-predictions/prediction-${data.homeTeam.team_url}`} passHref legacyBehavior>
                                <a className="appBtnTeam mBot10">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`prediction ${data.homeTeam.team_name}`} layout="fill" />
                                    </div>                                     
                                    Predictions {data.homeTeam.team_name}
                                </a>
                            </Link>
                            <Link href={`/soccer-predictions/prediction-${data.awayTeam.team_url}`} passHref legacyBehavior>
                                <a className="appBtnTeam">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`prediction ${data.awayTeam.team_name}`} layout="fill" />
                                    </div>                                     
                                    Predictions {data.awayTeam.team_name}
                                </a>
                            </Link>
                        </div>
                        <Others fixture_id={datas.fixture_id} league_id={data.league_id} league_name_fr={data.league_name_fr} />
                        <Sidebar />
                    </div>
                </div>
                <BetTicket />
            </div>
        </div>
    )

    }else{
        return <PronosticsFoot datas={datas} />
    }
}


// export async function getServerSideProps(context){

//     // Fetch data from external API
//     const slug = context.query.slug
//     if(slug.includes("pronostic-foot-du-") == false){
//         const resq = await fetch(`${WINFLIX_URL}/api/pages/fr/?slug=${slug}`)
//         const datas = await resq.json()
//         return { props: { datas } }
//     }
//     else{
//         const resq = await fetch(`${WINFLIX_URL}/api/prono-jour/fr/list/?date=${slug}`)
//         const datas = await resq.json()
//         return { props: { datas } }       
//     }
// }


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const { slug } = params

    if(slug.includes("prediction-") !== false && (slug.length == "21" || slug.length == "22")){
        const dater = slug.replaceAll('prediction-', '')
        const dater2 = dater.substring(0, dater.length-1)
        const choix = dater.split('-')
        const res = await fetch(`${WINFLIX_URL}/api/prono-jour/fr/list/?date=${dater2}`)
        const datas = await res.json()
        return {
            props: {datas},
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every 10 seconds
            revalidate: 10, // In seconds
        }
    }
    else{
        const res = await fetch(`https://wpen.winflix.net/api/pages/fr/?slug=${slug}`)
        const datas = await res.json()
        return {
            props: {datas},
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every 10 seconds
            revalidate: 2, // In seconds
        }
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch('https://wpen.winflix.net/wp-json/wp/v2/pages?parent=163')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}
