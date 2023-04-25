import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../../../components/Sidebar'
import FullBarChart from '../../../components/FullBarChart'
import MenuMatch from '../../../components/MenuMatch'
import ButStats from '../../../components/ButStats'
import Barchart from '../../../components/Barchart'
import Countdown from '../../../components/Countdown'
import StatusMatch from '../../../components/StatusMatch'
import PronoMatch from '../../../components/PronoMatch'
import { HeaderCTA, OutilsCTA } from '../../../components/CTA'
import Match from '../../../components/Match'
import BetTicket from '../../../components/betTicket'
import styles from '../../../styles/FormeStats.module.css'
import { WINFLIX_URL } from '../../../config'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Others from '../../../components/OtherMatchs'

export default function FormeStats({datas}){

    const data = datas.datas
    const title = `📈 Top 10 Statistics of ${data.homeTeam.team_name} ${data.awayTeam.team_name} from ${data.date}`;
    const router = useRouter()

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

    const [value, setValue] = React.useState(0);
    const [valueTeam, setValueTeam] = React.useState(0);
    const [valueResA, setValueResA] = React.useState(0);
    const [valueButA, setValueButA] = React.useState(0);
    const [valueB, setValueB] = React.useState(0);
    const [valueResB, setValueResB] = React.useState(0);
    const [valueButB, setValueButB] = React.useState(0);

    const [datax, setDatax] = React.useState(null)
    const [loadx, setLoadx] = React.useState(false)

    useEffect(() => {
        const getOther = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/pages/fr/infos/?id=${datas.fixture_id}`)
            const json = await fetcher.json()
            setDatax(json[0])
            setLoadx(true)
        }
        getOther()
    }, [])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeTeam = (event, newValue) => {
      setValueTeam(newValue);
    };

    const handleChangeResA = (event, newValue) => {
        setValueResA(newValue);
    };

    const handleChangeButA = (event, newValue) => {
        setValueButA(newValue);
    };

    const handleChangeB = (event, newValue) => {
        setValueB(newValue);
    };

    const handleChangeResB = (event, newValue) => {
        setValueResB(newValue);
    };

    const handleChangeButB = (event, newValue) => {
        setValueButB(newValue);
    };

    useEffect(() => {
        const fetchRank = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/ranking/fr/?id=${data.league_id}&a=${data.homeTeam.team_name_api.replaceAll(' ', '_')}&b=${data.awayTeam.team_name_api.replaceAll(' ', '_')}`)
            const json = await req.json()
            setRank(json)
            setLoadRank(true)
        } 

        fetchRank()
    }, [])


    useEffect(() => {
        const fetchLastA = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/matchs/fr/all/?id=${data.homeTeam.team_id}&team=${data.homeTeam.team_name_api.replaceAll(' ', '_')}`)
            const json = await req.json()
            setLastA(json)
            setLoadA(true)
        }

        fetchLastA()
    }, [])

    useEffect(() => {
        const fetchLastB = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/matchs/fr/all/?id=${data.awayTeam.team_id}&team=${data.awayTeam.team_name_api.replaceAll(' ', '_')}`)
            const json = await req.json()
            setLastB(json)
            setLoadB(true)
        }

        fetchLastB()
    }, [])
    
    return (
        <div className="appInfos">
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Enjoy important statistics from the match between ${data.homeTeam.team_name} and ${data.awayTeam.team_name} from ${data.date} ! 👉 Knowledge is power !`} />
                <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/statistiques/statistiques-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`}/>
                <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/fussballstatistik/statistik-${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/statistiche/statistiche-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en${router.asPath}`} />
                <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/statistiques/statistiques-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/fussballstatistik/statistik-${datas.trads.de.teamA}-${datas.trads.de.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/statistiche/statistiche-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en" href={`https://winflix.net/en${router.asPath}`} />
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
                <a itemProp="item" href={`https://winflix.net/en/football/soccerstat/${datas.slug}`}>
                <span itemProp="name">Statistics {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : all football statistics</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
                
            <div itemScope itemType="https://schema.org/SportsEvent" style={{display: "none"}}>
                  <span itemProp="name">Statistics {data.homeTeam.team_name} {data.awayTeam.team_name} {data.date}</span>
                  <span itemProp="description">The best stats for the game {data.homeTeam.team_name} {data.awayTeam.team_name} {data.league_name_fr}</span>
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
                <p className={`${styles.breadcrump} mTop30 mBot20`}><Link href="/football">Football</Link> {'>'} <Link href="/football">Statistics</Link> {`> ${datas.title}`}</p>     
                <div className="flex toColumn flex-start">
                        <div className="w65 relative mRight30 mRnone wm100">
                            <MenuMatch page="1" base={datas.guid} />
                            <div className="app-content relative mBot30">
                                <StatusMatch datas={data} id={datas.fixture_id} />
                                <h1>Statistics {data.homeTeam.team_name} - {data.awayTeam.team_name} football from {data.date}</h1>
                                <p className="text-center mBot20 mmBot40">Find all the stats of the game to better understand the stakes, form, latest results, average goals scored or conceded as well as for team {data.homeTeam.team_name} and for team {data.awayTeam.team_name} . Compare teams' form or average across the season.</p>
                                <div className="app-secondary-menu-match notOnDesktop">
                                    <Box sx={{ width: '100%', bgcolor: '#FFF'}}>
                                        <Tabs value={valueTeam} onChange={handleChangeTeam} centered>
                                            <Tab label={data.homeTeam.team_name} sx={{textTransform: 'initial', fontSize: '14px'}} />
                                            <Tab label={data.awayTeam.team_name} sx={{textTransform: 'initial', fontSize: '14px'}} />
                                        </Tabs>
                                    </Box>
                                </div>
                            </div>
                            <div className="flex toColumn">
                                <div className={`w50 mRight30 wm100 mRnone text-center app-team ${valueTeam == 0 ? "teamActive" : ""}`}>
                                    <div className="app-content mBot30">
                                        <div className="text-center">
                                            <div className={styles.logoH2H}>
                                                <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} layout='fill' />
                                            </div>
                                            <h2 className="app-title-h2-medium mTop10 mBot10">Statistics from {data.homeTeam.team_name}<br />in the 5 last games</h2>
                                            <Box sx={{ width: '100%', bgcolor: '#FFF', marginBottom: '20px' }}>
                                                <Tabs value={value} onChange={handleChange} centered>
                                                    <Tab label="Generally" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                    <Tab label="Home" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                    <Tab label="Away" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                </Tabs>
                                            </Box>
                                            {value == 0 && loadA && lastA.general[0].matchs.map((match, index) => {
                                                return <Match key={index} data={match} />                                           
                                            })}
                                            {value == 1 && loadA && lastA.domicile[0].matchs.map((match, index) => {
                                                return <Match key={index} data={match} />                                           
                                            })}
                                            {value == 2 && loadA && lastA.exterieur[0].matchs.map((match, index) => {
                                                return <Match key={index} data={match} />                                           
                                            })}
                                            {!loadA && (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                                    <CircularProgress sx={{ color: "red" }} />
                                                </Box>
                                            )}
                                        </div>
                                    </div>
                                    <div className="app-content mBot30">
                                        <span className="app-title-h2-medium">Key Numbers</span>
                                        <div className="flex mTop20">
                                            <div className="w33 text-center borR">
                                                <span className="title-res-g victoire_t">Wins</span>
                                                <span className="nb_stat victoire_t">{(loadA && lastA.general != null) && lastA.general[0].stats[0].victoires}</span>
                                            </div>
                                            <div className="w33 text-center borR">
                                                <span className="title-res-g victoire_t">Draws</span>
                                                <span className="nb_stat victoire_t">{(loadA && lastA.general != null) && lastA.general[0].stats[0].nuls}</span>
                                            </div>
                                            <div className="w33 text-center">
                                                <span className="title-res-g victoire_t">Loses</span>
                                                <span className="nb_stat victoire_t">{(loadA && lastA.general != null) && lastA.general[0].stats[0].defaites}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="app-content mBot30">
                                        <h2 className="app-title-h2-medium">Results from {data.homeTeam.team_name} <br /> in 2023</h2>
                                        <Box sx={{ width: '100%', bgcolor: '#FFF', marginBottom: '20px', marginTop: '10px' }}>
                                            <Tabs value={valueResA} onChange={handleChangeResA} centered>
                                                <Tab label="General" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Home" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Away" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                            </Tabs>
                                        </Box>
                                        {loadA && valueResA == 0 && lastA.general != null && (
                                            <>
                                                <FullBarChart type="Wins" percent={lastA.general[0].percents.general[0].victoires} />
                                                <FullBarChart type="Draws" percent={lastA.general[0].percents.general[0].nuls} />
                                                <FullBarChart type="Loses" percent={lastA.general[0].percents.general[0].defaites} />
                                            </>
                                        )}
                                        {loadA && valueResA == 1 && lastA.general != null && (
                                            <>
                                                <FullBarChart type="Wins" percent={lastA.domicile[0].percents.domicile[0].victoires} />
                                                <FullBarChart type="Draws" percent={lastA.domicile[0].percents.domicile[0].nuls} />
                                                <FullBarChart type="Loses" percent={lastA.domicile[0].percents.domicile[0].defaites} />
                                            </>
                                        )}
                                        {loadA && valueResA == 2 && lastA.general != null && (
                                            <>
                                                <FullBarChart type="Wins" percent={lastA.exterieur[0].percents.exterieur[0].victoires} />
                                                <FullBarChart type="Draws" percent={lastA.exterieur[0].percents.exterieur[0].nuls} />
                                                <FullBarChart type="Loses" percent={lastA.exterieur[0].percents.exterieur[0].defaites} />
                                            </>
                                        )}
                                    </div>
                                    <div className="app-content mBot30">
                                        <h2 className="app-title-h2-medium">Goal average {data.homeTeam.team_name} per game in this season</h2>
                                        <Box sx={{ width: '100%', bgcolor: '#FFF', marginBottom: '20px', marginTop: '10px' }}>
                                            <Tabs value={valueButA} onChange={handleChangeButA} centered>
                                                <Tab label="General" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Home" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Away" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                            </Tabs>
                                        </Box>
                                        {loadA && valueButA == 0 && lastA.general != null && (
                                            <ButStats bm={lastA.general[0].stats[0].buts_in} be={lastA.general[0].stats[0].buts_out} />
                                        )}
                                        {loadA && valueButA == 1 && lastA.general != null && (
                                            <ButStats bm={lastA.domicile[0].stats[0].buts_in} be={lastA.domicile[0].stats[0].buts_out} />
                                        )}
                                        {loadA && valueButA == 2 && lastA.general != null && (
                                            <ButStats bm={lastA.exterieur[0].stats[0].buts_in} be={lastA.exterieur[0].stats[0].buts_out} />
                                        )}
                                    </div>
                                </div>
                                <div className={`w50 wm100 mRnone text-center app-team  ${valueTeam == 1 ? "teamActive" : ""}`}>
                                    <div className="app-content mBot30">
                                        <div className="text-center">
                                            <div className={styles.logoH2H}>
                                                <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} layout='fill' />
                                            </div>
                                            <h2 className="app-title-h2-medium mTop10 mBot10">Statistics from {data.awayTeam.team_name}<br />in the 5 last games</h2>
                                            <Box sx={{ width: '100%', bgcolor: '#FFF', marginBottom: '20px' }}>
                                                <Tabs value={valueB} onChange={handleChangeB} centered>
                                                    <Tab label="General" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                    <Tab label="Home" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                    <Tab label="Away" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                </Tabs>
                                            </Box>
                                            {valueB == 0 && loadB && lastB.general != null && lastB.general[0].matchs.map((match, index) => {
                                                return <Match key={index} data={match} />                                           
                                            })}
                                            {valueB == 1 && loadB && lastB.general != null && lastB.domicile[0].matchs.map((match, index) => {
                                                return <Match key={index} data={match} />                                           
                                            })}
                                            {valueB == 2 && loadB && lastB.general != null && lastB.exterieur[0].matchs.map((match, index) => {
                                                return <Match key={index} data={match} />                                           
                                            })}
                                            {!loadB && (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                                    <CircularProgress sx={{ color: "red" }} />
                                                </Box>
                                            )}
                                        </div>
                                    </div>
                                    <div className="app-content mBot30">
                                        <span className="app-title-h2-medium">Key Numbers</span>
                                        <div className="flex mTop20">
                                            <div className="w33 text-center borR">
                                                <span className="title-res-g victoire_t">Wins</span>
                                                <span className="nb_stat victoire_t">{(loadB && lastB.general != null) && lastB.general[0].stats[0].victoires}</span>
                                            </div>
                                            <div className="w33 text-center borR">
                                                <span className="title-res-g victoire_t">Draws</span>
                                                <span className="nb_stat victoire_t">{(loadB && lastB.general != null) && lastB.general[0].stats[0].nuls}</span>
                                            </div>
                                            <div className="w33 text-center">
                                                <span className="title-res-g victoire_t">Loses</span>
                                                <span className="nb_stat victoire_t">{(loadB && lastB.general != null) && lastB.general[0].stats[0].defaites}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="app-content mBot30">
                                        <h2 className="app-title-h2-medium">Results from {data.awayTeam.team_name} <br /> in 2023</h2>
                                        <Box sx={{ width: '100%', bgcolor: '#FFF', marginBottom: '20px', marginTop: '10px' }}>
                                            <Tabs value={valueResB} onChange={handleChangeResB} centered>
                                                <Tab label="General" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Home" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Away" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                            </Tabs>
                                        </Box>
                                        {loadB && valueResB == 0 && lastB.general != null && (
                                            <>
                                                <FullBarChart type="Wins" percent={lastB.general[0].percents.general[0].victoires} />
                                                <FullBarChart type="Draws" percent={lastB.general[0].percents.general[0].nuls} />
                                                <FullBarChart type="Loses" percent={lastB.general[0].percents.general[0].defaites} />
                                            </>
                                        )}
                                        {loadB && valueResB == 1 && lastB.general != null && (
                                            <>
                                                <FullBarChart type="Wins" percent={lastB.domicile[0].percents.domicile[0].victoires} />
                                                <FullBarChart type="Draws" percent={lastB.domicile[0].percents.domicile[0].nuls} />
                                                <FullBarChart type="Loses" percent={lastB.domicile[0].percents.domicile[0].defaites} />
                                            </>
                                        )}
                                        {loadB && valueResB == 2 && lastB.general != null && (
                                            <>
                                                <FullBarChart type="Wins" percent={lastB.exterieur[0].percents.exterieur[0].victoires} />
                                                <FullBarChart type="Draws" percent={lastB.exterieur[0].percents.exterieur[0].nuls} />
                                                <FullBarChart type="Loses" percent={lastB.exterieur[0].percents.exterieur[0].defaites} />
                                            </>
                                        )}
                                    </div>
                                    <div className="app-content mBot30">
                                        <h2 className="app-title-h2-medium">Goal average {data.awayTeam.team_name} per game in this season</h2>
                                        <Box sx={{ width: '100%', bgcolor: '#FFF', marginBottom: '20px', marginTop: '10px' }}>
                                            <Tabs value={valueButB} onChange={handleChangeButB} centered>
                                                <Tab label="Generally" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Home" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                                <Tab label="Away" sx={{textTransform: 'initial', fontSize: '14px'}} />
                                            </Tabs>
                                        </Box>
                                        {loadB && valueButB == 0 && lastB.general != null && (
                                            <ButStats bm={lastB.general[0].stats[0].buts_in} be={lastB.general[0].stats[0].buts_out} />
                                        )}
                                        {loadB && valueButB == 1 && lastB.general != null && (
                                            <ButStats bm={lastB.domicile[0].stats[0].buts_in} be={lastB.domicile[0].stats[0].buts_out} />
                                        )}
                                        {loadB && valueButB == 2 && lastB.general != null && (
                                            <ButStats bm={lastB.exterieur[0].stats[0].buts_in} be={lastB.exterieur[0].stats[0].buts_out} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        {sub.status != 'active' && (
                            <div className="mBot30">
                                <OutilsCTA />
                            </div>   
                        )}                       
                    </div>
                    <div className="w35 wm100 mmTop30">
                        {(loadRank && rank.length > 0) && (
                            <div className="app-content mBot30">
                            <h3 className="app-title-h2-medium">Ranking {data.league_name_fr}</h3>
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
                            {loadRank ? rank.map((team, index) => (
                                <div key={index} className="flex rank_line space-between">
                                    <div className="w20">
                                        <span className="rank_number">{team.rank}</span>
                                    </div>
                                    <div className="w50 flex aligncenter">
                                        <Image src={team.logo} alt={`logo ${team.name && team.name}`} layout="fixed" width={16} height={10} />
                                        <span className="rank_name mLeft5">{team.name && team.name}</span>
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
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                    <CircularProgress sx={{ color: "red" }} />
                                </Box>
                            )}
                        </div>
                        )}
                        <div className="app-content mBot30 text-center">
                            <span className="app-title-h2-medium">H2H Results</span>
                            <div className="flex justicenter aligncenter mTop20 mBot30">
                                <div className="w10">
                                    <div className={styles.logoH2H}>
                                        <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`logo ${data.homeTeam.team_name}`} layout='fill' />
                                    </div>
                                </div>
                                <div className="w65">
                                    <div className="flex">
                                        <div className="w33 text-center">
                                            <span className={styles.appH2Hnumber}>{(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.wins.total}</span>
                                            <span className={styles.appH2Htype}>Wins</span>
                                        </div>
                                        <div className="w33 text-center">
                                            <span className={styles.appH2Hnumber}>{(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.draws.total}</span>
                                            <span className={styles.appH2Htype}>Draws</span>
                                        </div>
                                        <div className="w33 text-center">
                                            <span className={styles.appH2Hnumber}>{(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.wins.total}</span>
                                            <span className={styles.appH2Htype}>Wins</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w10">
                                    <div className={styles.logoH2H}>
                                        <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`logo ${data.awayTeam.team_name}`} layout='fill' />
                                    </div>
                                </div>
                            </div>
                            {loadx ? (
                                <>
                            <Barchart theme="medium" type="Home wins" a={(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.wins.home} b={(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.wins.home} />
                            <Barchart theme="medium" type="Away wins" a={(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.wins.away} b={(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.wins.away} />
                            <Barchart theme="medium" type="Home draws" a={(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.draws.home} b={(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.draws.home} />
                            <Barchart theme="medium" type="Away draws" a={(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.draws.away} b={(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.draws.away} />
                            <Barchart theme="medium" type="Home loses" a={(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.loses.home} b={(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.loses.home} />
                            <Barchart theme="medium" type="Away loses" a={(loadx && datax.h2h !== null) && datax.h2h.api.teams[0].statistics.loses.away} b={(loadx && datax.h2h !== null) && datax.h2h.api.teams[1].statistics.loses.away} />
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                    <CircularProgress sx={{ color: "red" }} />
                                </Box>
                            )}
                        </div>
                        <Others fixture_id={datas.fixture_id} league_id={data.league_id} league_name_fr={data.league_name_fr} />
                        <Sidebar />
                    </div>
                </div>
                <BetTicket />
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
    const res = await fetch('https://wpen.winflix.net/wp-json/wp/v2/pages?parent=165')
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