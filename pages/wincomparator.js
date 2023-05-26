import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import { UserContext } from '../UserContext'
import Sidebar from '/components/Sidebar'
import Comparator from '/components/Comparator'
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
        const fetcher = await fetch(`${WINFLIX_URL}/api/tools/fr/wincomparator/?date=${filterDay}&league=${filterLeague}`)
        const json = await fetcher.json()
        setDatas(json)
        setDataSave(json)
        setDataSave2(json)
        setFilter3buts("all")
        setFilter5buts("all")
        setFilter8buts("all")
        setLoad(true)
    }

    const compare8ASC = (option1, option2) => {
        const number1 = parseFloat(option1.diffbuts8_moy) > 0 ? parseFloat(option1.diffbuts8_moy)*(-1) : parseFloat(option1.diffbuts8_moy);
        const number2 = parseFloat(option2.diffbuts8_moy) > 0 ? parseFloat(option2.diffbuts8_moy)*(-1) : parseFloat(option2.diffbuts8_moy);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare8DESC = (option1, option2) => {
        const number1 = parseFloat(option1.diffbuts8_moy) > 0 ? parseFloat(option1.diffbuts8_moy)*(-1) : parseFloat(option1.diffbuts8_moy);
        const number2 = parseFloat(option2.diffbuts8_moy) > 0 ? parseFloat(option2.diffbuts8_moy)*(-1) : parseFloat(option2.diffbuts8_moy);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare5ASC = (option1, option2) => {
        const number1 = parseFloat(option1.diffbuts5_moy) > 0 ? parseFloat(option1.diffbuts5_moy)*(-1) : parseFloat(option1.diffbuts5_moy);
        const number2 = parseFloat(option2.diffbuts5_moy) > 0 ? parseFloat(option2.diffbuts5_moy)*(-1) : parseFloat(option2.diffbuts5_moy);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare5DESC = (option1, option2) => {
        const number1 = parseFloat(option1.diffbuts5_moy) > 0 ? parseFloat(option1.diffbuts5_moy)*(-1) : parseFloat(option1.diffbuts5_moy);
        const number2 = parseFloat(option2.diffbuts5_moy) > 0 ? parseFloat(option2.diffbuts5_moy)*(-1) : parseFloat(option2.diffbuts5_moy);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare3ASC = (option1, option2) => {
        const number1 = parseFloat(option1.diffbuts3_moy) > 0 ? parseFloat(option1.diffbuts3_moy)*(-1) : parseFloat(option1.diffbuts3_moy);
        const number2 = parseFloat(option2.diffbuts3_moy) > 0 ? parseFloat(option2.diffbuts3_moy)*(-1) : parseFloat(option2.diffbuts3_moy);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compare3DESC = (option1, option2) => {
        const number1 = parseFloat(option1.diffbuts3_moy) > 0 ? parseFloat(option1.diffbuts3_moy)*(-1) : parseFloat(option1.diffbuts3_moy);
        const number2 = parseFloat(option2.diffbuts3_moy) > 0 ? parseFloat(option2.diffbuts3_moy)*(-1) : parseFloat(option2.diffbuts3_moy);
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
        if(type == "cancel"){
            setFilter3buts("all")
            setFilter5buts("all")
            setFilter8buts("all") 
            setDatas(prev => {
                return prev.sort()
            })        
        }
    }

    const not = () => {
        setSorry(true)
    }

    return (
        <div className={styles.appTools}>
            <Head>
                <title>WinComparator | Predictions based on different goals</title>
                <meta name="description" content="Sports Betting Tool >> Find football prediction based on goal difference between 2 teams ⚽" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/wincomparator/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/wincomparator/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/wincomparator/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/wincomparator/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/wincomparator/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/wincomparator/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/wincomparator/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/wincomparator/" />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content="WinComparator | Predictions based on different goals" />
                <meta property="og:description" content="Sports Betting Tool >> Find football prediction based on goal difference between 2 teams ⚽" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_EN" /> 
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}><span className={styles.toptag}>WinComparator</span> Predictions based on different goals</h1>
                            <div className={styles.sep}></div>
                            <p>This tool allows you to get the best soccer predictions based on the differences in the averages of the teams that meet each other. Nothing could be easier to use! You just have to choose a league, a date and spartiamo, the algorithm that works for you!</p>
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
                                        <MenuItem value={"all"}>All League</MenuItem>
                                        {loadLeague && leagues.map((league, index) => {
                                            return <MenuItem key={index} value={league.id}>{league.country} - {league.league}</MenuItem>
                                        })}
                                    </Select>                           
                                </FormControl>

                                <div className="mCenter wm100 mmTop15">
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
                                        <div className="flex toColumn">
                                            <div className="w50 wm100 mmBot10">
                                                <span className={styles.legend}><strong>Legend: </strong><br />
                                                  TG: Average goals scored in the last X Games<br />
                                                  TK: Average goals conceded in the last X games
                                                </span>
                                            </div>
                                            <div className="wm100">
                                                <span className={styles.legend}><span style={{ color : 'green' }}>Green </span>: Home advantage<br />
                                                <span style={{ color : 'orange' }}>Orange </span>: Neutral<br />
                                                <span style={{ color : '#2082ff' }}>Blue </span>: Away advantage</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.filters} ${styles.filtersScore} flex aligncenter space-between mTop30 mBot30 mmBot20`}>
                                        <div className="flex aligncenter mRight10">
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Goal difference 8 games</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filter8buts}
                                                    label="Goal difference 8 games"
                                                    onChange={(event) => tri('8', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Goal difference 5 games</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filter5buts}
                                                    label="Goal difference 5 games"
                                                    onChange={(event) => tri('5', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Goal difference 3 games</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filter3buts}
                                                    label="Goal difference 3 games"
                                                    onChange={(event) => tri('3', event)}
                                                >
                                                      <MenuItem value={"all"}>Random Order</MenuItem>
                                                      <MenuItem value={"asc"}>Sort by ASC order</MenuItem>
                                                      <MenuItem value={"desc"}>Sort by DESC</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                            <div className="mRight10">
                                                <Chip label="Cancel" icon={<CancelIcon sx={{ fontSize: '14px' }} />} variant="outlined" className={styles.chip} onClick={() => tri('cancel')} />
                                            </div> 
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className={`flex wrap`}>
                                {start ? load ? datas.length > 0 ? datas.map((result, index) => {
                                    return <Comparator key={index} item={result} />
                                }) : (
                                    <span className={styles.sorry}><strong>Sorry... </strong> <br /> No results for this query.</span>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                                        <span className={styles.loading}><strong>Algorithm running <br /> please wait...</strong></span>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                ) : sorry ? (
                                    <>
                                        <div className="text-center relative w100">
                                            <span className={`app-title-h2-medium ${styles.sorry}`} style={{ fontSize: '16px' }}><span>🔐</span>Sorry, this tool is for active members only<br />
                                            <Link href="/vip/">Become a VIP member</Link> 
                                            </span>
                                            <div className={`${styles.example} noM`} style={{ filter: "blur(12px)", opacity: "0.5" }}>
                                                <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wincomparator-desktop-en.png`} alt="exemple" layout="fill" />
                                            </div>
                                            <div className={`${styles.example} noDisplay`} style={{ filter: "blur(12px)", opacity: "0.5" }}>
                                                <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wincomparator-mobile-en.png`} alt="exemple" layout="fill" />
                                            </div>
                                        </div>                                    
                                    </>
                                ) : (
                                    <div className="text-center w100">
                                        <span className="app-title-h2-medium" style={{ fontSize: '16px' }}>Here is an example of a result :</span>
                                        <div className={`${styles.example} noM`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wincomparator-desktop-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                        <div className={`${styles.example} noDisplay`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wincomparator-mobile-en.png`} alt="exemple" layout="fill" />
                                        </div>
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

