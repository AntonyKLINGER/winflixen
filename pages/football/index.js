import React, { useEffect, useContext } from 'react'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import LiveMatch from '/components/LiveMatch'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Live.module.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserContext } from '../../UserContext';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Livescore(){

    const {user, setUser} = React.useContext(UserContext)
    const {sub, setSub} = React.useContext(UserContext)
    const [filterDay, setFilterDay] = React.useState("live");
    const [dates, setDates] = React.useState({})
    const [filterLeague, setFilterLeague] = React.useState("all");
    const [datas, setDatas] = React.useState(null)
    const [database, setDatabase] = React.useState(null)
    const [databaseb, setDatabaseb] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [loadb, setLoadb] = React.useState(false)

    const handleChangeDay = async (event) => {
        await setFilterDay(event.target.value);
    };

    const handleChangeLeague = async (event) => {
        await setFilterLeague(event.target.value);
    };

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
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if(filterDay == "live" && filterLeague == "all"){
                fetch(`${WINFLIX_URL}/api/fixtures/live/?id=${filterDay}`)
                .then((resp) => resp.json())
                .then((json) => {
                setDatabase(json);
                setDatabaseb(json)               
                });
            }
          }, 1000);      
        return () => clearInterval(interval);
    }, [filterDay, filterLeague])

    useEffect(() => {
        setLoad(false);
        fetch(`${WINFLIX_URL}/api/fixtures/live/?id=${filterDay}`)
          .then((resp) => resp.json())
          .then((json) => {
            setDatabase(json);
            setDatabaseb(json)
            setFilterLeague("all");
            setLoad(true);
          });
      }, [filterDay]);


    useEffect(() => {
        setDatabase(databaseb)
        if(filterLeague == "all"){

        }
        else{
            setDatabase(prevBase => {
                return prevBase.filter(league => league[0] == filterLeague)
            })            
        }

    }, [filterLeague])


    return (
        <div className={styles.appLivescore}>
            <Head>
                <title>Live Football Real Time ▷ Live, Scores, Predictions, 36 Leagues</title>
                <meta name="description" content="With Winflix livescore you can follow football matches from 36 leagues live! All results live." />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/football/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/fussball/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/calcio/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/football/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/football/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/fussball/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/calcio/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/football/" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 app-content relative mRight30 mRnone wm100">
                        <span className="app-title-h2 flex aligncenter"><span className={styles.isLive}></span> Livescore</span>
                        <h1 className="app-h1-small mTop10 mmTop20">Match Live: All live football matches with best predictions, best stats, video highlights of matches</h1>
                        <div className={styles.filterLive}>
                        <FormControl sx={{ m: 0, minWidth: 200, ['@media(max-width:810px)']: { minWidth: '40%'} }} size="small">
                        <InputLabel id="demo-select-small">Filter by day</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={filterDay}
                                label="Filter by day"
                                onChange={handleChangeDay}
                            >
                                <MenuItem value={"-3"}>{dates.avanthier2}</MenuItem>
                                <MenuItem value={"-2"}>{dates.avanthier}</MenuItem>
                                <MenuItem value={"-1"}>{dates.hier}</MenuItem>
                                <MenuItem value={"live"}>Today</MenuItem>
                                <MenuItem value={"-d1"}>{dates.demain}</MenuItem>
                                <MenuItem value={"-d2"}>{dates.apresdemain}</MenuItem>
                                <MenuItem value={"-d3"}>{dates.apresdemain2}</MenuItem>
                            </Select>                           
                        </FormControl>
                        <FormControl sx={{ m: 0, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-league">Filter by league</InputLabel>
                            <Select
                                labelId="demo-select-small-league"
                                id="demo-select-small"
                                value={filterLeague}
                                label="Filter by league"
                                onChange={handleChangeLeague}
                            >
                                <MenuItem value={"all"}>All leagues</MenuItem>
                                {load && databaseb.map((league, index) => {
                                    return <MenuItem key={index} value={`${league[1][0].league_id}`}>{league[1][0].country} - {league[1][0].league_name}</MenuItem>
                                })}
                                
                            </Select>                           
                        </FormControl>
                        </div>
                        <div className="appLive mTop30">
                        {load ? 
                            database.map((match, index) => {
                                return (
                                    <div key={index}>
                                        <span key={index} className={styles.leagueName}>
                                            <div className="flagTeamLive">
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/${match[1][0].flag}`} alt="logo team" layout="fill" />
                                            </div>  
                                            <span>{match[1][0].country} - {match[1][0].league_name} ({match[1].length})</span>
                                        </span>
                                        {match[1].map((item, index) => {
                                            return <LiveMatch key={index} item={item} />
                                        })}
                                    </div>
                                )
                            }) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '50px' }}>
                                    <span className={styles.loading}><strong>Loading live and predictions<br />Please wait...</strong></span>
                                    <CircularProgress sx={{ color: "red" }} />
                                </Box>
                            )
                        }
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

// export async function getServerSideProps({req, res}) {
//     res.setHeader(
//         'Cache-Control',
//         'public, s-maxage=60, stale-while-revalidate=59'
//     )
//     // Fetch data from external API
//     const resq = await fetch(`${WINFLIX_URL}/api/fixtures/live/`)
//     const datas = await resq.json()
  
//     // Pass data to the page via props
//     return { props: { datas } }
// }