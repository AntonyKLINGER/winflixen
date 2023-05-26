import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import WinScore from '/components/Winscore'
import OptionMatch from '/components/OptionMatch'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Results.module.css'
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


export default function WinBot(){

    const {sub, setSub} = useContext(UserContext)

    return (
        <div className={styles.appWinBot}>
            <Head>
                <title>Winbot Live Predictions | Get all the predictable football live thanks to Winbot Telegram!</title>
                <meta name="description" content="Check out Winflix's new telegram bot to get real-time notifications for football predictions" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/prono-foot-live/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/prono-foot-live/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/live-vorhersage/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/live-vorhersage/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/previsioni-calcio-diretta/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/previsioni-calcio-diretta/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/prediction-live-football/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/prediction-live-football/" />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content="Winbot Live Predictions | Get all the predictable football live thanks to Winbot Telegram!s" />
                <meta property="og:description" content="Check out Winflix's new telegram bot to get real-time notifications for football predictions" />
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
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}>Get all the live football to bet on more profitable options thanks to Winbot Telegram!</h1>
                            <p>How does Winbot Telegram work? When you <strong>become a Winflix VIP member</strong>, only one code is assigned to your account. To find it, nothing could be easier - go to your page <Link href="/account">my Account</Link>.</p>
                            <p>The link to Winbot Telegram is also accessible from my account page, as well as all possible commands from the bot. Feel free to create a ticket if you have any questions about the Winbot.</p>
                        </div>
                        <div className={`app-content mBot30 ${styles.chiffresRef}`}>
                            <div className={styles.allRef}>
                                <div className="text-center mBot30">
                                    <span className={styles.titleRef}>Winbot stats in 022</span>
                                </div>
                                <div className="flex mwrap">
                                <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="done_all"></span>
                                        <span className={styles.typeRef}>Number of predictions</span>
                                        <span className={styles.numberRef}>
                                            +1000
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="emoji_events"></span>
                                        <span className={styles.typeRef}>Success rate</span>
                                        <span className={styles.numberRef}>
                                            76%
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="functions"></span>
                                        <span className={styles.typeRef}>Average Odds</span>
                                        <span className={styles.numberRef}>
                                            1.97
                                        </span>
                                    </div>
                                    <div className={`w25 wm48 ${styles.infoRef}`}>
                                        <span className="material-icons" data-icon="people"></span>
                                        <span className={styles.typeRef}>Followers</span>
                                        <span className={styles.numberRef}>
                                            473
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
                        <h2 className="app-title-h2">The first real-time automated soccer bot! </h2>
                             <p> What is Winbot for? The Winbot is designed to only give you playable pronos once the games have started to get a more advantageous size. Interesting if you want to quickly inflate your bankroll and still stay on betting basis . </p>
                             <h3> What types of predictions are offered live? </h3>
                             <p>Our Winbot is responsible for releasing the best game profiles for live game every day. Whether it's playing a set of purposes or an end result, the bot calculates all the possibilities based on the events of the current games. A red card, a goal by the outsider team, etc... All the parameters are included in the bot's reflection to optimize the profitability of the predictions. </p>
                             <h3>Use a live football pono for better odds! </h3>
                             <p> As a bettor, you should know that pre-match ratings and live match ratings are no longer the same. When a game starts, the ratings fluctuate much faster, which allows for value bets in certain <strong>*</strong> periods of the game and depending on the events. The more an event arrives at the beginning of the game, the more often the bot will query all the parameters of the games to give you <Link href="/football/predictions/">football predictions</Link> to within seconds / minutes after the to play alert. </p>
                             <p> <strong>*Value BET </strong>: A value bet is a score that is worth playing at a given point in the game due to its high volatility. This allows you to get a better score for a sure bet. </p>
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

