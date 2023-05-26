import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import WinScore from '/components/Winscore'
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
import { UserContext } from '../UserContext';


export default function WinCotes(){

    const {sub, setSub} = useContext(UserContext)
    const [dates, setDates] = React.useState({})
    const [filterDay, setFilterDay] = React.useState(0);
    const [filterNumber, setFilterNumber] = React.useState(3);
    const [filterOption, setFilterOption] = React.useState("all")
    const [filterButs, setFilterButs] = React.useState("all")
    const [filterDiff, setFilterDiff] = React.useState("all")
    const [percentMin, setFilterPercent] = React.useState(30);
    const [loadate, setLoadate] = React.useState(false)
    const [datas, setDatas] = React.useState([])
    const [dataSave, setDataSave] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [start, setStart] = React.useState(false)
    const [sorry, setSorry] = React.useState(false)

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


    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: '200px'
          },
        },
      };
    
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
        const fetcher = await fetch(`${WINFLIX_URL}/api/tools/fr/winscore/?date=${filterDay}&min=${percentMin}&nb=${filterNumber}`)
        const json = await fetcher.json()
        setDatas(json)
        setDataSave(json)
        setFilterOption("all")
        setFilterButs("all")
        setFilterDiff("all")
        setLoad(true)
    }

    const compareASC = (option1, option2) => {
        const number1 = parseFloat(option1.total_buts);
        const number2 = parseFloat(option2.total_buts);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const comparebASC = (option1, option2) => {
        const number1 = option1.diffbut < 0 ? parseFloat(option1.diffbut)*(-1) : parseFloat(option1.diffbut);
        const number2 = option2.diffbut < 0 ? parseFloat(option2.diffbut)*(-1) : parseFloat(option2.diffbut);
        if (number1 < number2) {
          return -1;
        } else if (number1 > number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const comparebDESC = (option1, option2) => {
        const number1 = option1.diffbut < 0 ? parseFloat(option1.diffbut)*(-1) : parseFloat(option1.diffbut);
        const number2 = option2.diffbut < 0 ? parseFloat(option2.diffbut)*(-1) : parseFloat(option2.diffbut);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compareP = (option1, option2) => {
        const number1 = parseFloat(option1.probability);
        const number2 = parseFloat(option2.probability);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const compareDESC = (option1, option2) => {
        const number1 = parseFloat(option1.total_buts);
        const number2 = parseFloat(option2.total_buts);
        if (number1 > number2) {
          return -1;
        } else if (number1 < number2) {
          return 1;
        } else {
          return 0;
        }        
    }

    const tri = async (type, event) => {

        if(type == "options"){
            setFilterOption(event.target.value);
            if(event.target.value != "all"){
                if(filterButs != "all"){
                    setDatas(prev => {
                        const tab = dataSave.filter((item) => item.opt == event.target.value)
                        if(filterButs == "compareASC"){
                            return tab.sort(compareASC)
                        }   
                        else{
                            return tab.sort(compareDESC)
                        }                     
                    })
                }
                else{
                    if(filterDiff != "all"){
                        setDatas(prev => {
                            const tab = dataSave.filter((item) => item.opt == event.target.value)
                            if(filterDiff == "comparebASC"){
                                return tab.sort(comparebASC)
                            }   
                            else{
                                return tab.sort(comparebDESC)
                            }                     
                        })
                    }
                    else{
                        setDatas(prev => {
                            return dataSave.filter((item) => item.opt == event.target.value)
                        })
                    }
                }
            }
            else{
                if(filterButs != "all"){
                    setDatas(prev => {
                        if(filterButs == "compareASC"){
                            return dataSave.sort(compareASC)
                        }
                        else{
                            return dataSave.sort(compareDESC)
                        }                       
                    })  
                }
                else if(filterDiff != "all"){
                    setDatas(prev => {
                        if(filterDiff == "comparebASC"){
                            return dataSave.sort(comparebASC)
                        }
                        else{
                            return dataSave.sort(comparebDESC)
                        }
                    })                      
                }
                else{
                    setDatas(prev => {
                        return dataSave.sort(compareP)
                    })                      
                }
            }
        }

        if(type == "buts"){
            setFilterButs(event.target.value);
            if(event.target.value != "all"){
                setFilterDiff("all")
                if(filterOption != "all"){
                    setDatas(prev => {
                        const tab = dataSave.filter((item) => item.opt == filterOption)
                        if(event.target.value == "compareASC"){
                            return tab.sort(compareASC)
                        }
                        else{
                            return tab.sort(compareDESC)
                        }                        
                    })                    
                }
                else{
                    setDatas(prev => {
                        if(event.target.value == "compareASC"){
                            return dataSave.sort(compareASC)
                        }
                        else{
                            return dataSave.sort(compareDESC)
                        }
                    })  
                }
            }
            else{
                if(filterOption != "all"){
                    return dataSave.filter((item) => item.opt == filterOption)
                }
                else{
                    setDatas(prev => {
                        return dataSave.sort(compareP)
                    })                         
                }
            }
        }
        if(type == "diff"){
            setFilterDiff(event.target.value);
            if(event.target.value != "all"){
                setFilterButs("all")
                if(filterOption != "all"){
                    setDatas(prev => {
                        const tab = dataSave.filter((item) => item.opt == filterOption)
                        if(event.target.value == "comparebASC"){
                            return tab.sort(comparebASC)
                        }
                        else{
                            return tab.sort(comparebDESC)
                        }                        
                    })  
                }
                else{
                    setDatas(prev => {
                        if(event.target.value == "comparebASC"){
                            return dataSave.sort(comparebASC)
                        }
                        else{
                            return dataSave.sort(comparebDESC)
                        }
                    })                      
                }
            }
            else{
                if(filterOption != "all"){
                    return dataSave.filter((item) => item.opt == filterOption)
                }
                else{
                    setDatas(prev => {
                        return dataSave.sort(compareP)
                    })                         
                }
            }
        }
        if(type == "cancel"){
            setFilterOption("all")
            setFilterButs("all")
            setFilterDiff("all")
            setDatas(prev => {
                return dataSave.sort(compareP)
            })       
        }
    }

    const not = () => {
        setSorry(true)
    }


    return (
        <div className={styles.appTools}>
            <Head>
                <title>WinScore | Das beste Fußball-Tool zur exakten Ergebnisvorhersage</title>
                <meta name="description" content="Sports Betting Tool - Find exact score of best odds over odds ⚽" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/winscore/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/winscore/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/winscore/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/winscore/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/winscore/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/winscore/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/winscore/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/winscore/" />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content="WinScore | Das beste Fußball-Tool zur exakten Ergebnisvorhersage" />
                <meta property="og:description" content="Sports Betting Tool - Find exact score of best odds over odds ⚽" />
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
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}><span className={styles.toptag}>WinScore</span> Soccer Exact Score Prediction</h1>
                            <div className={styles.sep}></div>
                            <p>Regarding sports betting, the betting option that allows you to bet on the exact outcome of the match allows you to look for high odds at any bookmaker. Knowing the exact outcome of a football match in advance is extremely difficult as it is subject to random factors such as match data (red card, injury, etc.). However, past game probabilities allow the percentages for each exact outcome to be estimated. Because the chances of getting exact results are very high, it's important to minimize the risks by testing whether you bet multiple exact results.</p>
                        </div>
                        <div className={`app-content mBot30 ${styles.ajustPadd}`}>
                            <div className={`flex space-between wrap ${styles.allFilters} ${styles.textFieldT}`}>
                                <FormControl sx={{ m: 0, minWidth: '23%', ['@media(max-width:810px)']: { width: '48%'} }} size="small">
                                <InputLabel id="demo-select-small">Number of games</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={filterNumber}
                                        label="Number of games"
                                        onChange={handleChangeNumber}
                                    >
                                        <MenuItem value={1}>1 game</MenuItem>
                                        <MenuItem value={2}>2 games</MenuItem>
                                        <MenuItem value={3}>3 games</MenuItem>
                                        <MenuItem value={4}>4 games</MenuItem>
                                        <MenuItem value={5}>5 games</MenuItem>
                                        <MenuItem value={6}>6 games</MenuItem>
                                        <MenuItem value={7}>7 games</MenuItem>
                                        <MenuItem value={8}>8 games</MenuItem>
                                        <MenuItem value={9}>9 games</MenuItem>
                                        <MenuItem value={10}>10 games</MenuItem>
                                    </Select>                           
                                </FormControl>

                                <TextField
                                id="outlined-basic"
                                label="% of minimal probability"
                                type="text"
                                value={percentMin}
                                size="small"
                                sx={{ width: '25%', height: '40px', ['@media(max-width:810px)']: { width: '48%', marginBottom: '20px'}, fontSize: '14px' }}
                                onChange={changePercentMin}
                                /> 

                                <FormControl sx={{ m: 0, minWidth: '23%', ['@media(max-width:810px)']: { width: '48%'} }} size="small">
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

                                {sub.status == 'active' ? (
                                    <Button onClick={go} startIcon={<ManageSearchIcon />} variant="contained" className="" disableElevation>Search</Button>
                                ) : (
                                    <Button onClick={not} startIcon={<ManageSearchIcon />} variant="contained" className="" disableElevation>Search</Button>
                                )}
                                      
                          
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <div className={`flex wrap`}>
                                {(start && load) && (
                                    <>
                                    <div className={styles.explains}>
                                        <div className="flex toColumn">
                                            <div className="w100 wm100 mmBot10">
                                                <span className={styles.legend}><strong>Understand this tool :</strong><br /><br />
                                                The general % represents: the confidence level that one of the scores is correct for the number of games chosen. <br /><strong>Example:</strong> If you are looking for a minimum percentage of 30% overall on 3 games, the algorithm will give you all games with a probability greater than 30% of a given score in the top 3.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.filters} ${styles.filtersScore} flex aligncenter space-between mBot30 mmBot20`}>
                                        <div className="mRight10">
                                            <FormControl sx={{ m: 0, width: '180px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Filter by option</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filterOption}
                                                    label="Filter by option"
                                                    onChange={(event) => tri('options', event)}
                                                >
                                                    <MenuItem value={"all"}>All options</MenuItem>
                                                    <MenuItem value={"only-1"}>Only 1</MenuItem>
                                                    <MenuItem value={"only-N"}>Only X</MenuItem>
                                                    <MenuItem value={"only-2"}>Only 2</MenuItem>
                                                    <MenuItem value={"only-1N"}>Only 1X</MenuItem>
                                                    <MenuItem value={"only-N2"}>Only X2</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                        </div>
                                        <div className="mRight10">
                                            <FormControl sx={{ m: 0, width: '135px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Filter by goals</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filterButs}
                                                    label="Filter by goals"
                                                    onChange={(event) => tri('buts', event)}
                                                >
                                                     <MenuItem value={"all"}>Filter by goals</MenuItem>
                                                     <MenuItem value={"compareASC"}>Number of ASC goals</MenuItem>
                                                     <MenuItem value={"compareDESC"}>Number of DESC goals</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                        </div>   
                                        <div className="mRight10">
                                            <FormControl sx={{ m: 0, width: '220px', marginRight: '10px' }} size="small">
                                            <InputLabel id="demo-select-small">Filter by goals difference</InputLabel>
                                                <Select
                                                    labelId="demo-select-small"
                                                    id="demo-select-small"
                                                    value={filterDiff}
                                                    label="Filter by goals difference"
                                                    onChange={(event) => tri('diff', event)}
                                                >
                                                     <MenuItem value={"all"}>Filter by goals</MenuItem>
                                                     <MenuItem value={"compareASC"}>Number of ASC goals</MenuItem>
                                                     <MenuItem value={"compareDESC"}>Number of DESC goals</MenuItem>
                                                </Select>                           
                                            </FormControl>
                                        </div>   
                                        <div className="mRight10">
                                            <Chip label="Stornieren" icon={<CancelIcon sx={{ fontSize: '14px' }} />} variant="outlined" className={styles.chip} onClick={() => tri('cancel')} />
                                        </div>                                  
                                    </div>
                                    </>
                                )}
                                {start ? load ? datas.length > 0 ? datas.map((result, index) => {
                                    return <WinScore key={index} item={result} />
                                }) : (
                                    <span className={styles.sorry}><strong>Sorry...</strong><br />There are no results for this search.</span>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                                        <span className={styles.loading}><strong>Algorithm running<br />Please wait...</strong></span>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                ) : sorry ? (
                                    <div className="text-center relative w100">
                                        <span className={`app-title-h2-medium ${styles.sorry}`} style={{ fontSize: '16px' }}><span>🔐</span>Sorry, this tool is for active members only<br />
                                        <Link href="/vip/">Become a VIP member</Link> 
                                        </span>
                                        <div className={`${styles.example} noM`} style={{ filter: "blur(12px)" }}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winscore-desktop-en.png`} alt="exemple" layout="fill" q="100" />
                                        </div>
                                        <div className={`${styles.example} noDisplay`} style={{ filter: "blur(12px)" }}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winscore-mobile-en.png`} alt="exemple" layout="fill" q="100" />
                                        </div>
                                    </div>                                    
                                ) : (
                                    <div className="text-center w100">
                                        <span className="app-title-h2-medium" style={{ fontSize: '16px' }}>Here is an example result :</span>
                                        <div className={`${styles.example} noM`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winscore-desktop-en.png`} alt="exemple" layout="fill" q="100" />
                                        </div>
                                        <div className={`${styles.example} noDisplay`}>
                                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/winscore-mobile-en.png`} alt="exemple" layout="fill" q="100" />
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

