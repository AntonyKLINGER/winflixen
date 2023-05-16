import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import ReviewSidebar from '../components/ReviewSidebar'
import { HeaderCTA } from '../components/CTA'
import { VueMatch } from '../components/VueMatch'
import ReadMore from '../components/ReadMore'
import SEOCountry from '../components/SEOCountry'
import Button from '@mui/material/Button';
import FAQ from '../components/FAQ'
import BlogPost from '../components/BlogPost'
import PronoResult from '../components/PronoBoxResult'
import { WINFLIX_URL } from '../config'
import GraphResults from '../components/GraphResults'
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton'
import { RedButton } from '../components/Buttons'
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion';


export default function NewHome(){

    const [blogs, setBlogs] = React.useState(null)
    const [actus, setActus] = React.useState(null)
    const [loadBlog, setLoadBlog] = React.useState(false)
    const [loadActus, setLoadActus] = React.useState(false)
    const [graph, setGraph] = React.useState({month: "05", year: 2023, name: "May"})
    const [pronosafes, setPronoSafes] = React.useState(null)
    const [loadPronoSafes, setLoadPronoSafes] = React.useState(false)
    const [pronocotes, setPronoCotes] = React.useState(null)
    const [loadPronoCotes, setLoadPronoCotes] = React.useState(false)
    const [box1, setBox1] = React.useState(true)
    const [box2, setBox2] = React.useState(true)
    const [box3, setBox3] = React.useState(false)
    const [avis, setAvis] = React.useState([])
    const [loadAvis, setLoadAvis] = React.useState(false)
    const [loadLive, setLoadLive] = React.useState(false)
    const [live, setLive] = React.useState([])
    const [wintips, setWintips] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [date, setDate] = React.useState(new Date())

    useEffect(() => {
        const fetchApi = async () => {
            const rep = await fetch(`https://wpen.winflix.net/api/fixtures/live/list/live.json`)
            const json = await rep.json()
            setLive(json)
            setLoadLive(true)
        }
        fetchApi()
    }, [])


    useEffect(() => {
        const fetchBlog = async () => {
            const rep = await fetch(`${WINFLIX_URL}/api/blog/fr/?limit=4`)
            const json = await rep.json()
            setBlogs(json)
            setLoadBlog(true)
        }
        fetchBlog()
    }, [])

    useEffect(() => {
        const fetchActus = async () => {
            const rep = await fetch(`${WINFLIX_URL}/api/blog/fr/?limit=4&cat=18`)
            const json = await rep.json()
            setActus(json)
            setLoadActus(true)
        }
        fetchActus()
    }, [])

    useEffect(() => {
        const fetchAvis = async () => {
            const rep = await fetch('https://wp.winflix.net/api/reviews/')
            const json = await rep.json()
            setAvis(json)
            setLoadAvis(true)
        }
        fetchAvis()
    }, [])

    useEffect(() => {
        const fetchPronoS = async () => {
          const req = await fetch(`${WINFLIX_URL}/api/pronos/results/wintips.php`)
          const data = await req.json()
    
          setPronoSafes(prevSafe => {
            return data
          })
    
          setLoadPronoSafes(true)
        }
    
        fetchPronoS()
      }, [])
    
      useEffect(() => {
        const fetchPronoA = async () => {
          const req = await fetch(`${WINFLIX_URL}/api/pronos/results/prono-api.php`)
          const data = await req.json()
    
          setPronoCotes(prevCote => {
            return data
          })
    
          setLoadPronoCotes(true)
        }
    
        fetchPronoA()
      }, [])

    function callGraph(a, b, c){
        setGraph(prevGraph => {
          return {
            month: a,
            year: b,
            name: c
          }
        })
      }

    const [readmore, setReadMore] = React.useState({
    content: `                    
            <h3>Why choose VIP access to Winflix Foot Pronos? </h3>
            <p> Among all the VIPs, many are happy to offer a rough prediction service based on just one article of the day. Winflix offers VIP access to its football predictions but also to a multitude of additional services such as Specific statistics to better understand the forecasts made by our meteorologists In addition, thanks to Winflix VIP, you will benefit from 100 freebets every week to bet on live matches, Test your betting strategy, develop your sports betting strategy and the results, wins, losses. This often lets you know what kind of bets will save you and what kind of paris will make you lose. In fact, by placing Freebet bets on Winflix, you have analytical access to track % success on all types of bets. For example you get better results on 1x2 bets, double chances, combination bets, bets on the number of goals in the game etc</p>
            <h2> Our football pronunciation application available </h2>
            <p>Pono soccer application is the practical side. Although the Winflix website is perfect for smartphones to follow our football predictions, the Winflix application allows you to get football PRONO faster and easier. The Winflix Prognosis Foot application is available on the AppStore and the PlayStore. </p>
            <h3> Winflix The Pono Foot application on Android </h3>
            <p> Do you own a Samsung phone and want to find the best football predictions application in PlaySotre? No need to search, opt for the Winflix mobile application that brings together the bettor toolsets and all Winflix VIP tips, of course with all our predictions for more than 40 football leagues! </p>
            <h3> Our forecasting application is also available on iPhone </h3>
            <p> The best soccer prediction application on iPhone is "Winflix Prediction Footer". Our recently released soccer iPhone application is ideal for bettors looking to improve their performance and increase their income through reliable predictions. </p>
            `
    })


    const [pays, setPays] = React.useState([
        {
          flag: "https://winflix.net/logos/logo/logo_2.webp",
          alt: "Football predictions france ligue 1 ligue 2",
          title: "Ligue 1 and Ligue 2 : Our French football predictions",
          content: `To find a Ligue 1 or French football league predictions, you can use the Prono France category or directly use the Prognose Ligue 1 or Prognose Ligue 2 links on winflix.net. For the 2020 season the team pono soccer of Winflix for OL (Olympique Lyonnais) and like Monaco, LOSC (Lille), Rennes, like St Etienne and all other French clubs For French football, Winflix also offers predictions for the French Cup and the French Cup.`
        },
        {
          flag: "https://winflix.net/logos/logo/logo_10.webp",
          alt: "England Prediction Championship England Premier League",
          title: "Premier League e Championship : our vulnerable football",
          content: `Winflix soccer prediction application is perfectly adapted to English soccer and includes Premier League and Leagues, English League 1 and English League 2 respectively. The predictions offered by Winflix also cover League Cup and English FA Cup, so you can reliably offer predictions for all of English football. Among the popular predictions in England we can mention the predictions for Liverpool, Chelsea, Manchester City, Manchester United, Arsenal or even Tottenham, Leicester, Everton and all English football clubs. In the 2020 season, Winflix has already made 177 Premier League predictions and Championship predictions.`
        },
        {
          flag: "https://winflix.net/logos/logo/logo_25.webp",
          alt: "Football prediction Germany bundesliga bundesliga 2",
          title: "Bundesliga 1 und 2 : Predictions football",
          content: `The predictions of the Winflix.net calculation allows me to make the most pronouncements of the Bundesliga and the Bundesliga 2 with precise statistics from the championship in Germany. Our team of tipsters advise bettors on top German teams like predictions for Bayern Munich, predictions for BVB Dortmund, RedBull Leipzig, Borussia Mönchengladbach, Bayer Leverkusen, Eintracht Frankfurt and all other German clubs in 1st and 2nd football division. We also offer predictions on German soccer cups like the German Cup. For the current season we have already made 1323 predictions in the Bundesliga and predictions in Bundesliga 2.`
        },
        {
          flag: "https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-3.png",
          alt: "Spain football predictions la liga segunda division",
          title: "Liga 1 and 2 : Spanish football league predictions",
          content: `Finding the best prediction for Barca (FC Barcelona Foot) or Real Madrid becomes easier thanks to the La Liga predictions section on Winflix. In addition, the list of Spanish football recommendations is much longer and you will also find all the recommendations related to other teams such as Atletico Madrid, Celta Vigo, Valencia, Betis Sevilla and all the other teams in the Spanish football league. This season Winflix.net tipsters have already made 326 La Liga predictions and La Liga 2 predictions.`
        },
        {
          flag: "https://winflix.net/logos/logo/logo_768.webp",
          alt: "Football prediction italien serie a serie b",
          title: "Predictions Serie A and Serie B: bet on the Italian football league",
          content: `Find all the Serie A and Serie B predictions you need to win your sports bets on winflix.net/en/! With a total of 1323 Serie A and Serie B football predictions made to date, the top tipsters on Winflix pride themselves on having a high success rate. The big Italian clubs like our Juventus predictions, our Inter or Milan predictions or even our Lazio, AS Roma or Napoli football predictions are very reliable, but we complete our analyzes with predictions on all Italian football clubs and on all Italian teams football leagues.`
        }
      ])
    
      const [faq, setFAQ] = React.useState([
        {
          question: `How do I get a reliable football prediction?`,
          answer: `<p>The question is not necessarily how to get a reliable prediction, but what makes a football prediction reliable. The reliability of a football prediction results from a sum of criteria, with the criterion being assigned a weight in order to weight the reliability of the prediction. For example, Winflix uses a database of about fifteen criteria to get the most reliable prediction possible. Finally, some imponderables must be taken into account, which can completely destroy the reliability of the forecast. We think in particular of game actions in a football game, such as a red card or the absence of an important player in the squad. Obviously, the absence of a team's top scorer inevitably affects the reliability of the result. However, since football is a game involving 11 outfield players, the absence of a single player being replaced by a slightly less productive player has little impact on the stats supporting the prediction, only if it is the influence of the player, the Game is game in question has no decisive influence on the outcome of the game. In summary, for a reliable football prediction it is necessary to work on fifteen criteria.</p>`
        },
        {
          question: `How do I find the right football prediction?`,
          answer: `<p>Great question! Not all football predictions are necessarily good. To find a good soccer prediction, you need to spend a lot of time analyzing without excluding the key criteria of the sports game, or following sports betting experts or soccer predictions. In any case, finding a football at-risk player requires research, time or knowledge coupled with an accurate and professional follow-up of football-related news.</p>`,
        },
        {
          question: `How can the prognosis be improved?`,
          answer: `<p>To improve a prediction you can analyze the last 5 games like we offer in Winflix VIP. If a football prediction is based on a double chance, you can actually improve the prediction by combining it with a number of goals in the game or with a goalscorer. More and more bookmakers and sports betting providers are also offering game options such as "Team A wins or a draw AND more than 1.5 goals in the game". The prediction is then improved by adjusting it for the number of goals in play. This increases the probabilities and at the same time the risk for the prediction. We could also improve a prediction by thinking of putting a win AND a goalscorer on the same bet placed. For example, if PSG's odds against the last player seems too low, it might be interesting to improve the prediction by adding K. Mbappe as a goalscorer. The effect would be the same as before, the odds increase but the risk increases with it. Finally, one could imagine improving a football prediction in terms of prediction reliability. In this case you need to do the opposite, if a match is fully given, ie in 1X2, then it is advisable to fold with double chance. The effect will inevitably be a sinking of the coast, a decrease in potential profits, but, by analogy, an increase in the probability rate, and therefore the reliability of the forecast.</p>`,
        },
        {
          question: `What is the best soccer prediction website?`,
          answer: `<p>That's the big question, everyone claims to be the best, the reality is often very different. As we are aware of the competition in sports prediction field and even more so in football predictions, we can now say that Winflix.net is the best football predictions website as the website covers all matters including the needs of a bettor (prediction tool). . betting management). , bet analysis tools, prediction comparison tools, top prediction tracking tools, etc.) and has a strong reputation based on extensive experience betting on profitable athletes.</p>`,
        },
        {
          question: `How do you win your sports bets?`,
          answer: `<p>To win your sports bets, you need to control your emotions and know how to celebrate each win. On Winflix you will find reliable football predictions created and selected by our sports betting experts, but also predictions for any football match and any league, European or World. The hardest part will therefore be not to chain the bets and not to follow all the predictions presented. If you were to do this you could get a very good score but the reality remains bet responsibly and be aware that bookmakers make money because even after 5 winning bets losses can follow and you could be the good guys who Lose football predictions, take full advantage by being tempted by other bets.</p>`,
        },
        {
          question: `Who is the best prediction?`,
          answer: `<p>Many forecasters claim to be in reality the best forecast, the best forecast in France is the one that manages to remain stable over the long term, not just on a shot of the day or a simple sports laptop once consumed.Therefore requires it a game strategy, a betting strategy and in this sense the tools that are present on winflix.net to bet them allow it to become the <a href='https://meilleur-pronostiqueur.fr/'> best prediction </a> or at least to make it the best site that brings together the best forecasts in France.</p>`,
        },
        {
          question: `What is the best app to find football prediction?`,
          answer: `<p>Whether in the iPhone Appstore or in the Android Playstore, there are a variety of football predictions. The best soccer prediction application is definitely Winflix available on Appstore and PlayStore. The Winflix application allows you to get reliable predictions on all football matches, follow a match live and live, participate in a football prediction competition but also access a PRono training and see the evolution of the results of the predictions included in the application thanks to a track betting analysis. In fact, each VIP member has a balance of 100 free bets per week to put the prediction into practice and test our risk-free strategy. The analytics present in the Winflix application increases the reliability of the predictions provided and this makes Winflix the best prediction application for football.</p>`,
        },
        {
          question: `What is a football prediction?`,
          answer: `<p>A "football prediction" is an analysis of the predicted outcomes in a football match. Football predictions are generally used to increase profits for bettors looking for winnings and secure earnings. A prediction is made based on specific criteria such as the state of form of the match creates 2 teams facing each other face to face. A prediction is not a bet, but it is used by bettors to save time by increasing reliability through the resulting analysis. There are different types of predictions in football :</p>
          <ul>
            <li>Foot predictions on the outcome of the 1x2 game </li>
            <li>Foot predictions affecting the number of goals scored in a game</li>
            <li>Football predictions are about the goalscorer in matches</li>
            <li> Other predictions titled "Fun" about the game in question. </li>
          </ul>
          <p>Winflix offers a reliable soccer prediction service for sports bettors. </p>
          `,
        },
        {
          question: `What is a prognosis?`,
          answer: `<p>Definition: A forecaster is the person who analyzes games to provide a reliable prediction of the game's outcome. Professional forecasters are rare, and they perform their job of comprehensive predictive analysis to consider more than fifteen valuable criteria .The Prognosticator came to France in 2013 with the advent and legalization of sports betting. These predictive analytics experts are generally familiar with mathematics and the sport for which their analyzes are considered and sought out by bettors. Predictions are independent and do not work bookmakers, giving them the objectivity necessary for their legitimacy.</p>`,
        },
        {
          question: `What is a forecast page for?`,
          answer: `<p>A predictive website is a website that brings together a set of results based on predictions on a daily basis. The predictions of the prognostic websites depend partly on the mathematical algorithm implemented by the prognostic website, but also on the analyzes performed by the pre-forecasters working on behalf of the forecast website.winflix.net is a popular example of a prediction site specializing in pono soccer.Prediction sites tend to specialize in sports, but you can find general prediction sites covering different sports on a single site.</p>`,
        },
        {
          question: `Why choose an expert football prediction?`,
          answer: `<p>Among all the prediction sites and/or the application of a soccer prediction few can be true experts in sports betting.An expert soccer prediction is a prediction that follows strict analysis rules to predict the outcome of a soccer ball with high probability of success. Winflix is ​​an expert in soccer predictions and develops own specific methods and algorithms for soccer games to get maximum winning soccer predictions.</p>`
        }
      ])

    useEffect(() => {
        const fetchWintips = async () => {
            const typedate = String((date.getDate())).padStart(2, '0')+'/'+String((date.getMonth()+1)).padStart(2, '0')+'/'+(date.getFullYear())
            const req = await fetch(`${WINFLIX_URL}/api/wintips/fr/list/`)
            const json = await req.json()
            const tab = await json.find((tips) => tips.date == typedate)
            if(tab !== undefined){
                setWintips(tab)
                setLoad(true)
            }
            else{
                setWintips(await json[0])
                setLoad(true)                
            }
        }
        fetchWintips()
    }, [])

    return (
        <div className={styles.appNewHome}>
            <Head>
                <title>🔥 Need Football Predictions ? ⇉ Winflix the page of betting tips + winnings and reliable from real football experts</title>
                <meta name="description" content="≫ The best football prediction for any football match on our expert football predictions page! √ 36 Soccer Championships √ Reliable Prediction Software by Rate √ Real Tools to Win Predictions √" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>  
                <div className="flex toColumn">
                    <div className={`w75 wm100 ${styles.ajpadd}`}>
                        <div className="flex aligncenter space-between">
                            <span className="app-title-h2">The latest predictions</span> 
                            <Link href="/football/" className={styles.seeAll}>All predictions</Link>
                        </div>           
                        <div className={styles.overh}>
                            <div className={`flex space-between wrap mTop20 ${styles.scrollSection} mmTop0`}>
                                {loadLive ? live.slice(0,6).map((match, i) => {
                                    return <div key={i} className={`w32 mBot10 ${styles.vuematch}`}><VueMatch data={match} /></div>
                                }) : (
                                    <>
                                        <div className={`w32 mBot10 ${styles.vuematch2} wm100`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                                        <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                                        <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                                        <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                                        <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                                        <div className={`w32 mBot10 ${styles.vuematch2} noM`}><Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={115} /></div>
                                    </>
                                )}
                            </div>
                        </div>     
                    </div>
                    <div className={`w25 mLeft30 wm100 mLnone ${styles.ajpadd} mmTop20 mmTop0`}>
                        <Link href="/football-tips-prediction/" style={{ textDecoration: 'none', color: '#000' }}>
                            <div className={styles.wintipsBox}>
                                <div className={styles.wintipsImg}>
                                    <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/liverpool-wintips-scaled.jpg`} alt="predictions of the day Wintips" layout="fill" />
                                </div>
                                <div className={styles.wintipsMetas}>
                                    <div className="flex aligncenter space-between">
                                        <span className={styles.wintipsDate}><span className="material-icons" data-icon="calendar_today"></span>{load ? wintips.date : <Skeleton variant="rectangle" animation="wave" width={70} height={15} />}</span>
                                        <span className={styles.wintipsNumber}>{load ? '+'+wintips.total+' pronos' : <Skeleton variant="rectangle" animation="wave" width={70} height={15} />}</span>
                                    </div>
                                    <div className="text-center mBot10">
                                        <span className={styles.wintipsGains}><span>{load ? wintips.gain_pot.toFixed(0) : "--"} €</span>Possible income</span>
                                        <span className={styles.wintipsTitle}>Discover the WinTips of the day</span>                                        
                                            <Button variant="contained" disableElevation>Go to Wintips</Button>                                        
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex toColumn mTop20">
                    <div className={`w60 app-content mRight40 wm100 mRnone mmTop20 ${styles.graphic}`}>
                        <div className="flex aligncenter space-between mBot10">
                            <span className="app-title-h2">Monitor the security of the bankroll delle scommesse</span> 
                        </div>   
                        <span className={styles.minih2}>Winflix is ​​the software most assured to optimize Tuesday's sporting fair based on: bankroll monitoring of today's Pronostici Sicuri data:</span>
                        <div className="mTop20 mmTop10">
                            <div className={`${styles.buttonInline} mBot20 mmBot0`}>
                            <Chip onClick={() => callGraph('05', '2023', 'May')} sx={{ marginRight: '10px', border: '0px', boxShadow: '1px 1px 25px rgba(0,0,0,0.07)', fontWeight: '600', padding: '10px 10px' }} variant="outlined" label="May 2023" />
                            <Chip onClick={() => callGraph('04', '2023', 'April')} sx={{ marginRight: '10px', border: '0px', boxShadow: '1px 1px 25px rgba(0,0,0,0.07)', fontWeight: '600', padding: '10px 10px' }} variant="outlined" label="April 2023" />
                            <Chip onClick={() => callGraph('03', '2023', 'March')} sx={{ marginRight: '10px', border: '0px', boxShadow: '1px 1px 25px rgba(0,0,0,0.07)', fontWeight: '600', padding: '10px 10px' }} variant="outlined" label="March 2023" />
                            <Chip onClick={() => callGraph('', '2022', 'Year 2022')} sx={{ marginRight: '10px', border: '0px', boxShadow: '1px 1px 25px rgba(0,0,0,0.07)', fontWeight: '600', padding: '10px 10px' }} variant="outlined" label="Year 2022" />
                            </div>
                            <GraphResults name={graph.name} month={graph.month} year={graph.year} />
                        </div>                      
                    </div>
                    <div className={`w50 wm100 ${styles.ajpadd} mmTop10`}>
                        <div className="flex aligncenter space-between">
                            <span className="app-title-h2">Sports betting tools</span> 
                            <Link href={`https://winflix.net/en/top-5-predictions-tools/`} className={styles.seeAll}>See all</Link>
                        </div> 
                        <h1><strong>Increase your chances of winning</strong> and enjoy the best football predictions<br className="noM" /> thanks to Winflix software and tools!</h1>
                        <div className="flex space-between mTop10">
                            <motion.div whileTap={{ scale: 0.97 }} className={`w48 ${styles.toolBox}`}>
                                <Link href="/winodds/" passHref legacyBehavior>
                                    <a>
                                        <span className={styles.toolName}><span className="material-icons" data-icon="calculate"></span>WinOdds</span>
                                        <span className={`${styles.toolDesc} w95`}>Help for selecting sports betting games and options that meet probability criteria.</span>
                                        <span className={styles.goBoxSmall}>
                                            <IconButton aria-label="fingerprint" color="error" size="small" sx={{ color: "red" }}>
                                                <ArrowCircleRightIcon />
                                            </IconButton>                                       
                                        </span>
                                    </a>
                                </Link>  
                            </motion.div> 
                            <motion.div whileTap={{ scale: 0.97 }} className={`w48 ${styles.toolBox}`}>
                                <Link href="/winscore/" passHref legacyBehavior>
                                    <a>
                                        <span className={styles.toolName}><span className="material-icons" data-icon="equalizer"></span>WinScore</span>
                                        <span className={`${styles.toolDesc} w95`}>Helper tool for identifying exact probabilities and isolating matches with multi-criteria filters.</span>
                                        <span className={styles.goBoxSmall}>
                                            <IconButton aria-label="fingerprint" color="error" size="small" sx={{ color: "red" }}>
                                                <ArrowCircleRightIcon />
                                            </IconButton>
                                        </span>
                                    </a>
                                </Link> 
                            </motion.div>  
                        </div>  
                        <div className="flex space-between mTop20">
                            <motion.div whileTap={{ scale: 0.97 }} className={`w48 ${styles.toolBox}`}>
                                <Link href="/wingoal/" passHref legacyBehavior>
                                    <a>
                                        <span className={styles.toolName}><span className="material-icons" data-icon="add_task"></span>WinGoal</span>
                                        <span className={`${styles.toolDesc} w95`}>Goal analysis tool in a soccer game that allows you to select games based on goal potential.</span>
                                        <span className={styles.goBoxSmall}>
                                            <IconButton aria-label="fingerprint" color="error" size="small" sx={{ color: "red" }}>
                                                <ArrowCircleRightIcon />
                                            </IconButton>
                                        </span>
                                    </a>
                                </Link>  
                            </motion.div> 
                            <motion.div whileTap={{ scale: 0.97 }} className={`w48 ${styles.toolBox}`}>
                                <Link href="/wincomparator/" passHref legacyBehavior>
                                    <a>
                                        <span className={styles.toolName}><span className="material-icons" data-icon="difference"></span>WinComparator</span>
                                        <span className={`${styles.toolDesc} w95`}>Tool that allows you to compare the form standings between 2 teams and rank them according to the biggest difference.</span>
                                        <span className={styles.goBoxSmall}>
                                            <IconButton aria-label="fingerprint" color="error" size="small" sx={{ color: "red" }}>
                                                <ArrowCircleRightIcon />
                                            </IconButton>
                                        </span>
                                    </a>
                                </Link>   
                            </motion.div>
                        </div>  
                        <div className="mTop20">
                            <h2 className={styles.minih2}>More than 12 analysis and optimization tools to win our football predictions</h2> 
                            <p><strong>Become the king of sports betting</strong> thanks to Winflix analysis and forecasting tools, follow all live matches, all <strong>key stats</strong>, all goals and the latest football news in the world <strong>in real time !</strong></p>
                        </div>                                                 
                    </div>
                </div>
                <div className="flex toColumn mTop30">
                    <div className="w35 mRight30 wm100 mRnone">
                        <div className="app-content mBot30">
                            <h2 className="mBot20">The best tips and tools for successful football sports betting</h2>
                            {loadBlog && blogs.map((single, index) => {
                                return <BlogPost key={index} datas={single} />
                            })}
                        </div>
                        
                        <div className="app-content mBot30">
                            <h2 className="mBot20">A winning football prediction takes statistics and news into account</h2>
                            {loadActus && actus.map((single, index) => {
                                return <BlogPost key={index} datas={single} />
                            })}
                        </div>
                        <div className="app-content mBot30">
                            <h2>Soccer Sports Betting: Increase your chances of winning with tools and predictions</h2>
                            <p>Winflix is ​​the site specialized in football predictions. The tools present on the website and the application allow you to have a selection of "ready to bet" bets in order to increase the chances of winning your bet. Whether it's a single bet or a combination bet, the user who wants to bet on sporting events on the Internet must have made an initial deposit at a sports betting site. Sports betting is considered a game of chance, nevertheless, on winflix.net beginners will find sports betting tips, predictions from our sports betting software and algorithm, and exclusive access to all the tools to optimize your chances of winning and find the best odds to bet on with sports betting earn.</p>
                        </div>
                        <div className="app-content mBot30" itemType="https://schema.org/FAQPage">
                        <h2 className="mBot20">Football forecast: our answers to your questions</h2>
                        {faq.map((question, index) => {
                            return <FAQ key={index} question={question.question} answer={question.answer} />
                        })}
                        </div>
                    </div>
                    <div className="w65 wm100">
                        <div className="app-content mBot30">
                            <h2>Winflix is ​​a soccer predictions website for winners: discover the latest soccer predictions for winners</h2>
                            <p>Win again for Winflix customers! Thanks to our winning analysis, you will see our recently won 1X2 or double odds picks with the match odds below. These profit predictions are divided into 2 parts:</p>
                            <div className={`${styles.boxToggle} mTop20`}  onClick={() => setBox1(prevState => !prevState)}>
                                <h3 className="pointer">All the experts predictions</h3>
                                <p>SAFE football predictions are predictions that present a high reliability rate and low odds. Safe predictions give you considerable certainty about the chosen game option and the sports bet placed with a bookmaker. So-called "safe" predictions, meaning "reliable" or "safe", are an important part of sports bets placed by forecasters or bettors. Winflix is ​​made up of professional bettors and expert football forecasters to offer, thanks to our software and our statistics, a double perspective and an analysis as efficient as it is reliable to bet and bet online with maximum security.</p>
                                {box1 ? (
                                <div className="flex space-between wrap mTop20">
                                {loadPronoSafes && pronosafes.map((prono, index) => {
                                    return <PronoResult key={index} data={prono} />
                                })}
                                </div>
                                ) : (
                                <></>
                                )}
                            </div>
                            <div className={`${styles.boxToggle} mTop20`}  onClick={() => setBox2(prevState => !prevState)}>
                                <h3 className="pointer">Ranking by percentage of results of football predictions in the last 3 days</h3>
                                {box2 ? (
                                <div className="flex space-between wrap mTop20">
                                {loadPronoCotes && pronocotes.map((prono, index) => {
                                    return <PronoResult key={index} data={prono} />
                                })}
                                </div>
                                ) : (
                                <></>
                                )}
                            </div>
                            <div className={`${styles.boxToggle} mTop20`} onClick={() => setBox3(prevState => !prevState)}>
                                <h3 className="pointer">The most reliable prognostic pronos</h3>
                                {box3 ? (
                                <p>With the large number of sports competitions and football matches taking place every day, it is not easy to find the best football prediction for each match. Winflix offers the best prediction for any football match by using a prediction method to evaluate the outcome of the match. Our predictions take into account each football club's form, ranking, head-to-head history, composition, top scorers, attacking potential, number of goals scored and attacking potential to yield a statistical variable that is ideal for creating a is profit prediction in soccer. Thanks to all the analyzed data as well as the odds offered on sports betting sites, Winflix is ​​currently the best football prediction site. The soccer prediction advice from our experienced forecasters and our professional bettors is a vital help in betting online and assists in soccer predictions.</p>
                                ) : (
                                <></>
                                )}               
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <ReadMore content={readmore.content} />
                        </div>
                        <div className="app-content mBot30">
                            <h2>Our opinion on football tip sites</h2>
                            <div className={`${styles.starsReviews} mTop10`}>
                                <Image src={`https://wp.winflix.net/wp-content/uploads/2020/10/reviews-.png`} alt="avis winflix" layout="fill" />
                            </div>
                            <p>Winflix.net is the best football predictions website to advise demanding bettors. There are many other types of soccer prediction websites, we will describe in detail the 2 types of prediction websites that exist.</p>
                            <h3>The free football predictions website</h3>
                             <p>Free betting sites have pros and cons. For example, they are never really free. In reality, they are mainly paid for by advertising, and the largest advertising budget generated by these types of sites is that of bookmakers. So if you are looking for a free soccer predictions website, ask yourself the following question: Can I trust a paid predictions website from bookmakers and sports betting sites? The answer seems obvious, if you want to win your bets in the long run then using free prono sites is definitely not for you. That doesn't mean they don't hit the mark a few times, but if they make you win too much at your sports bets thanks to their free tips, it's because they're losing money at sports betting sites and under these conditions doesn't seem obvious that bookmakers continue to pay them. Here is our take on websites prone to "free" and finally we will remember that what is free has no value. You can also find a nice Winflix review article that includes all the tests done by others.</p>
                             <h3>Paid Tipster Sites</h3>
                             <p>Many tipsters evolve, but generally just trying them is enough to understand that you have just been scammed and that the football predictions on offer are neither more nor less than a feeling of the person behind them. The empirical values ​​are generally very low and the forecasts do not correspond to the often advertised expectations of corrupt influencers. This page of all tipsters or tipsters does not necessarily have to be blocked. Likewise, many tipsters and tipster websites falsify their results in order to sell them. So don't hesitate to check the soccer predictions provided by the tipster before you pay. Some tipster sites can be marginally profitable (which is good enough when you see others letting you lose) and among the top tipsters, a large number don't follow, give advice on betting or sports betting strategy, but only give a few games of the time to time and gargle with poor results.</p>
                        </div>
                        <div className="app-content mBot30">
                        <h2>Predictions available for more than 40 football leagues</h2>
                        <p>The winflix.net site offers sports betting tips and predictions for over 40 football leagues and competitions. Find the predictions you need by selecting our soccer predictions section by league and country. Of course, the top 5 European leagues have priority in terms of attractiveness for sports betting, but our football predictions have a very good success rate on other foreign leagues.</p>
                        {pays.map((country, index) => {
                            return <SEOCountry key={index} title={country.title} flag={country.flag} alt={country.flag} content={country.content} />
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}