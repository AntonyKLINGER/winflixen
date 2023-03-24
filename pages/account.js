import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import copy from 'clipboard-copy'
import Router, { useRouter } from 'next/router'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import TicketSAV from '/components/TicketSAV'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Account.module.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from '/UserContext';
import Button from '@mui/material/Button'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Resub from '../components/Resub'

const stripePromise = loadStripe('pk_live_51JlqvXDEgIIGVls6OgPM0mBkcpFMcw3F1tggm12d1op4W6DQ2kCq76ENq0pvVky9sDRdgsvbErIHiEHuX86DCPZQ00XvVAm1gW');

export default function Account(){

    const {user, setUser, loadUser, setLoadUser} = React.useContext(UserContext)
    const {sub, setSub} = React.useContext(UserContext)
    const [password, setPassword] = React.useState("          ")
    const [msgPass, setMsgPass] = React.useState("")
    const [msgEnd, setMsgEnd] = React.useState("")
    const [tickets, setTickets] = React.useState({
        tickets: []
    })
    const [sujetTicket, setSujetTicket] = React.useState("")
    const [content, setContent] = React.useState("")
    const [sender, setSender] = React.useState(0)
    const [open, setOpen] = React.useState(null)
    const [op, setOp] = React.useState(false)
    const [winbot, setWinbot] = React.useState("")
    const [loadbot, setLoadBot] = React.useState(false)
    const [resMsg, setResMsg] = React.useState("")
    const [userDetails, setUserDetails] = React.useState(null)
    const [loadDetails, setLoadDetails] = React.useState(false)

    useEffect(() => {
        if(user.user_id == 0 && loadUser){
            Router.push("/vip/")
        }
    }, [user])

    useEffect(() => {
        const details = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/user/infos/all/index.php?id=${user.user_id}`)
            const json = await fetcher.json()
            setUserDetails(json)
            setLoadDetails(true)
        }
        if(user.user_id > 0){
            details()
        }       
    }, [user, loadUser])

    console.log(userDetails)

    useEffect(() => {
        const getCode = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/user/winbot/?user=${user.user_id}`)
            const json = await fetcher.json()
            setWinbot(json.code)
            setLoadBot(true)
        }
        if(user.user_id > 0){
            getCode()
        }       
    }, [user])

    const changeSujetTicket = () => {
        setSujetTicket(event.target.value)
    }

    const changeContent = () => {
        setContent(event.target.value)
    }

    const changePass = () => {
        setPassword(event.target.value)
    }

    const changePassword = () => {
        fetch(`${WINFLIX_URL}/api/user/pass/?user=${user.user_id}&pass=${password}&key=328472934129837`)
        .then(resp => resp.json())
        .then(json => setMsgPass(json.message))
    }

    const handleCopy = () => {
        if(loadbot){
            copy(winbot)
        }       
    }

    const opener = (x) => {
        setOpen(prev => {
            if(prev == x){
                return null
            }
            else{
                return x
            }
        })
    }

    const sendTicket = () => {
        if(sujetTicket != "" && content != ""){
            fetch(`${WINFLIX_URL}/api/sav/tickets/add/?user=${user.user_id}&subject=${sujetTicket.replaceAll('&', 'et')}&content=${content.replaceAll('&', 'et')}&lang=EN`)
            .then(resp => {
                setSujetTicket("")
                setContent("")    
                setSender(prev => prev+1)           
            })
        }
    }

    useEffect(() => {
        const getTickets = async () => {
            console.log(`${WINFLIX_URL}/api/sav/tickets/?user=${user.user_id}`)
            const fetcher = await fetch(`${WINFLIX_URL}/api/sav/tickets/?user=${user.user_id}`)
            const json = await fetcher.json()
            setTickets(json)
        }
        if(user.user_id > 0){
            getTickets()
        }
    }, [sender, user])

    const logout = (e) => {
        e.preventDefault();
        setUser({username: '', password: '', user_id: 0})
        setSub({id: '', status: 'on-hold'})
        localStorage.removeItem("wfToken")
        Router.push("/login")
    }

    const resiliation = async () => {
        const fetcher = await fetch(`${WINFLIX_URL}/demande_resiliation.php?user=${user.user_id}&lang=EN&abo=${sub.id}`)
        const json = await fetcher.json()
        setMsgEnd(json.message)
    }

    return (
        <div className={styles.appAccount}>
            <Head>
                <title>⚙ Manage your Winflix account settings!</title>
                <meta name="description" content="Need to find the best basic site ⚽ ? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Fiablite and VIP Recommended!" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/compte/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/konto/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/account/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/account/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/compte/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/konto/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/account/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/account/" />
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
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/icon-mon-compte.png`} layout="fill" />
                                </div>
                                My account <span className={styles.statusSub} style={{ color: sub.status == "active" ? "green" : "red", background: sub.status == "active" ? "#c6ffc6" : "#ffc4c4" }}>{sub.status == "active" ? "Active subscription" : <Link href="/register">Resubscribe</Link>}</span>
                            </h1>
                            <p>Welcome to your account {user.username} ! (<span className={styles.logout} onClick={logout}>Logout</span>)</p>
                        </div>
                        <div className="app-content mBot30">
                            <h2>Follow Winbot Telegram! </h2>
                            <p>To get all live betting alerts at the best odds, use your Winbot code now and never miss any live betting alerts!</p>
                            <div className={`flex aligncenter toColumn ${styles.appBoxTelegram}`}>
                                <div className="flex aligncenter justicenter mRight20 mRnone mmBot10">
                                    <textarea className={`mRight10 ${styles.codeTelegram}`} value={winbot}>
                                        
                                    </textarea>
                                    <span className={styles.buttonSub} style={{ cursor: 'pointer' }} onClick={handleCopy}>Copy</span>
                                </div>
                                <div className="mCenter">
                                    <p style={{ marginBottom: '0px' }}>
                                        To access the Telegram bot, click the button below:
                                    </p>
                                    <a href="https://t.me/WinflixEN_bot" target="_blank" rel="noreferrer" className={styles.btnWinbot}>To start Winbot</a>
                                </div>
                            </div>
                            <p>Start typing the /start command in the bot to start using Winbot.</p>
                            <div className="command">
                                <span className={styles.Commands} onClick={() => setOp(prev => !prev)}>
                                    <strong>ℹ Show all available commands</strong>
                                </span>
                                {op && (
                                <div className={styles.allCommands}>
                                    <span className={styles.desc}><span className={styles.com}>/start</span>To set the to start the bot for the first time</span>
                                    <span className={styles.desc}><span className={styles.com}>/code</span>  To yourself to identify with your code</span>
                                    <span className={styles.desc}><span className={styles.com}>/stop</span>Stop receiving notifications</span>
                                    <span className={styles.desc}><span className={styles.com}>/restart</span>To start again receive notifications</span>
                                    <span className={styles.desc}><span className={styles.com}>/why</span>To find out , why the Winbot is so important</span>
                                    <span className={styles.desc}><span className={styles.com}>/like</span>To understand how it works</span>
                                    <span className={styles.desc}><span className={styles.com}>/example</span>To the View the type of notifications you receive </span>
                                    <span className={styles.desc}><span className={styles.com}>/country</span>To all View countries notified during the week </span>
                                    <span className={styles.desc}><span className={styles.com}>/sport</span>To discover all the sports associated with are available to the Winbot</span>
                                </div>
                                )}
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <span className="app-title-h2">Reset Password</span>
                            <p className="mBot25">Do you want to change your password? Enter the desired new password below and confirm the reset.</p>
                            <TextField
                            id="outlined-password-input"
                            label="New password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            size="small"
                            sx={{ width: '50%' }}
                            onChange={changePass}
                            />
                            <Button onClick={changePassword} variant="contained" sx={{ marginLeft:'10px' }} disableElevation>Back</Button>
                            {msgPass && (
                                <p>{msgPass}</p>
                            )}
                        </div>
                        <div className="app-content mBot30">
                            <span className="app-title-h2">Open a ticket</span>
                            <div className={`${styles.tickets} mBot10 mTop20`}>
                                <span className={styles.titleTicket}>
                                    <span className="material-icons">content_copy</span>
                                    Your tickets :
                                </span>
                                {tickets.tickets.length > 0 ? tickets.tickets.map((ticket, index) => {
                                    return <TicketSAV key={index} data={ticket} />
                                }) : (
                                    <span>You have not created any tickets.</span>
                                )}
                            </div>
                            <div className={`${styles.tickets} mBot10`}>
                                <span className={styles.titleTicket}>
                                    <span className="material-icons">note_add</span>
                                    Open a ticket :
                                </span>
                                <form className={styles.openTicket}>
                                    <TextField
                                    id="outlined-basic-small"
                                    label="Subject of your ticket"
                                    type="text"
                                    autoComplete="current-subjet"
                                    value={sujetTicket}
                                    size="small"
                                    sx={{ width: '100%' }}
                                    inputProps={{style: {fontSize: 14}}}
                                    onChange={changeSujetTicket}
                                    className={styles.textField}
                                    />
                                    <textarea onChange={changeContent} className={styles.textArea} placeholder="Content of your ticket..." value={content}></textarea>
                                    <Button onClick={sendTicket} variant="contained" sx={{ marginTop: '6px', backgroundColor: '#333' }} disableElevation>Submit my ticket</Button>
                                </form>
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <span className="app-title-h2">Frequently Asked</span>
                            <a onClick={() => opener(0)} style={{ marginTop: '10px' }} className={styles.ask}>Livescore, how does it work?</a>
                            {open == 0 && (
                            <div className={styles.answers}>
                                <p>Winflix livescore is much more than a classic livescore. Results are shown in real time, you can add games to your favorites to see them first to find your way.</p>
                                <p>By clicking on a game you will find all the information, statistics, rankings, goals and videos of that game. Simply slide the Match menu to access all areas.</p>
                                <p>For each game, a prediction is available in the game menu. It's based on statistics. On average, 80% of the predictions proposed in the game are validated. Find the results of match predictions sorted by championship in the Winscore section.</p>
                                <p>Create your tickets by clicking on the page that corresponds to the game option you have chosen. Once you have added your stake, click View My Bet on the right side of your screen to confirm your bet. to your ticket.  </p>
                                <p>After your registration you have 100 Wincoin. Wincoin are not real currency, they are only used in Winflix.net to play. You can put as much WinCoin on your ticket as you like. If you win you win the displayed win, if you lose you lose your stake. </p>
                                <p><strong>WinCoins are awarded every week (Monday at 00:00) to 100 for all players.</strong></p>
                                <p>A "WinRank" ranking is created weekly between each player. You can track your tickets and results in the myWin area.</p>
                            </div>
                            )}
                            <a onClick={() => opener(1)} className={styles.ask}>What are WinTips ?</a>
                            {open == 1 && (
                            <div className={styles.answers}>
                                <p>WinTips are predictions based on advanced analytics and algorithmic statistics.</p>
                                <p>Every day the Winflix team offers you several WinTips. This is the publisher's choice.</p>
                                <p>You can vote your opinion on this selection by selecting "Good" or "Not Good" for each WinTip. </p>
                                <p>A top is then set up further down the section to get the trend of members' opinions.</p>
                                <p>If you rate WinTips as Good and it wins, it will appear in your myWin section in the "WinTips/WinGame" section. This way you can track whether the given predictions are true.</p>
                            </div>
                            )}
                            <a onClick={() => opener(2)} className={styles.ask}>How does Winflix ranking work (WinRank) ?</a>
                            {open == 2 && (
                            <div className={styles.answers}>
                                <p>Winflix offers 2 types of rankings. The first is the top players and top odds ranking associated with tickets, and the second is the ranking associated with WinGame grids. </p>
                                <p>The top players and top odds rankings are updated daily and run weekly.</p>
                                <p>Every week (Monday 00:00) we start from scratch, so everyone can try their luck again with a base of 100 WinCoin can try. They are automatically recharged every Monday.</p>
                                <p>The best evolution rate defines the overall ranking. Your total is your general bankroll: WinCoin earned from WinGame Tickets, Challenges and Grids. </p>
                                <p><strong>You can see what the top players have been playing by clicking on their nickname.</strong></p>
                                <p>Top Odds provides a ranking of the winning tickets that achieved the highest odds. By clicking on the relevant row you can see the winning ticket.</p>
                            </div>
                            )}
                            <a onClick={() => opener(3)} className={styles.ask}>What is WinOdds for ?</a>
                            {open == 3 && (
                            <div className={styles.answers}>
                                <p>Are you looking for a price between a minimum and a maximum to complete a combination or just a single ticket? </p>
                                <p>Then you are in the right area. Choose a date, championship, minimum odds and maximum odds. </p>
                                <p>Winflix will then take care of finding all the odds that match your selection. All you have to do is choose the one that seems most suitable for you.</p>
                            </div>
                            )}
                        </div>
                        <div className="app-content mBot30">
                            <span className="app-title-h2-medium">Account Informations</span>
                            <p>You cannot change your email or identifier once your account has been created. However, you can change your password if you wish (see above).</p>
                            <p style={{ color: '#000' }}><strong>Account ID : </strong>{user.username}</p>
                            <p>Do you want to cancel ? <span style={{ color: "#000", textDecoration: "underline", cursor: "pointer" }} onClick={() => setResMsg(1)}>Click here.</span></p>
                            {resMsg == 1 && (
                                <p>Please note that you are about to request permanent cancellation of your subscription, which will block your access to all Winflix services. Are you really sure you want to cancel your subscription? <span style={{ color: "#000", textDecoration: "underline", cursor: "pointer" }} onClick={() => setResMsg(2)}>Yes</span> / <span style={{ color: "#000", textDecoration: "underline", cursor: "pointer" }} onClick={() => setResMsg(0)}>No</span></p>
                            )}
                            {resMsg == 2 && (
                                <>
                                <p>An exceptional offer on all Winflix services just for you, does it tell you? Take advantage of a 70% discount on the formula for the year or <span style={{ color: "black", textDecoration: "underline" }}>€ 49,90 instead of € 129,90 !</span></p>
                                <span className={styles.ctaOffer} onClick={() => setResMsg(4)}>Take advantage of this offer</span>
                                <span className={styles.confirmRes} onClick={() => { setResMsg(3); resiliation();}}>Cancel</span>
                                </>
                            )}
                            {resMsg == 3 && (
                                <>
                                    <p>{msgEnd}</p>
                                </>
                            )}
                            {resMsg == 4 && (
                                <>
                                    <Elements stripe={stripePromise}>
                                        <Resub details={userDetails} />
                                    </Elements>
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