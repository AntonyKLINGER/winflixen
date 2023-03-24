import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import GoalComparaison from '/components/GoalComparaison'
import { UserContext } from '../UserContext'
import OptionMatch from '/components/OptionMatch'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Tools.module.css'
import BlogPostList from '../components/BlogPostList'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from '@mui/icons-material/Cancel';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';


export default function WinComparator(){

    const {sub, setSub} = useContext(UserContext)
    const [dates, setDates] = React.useState({})
    const [filterLeague, setFilterLeague] = React.useState("all");
    const [leagues, setLeagues] = React.useState([])
    const [loadLeague, setLoadLeague] = React.useState(false)
    const [filterDay, setFilterDay] = React.useState(0);
    const [filterMoy, setFilterMoy] = React.useState("all")
    const [filter8buts, setFilter8buts] = React.useState("all")
    const [filter5buts, setFilter5buts] = React.useState("all")
    const [filter3buts, setFilter3buts] = React.useState("all")
    const [loadate, setLoadate] = React.useState(false)
    const [datas, setDatas] = React.useState([])
    const [dataSave, setDataSave] = React.useState([])
    const [dataSave2, setDataSave2] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [start, setStart] = React.useState(false)
    const [sorry, setSorry] = React.useState(false)

    const handleChangeLeague = async (event) => {
        await setFilterLeague(event.target.value);
    };

    useEffect(() => {
        const getLeagues = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/leagues/fr/`)
            const json = await fetcher.json()
            setLeagues(json)
            setLoadLeague(true)
        }
        getLeagues()
    }, [])

    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: '200px'
          },
        },
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
        setLoadate(true)
    }, [])

    
    const handleChangeDay = async (event) => {
        await setFilterDay(event.target.value);
    };

    const handleChangeNumber = async (event) => {
        await setFilterNumber(event.target.value);
    };

    const changePercentMin = async (event) => {
        await setFilterPercent(event.target.value);
    };

    const go = async () => {
        setStart(true)
        setLoad(false)
        const fetcher = await fetch(`${WINFLIX_URL}/api/tools/fr/wingoal/?date=${filterDay}&league=${filterLeague}`)
        const json = await fetcher.json()
        setDatas(json)
        setDataSave(json)
        setDataSave2(json)
        setFilter3buts("all")
        setFilter5buts("all")
        setFilter8buts("all")
        setFilterMoy("all")
        setLoad(true)
    }

    const comparemASC = (option1, option2) => {
        const number1 = parseFloat(option1.tauxMG) > 0 ? parseFloat(option1.tauxMG)*(-1) : parseFloat(option1.tauxMG);
        const number2 = parseFloat(option2.tauxMG) > 0 ? parseFloat(option2.tauxMG)*(-1) : parseFloat(option2.tauxMG);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const comparemDESC = (option1, option2) => {
        const number1 = parseFloat(option1.tauxMG) > 0 ? parseFloat(option1.tauxMG)*(-1) : parseFloat(option1.tauxMG);
        const number2 = parseFloat(option2.tauxMG) > 0 ? parseFloat(option2.tauxMG)*(-1) : parseFloat(option2.tauxMG);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare8ASC = (option1, option2) => {
        const number1 = parseFloat(option1.taux8) > 0 ? parseFloat(option1.taux8)*(-1) : parseFloat(option1.taux8);
        const number2 = parseFloat(option2.taux8) > 0 ? parseFloat(option2.taux8)*(-1) : parseFloat(option2.taux8);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare8DESC = (option1, option2) => {
        const number1 = parseFloat(option1.taux8) > 0 ? parseFloat(option1.taux8)*(-1) : parseFloat(option1.taux8);
        const number2 = parseFloat(option2.taux8) > 0 ? parseFloat(option2.taux8)*(-1) : parseFloat(option2.taux8);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare5ASC = (option1, option2) => {
        const number1 = parseFloat(option1.taux5) > 0 ? parseFloat(option1.taux5)*(-1) : parseFloat(option1.taux5);
        const number2 = parseFloat(option2.taux5) > 0 ? parseFloat(option2.taux5)*(-1) : parseFloat(option2.taux5);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare5DESC = (option1, option2) => {
        const number1 = parseFloat(option1.taux5) > 0 ? parseFloat(option1.taux5)*(-1) : parseFloat(option1.taux5);
        const number2 = parseFloat(option2.taux5) > 0 ? parseFloat(option2.taux5)*(-1) : parseFloat(option2.taux5);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare3ASC = (option1, option2) => {
        const number1 = parseFloat(option1.taux3) > 0 ? parseFloat(option1.taux3)*(-1) : parseFloat(option1.taux3);
        const number2 = parseFloat(option2.taux3) > 0 ? parseFloat(option2.taux3)*(-1) : parseFloat(option2.taux3);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare3DESC = (option1, option2) => {
        const number1 = parseFloat(option1.taux3) > 0 ? parseFloat(option1.taux3)*(-1) : parseFloat(option1.taux3);
        const number2 = parseFloat(option2.taux3) > 0 ? parseFloat(option2.taux3)*(-1) : parseFloat(option2.taux3);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const tri = (type, event) => {
        if(type == "8"){
            setFilter8buts(event.target.value)
            setFilter5buts("all")
            setFilter3buts("all")
            setFilterMoy("all")
            if(event.target.value != "all"){
                setDatas(prev => {
                    if(event.target.value == "asc"){
                        return dataSave.sort(compare8ASC)
                    }   
                    else{
                        return dataSave.sort(compare8DESC)
                    }                     
                })                
            }
        }
        if(type == "5"){
            setFilter5buts(event.target.value)
            setFilter8buts("all")
            setFilter3buts("all")
            setFilterMoy("all")
            if(event.target.value != "all"){
                setDatas(prev => {
                    if(event.target.value == "asc"){
                        return dataSave.sort(compare5ASC)
                    }   
                    else{
                        return dataSave.sort(compare5DESC)
                    }                     
                })                
            }
        }
        if(type == "3"){
            setFilter3buts(event.target.value)
            setFilter8buts("all")
            setFilter5buts("all")
            setFilterMoy("all")
            if(event.target.value != "all"){
                setDatas(prev => {
                    if(event.target.value == "asc"){
                        return dataSave.sort(compare3ASC)
                    }   
                    else{
                        return dataSave.sort(compare3DESC)
                    }                     
                })                
            }
        }
        if(type == "moy"){
            setFilterMoy(event.target.value) 
            setFilter3buts("all")
            setFilter5buts("all")
            setFilter8buts("all") 
            if(event.target.value != "all"){
                setDatas(prev => {
                    if(event.target.value == "asc"){
                        return dataSave.sort(comparemASC)
                    }   
                    else{
                        return dataSave.sort(comparemDESC)
                    }                     
                })                  
            }       
        }
    }

    const not = () => {
        setSorry(true)
    }

    return (
        <div className={styles.appTools}>
            <Head>
                <title>Predictions Over/Under of 2.5 goals WinGoal</title>
                <meta name="description" content="Are you looking for a reliable prediction to bet on the option more or less than 2.5 goals in the game? Use WinGoal, the ideal tool for over/under betting on soccer." />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/wingoal/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/wingoal/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/wingoal/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/wingoal/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/wingoal/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/wingoal/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/wingoal/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/wingoal/" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}><span className={styles.toptag}>WinGoal</span> Goals prediction tools +2.5 goals</h1>
                            <div className={styles.sep}></div>
                            <p>Quickly and easily identify the games with the greatest potential to finish more than 2.5 goals based on past results only in the league the team plays in.</p>
                            <p>This tool allows you to rank soccer sports games based on teams that have their past games (last 8 games, last 5 games or last 3 games) with a total goal in the match over 2, 5 have completed goals. For each game you will get the stats of the game that ended with more than 2.5 goals for each team as well as the average for the 2 teams.</p>
                        </div>
                        <div className={`app-content mBot30 ${styles.ajustPadd}`}>
                            <div className={`flex space-between wrap ${styles.allFilters} ${styles.textFieldT}`}>

                                <FormControl sx={{ m: 0, minWidth: '36%', ['@media(max-width:810px)']: { width: '48%'} }} size="small">
                                <InputLabel id="demo-select-small">Choose a date</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={filterDay}
                                        label="Choose a date"
                                        onChange={handleChangeDay}
                                    >
                                        {loadate && <MenuItem value={4}>{dates.avanthier2}</MenuItem>}
                                        {loadate && <MenuItem value={5}>{dates.avanthier}</MenuItem>}
                                        {loadate && <MenuItem value={6}>{dates.hier}</MenuItem>}
                                        <MenuItem value={0}>Today</MenuItem>
                                        {loadate && <MenuItem value={1}>{dates.demain}</MenuItem>}
                                        {loadate && <MenuItem value={2}>{dates.apresdemain}</MenuItem>}
                                        {loadate && <MenuItem value={3}>{dates.apresdemain2}</MenuItem>}
                                    </Select>                           
                                </FormControl>

                                <FormControl sx={{ m: 0, minWidth: '38%', ['@media(max-width:810px)']: { width: '48%'} }} size="small">
                                <InputLabel id="demo-select-small-league">Choose a league</InputLabel>
                                    <Select
                                        labelId="demo-select-small-league"
                                        id="demo-select-small"
                                        value={filterLeague}
                                        label="Choose a league"
                                        onChange={handleChangeLeague}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value={"all"}>All leagues</MenuItem>
                                        {loadLeague && leagues.map((league, index) => {
                                            return <MenuItem key={index} value={league.id}>{league.country} - {league.league}</MenuItem>
                                        })}
                                    </Select>                           
                                </FormControl>
                                
                                <div className="mCenter text-center wm100 mmTop15">
                                    {sub.status == "active" ? (
                                        <Button onClick={go} startIcon={<ManageSearchIcon />} variant="contained" className="mmTop15" disableElevation>Search</Button> 
                                    ) : (
                                        <Button onClick={not} startIcon={<ManageSearchIcon />} variant="contained" className="mmTop15" disableElevation>Search</Button> 
                                    )}                                   
                                </div>                                     
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            {(start && load) && (
                                <>
                                    <div className={styles.explains}>
                                        <span className={styles.legend}><strong>Understand this tool :</strong><br /><br />
                                        With this tool you can determine the probability of a game ending with <strong>+2.5 goals or less</strong>. But how are all these statistics calculated? The algorithm determines the rate of games ending with +2.5 goals in the last 3, 5 and 8 games for the home team and the away team. <strong>Important:</strong> These stats are based on league games only. 
                                        </span>
                                        <div className="flex toColumn mTop20">
                                            <div className="w50 wm100 mmBot10">
                                                
                                                <span className={styles.legend}><strong>Legend :</strong><br />
                                                <span style={{ display: 'inline-block', width: '20px', height: '10px', background: 'red', borderRadius: '2px', marginRight: '4px', transform: 'translateY(1px)' }}></span> : Rate +2.5 Home Team Goals<br />
                                                <span style={{ display: 'inline-block', width: '20px', height: '10px', background: '#d20000', borderRadius: '2px', marginRight: '4px', transform: 'translateY(1px)' }}></span> : Rate +2.5 Away Team Goals
                                                </span>
                                            </div>
                                            <div className="wm100">
                                            <span className={styles.legend}><span style={{ color : 'green' }}>Green</span>: +2.5 use recommended / -2.5 use not recommended<br />
                                                  <span style={{ color : 'orange' }}>Orange</span>: Deploy +2.5 Fragile / Deploy -2.5 Fragile<br />
                                                  <span style={{ color : 'red' }}>Red</span>: Stake +2.5 not recommended / Stake -2.5 recommended
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.filters} ${styles.filtersScore} flex aligncenter space-between mBot30 mmBot20`}>
                                        <div className="flex aligncenter mRight10">
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Sort by average</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filterMoy}
                                                    label="Sort by average"
                                                    onChange={(event) => tri('moy', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC order</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Sort by 8 matches</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filter8buts}
                                                    label="Sort by 8 matches"
                                                    onChange={(event) => tri('8', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC order</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Sort by 5 matches</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filter5buts}
                                                    label="Sort by 5 matches"
                                                    onChange={(event) => tri('5', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC order</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Sort by 3 matches</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filter3buts}
                                                    label="Sort by 3 matches"
                                                    onChange={(event) => tri('3', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC order</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={`flex wrap`}>
                                {start ? load ? datas.length > 0 ? datas.map((result, index) => {
                                    return <GoalComparaison key={index} item={result} />
                                }) : (
                                    <span className={styles.sorry}><strong>Sorry...</strong><br />There are no results for this search.</span>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                                        <span className={styles.loading}><strong>Algorithm running<br />Please wait...</strong></span>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                ) : sorry ? (
                                    <>
                                        <div className="text-center relative w100">
                                            <span className={`app-title-h2-medium ${styles.sorry}`} style={{ fontSize: '16px' }}><span>🔐</span>Sorry, this tool is for active members only<br />
                                            <Link href="/vip/">Become a VIP member</Link> 
                                            </span>
                                            <div className={`${styles.example} noM`} style={{ filter: "blur(12px)", opacity: "0.5" }}>
                                                <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wingoal-desktop-en.png`} alt="exemple" layout="fill" />
                                            </div>
                                            <div className={`${styles.example} noDisplay`} style={{ filter: "blur(12px)", opacity: "0.5" }}>
                                                <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wingoal-mobile-en.png`} alt="exemple" layout="fill" />
                                            </div>
                                        </div>                                    
                                    </>
                                ) : (
                                    <div className="text-center w100">
                                        <span className="app-title-h2-medium" style={{ fontSize: '16px' }}>Here is an example result :</span>
                                        <div className={`${styles.example} noM`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wingoal-desktop-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                        <div className={`${styles.example} noDisplay`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wingoal-mobile-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <h2 className="app-title-h2">Understand the basis of the odds of +2.5 goals displayed in the results</h2>
                            <p><strong>• Team A</strong>: In Team A's last 5 games, they have finished 4 of their last 5 games with the highest total goals (goals conceded and goals scored) of 2.5 goals. so we show 80% for Team A.</p>
                            <p><strong>• Team B</strong>: If Team B has finished the last 5 games of its league with a total goals score of more than 2.5, the percentage is 100%.</p >
                            <p><strong>• Average</strong>: The average of the soccer game between team A and team B considering the last 5 games of their championship gives us a probability (80% + 100%) / 2 = 90% . Therefore, based on each team's last 5 games, we can estimate that there is a 90% chance that the game would end with more than 2.5 goals.</p>
                        </div>
                        <div className="app-content mBot30">
                            <h2 className="app-title-h2">Over/Under 2.5 Goals Prediction: How do I find the soccer matches of the day?</h2>
                            <p>The tool allows you to rank the football matches of the day based on those who finished their last games with more than 2.5 goals per game in the last 8 games, the last 5 games and the last 3 games.</ p>
                            <p>• If you're looking for a solid base, look at the last 8 games.<br />• If you want a trend more based on team form, look at the last 3 games.<br />• If You a relatively average stable and taking into account the progress of the module, use the column of the last 5 games.</p>
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

