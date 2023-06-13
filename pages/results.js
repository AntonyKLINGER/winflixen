import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Results.module.css'
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import PronoResult from '../components/PronoBoxResult'
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { UserContext } from '../UserContext'
import CircularProgress from '@mui/material/CircularProgress';

export default function Resultats(){

    const [filterMonth, setFilterMonth] = React.useState("06")
    const [filterYear, setFilterYear] = React.useState(new Date().getFullYear())
    const [results, setResults] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [moyenne, setMoyenne] = React.useState(0.00)
    const [valeurs, setValeurs] = React.useState([])
    const {sub, setSub} = useContext(UserContext)

    const handleChangeMonth = (event) => {
        setFilterMonth(event.target.value);
    };

    const handleChangeYear = (event) => {
        setFilterYear(event.target.value);
    };

    const filtrer = async () => {
        setLoad(false)
        const req = await fetch(`${WINFLIX_URL}/api/results/?m=${filterMonth}&y=${filterYear}`)
        const json = await req.json()
        setResults(json) 
        setLoad(true)
    }

    useEffect(() => {
        const fetchResults = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/results/?y=${filterYear}&m=${filterMonth}`)
            const json = await req.json()
            setResults(json)
            setLoad(true)
        }
        fetchResults()
    }, [])

    useEffect(() => {
        if(load){
            const values = []
            let average = 0
            results.map((resultat) => {
                values.push(parseFloat(resultat.cote))
            })
            const reducer = (accumulator, curr) => accumulator + curr;
            if(values.length > 0){
                average = (values.reduce(reducer)/values.length).toFixed(2)
            }
            setMoyenne(average)
            setValeurs(values)
        }
    }, [load])


    return (
        <div className={styles.appResults}>
            <Head>
                <title>Results of foot prediction | Winflix 🏆 → the trusted site!</title>
                <meta name="description" content="Need to find the best base site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Fiablite and VIP Recommended!" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/resultats/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/ergebnisse/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/risultati/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/results/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/ergebnisse/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/risultati/" /> 
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/results/" />  
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content="Results of foot prediction | Winflix 🏆 → the trusted site!" />
                <meta property="og:description" content="Need to find the best base site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Fiablite and VIP Recommended!" />
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
                            <h1 className="app-title-h2 flex aligncenter" style={{ marginTop: '0px' }}>
                                <div className="iconTitle mRight10">
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/winscore-icon.png`} alt="icon resultat" layout="fill" />
                                </div>                                
                                Winflix results of the month
                            </h1>
                            <div className="mTop20 mwrap">
                                <FormControl sx={{ m: 0, minWidth: 200, marginRight: '10px', marginBottom: '10px', ['@media(max-width:810px)']: { minWidth:'45% !important', width: '53% !important', marginTop: '10px' } }} size="small">
                                <InputLabel id="demo-select-small">Filter by month</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={filterMonth}
                                        label="Filter by month"
                                        onChange={handleChangeMonth}
                                    >
                                         <MenuItem value="01">January</MenuItem>
                                         <MenuItem value="02">February</MenuItem>
                                         <MenuItem value="03">March</MenuItem>
                                         <MenuItem value="04">April</MenuItem>
                                         <MenuItem value="05">May</MenuItem>
                                         <MenuItem value="06">June</MenuItem>
                                         <MenuItem value="07">July</MenuItem>
                                         <MenuItem value="08">August</MenuItem>
                                         <MenuItem value="09">September</MenuItem>
                                         <MenuItem value="10">October</MenuItem>
                                         <MenuItem value="11">November</MenuItem>
                                         <MenuItem value="12">December</MenuItem>
                                    </Select>                           
                                </FormControl>
                                <FormControl sx={{ m: 0, minWidth: 200, marginRight: '10px', ['@media(max-width:810px)']: { minWidth:'40%', width: '40%', marginTop: '10px' } }} size="small">
                                <InputLabel id="demo-select-small">Filter by year</InputLabel>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={filterYear}
                                        label="Filter by year"
                                        onChange={handleChangeYear}
                                    >
                                        <MenuItem value="2021">2021</MenuItem>
                                        <MenuItem value="2022">2022</MenuItem>
                                        <MenuItem value="2023">2023</MenuItem>
                                    </Select>                           
                                </FormControl>
                                <Button startIcon={<FilterListIcon />} onClick={filtrer} sx={{ ['@media(max-width:810px)']: { marginTop: '10px', marginInline: 'auto' } }} variant="contained" disableElevation>Filter</Button>
                            </div>
                        </div>
                        <div className={`app-content mBot30 ${styles.chiffresRef}`}>
                            <div className={styles.allRef}>
                                <div className="text-center mBot30">
                                    <span className={styles.titleRef}>Results from {`${filterMonth}/${filterYear}`}</span>
                                </div>
                                <div className="flex mwrap">
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="done_all"></span>
                                        <span className={styles.typeRef}>Predictions won</span>
                                        <span className={styles.numberRef}>
                                            {load ? results.length : "..."}
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="remove_circle_outline"></span>
                                        <span className={styles.typeRef}>Odd min</span>
                                        <span className={styles.numberRef}>
                                            {(load && valeurs.length > 0) ? Math.min.apply(Math, valeurs).toFixed(2) : "..."}
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="functions"></span>
                                        <span className={styles.typeRef}>Odd average</span>
                                        <span className={styles.numberRef}>
                                            {(load && valeurs.length > 0) ? moyenne : "..."}
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="add_circle_outline"></span>
                                        <span className={styles.typeRef}>Odd max</span>
                                        <span className={styles.numberRef}>
                                            {(load && valeurs.length > 0) ? Math.max.apply(Math, valeurs).toFixed(2) : "..."}
                                        </span>
                                    </div>
                                </div>
                                {sub.status != "active" && (
                                    <div className="text-center mTop30">
                                        <Link href="/vip/" className={styles.ctaRef}>Become a VIP now !</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <h2>Winflix results from {`${filterMonth}/${filterYear}`}</h2>
                            <p>All forecast results are visible and auditable. Find out all football predictions of the day. No cheating with Winflix: everything you are told, we prove to you.</p>
                            <div className="flex space-between justicenter wrap mTop20">
                                {load ? results.map((resultat, index) => {
                                    return <PronoResult key={index} data={resultat} />
                                }) : (
                                    <>
                                        <Box sx={{ width: '100%' }}>
                                            <CircularProgress disableShrink sx={{ color: 'red' }} />
                                        </Box>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={`app-content mBot30 ${styles.chiffresRef}`}>
                            <div className={styles.allRef}>
                                <div className="text-center mBot30">
                                    <span className={styles.titleRef}>The result of {`${filterMonth}/${filterYear}`}</span>
                                </div>
                                <div className="flex mwrap">
                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="done_all"></span>
                                        <span className={styles.typeRef}>Predictions won</span>
                                        <span className={styles.numberRef}>
                                            {load ? results.length : "..."}
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="remove_circle_outline"></span>
                                        <span className={styles.typeRef}>Odd min</span>
                                        <span className={styles.numberRef}>
                                            {(load && valeurs.length > 0) ? Math.min.apply(Math, valeurs).toFixed(2) : "..."}
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="functions"></span>
                                        <span className={styles.typeRef}>Odd average</span>
                                        <span className={styles.numberRef}>
                                            {(load && valeurs.length > 0) ? moyenne : "..."}
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="add_circle_outline"></span>
                                        <span className={styles.typeRef}>Odd max</span>
                                        <span className={styles.numberRef}>
                                            {(load && valeurs.length > 0) ? Math.max.apply(Math, valeurs).toFixed(2) : "..."}
                                        </span>
                                    </div>
                                </div>
                                {sub.status != "active" && (
                                    <div className="text-center mTop30">
                                        <Link href="/vip/" className={styles.ctaRef}>Become a VIP now !</Link>
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