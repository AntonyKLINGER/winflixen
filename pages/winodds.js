import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { UserContext } from '../UserContext'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
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


export default function WinCotes(){

    const {sub, setSub} = useContext(UserContext)
    const [dates, setDates] = React.useState({})
    const [filterDay, setFilterDay] = React.useState("live");
    const [filterLeague, setFilterLeague] = React.useState("all");
    const [leagues, setLeagues] = React.useState([])
    const [loadLeague, setLoadLeague] = React.useState(false)
    const [coteMin, setCoteMin] = React.useState("1.30")
    const [coteMax, setCoteMax] = React.useState("1.65")
    const [tauxMin, setTauxMin] = React.useState("50")
    const [tauxMax, setTauxMax] = React.useState("100")
    const [results, setResults] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [loadate, setLoadate] = React.useState(false)
    const [resultSave, setResultSave] = React.useState([])
    const [first, setFirst] = React.useState(false)
    const [sorry, setSorry] = React.useState(false)

    const changeCoteMin = async (event) => {
        await setCoteMin(event.target.value)
    }

    const changeCoteMax = async (event) => {
        await setCoteMax(event.target.value)
    }

    const changeTauxMin = async (event) => {
        await setTauxMin(event.target.value)
    }

    const changeTauxMax = async (event) => {
        await setTauxMax(event.target.value)
    }

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
        setLoadate(true)
    }, [])

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

    
    const go = async () => {
        setFirst(true)
        setLoad(false) 
        const fetcher = await fetch(`${WINFLIX_URL}/api/tools/fr/wincotes/?date=${filterDay}&pays=${filterLeague}&min=${coteMin.replaceAll(".", "_").replaceAll(",", "_")}&max=${coteMax.replaceAll(".", "_").replaceAll(",", "_")}&mins=${tauxMin.replaceAll(".", "_").replaceAll(",", "_")}&maxs=${tauxMax.replaceAll(".", "_").replaceAll(",", "_")}`)
        const json = await fetcher.json()
        setResults(json)
        setResultSave(json)
        setLoad(true) 
    }

    
        // useEffect(() => {
        //     if(first == false){
        //     fetch(`${WINFLIX_URL}/api/tools/fr/wincotes/?date=06-01-2023&pays=all&min=1_25&max=1_50&mins=65&maxs=`)
        //     .then(resp => resp.json())
        //     .then(json => {
        //         setResults(json)
        //         setResultSave(json)
        //         setLoad(true)    
        //         setFirst(true)         
        //     }) 
        //     }    
        // }, [])
    

    const compareCotesASC = (option1, option2) => {
        const cote1 = parseFloat(option1.cote);
        const cote2 = parseFloat(option2.cote);
        if (cote1 < cote2) {
          return -1;
        } else if (cote1 > cote2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compareCotesTauxASC = (a, b) => {
        const float1 = a.taux;
        const float2 = b.taux;
        if (float1 < float2) {
          return -1;
        } else if (float1 > float2) {
          return 1;
        } else {
          // Si les deux premiers champs sont égaux, comparez les deuxièmes champs
          const float3 = a.cote;
          const float4 = b.cote;
          if (float3 < float4) {
            return -1;
          } else if (float3 > float4) {
            return 1;
          } else {
            return 0;
          }
        }
      }
      

    const compareCotesDESC = (option1, option2) => {
        const cote1 = parseFloat(option1.cote);
        const cote2 = parseFloat(option2.cote);
        if (cote1 > cote2) {
          return -1;
        } else if (cote1 < cote2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compareCotesTauxDESC = (a, b) => {
        const float1 = a.taux;
        const float2 = b.taux;
        if (float1 > float2) {
          return -1;
        } else if (float1 < float2) {
          return 1;
        } else {
          // Si les deux premiers champs sont égaux, comparez les deuxièmes champs
          const float3 = a.cote;
          const float4 = b.cote;
          if (float3 > float4) {
            return -1;
          } else if (float3 < float4) {
            return 1;
          } else {
            return 0;
          }
        }
      }

    const tri = (type) => {
        if(type == "oddsASC"){
            let step1 = []
            let step2 = []
            let trier = []
            resultSave.map((item, i) => {
                if(item.opt && item.opt.length > 0){
                    item.opt.map((op, i) => {
                        step1.push(op)
                    })
                }
            })
            step2 = step1.sort(compareCotesASC)
            step2.map((m) => {
                trier.push({
                    match: m.match,
                    url: m.url,
                    opt: [{...m, tri: true}],
                })
            })
            setResults(trier)
        }  
        if(type == "oddsDESC"){
            let step1 = []
            let step2 = []
            let trier = []
            resultSave.map((item, i) => {
                if(item.opt && item.opt.length > 0){
                    item.opt.map((op, i) => {
                        step1.push(op)
                    })
                }
            })
            step2 = step1.sort(compareCotesDESC)
            step2.map((m) => {
                trier.push({
                    match: m.match,
                    url: m.url,
                    opt: [{...m, tri: true}],
                })
            })
            setResults(trier)
        }   
        if(type == "oddsASCtaux"){
            let step1 = []
            let step2 = []
            let trier = []
            resultSave.map((item, i) => {
                if(item.opt && item.opt.length > 0){
                    item.opt.map((op, i) => {
                        step1.push(op)
                    })
                }
            })
            step2 = step1.sort(compareCotesTauxASC)
            step2.map((m) => {
                trier.push({
                    match: m.match,
                    url: m.url,
                    opt: [{...m, tri: true}],
                })
            })
            setResults(trier)
        }
        if(type == "oddsDESCtaux"){
            let step1 = []
            let step2 = []
            let trier = []
            resultSave.map((item, i) => {
                if(item.opt && item.opt.length > 0){
                    item.opt.map((op, i) => {
                        step1.push(op)
                    })
                }
            })
            step2 = step1.sort(compareCotesTauxDESC)
            step2.map((m) => {
                trier.push({
                    match: m.match,
                    url: m.url,
                    opt: [{...m, tri: true}],
                })
            })
            setResults(trier)
        }
        if(type == "cancel"){
            setResults(resultSave)
        }     
    }

    const not = () => {
        setSorry(true)
    }

    

    return (
        <div className={styles.appTools}>
            <Head>
                <title>WinOdds | Find the best match odds on your terms !</title>
                <meta name="description" content="Find the best odds according to the conditions you decide. Whether for a single bet or a combination WinOdds is the best tool for you!" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/wincotes/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/winodds/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/winodds/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/winodds/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/wincotes/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/winodds/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/winodds/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/winodds/" />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content="WinOdds | Find the best match odds on your terms !" />
                <meta property="og:description" content="Find the best odds according to the conditions you decide. Whether for a single bet or a combination WinOdds is the best tool for you!" />
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
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}><span className={styles.toptag}>WinOdds</span> Find the best odds according to your terms !</h1>
                            <div className={styles.sep}></div>
                            <p>How does the WinOdds tool work? The principle is very simple, you want to find all available game options between a minimum odds and a maximum odds among all the games of a day. Enter the minimum (or maximum) reliability rate and use the game options for each game according to your criteria!</p>
                        </div>
                        <div className="app-content mBot30">
                            <div className="flex space-between">
                                <FormControl sx={{ m: 0, minWidth: '45%', ['@media(max-width:810px)'] : {marginRight: '10px !important', minWidth: '40% !important', width: '40%'} }} size="small">
                                <InputLabel id="demo-select-small">Choose a date</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={filterDay}
                                        label="Choose a date"
                                        onChange={handleChangeDay}
                                    >
                                        {loadate && <MenuItem value={dates.avanthier2.replaceAll("/", "-")}>{dates.avanthier2}</MenuItem>}
                                        {loadate && <MenuItem value={dates.avanthier.replaceAll("/", "-")}>{dates.avanthier}</MenuItem>}
                                        {loadate && <MenuItem value={dates.hier.replaceAll("/", "-")}>{dates.hier}</MenuItem>}
                                        <MenuItem value={"live"}>Today</MenuItem>
                                        {loadate && <MenuItem value={dates.demain.replaceAll("/", "-")}>{dates.demain}</MenuItem>}
                                        {loadate && <MenuItem value={dates.apresdemain.replaceAll("/", "-")}>{dates.apresdemain}</MenuItem>}
                                        {loadate && <MenuItem value={dates.apresdemain2.replaceAll("/", "-")}>{dates.apresdemain2}</MenuItem>}
                                    </Select>                           
                                </FormControl>
                                <FormControl sx={{ m: 0, minWidth: '50%', ['@media(max-width:810)']: { marginLeft: '10px', minWidth:'45%' } }} size="small">
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
                            </div>
                            <div className={`flex mTop30 space-between wrap aligncenter ${styles.textField}`}>
                                <TextField
                                id="outlined-basic"
                                label="Odd min"
                                type="text"
                                value={coteMin}
                                size="small"
                                sx={{ width: '18%', ['@media(max-width:810px)']: { width: '23%'}, fontSize: '14px' }}
                                onChange={changeCoteMin}
                                />  
                                <TextField
                                id="outlined-basic"
                                label="Odd max"
                                type="text"
                                value={coteMax}
                                size="small"
                                sx={{ width: '18%', ['@media(max-width:810px)']: { width: '23%'}, fontSize: '14px' }}
                                onChange={changeCoteMax}
                                /> 
                                <TextField
                                id="outlined-basic"
                                label="Probability min"
                                type="text"
                                value={tauxMin}
                                size="small"
                                sx={{ width: '18%', ['@media(max-width:810px)']: { width: '23%'}, fontSize: '14px' }}
                                onChange={changeTauxMin}
                                />  
                                <TextField
                                id="outlined-basic"
                                label="Probability max"
                                type="text"
                                value={tauxMax}
                                size="small"
                                sx={{ width: '18%', ['@media(max-width:810px)']: { width: '23%'}, fontSize: '14px' }}
                                onChange={changeTauxMax}
                                /> 
                                <div className={`${styles.mobCenter} mmTop15`}>
                                    {sub.status == "active" ? (
                                        <Button startIcon={<ManageSearchIcon />} variant="contained" onClick={go} className="mmTop20" disableElevation>Search</Button>      
                                    ) : (
                                        <Button startIcon={<ManageSearchIcon />} variant="contained" onClick={not} className="mmTop20" disableElevation>Search</Button>      
                                    )}                                    
                                </div>
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            {load && (
                                <>
                                <div className={styles.explains}>
                                    <div className="flex toColumn">
                                        <div className="w100 wm100 mmBot10">
                                            <span className={styles.legend}><strong>Understand this tool:</strong><br /><br />
                                            The % stats are based on thousands of games whose ratings are <strong>equal</strong> for each game in question. These odds are therefore based on <strong>match ratings</strong> only. Thanks to this tool you can find the best <strong>reliability rates/rate ratio</strong> depending on your criteria.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.filters} flex aligncenter mBot30`}>
                                    <div className="mRight10">
                                        <Chip label="Filter by odd" icon={<FilterListIcon sx={{ fontSize: '14px', transform: 'rotate(180deg)' }} />} variant="outlined" className={styles.chip} onClick={() => tri('oddsASC')} />
                                    </div>
                                    <div className="mRight10">
                                        <Chip label="Filter by odd" icon={<FilterListIcon sx={{ fontSize: '14px' }} />} variant="outlined" className={styles.chip} onClick={() => tri('oddsDESC')} />
                                    </div>   
                                    <div className="mRight10">
                                        <Chip label="Filter by rate & odd" icon={<FilterListIcon sx={{ fontSize: '14px', transform: 'rotate(180deg)' }} />} variant="outlined" className={styles.chip} onClick={() => tri('oddsASCtaux')} />
                                    </div>   
                                    <div className="mRight10">
                                        <Chip label="Filter by rate & odd" icon={<FilterListIcon sx={{ fontSize: '14px' }} />} variant="outlined" className={styles.chip} onClick={() => tri('oddsDESCtaux')} />
                                    </div>   
                                    <div className="mRight10">
                                        <Chip label="Cancel" icon={<CancelIcon sx={{ fontSize: '14px' }} />} variant="outlined" className={styles.chip} onClick={() => tri('cancel')} />
                                    </div>                                  
                                </div>
                                </>
                            )}
                            {load ? results.map((result, index) => {
                                if(result.opt && result.opt.length > 0){
                                    return (
                                        <div key={index} className={styles.matchBox}>
                                            <fieldset>
                                                <legend>{result.match} <Link href={result.url}><span className="material-icons" data-icon="equalizer"></span></Link></legend>
                                                <div className="flex wrap">
                                                    {result.opt.map((option, index) => (
                                                        <>
                                                            <OptionMatch key={index} data={option} /> 
                                                        </>                                       
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    )
                                }
                            }) : first === true ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                                    <span className={styles.loading}><strong>Algorithm running <br /> please wait...</strong></span>
                                    <CircularProgress sx={{ color: "red" }} />
                                </Box>
                            ) : sorry ? (
                                <>
                                    <div className="text-center relative">
                                        <span className={`app-title-h2-medium ${styles.sorry}`} style={{ fontSize: '16px' }}><span>🔐</span>Sorry, this tool is for active members only<br />
                                        <Link href="/vip/">Become a VIP member</Link> 
                                        </span>
                                        <div className={`${styles.example} noM`} style={{ filter: "blur(12px)" }}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winodds-desktop-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                        <div className={`${styles.example} noM`} style={{ filter: "blur(12px)" }}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winodds-mobile-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                    </div>                                    
                                </>
                            ) : (
                                <>
                                    <div className="text-center">
                                        <span className="app-title-h2-medium" style={{ fontSize: '16px' }}>Here is an example of a result :</span>
                                        <div className={`${styles.example} noM`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winodds-desktop-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                        <div className={`${styles.example} noDisplay`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winodds-mobile-en.png`} alt="exemple" layout="fill" />
                                        </div>
                                    </div>
                                </>
                            )}
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

