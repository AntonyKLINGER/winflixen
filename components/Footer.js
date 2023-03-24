import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import styles from '../styles/Footer.module.css'
import { WINFLIX_URL } from '../config'
import { useRouter } from 'next/router'
import { UserContext } from '../UserContext'
import ListTeams from '../components/ListTeamsFooter'
import reviews from '../avis.json'
import Congrats from '../components/Congrats'

export default function Footer(){

    const {user, setUser} = useContext(UserContext)
    const [toView, setToView] = React.useState([])
    const [load, setLoad] = React.useState(false)

    const router = useRouter()
    const path = router.asPath

    useEffect(() => {
        const ticketView = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/tickets/win/?id=${user.user_id}&lang=EN`)
            const json = await fetcher.json()
            if(json.message != "empty"){
                setToView(json)
                setLoad(true)
            }
        }
        if(user.user_id > 0){
            ticketView()
        }
    }, [user, path])

    const [avisP, setAvisP] = React.useState(
            {
                "@context": "https://schema.org/",
                "@type": "Product",
                "brand" : {
                    "@type": "Brand",
                    "name": "Winflix | Football Predictions Tips"
                },
                "description": "The #1 in football predictions, stats and sports betting tools",
                "image": "https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75",
                "name": "Reviews",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "reviewCount": "1259"
                },  
                "review" : reviews.map((rev, i) => {
                return {
                    "@context":"http://schema.org",
                    "@type":"Review",
                    "name":`Review from ${rev.nom ? rev.nom : "inconnu"} About Winflix football predictions`, 
                    "description": rev.content, 
                    "author":
                    {
                        "@type":"Person",
                        "name": rev.nom ? rev.nom : "inconnu"
                    },
                    "reviewRating":
                    {
                        "@type":"Rating",
                        "ratingValue":5
                    }
                }})
            }     
    )

    const [avis, setAvis] = React.useState(        
        reviews.map((rev, i) => {
            return {
                "@context":"http://schema.org",
                "@type":"Review",
                "itemReviewed":
                {
                    "@type":"Organization",
                    "name":"Winflix - Football Predictions Tips"
                },
                "name":`Review from ${rev.nom ? rev.nom : "inconnu"} About Winflix football predictions`, 
                "description": rev.content, 
                "author":
                {
                    "@type":"Person",
                    "name": rev.nom ? rev.nom : "inconnu"
                },
                "reviewRating":
                {
                    "@type":"Rating",
                    "ratingValue":5
                }
            }
        })      
    )
    

    const JSONLD = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Winflix | Sport Predictions and Predictions",
        "url": "https://winflix.net",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "768"
        }        
    }

    return (
        <>
        {(load && toView.length > 0) && (
            <div className={styles.congrats}>
            {toView.map((ticket, i) => {
                return <Congrats setToView={setToView} ticket={ticket} key={i} />
            })}
            </div>
        )}       
        <div className={styles.appFooter}>
            <Head>
                <script type="application/ld+json">
                {JSON.stringify(JSONLD)}
                </script>   
                <script type="application/ld+json">
                {JSON.stringify(avisP)}
                </script>            
            </Head>
            <div className="app-boxed">
                <div className="flex space-between toColumn mCenter onpadds">
                    <div className="w30 wm100 mmBot30">
                        <h2 className={styles.titleFooter}>The best soccer prediction site</h2>
                        <p className="mTop20">The experience of the expert forecaster at the service of the weather. A complete, powerful and efficient service that allows you to find the best football prediction and try PRono without spending live in Winflix with our freebets, learn about the sports betting strategies, enjoy the best tips and the best football predictions . Follow the strategies of the best predictions and copy their paris. Prediction, analysis, soccer match statistics The best soccer predictions that allow us to understand, follow the site's pronotors and to copy their strategies. The best tools to win your sports bets are on Winflix.net, join the club!</p>
                    </div>
                    <div className="w20 wm100 mmBot30">
                        <h2 className={styles.titleFooter}>Football Predictions</h2>
                        <ul className={`${styles.menuFooter} mTop20`}>
                            <li>
                                <Link href="/vip/" passHref legacyBehavior>
                                    <a>VIP Register</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/login/" passHref legacyBehavior>
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/football-tips-prediction/" passHref legacyBehavior>
                                    <a>WinTips Predictions</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/prediction-live-football" passHref legacyBehavior>
                                    <a>Winbot Telegram</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/football/" passHref legacyBehavior>
                                    <a>Live Football Games</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/football/predictions/" passHref legacyBehavior>
                                    <a>Soccer Prediction Day</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w30 wm100">
                        <span className={styles.titleFooter}>Winflix-Universe</span>
                        <ul className={`${styles.menuFooter} mTop20`}>
                            <li>
                                <Link href="https://winflix.net" passHref legacyBehavior>
                                    <a className="flex aligncenter"><div className={styles.flagCountry}><Image src={`https://wp.winflix.net/wp-content/uploads/2022/09/logo_2-100x100.webp`} alt="flag pays" layout="fill" /></div> Winflix | Pronostic foot</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://winflix.net/de/" passHref legacyBehavior>
                                    <a className="flex aligncenter"><div className={styles.flagCountry}><Image src={`https://wp.winflix.net/wp-content/uploads/2022/09/logo_25-100x100.webp`} alt="flag pays" layout="fill" /></div> Winflix | Sportwetten Tipps Vorhersagen</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://winflix.net/it/" passHref legacyBehavior>
                                    <a className="flex aligncenter"><div className={styles.flagCountry}><Image src={`https://wp.winflix.net/wp-content/uploads/2022/09/logo_768-100x100.webp`} alt="flag pays" layout="fill" /></div> Winflix | Pronostici Calcio</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://winflix.net/en/" passHref legacyBehavior>
                                    <a className="flex aligncenter"><div className={styles.flagCountry}><Image src={`https://wp.winflix.net/wp-content/uploads/2022/09/logo_10-100x100.webp`} alt="flag pays" layout="fill" /></div> Winflix | Football prediction</a>
                                </Link>
                            </li>
                            <li>
                                <span className={styles.copy}>©Copyright Winflix 2023.</span>
                            </li>
                        </ul>
                    </div>
                </div>
                {(!path.includes("soccer-predictions") && !path.includes("live-match") && !path.includes("vip") && !path.includes("register") && !path.includes("soccerstat") && !path.includes("predictions/prediction-") && !path.includes("line-up") && !path.includes("highlights-goals")) && (
                <div className={styles.appFooter2}>
                    <div className="flex toColumn justicenter mmTop60">
                        <div className="w25 wm100 mRight20 mRnone mmBot30">
                            <ListTeams title="Predictions Serie A" league="2857" />
                        </div>
                        <div className="w25 wm100 mRight20 mRnone mmBot30">
                            <ListTeams title="Predictions Ligue 1" league="2664" />
                        </div>
                        <div className="w25 wm100 mRight20 mRnone mmBot30">
                            <ListTeams title="Predictions La Liga" league="2833" />
                        </div>
                        <div className="w25 wm100 mRnone mmBot30">
                            <ListTeams title="Predictions Jupiler Pro League" league="2660" />
                        </div>
                    </div>
                    <div className="flex toColumn justicenter mTop30">
                        <div className="w25 wm100 mRight20 mRnone mmBot30">
                            <ListTeams title="Predictions Bundesliga" league="2755" />
                        </div>
                        <div className="w25 wm100 mRight20 mRnone mmBot30">
                            <ListTeams title="Predictions Premier League" league="2790" />
                        </div>
                        <div className="w25 wm100 mRight20 mRnone mmBot30">
                            <ListTeams title="Predictions Primeira Liga" league="2826" />
                        </div>
                        <div className="w25 wm100 mRnone mmBot30">
                            <ListTeams title="Predictions Super League" league="2855" />
                        </div>
                    </div>
                </div>
                )}
                <div className={`${styles.appFooter3} mTop60`}>
                    <div className="text-center">
                        {/* <p>I giochi di denaro e possibilità sono vietati dai minori.Non scommettere somme di denaro superiori a ciò che potresti perdere. Il gioco ha rischi: debito, dipendenza, isolamento. </br> Chiama il numero 09.74.75.13.13 (chiama non chiuso).</p> */}
                        <div className={styles.reviewStars}><Image src={`https://wp.winflix.net/wp-content/uploads/2020/10/reviews-.png`} alt="reviews" layout="fill" /></div>
                        <Link href="/avis-membres/" passHref legacyBehavior>
                            <a className={styles.reviewLink}>winflix.net/en is reviewed by its members <strong>4,8/5</strong></a>
                        </Link>
                        <br />
                        <Link href="/avis-membres/" passHref legacyBehavior>
                            <a className={styles.reviewLink}>Legals</a>
                        </Link>
                        |
                        <Link href="/avis-membres/" passHref legacyBehavior>
                            <a className={styles.reviewLink}>General conditions</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


