import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../../../components/Sidebar'
import Barchart from '../../../components/Barchart'
import MenuMatch from '../../../components/MenuMatch'
import Countdown from '../../../components/Countdown'
import StatusMatch from '../../../components/StatusMatch'
import PronoMatch from '../../../components/PronoMatch'
import { HeaderCTA, OutilsCTA } from '../../../components/CTA'
import BetTicket from '../../../components/betTicket'
import styles from '../../../styles/InfosMatch.module.css'
import { WINFLIX_URL } from '../../../config'
import CountdownTicket from '../../../components/CountdownTicket';
import { VueMatch } from '../../../components/VueMatch'
import Skeleton from '@mui/material/Skeleton'
import Others from '../../../components/OtherMatchs'

export default function InfosMatch({datas}){

    const data = datas.datas
    const title = `${data.homeTeam.team_name} ${data.awayTeam.team_name} live from ${data.date} 😎 → Result, Action, Live, Video, Result and Predictions`;

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
    const [datax, setDatax] = React.useState(null)
    const [loadx, setLoadx] = React.useState(false)

    useEffect(() => {
        const fetchOdds = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/odds/?id=${datas.fixture_id}`)
            const json = await req.json()
            setOdds(json[0])
            setLoad(true)
        }

        fetchOdds()
    }, [])

    useEffect(() => {
        const fetchRank = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/ranking/fr/?id=${data.league_id}&a=${data.homeTeam.team_name_api}&b=${data.awayTeam.team_name_api}`)
            const json = await req.json()
            setRank(json)
            setLoadRank(true)
        } 

        fetchRank()
    }, [])
    

    const addBet = (option, odd) => {

        let countDownDate = new Date().getTime() + 15 * 60 * 1000;
        setTimer(prevTimer => {
            return <CountdownTicket date={countDownDate} />
        })

        const match = `${data.homeTeam.team_name} - ${data.awayTeam.team_name}`
        const fix_id = datas.fixture_id
        
        setTicket(prevTicket => {
            let checker = 0
            const newTicket = prevTicket.map((bet) => {
                if(bet.fix_id == fix_id){    
                    checker = 1                
                    return {
                        ...bet,
                        option: option,
                        odd: odd
                    }
                }
                return bet
            })
            if(checker == 0){
                return [
                    ...prevTicket,
                    {
                        id: Math.floor(prevTicket.length+1),
                        match: match,
                        option: option,
                        odd: odd,
                        fix_id: fix_id
                    }
                ]
            }
            else{
                return newTicket
            }
        })

        setOpen(true)

    }

    
    return (
        <div className="appInfos">
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Follow ${data.homeTeam.team_name} VS ${data.awayTeam.team_name} live and access live, lineup results, goal videos, ✅ tips and results with Winflix!`} />
                <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/match-en-direct/${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/live-heute/${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/partite-live-diretta/${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en/football/live-match/${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
                <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/match-en-direct/${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/live-heute/${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/partite-live-diretta/${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en" href={`https://winflix.net/en/football/live-match/${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
            </Head>

            <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/">
                <span itemProp="name">Football prediction website</span></a>
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
                <a itemProp="item" href={`https://winflix.net/en/football/${datas.slug}`}>
                <span itemProp="name">{data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : All information about the game</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
                
            <div itemScope itemType="https://schema.org/SportsEvent" style={{display: "none"}}>
                  <span itemProp="name">{data.homeTeam.team_name} {data.awayTeam.team_name} {data.date}</span>
                  <span itemProp="description">{data.homeTeam.team_name} {data.awayTeam.team_name} {data.league_name_fr}</span>
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

            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
                <p className={`${styles.breadcrump} mTop30 mBot20`}><Link href="/football">Football</Link> {'>'} <Link href="/football">Live Match</Link> {`> ${datas.title}`}</p>     
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <MenuMatch page="0" base={datas.guid} />
                        <div className="app-content relative mBot30">
                            <StatusMatch datas={data} id={datas.fixture_id} />
                            <h1>{data.homeTeam.team_name} - {data.awayTeam.team_name} live | {data.date} {data.league_name_fr}</h1>
                            <p className="text-center mBot30">For this new football day {data.league_name_fr} Enjoy promotions and live scores for match between team <strong>{data.homeTeam.team_name}</strong> Who is playing the home game against <strong>{data.awayTeam.team_name}</strong> who will evolve outside. All the important actions of the games are in this live from {data.date}.</p>
                            <div className="flex aligncenter justicenter app-secondary-menu-match" style={{ display: 'none' }}>
                                <Link href="#prono" passHref legacyBehavior><a className="app-deplace appActive">Prediction</a></Link>
                                <Link href="#resume" passHref legacyBehavior><a className="app-deplace">Resume</a></Link>
                                <Link href="#stats" passHref legacyBehavior><a className="app-deplace">Stats</a></Link>
                                <Link href="#rank" passHref legacyBehavior><a className="app-deplace">Ranking</a></Link>
                            </div>
                        </div>
                        <div className="app-content mBot30" id="prono">
                            <div className="text-center">
                                <span className="tag-winflix">Algorithm Winflix</span>
                                <h2>Prediction of the game</h2>
                                <PronoMatch id={datas.fixture_id} home={data.homeTeam.team_name} away={data.awayTeam.team_name} date={data.date} />
                                <p>This prediction was given to you by the Winflix algorithm based on multiple criteria including statistics, analysis and rankings. Find all <Link href="/football/predictions/">predictions of the day</Link>.</p>
                            </div>
                        </div>
                        {sub.status != 'active' && (
                            <div className="mBot30">
                                <OutilsCTA />
                            </div>                            
                        )}                        
                        {data.statusShort == "NS" && (
                        <>
                        <div className="app-content mTop30 mBot30">
                            <div className="text-center">
                                {sub.status == 'active' ? (
                                    <span className={`${styles.appFreebetsBet}`}>
                                        <span className="material-icons" data-icon="content_paste"></span>
                                        I bet with your freebies!
                                    </span>
                                ) : (
                                    <span className={`${styles.appFreebetsBetl}`}>
                                        <span className="material-icons" data-icon="lock"></span>
                                        Unlock your freebies to wager
                                    </span>                                    
                                )}
                                <h2>All game odds to bet with<br />risk free with your Winflix Freebets</h2>
                                <p>Members can test Winflix tips risk-free with 100 free bets per week! Beat the levels, win your Freebet bets, enter the competition, win prizes and use our analysis to understand which bets win and which lose.</p>
                                {load && (
                                    <>
                                        <h3 className={styles.appBetTitle}><span className="material-icons" data-icon="flag"></span>Game result betting</h3>
                                        <div className="flex toColumn mBot10">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`${data.homeTeam.team_name} winner`, `${odds.odds_1}`)}>
                                                <span className={styles.coteP}>{data.homeTeam.team_name} winner</span>
                                                <span className={styles.coteC}>{odds.odds_1}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`Draw`, `${odds.odds_N}`)}>
                                                <span className={styles.coteP}>Draw</span>
                                                <span className={styles.coteC}>{odds.odds_N}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`${data.awayTeam.team_name} winner`, `${odds.odds_2}`)}>
                                                <span className={styles.coteP}>{data.awayTeam.team_name} winner</span>
                                                <span className={styles.coteC}>{odds.odds_2}</span>
                                            </div>
                                        </div>
                                        <h3 className={styles.appBetTitle}><span className="material-icons" data-icon="flag"></span> Betting on the Double Chance option.</h3>
                                        <div className="flex toColumn mBot10">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`${data.homeTeam.team_name} or draw`, `${odds.odds_1N}`)}>
                                                <span className={styles.coteP}>{data.homeTeam.team_name}or draw</span>
                                                <span className={styles.coteC}>{odds.odds_1N}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`${data.homeTeam.team_name} o ${data.awayTeam.team_name}`, `${odds.odds_12}`)}>
                                                <span className={styles.coteP}>{data.homeTeam.team_name} or {data.awayTeam.team_name}</span>
                                                <span className={styles.coteC}>{odds.odds_12}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`${data.awayTeam.team_name}or draw`, `${odds.odds_N2}`)}>
                                                <span className={styles.coteP}>{data.awayTeam.team_name}or draw</span>
                                                <span className={styles.coteC}>{odds.odds_N2}</span>
                                            </div>
                                        </div>
                                        <h3 className={styles.appBetTitle}><span className="material-icons" data-icon="flag"></span> Bet on the number of goals</h3>
                                        <div className="flex toColumn">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`-0.5 goals`, `${odds.odds_u05}`)}>
                                                <span className={styles.coteP}>-0.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_u05}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`+0.5 goals`, `${odds.odds_o05}`)}>
                                                <span className={styles.coteP}>+0.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_o05}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`-1.5 goals`, `${odds.odds_u15}`)}>
                                                <span className={styles.coteP}>-1.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_u15}</span>
                                            </div>
                                        </div>
                                        <div className="flex toColumn">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`+1.5 goals`, `${odds.odds_o15}`)}>
                                                <span className={styles.coteP}>+1.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_o15}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`-2.5 goals`, `${odds.odds_u25}`)}>
                                                <span className={styles.coteP}>-2.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_u25}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`+2.5 goals`, `${odds.odds_o25}`)}>
                                                <span className={styles.coteP}>+2.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_o25}</span>
                                            </div>
                                        </div>
                                        <div className="flex toColumn">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`-3.5 goals`, `${odds.odds_u35}`)}>
                                                <span className={styles.coteP}>-3.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_u35}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`+3.5 goals`, `${odds.odds_o35}`)}>
                                                <span className={styles.coteP}>+ 3.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_o35}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`-4.5 goals`, `${odds.odds_u45}`)}>
                                                <span className={styles.coteP}>-4.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_u45}</span>
                                            </div>
                                        </div>
                                        <div className="flex toColumn mBot10">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`+4.5 goals`, `${odds.odds_o45}`)}>
                                                <span className={styles.coteP}>+4.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_o45}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`-5.5 goals`, `${odds.odds_u55}`)}>
                                                <span className={styles.coteP}>-5.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_u55}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`+5.5 goals`, `${odds.odds_o55}`)}>
                                                <span className={styles.coteP}>+5.5 goals</span>
                                                <span className={styles.coteC}>{odds.odds_o55}</span>
                                            </div>
                                        </div>
                                        <h3 className={styles.appBetTitle}><span className="material-icons" data-icon="flag"></span> Bet on both teams to score</h3>
                                        <div className="flex toColumn mBot10">
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`Si`, `${odds.odds_btts_yes}`)}>
                                                <span className={styles.coteP}>Yes</span>
                                                <span className={styles.coteC}>{odds.odds_btts_yes}</span>
                                            </div>
                                            <div className={`${styles.boxCote} until wm100`} onClick={() => addBet(`No`, `${odds.odds_btts_no}`)}>
                                                <span className={styles.coteP}>No</span>
                                                <span className={styles.coteC}>{odds.odds_btts_no}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        </>
                        )}
                        {(data.statusShort != "NS" && data.events != null && data.statusShort != "PST") && (
                            <div className="app-content text-center mBot30" id="resume">
                                <div className="text-center">
                                    <h2>All Highlights of the game<br /> {data.homeTeam.team_name} {data.awayTeam.team_name} - {data.date}</h2>
                                    <p>Find all the highlights of the football game in this live {data.homeTeam.team_name} - {data.awayTeam.team_name} this is played {data.date} on behalf of the competition {data.league_name_fr}. As the match progresses, follow the evolution of the score, the names of the goal scorers and smugglers, the yellow/red cards and the changes managed by the coaches.</p>
                                </div>
                                <h3 className="mBot20">Live-Match-Highlights :</h3>
                                {data.events.map((event, index) => 
                                    event.type == "Goal" ? 
                                        event.team_id == data.homeTeam.team_id ? (
                                            <div className="flex mBot20 relative">
                                                <div className="w50 action_res_dom action_dom">
                                                    <span className="minute_action_resume">{event.elapsed}'</span>
                                                    <span className="playername_action_resume">{event.player}</span>
                                                    <span className="subplayername_action_resume"></span>
                                                </div>
                                                <div className="w50 action_res_ext"></div>
                                                <div className="action_with_details_dom">
                                                    <Image src="https://wp.winflix.net/wp-content/themes/winflix/img/foot-ball.png" title="picto" alt="picto" width={15} height={15} className="picto_action" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex mBot20 relative">
                                                <div className="w50 action_res_dom">
                                                </div>
                                                <div className="w50 action_res_ext action_ext">
                                                <span className="minute_action_resume">{event.elapsed}'</span>
                                                    <span className="playername_action_resume">{event.player}</span>
                                                    <span className="subplayername_action_resume"></span>
                                                </div>
                                                <div className="action_with_details_ext">
                                                    <Image src="https://wp.winflix.net/wp-content/themes/winflix/img/foot-ball.png" title="picto" alt="picto" width={15} height={15} className="picto_action" />
                                                </div>
                                            </div>  
                                        )
                                     : (
                                        event.type == "Card" ? 
                                            event.team_id == data.homeTeam.team_id ? (
                                                <div className="flex mBot20 relative">
                                                    <div className="w50 action_res_dom action_dom">
                                                        <span className="minute_action_resume">{event.elapsed}'</span>
                                                        <span className="playername_action_resume">{event.player}</span>
                                                        <span className="subplayername_action_resume"></span>
                                                    </div>
                                                    <div className="w50 action_res_ext"></div>
                                                    <div className="action_with_details_dom">
                                                        <Image src={event.detail == "Yellow Card" ? "https://wp.winflix.net/wp-content/themes/winflix/img/yellowcard.png" : "https://winflix.net/wp-content/uploads/2019/10/redcard-1.png"} title="picto" alt="picto" width={15} height={15} className="picto_action" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex mBot20 relative">
                                                    <div className="w50 action_res_dom">
                                                    </div>
                                                    <div className="w50 action_res_ext action_ext">
                                                    <span className="minute_action_resume">{event.elapsed}'</span>
                                                        <span className="playername_action_resume">{event.player}</span>
                                                        <span className="subplayername_action_resume"></span>
                                                    </div>
                                                    <div className="action_with_details_ext">
                                                        <Image src={event.detail == "Yellow Card" ? "https://wp.winflix.net/wp-content/themes/winflix/img/yellowcard.png" : "https://winflix.net/wp-content/uploads/2019/10/redcard-1.png"} title="picto" alt="picto" width={15} height={15} className="picto_action" />
                                                    </div>
                                                </div>  
                                            )
                                        : (
                                            event.type == "subst" ? 
                                                event.team_id == data.homeTeam.team_id ? (
                                                    <div className="flex mBot20 relative">
                                                        <div className="w50 action_res_dom action_dom">
                                                            <span className="minute_action_resume">{event.elapsed}'</span>
                                                            <span className="playername_action_resume">{event.player}</span>
                                                            <span className="subplayername_action_resume">{event.detail}</span>
                                                        </div>
                                                        <div className="w50 action_res_ext"></div>
                                                        <div className="action_with_details_dom">
                                                            <Image src="https://wp.winflix.net/wp-content/uploads/2019/10/subs-1.png" title="picto" alt="picto" width={15} height={15} className="picto_action" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex mBot20 relative">
                                                        <div className="w50 action_res_dom">
                                                        </div>
                                                        <div className="w50 action_res_ext action_ext">
                                                        <span className="minute_action_resume">{event.elapsed}'</span>
                                                            <span className="playername_action_resume">{event.player}</span>
                                                            <span className="subplayername_action_resume">{event.detail}</span>
                                                        </div>
                                                        <div className="action_with_details_ext">
                                                            <Image src="https://wp.winflix.net/wp-content/uploads/2019/10/subs-1.png" title="picto" alt="picto" width={15} height={15} className="picto_action" />
                                                        </div>
                                                    </div>  
                                                )
                                            : (
                                                <></>
                                            )
                                        )
                                    )                                      
                                )}
                            </div>
                        )}

                        {(data.statusShort == "NS" && data.statusShort != "FT") && (
                            <div className="app-content text-center mBot30">
                                <h2>Live {data.homeTeam.team_name} {data.awayTeam.team_name}</h2>
                                <p>All pre-match stats for the game {data.homeTeam.team_name} {data.awayTeam.team_name} are already available! The squad and squad line-ups will be available a few minutes before the start of the match, but you can already consult the expected line-up for {data.homeTeam.team_name} vs {data.awayTeam.team_name}. Winflix.net/en invites you to watch the match live and offers you all goal videos instantly during the game for this game between {data.homeTeam.team_name} vs {data.awayTeam.team_name}.</p>
                                {load && (<Countdown date={data.event_date} />)}
                                <p>Countdown before game start</p>
                            </div>
                        )}

                        {(data.statusShort != "NS" && data.statistics != null && data.statusShort != "PST") && (
                            <div className="app-content text-center mBot30" id="stats">
                                <h2>Live stats {data.homeTeam.team_name} - {data.awayTeam.team_name}</h2>
                                <p>Under the proposed statistics live {data.homeTeam.team_name} - {data.awayTeam.team_name}, you can track each team's possession during the game, what is happening at the attacking level with the number of hits, which affects the accuracy of passes and mishaps.</p>
                                <h3>Follow both teams' possession throughout the game</h3>
                                <p>Each team's possession of the ball during the game is a valuable indicator of who has {data.homeTeam.team_name} or {data.awayTeam.team_name} Hand About the Game It is often said that the team with possession dominates the game of football, but it also depends on the style of play of each team.</p>
                                <div className="flex justicenter">
                                    <div className="w90 flex wm100">
                                        <div className="w35 text-right">
                                            <span className="flex aligncenter app-poss-team flex-end">
                                                <span>{data.homeTeam.team_name}</span>
                                                <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`logo team ${data.homeTeam.team_name}`} layout="fixed" width={35} height={23} />
                                            </span>
                                            <span className="app-poss-percent">{data["statistics"]["Ball Possession"]["home"]}</span>
                                        </div>
                                        <div className="w30 mLeft30 mRight30 app-pos">
                                            <span className="app-context">Possession</span>
                                            <div className="flex aligncenter">
                                                <div className="flex w50 mRight10">
                                                    <div className="app-bar-l w100">
                                                        <div className="app-bar-i" style={{width: data["statistics"]["Ball Possession"]["home"], right: 0}}></div>
                                                    </div>
                                                </div>
                                                <div className="flex w50 mRight10">
                                                    <div className="app-bar-l w100">
                                                        <div className="app-bar-i" style={{width: data["statistics"]["Ball Possession"]["away"], left: 0}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w35 text-left">
                                            <span className="flex aligncenter app-poss-team">
                                                <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`logo team ${data.awayTeam.team_name}`} layout="fixed" width={35} height={23} />
                                                <span>{data.awayTeam.team_name}</span>
                                            </span>
                                            <span className="app-poss-percent">{data["statistics"]["Ball Possession"]["away"]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(data.statusShort != "NS" && data.statistics != null && data.statusShort != "PST") && (
                            <div className="app-content mBot30 text-center">
                                <h3>Attack in game</h3>
                                <p>Which team is the most offensive in this sports game? In Winflix we invite you to follow the number of goals scored by each of the live teams, both {data.homeTeam.team_name} or {data.awayTeam.team_name} during this game from {data.date}. </p>
                                <div className="w100 flex justicenter app-stat">
                                    <div className="w90 wm100">
                                        <Barchart type="Total shots" a={data["statistics"]["Total Shots"]["home"]} b={data["statistics"]["Total Shots"]["away"]} />
                                        <Barchart type="Shots on goal" a={data["statistics"]["Shots on Goal"]["home"]} b={data["statistics"]["Shots on Goal"]["away"]} />
                                        <Barchart type="Shots off goal" a={data["statistics"]["Shots off Goal"]["home"]} b={data["statistics"]["Shots off Goal"]["away"]} />
                                        <Barchart type="Corner Kicks" a={data["statistics"]["Corner Kicks"]["home"]} b={data["statistics"]["Corner Kicks"]["away"]} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {(data.statusShort != "NS" && data.statistics != null && data.statusShort != "PST") && (
                            <div className="app-content mBot30 text-center">
                                <h3>Stats on passes</h3>
                                <div className="w100 flex justicenter app-stat mTop20">
                                    <div className="w90 wm100">
                                        <Barchart type="Average Passes" a={data["statistics"]["Passes %"]["home"]} b={data["statistics"]["Passes %"]["away"]} />
                                        <Barchart type="Total passes" a={data["statistics"]["Total passes"]["home"]} b={data["statistics"]["Total passes"]["away"]} />
                                        <Barchart type="Passes accurate" a={data["statistics"]["Passes accurate"]["home"]} b={data["statistics"]["Passes accurate"]["away"]} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {(data.statusShort != "NS" && data.statistics != null && data.statusShort != "PST") && (
                            <div className="app-content mBot30 text-center">
                                <h3>Fouls and cards in the game</h3>
                                <div className="w100 flex justicenter app-stat mTop20">
                                    <div className="w90 wm100">
                                        <Barchart type="Total Fouls" a={data["statistics"]["Fouls"]["home"]} b={data["statistics"]["Fouls"]["away"]} />
                                        <Barchart type="Yellow Cards" a={data["statistics"]["Yellow Cards"]["home"]} b={data["statistics"]["Yellow Cards"]["away"]} />
                                        <Barchart type="Red Cards" a={data["statistics"]["Red Cards"]["home"]} b={data["statistics"]["Red Cards"]["away"]} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="app-content mBot30 mTop30" id="rank">
                            <h3 className="text-center">Ranking {data.homeTeam.team_name} - {data.awayTeam.team_name} {data.date} in {data.league_name_fr}</h3>
                            <div className="flex rank_line top_line space-between mTop20">
                                <div className="w20">
                                    <span className="rank_number">Pos</span>
                                </div>
                                <div className="w50">
                                    <span className="rank_name">Team</span>
                                </div>
                                <div className="w10">
                                    <span className="rank_pts">Pts</span>
                                </div>
                                <div className="w10">
                                    <span className="rank_played">P</span>
                                </div>
                                <div className="w10">
                                    <span className="rank_buts">+/-</span>
                                </div>
                            </div>
                            {loadRank && rank.map((team, index) => (
                                <div key={index} className="flex rank_line space-between">
                                    <div className="w20">
                                        <span className="rank_number">{team.rank}</span>
                                    </div>
                                    <div className="w50 flex aligncenter">
                                        <Image src={team.logo} alt={`classement ${team.name}`} layout="fixed" width={16} height={10} />
                                        <span className="rank_name mLeft5">{team.name}</span>
                                    </div>
                                    <div className="w10">
                                        <span className="rank_pts">{team.points}</span>
                                    </div>
                                    <div className="w10">
                                        <span className="rank_played">{team.plays}</span>
                                    </div>
                                    <div className="w10">
                                        <span className="rank_buts">{team.goalsDiff}</span>
                                    </div>
                                </div> 
                                )
                            )}
                        </div>
                        <BetTicket />
                    </div>
                    <div className="w35 wm100">
                        <Others fixture_id={datas.fixture_id} league_id={data.league_id} league_name_fr={data.league_name_fr} />
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}


// export async function getServerSideProps(context){
//     // Fetch data from external API
//     const slug = context.query.slug
//     const resq = await fetch(`${WINFLIX_URL}/api/pages/fr/?slug=${slug}`)
//     const datas = await resq.json()
  
//     // Pass data to the page via props
//     return { props: { datas } }
// }


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const { slug } = params
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

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch('https://wpen.winflix.net/wp-json/wp/v2/pages?parent=157')
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