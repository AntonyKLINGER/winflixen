import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Classement.module.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        className="nopad"
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function Classement({datas}){

    const dater = new Date();
    const yearX = dater.getFullYear();
    const monthX = dater.getMonth();
    const dayX = dater.getDate();
    
    const target = moment([yearX, monthX, dayX]);
    const weekNo = target.isoWeek();

    const [value, setValue] = React.useState(0);
    const [rankPlayerWeek, setRankPlayerWeek] = React.useState([])
    const [rankPlayerMonth, setRankPlayerMonth] = React.useState([])
    const [loadpw, setLoadPw] = React.useState(false)
    const [loadpm, setLoadPm] = React.useState(false)
    const [loadW, setLoadW] = React.useState(false)
    const [week, setWeek] = React.useState(weekNo)
    const [year, setYear] = React.useState(2023)
    const [between, setBetween] = React.useState({start: '', end: ''})
    const [month, setMonth] = React.useState(1)
    const [yearm, setYearM] = React.useState(2023)
    const [monthFR, setMonthFR] = React.useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [statement, setStatement] = React.useState("In progress")
    const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth()+1)
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())


    // useEffect(() => {
    //       let currentDate = new Date();
    //       let startDate = new Date(currentDate.getFullYear(), 0, 1);
    //       let days = Math.floor((currentDate - startDate) /
    //           (24 * 60 * 60 * 1000));
    //            
    //       let weekNumber = Math.ceil(days / 7);
    //       setWeek(weekNumber)
  
    //       setLoadW(true)
    //   }, [])

    function getWeekDates(weekNumber, year) {
        // Créer un nouvel objet Date avec l'année en cours
        var now = new Date();
      
        // Obtenir le premier lundi de l'année
        var firstMonday = new Date(year, 0, 1);
        var firstMondayWeekDay = firstMonday.getDay();
        if (firstMondayWeekDay !== 1) {
          firstMonday.setDate(firstMonday.getDate() + (1 - firstMondayWeekDay + 7) % 7);
        }
      
        // Calculer le nombre de jours à ajouter pour arriver au début de la semaine désirée
        var addDays = weekNumber * 7 - 7;
      
        // Obtenir la date de début de la semaine en ajoutant le nombre de jours calculé au premier lundi de l'année
        var startDate = new Date(firstMonday.getFullYear(), firstMonday.getMonth(), firstMonday.getDate() + addDays);
      
        // Obtenir la date de fin de la semaine en ajoutant 6 jours à la date de début de la semaine
        var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
      
        // Formater les dates au format d/m/Y
        var startDateFormatted = String(startDate.getDate()).padStart(2, '0') + '/' + String((startDate.getMonth() + 1)).padStart(2, '0') + '/' + startDate.getFullYear();
        var endDateFormatted = String(endDate.getDate()).padStart(2, '0') + '/' + String((endDate.getMonth() + 1)).padStart(2, '0') + '/' + endDate.getFullYear();
      
        return {start: startDateFormatted, end: endDateFormatted};
    }

    useEffect(() => {
        setBetween(getWeekDates(week, year))
    }, [week])

    const navWeek = (step) => {
        if(step == "next"){
            if(parseInt(week)+1 > 52){
                setWeek(1)
                setYear(year => year+1)
            }
            else{
                setWeek(prevWeek => prevWeek+1)
            }
        }
        if(step == "prev"){
            if(parseInt(week)-1 < 1){
                setWeek(52)
                setYear(year => year-1)
            }
            else{
                setWeek(prevWeek => prevWeek-1)
            }
        }
    }

    const navMonth = (step) => {
      if(step == "next"){
          if(parseInt(month)+1 > 12){
              setMonth(1)
              setYearM(year => year+1)
          }
          else{
              setMonth(prevMonth => prevMonth+1)
          }
      }
      if(step == "prev"){
          if(parseInt(month)-1 < 1){
              setMonth(12)
              setYearM(year => year-1)
          }
          else{
              setMonth(prevMonth => prevMonth-1)
          }
      }
    }

    useEffect(() => {
      if(yearm < currentYear){
        setStatement("Conclusa")
      }
      else{
        if(month < currentMonth){
          setStatement("Conclusa")
        }
        if(month == currentMonth){
          setStatement("In corso")
        }
        if(month > currentMonth){
          setStatement("Venire")
        }
      }
    }, [month])

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {

      if(week && year){
      const fetchRankWeekP = async () => {
        setLoadPw(false)
        const req = await fetch(`${WINFLIX_URL}/api/winrank/fr/?type=week&week=${week}&year=${year}`)
        const json = await req.json()
        setRankPlayerWeek(json)
        setLoadPw(true)
      }
      fetchRankWeekP()
      }
      
    }, [week])

    useEffect(() => {

      const fetchRankMonthP = async () => {
        setLoadPm(false)
        const req = await fetch(`${WINFLIX_URL}/api/winrank/fr/?type=month&month=${month}&year=${yearm}`)
        const json = await req.json()
        setRankPlayerMonth(json)
        setLoadPm(true)
      }
      fetchRankMonthP()
      
    }, [month])

    return (
        <div className={styles.appClassement}>
            <Head>
                <title>Online soccer prediction competition. Follow the best predictions 2022!</title>
                <meta name="description" content="Need to find the best football predictions site ⚽ ? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Trusted and Recommended by VIP!" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/classement/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/winrank/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/winrank/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/winrank/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/classement/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/winrank/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/winrank/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/winrank/" />
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
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/winrank-icon.png`} alt="Ranking Players Winrank" layout="fill" />
                                </div>
                                Players Ranking
                            </h1>
                            <p>Each member has 100 free bets per week to test our predictions and strategies. Freebets are especially useful for training before actually betting. The VIP member benefit allows you to get 100 free bets every week so you can play as you please.</p>
                        </div>
                        <div className="app-content mBot30">
                            <span className={styles.titleRank}>
                                <span className="material-icons" data-icon="emoji_events"></span>
                                Ranking of top players
                            </span>
                            <Box sx={{ width: '100%', marginTop: '20px' }}>
                                <Box sx={{ width: '100%' }}>
                                    <Tabs value={value} onChange={handleChange} centered>
                                        <Tab label="Week Ranking" {...a11yProps(0)} sx={{ fontSize: '12px' }} />
                                        <Tab label="Month Ranking" {...a11yProps(1)} sx={{ fontSize: '12px' }} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                  <div className={`${styles.chooseWeek} w100 mBot20`}>
                                      <span className={styles.navWeek} onClick={() => navWeek('prev')}>
                                          <span className="material-icons" data-icon="chevron_left"></span>
                                      </span>
                                      <span className={styles.weekSelected}>
                                          <strong>Week {week}</strong>
                                          {between.start} - {between.end}
                                      </span>
                                      <span className={styles.navWeek} onClick={() => navWeek('next')}>
                                          <span className="material-icons" data-icon="chevron_right"></span>
                                      </span>
                                  </div>
                                  <div className={styles.rank}>
                                    <div className={`${styles.toplineRank} flex aligncenter mTop20`}>
                                      <div className={styles.positionRank}>
                                        Pos.
                                      </div>
                                      <div className={styles.nameRank}>
                                        Pseudo
                                      </div>
                                      <div className={styles.finalRank}>
                                        Total
                                      </div>
                                      <div className={styles.evolRank}>
                                        Evolution
                                      </div>
                                    </div>
                                    {loadpw ? rankPlayerWeek.map((player, index) => {
                                      return (
                                        <>
                                          <Link key={index} href={`/ustats/${player.id}`} passHref className={styles.player}>
                                            <div className={`flex ${styles.mlineRank}`}>
                                              <div className={styles.positionRank}>
                                                {index == 0 && (
                                                  <div className={styles.top}>
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2020/02/or.png`} alt="or" layout="fill" />
                                                  </div>
                                                )}
                                                {index == 1 && (
                                                  <div className={styles.top}>
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2020/02/argent.png`} alt="argent" layout="fill" />
                                                  </div>
                                                )}
                                                {index == 2 && (
                                                  <div className={styles.top}>
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2020/02/bronze.png`} alt="bronze" layout="fill" />
                                                  </div>
                                                )}
                                                {player.position}
                                              </div>
                                              <div className={styles.nameRank}>
                                                {player.name}
                                              </div>
                                              <div className={styles.finalRank}>
                                                {player.evolution}
                                              </div>
                                              <div className={styles.evolRankAj}>
                                                {player.benef} {player.benef > 0 ? <span className="material-icons up" data-icon="north"></span> : player.benef == 0 ? <span className="material-icons equal" data-icon="reorder"></span> : <span className="material-icons down" data-icon="south"></span>}
                                              </div>
                                            </div>
                                          </Link>                                        
                                        </>
                                      )
                                    }) : (
                                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                          <CircularProgress sx={{ color: "red" }} />
                                      </Box>
                                    )}
                                  </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                  <>
                                  <div className={`${styles.chooseWeek} w100 mBot20`}>
                                        <span className={styles.navWeek} onClick={() => navMonth('prev')}>
                                            <span className="material-icons" data-icon="chevron_left"></span>
                                        </span>
                                        <span className={styles.weekSelected}>
                                            <strong>Mese di {monthFR[month-1]} {yearm}</strong>
                                            Zustand : {statement}
                                        </span>
                                        <span className={styles.navWeek} onClick={() => navMonth('next')}>
                                            <span className="material-icons" data-icon="chevron_right"></span>
                                        </span>
                                    </div>   
                                    <div className={styles.rank}>
                                    <div className={`${styles.toplineRank} flex aligncenter mTop20`}>
                                      <div className={styles.positionRank}>
                                        Pos.
                                      </div>
                                      <div className={styles.nameRank}>
                                        Pseudo
                                      </div>
                                      <div className={styles.finalRank}>
                                        Bankroll
                                      </div>
                                    </div>
                                    {loadpm ? rankPlayerMonth.map((player, index) => {
                                      return (
                                        <>
                                          <Link key={index} href={`/ustats/${player.id}`} passHref className={`${styles.player} ${styles.monthRank}`}>
                                            <div className={`flex ${styles.mlineRank}`}>
                                              <div className={styles.positionRank}>
                                                {index == 0 && (
                                                  <div className={styles.top}>
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2020/02/or.png`} alt="or" layout="fill" />
                                                  </div>
                                                )}
                                                {index == 1 && (
                                                  <div className={styles.top}>
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2020/02/argent.png`} alt="argent" layout="fill" />
                                                  </div>
                                                )}
                                                {index == 2 && (
                                                  <div className={styles.top}>
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2020/02/bronze.png`} alt="bronze" layout="fill" />
                                                  </div>
                                                )}
                                                {player.position}
                                              </div>
                                              <div className={styles.nameRank}>
                                                {player.name}
                                              </div>
                                              <div className={styles.finalRank}>
                                                {player.evolution} {player.evolution > 0 ? <span className="material-icons up" data-icon="north"></span> : player.evolution == 0 ? <span className="material-icons equal" data-icon="reorder"></span> : <span className="material-icons down" data-icon="south"></span>}
                                              </div>
                                            </div>
                                          </Link>                                        
                                        </>
                                      )
                                    }) : (
                                      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                          <CircularProgress sx={{ color: "red" }} />
                                      </Box>
                                    )}
                                  </div>
                                    </>                           
                                </TabPanel>
                            </Box>
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