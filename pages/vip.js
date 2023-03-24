import React, { useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'
import styles from '../styles/Vip.module.css'
import { a, b, c } from '../texts'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function DevenirVIP(){

    const [text, setText] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [choice, setChoice] = React.useState("")

    useEffect(() => {
        const edit = () => {

            const dispo = ["a", "b", "c"]
            const choix = dispo[Math.floor(Math.random() * 3)] 
            let is = choix == "a" ? a : choix == "b" ? b : c
            setText(prev => is)
            setChoice(choix)
            setLoad(true)
        }
        edit()
    }, [])

    return (
        <>
        <Head>
            <title>Premium Registration &#8211; Become a VIP &#8211; Winflix | 100% soccer</title>
            <meta name="description" content="Enjoy all Winflix Premium services by registering now! You are currently benefiting from many discounts when registering..." />
            <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/devenir-vip/" />
            <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/vip/" />
            <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/vip/" />
            <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/vip/" />
            <link rel="alternate" hrefLang="fr" href="https://winflix.net/" />
            <link rel="alternate" hrefLang="de" href="https://winflix.net/de/vip/" />
            <link rel="alternate" hrefLang="it" href="https://winflix.net/it/vip/" />
            <link rel="alternate" hrefLang="en" href="https://winflix.net/en/vip/" />
        </Head>
        {load ? (
        <div className={styles.AppVip}>
            <div className={`app-boxed-large ${styles.container}`}>
                <div className={styles.content}>
                    <h1>{text.titre}</h1>
                    <p>{text.sousTitre}</p>
                    <Link href={`/register/?ref=${choice}`} className={styles.bigButton}>
                        Try Winflix now!
                    </Link>
                    <span className={styles.conditions}>Test Winflix for 7 days free of charge • Non-binding</span>
                    <span className={styles.books}>All odds used by our algorithms come from the following bookmakers</span>
                    <div className="flex aligncenter justicenter mTop20" style={{ opacity: '0.25', filter: 'grayscale(100%)' }}>
                        <div className={styles.logob}>
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/logo-winamax.png`} layout="fill" />
                        </div>
                        <div className={styles.logob}>
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/logo-betclic.png`} layout="fill" />
                        </div>
                        <div className={styles.logob}>
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/logo-unibet.png`} layout="fill" />
                        </div>
                        <div className={styles.logob}>
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/logo-zebet.png`} layout="fill" />
                        </div>
                        <div className={styles.logob}>
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/logo-pariosn-sport.png`} layout="fill" />
                        </div>
                        <div className={styles.logob}>
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2023/01/logo-wbin.png`} layout="fill" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`app-boxed ${styles.paddinline}`}>
                <div className={styles.centeredMedia}>
                    <Image src= {`https://wpen.winflix.net/wp-content/uploads/2023/03/home-en.jpg`} layout="fill" />
                </div>

                <div className="text-center flex toColumn wm100 justicenter">
                    <div className="w50 wm100 mmTop40">
                        <h2>{text.contents[0].titre}</h2>
                        <p>{text.contents[0].text}</p>
                    </div>
                </div>

                <div className="flex aligncenter mCenter toColumn space-between boxed-small mTop120 mmTop0">
                    <div className={`w50 wm100 ${styles.order1} mmTop40`}>
                        <span className={styles.feature}>#1 Powerful tools</span>
                        <h2>{text.contents[1].titre}</h2>
                        <p>{text.contents[1].text}</p>
                    </div>
                    <div className={`w40 wm100 text-center ${styles.order2}`}>
                        <div className={styles.tool}>
                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wingoal-outil-pronostic-football-en.jpg`} layout="fill" />
                        </div>
                    </div>
                </div>

                <div className="noDisplay mmTop30 mmBot20">
                    <Link href={`/register/?ref=${choice}`} className={styles.bigButton}>
                        Try Winflix now!
                    </Link>
                </div>

                <div className="flex aligncenter mCenter space-between toColumn boxed-small mTop120 mmTop0">
                    <div className="w40 wm100">
                        <div className={styles.tool}>
                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wincomparator-outil-pronostic-football.jpg`} layout="fill" />
                        </div>
                    </div>
                    <div className="w50 wm100 mmTop40">
                        <span className={styles.feature}>#2 Unpublished Statistics</span>
                        <h2>{text.contents[2].titre}</h2>
                        <p>{text.contents[2].text}</p>
                    </div>
                </div>

                <div className="flex aligncenter toColumn mCenter space-between boxed-small mTop120 mmTop0">
                    <div className={`w50 wm100 ${styles.order1} mmTop40`}>
                        <span className={styles.feature}>#3 An intelligent algorithm</span>
                        <h2>{text.contents[3].titre}</h2>
                        <p>{text.contents[3].text}</p>
                    </div>
                    <div className={`w40 wm100 text-center ${styles.order2}`}>
                        <div className={styles.tool}>
                            <Image src={`https://wpen.winflix.net/wp-content/uploads/2023/03/wintool-outil-pronostic-football-en.jpg`} layout="fill" />
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="app-boxed-large mBot100">
                <div className={styles.redbox}>
                    <h2 className="mBot30">{text.lastTitle}</h2>
                    <Link href={`/register/?ref=${choice}`} className={styles.bigButtonLight}>
                        Try Winflix now!
                    </Link>
                    <span className={styles.conditionsLight}>Test Winflix for 7 days free of charge • Non-binding</span>
                </div>
            </div>
        </div>
        ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', marginTop: '20px' }}>
                <CircularProgress sx={{ color: "red" }} />
            </Box>
        )}
        </>
    )
}