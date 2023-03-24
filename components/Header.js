import React, { useEffect, useContext } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { MenuContext } from '../MenuContext'
import { UserContext } from '../UserContext'
import { WINFLIX_URL } from '../config'
import LinkMenu from '../components/LinkMenu'
import LinkMenuTeam from '../components/LinkMenuTeam'
import ListCountry from '../components/ListCountry'
import ListTeams from '../components/ListTeams'
import styles from '../styles/Header.module.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeIcon from '@mui/icons-material/Home';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';


export default function Header(){

    const [hamburger, setHamburger] = React.useState("close")
    const [fullmenu, setFullMenu] = React.useState("close")
    const [translate, setTranslate] = React.useState("")
    const [infosCountry, setInfosCountry] = React.useState({
            1: '',
            2: '',
            3: '',
    })
    const [paysDatas, setPaysDatas] = React.useState(null)
    const [league, setLeague] = React.useState(null)
    const [teams, setTeams] = React.useState({})
    const {user, setUser, sub, setSub} = React.useContext(UserContext)
    const [avatar, setAvatar] = React.useState("/wp-content/uploads/2019/12/profil-admin-100x100.png")
    const [value, setValue] = React.useState(4);

    const router = useRouter()
    
   

    useEffect(() => {
        const handleRouteChange = (url) => {
            url == "/" ? setValue(0) : url == "/football" ? setValue(1) : url == "/top-5-predictions-tools" ? setValue(3) : url == "/football-tips-prediction" ? setValue(2) : setValue(4)
        };
    
        router.events.on('routeChangeComplete', handleRouteChange);
    
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange);
        };
      }, [router.route]);

 
    function openMenu(){
        if(hamburger == 'close'){
            setHamburger('active')
            setFullMenu('activeMenu')
        }
        else{
            setHamburger('close')
            setFullMenu('close')
        }
    }

    function navTo(a, b, c){
        setInfosCountry(prevInfos => {
            return {
                1: a,
                2: b,
                3: c,
            }
        })
        setTranslate("-33.3%")
    }

    useEffect(() => {
        if(user.user_id != ""){
            fetch(`${WINFLIX_URL}/api/user/avatar.php?user_id=${user.user_id}`)
            .then(res => res.json())
            .then(data => setAvatar(data.avatar))
        }
    }, [user])

    const logout = (e) => {
        e.preventDefault();
        setUser({username: '', password: '', user_id: 0})
        setSub({id: '', status: 'on-hold'})
        localStorage.removeItem("wfToken")
        Router.push("/login")
    }


    return (
        <MenuContext.Provider value={{translate, setTranslate, infosCountry, setInfosCountry, teams, setTeams, league, setLeague, paysDatas, setPaysDatas, openMenu, logout}}>
        <div className={styles.appHeader}>
            <div className={styles.appMenu}>
                <div className="app-boxed">
                    <div className="flex space-between">
                        <div className="flex aligncenter">
                            <Link href="/" passHref legacyBehavior><span className={styles.appLogo}><Image src={`https://wp.winflix.net/wp-content/uploads/2021/04/Winflix-pronostic-foot.png`} layout="fill" alt="logo winflix" /></span></Link>
                            <ul className={styles.ulPrimary}>
                                <li><Link href="/" passHref legacyBehavior><a className={styles.primaryLink}>Home</a></Link></li>
                                <li>
                                    <Link href="/football/predictions/" passHref legacyBehavior><a className={styles.primaryLink}>Predictions</a></Link>
                                    <div className={styles.appContainer}>
                                        <div className="app-boxed">
                                            <div className="flex space-between">
                                                <div className="w32">
                                                    <span className={styles.bannerTitle}>
                                                        <span className="material-icons" data-icon="settings"></span>
                                                        The most important tools
                                                    </span>
                                                    <ul className={styles.appList}>
                                                        <li><LinkMenu icon="done_all" value="Results" href="/results/" /></li>
                                                        <li><LinkMenu icon="tips_and_updates" value="WinTips" href="/football-tips-prediction/" /></li>
                                                        <li><LinkMenu icon="settings_suggest" value="Predictions Tools" href="/top-5-predictions-tools/" /></li>
                                                        <li><LinkMenu icon="smart_toy" value="Winbot Télégram" href="/prediction-live-football/" /></li>
                                                        <li><LinkMenu icon="calculate" value="WinOdds" href="/winodds/" /></li>
                                                        <li><LinkMenu icon="equalizer" value="WinScore" href="/winscore/" /></li>
                                                        <li><LinkMenu icon="difference" value="WinComparator" href="/wincomparator/" /></li>
                                                        <li><LinkMenu icon="add_task" value="WinGoal" href="/wingoal/" /></li>
                                                    </ul>
                                                </div>
                                                <div className="w32">
                                                    <span className={styles.bannerTitle}>
                                                        <span className="material-icons">sports_soccer</span>
                                                        Beliebte Meisterschaften
                                                    </span>
                                                    <ul className={styles.appList}>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-5.png`} value="Predictions Bundesliga" href="/soccer-predictions/prediction-bundesliga-1/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-4.png`} value="Predictions Serie A" href="/soccer-predictions/prediction-serie-a/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-1.png`} value="Predictions Ligue 1" href="/soccer-predictions/prediction-ligue-1/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-1.png`} value="Predictions Ligue 2" href="/soccer-predictions/prediction-ligue-2/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-3.png`} value="Predictions La Liga" href="/soccer-predictions/prediction-la-liga/" /></li>                                                   
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-2.png`} value="Predictions Premier League" href="/soccer-predictions/prediction-premier-league/" /></li>                                                        
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-15.png`} value="Predictions Jupiler Pro" href="/soccer-predictions/prediction-jupiler-pro-league/" /></li>
                                                    </ul>
                                                </div>
                                                <div className="w32">
                                                <span className={styles.bannerTitle}>
                                                        <span className="material-icons">flag</span>
                                                        Search predictions by countries
                                                    </span>
                                                    <ul className={styles.appList}>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-5.png`} value="Predictions Germania" href="/soccer-predictions/prediction-germany/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-4.png`} value="Predictions Italia" href="/soccer-predictions/prediction-italy/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-1.png`} value="Predictions Francia" href="/soccer-predictions/prediction-france/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-3.png`} value="Predictions Espagna" href="/soccer-predictions/prediction-spain/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-2.png`} value="Predictions Inghilterra" href="/soccer-predictions/prediction-england/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-15.png`} value="Predictions Belgio" href="/soccer-predictions/prediction-belgium/" /></li>
                                                        <li><LinkMenuTeam logo={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-6.png`} value="Predictions Portogallo" href="/soccer-predictions/prediction-portugal/" /></li>
                                                    </ul>                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li><Link href="/football/" passHref legacyBehavior><a className={styles.primaryLink}>Livescore</a></Link></li>
                                <li><Link href="/football-tips-prediction/" passHref legacyBehavior><a className={styles.primaryLink}>WinTips</a></Link></li>
                                <li><Link href="/winrank/" passHref legacyBehavior><a className={styles.primaryLink}>WinRank</a></Link></li>
                                <li><Link href="/news/" passHref legacyBehavior><a className={styles.primaryLink}>News</a></Link></li>
                                <li><Link href="/mywin/" passHref legacyBehavior><a className={styles.primaryLink}>myWin</a></Link></li>
                            </ul>
                        </div>
                        
                        {user.username ? (
                            <div className="flex aligncenter">
                                <Link href="/account/" passHref legacyBehavior>
                                    <a className={styles.appMyAccount}>
                                        <div className={styles.avatar}>
                                            <Image src={`${avatar}`} alt="avatar" layout="fill" />
                                        </div>
                                        <span className={styles.myAccountTitle}>{user.username}<br /><span>Account</span></span>
                                    </a>
                                </Link>
                                <Link href="/" passHref legacyBehavior>
                                    <a className={styles.appLogout} onClick={logout}>
                                        <span className="material-icons">logout</span>
                                    </a>
                                </Link>
                            </div>
                        )
                        : (
                            <div className="flex aligncenter">
                                <Link href="/login/" passHref legacyBehavior>
                                    <a className={styles.logto}>Login</a>
                                </Link> 
                                <Link href="/vip/" passHref legacyBehavior>
                                    <a className="appBtnV1">Register now</a>
                                </Link>                          
                            </div>                            
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.appMobileMenu}>
                <div className={`flex space-between aligncenter relative ${styles.appmFixed}`}>
                    <div className="w40 flex aligncenter">
                        <button title="menu-mobile" onClick={openMenu} className={`${styles.menuButton} ${hamburger}`}>
                            <span className='sp1'></span>
                            <span className='sp2'></span>
                            <span className='sp3'></span>
                        </button>
                        <Link href="/" passHref legacyBehavior>
                            <a className={styles.appmLogo}>
                                <Image src={`https://wp.winflix.net/wp-content/uploads/2021/04/Winflix-pronostic-foot.png`} layout="fill" alt="logo mobile" />
                            </a>
                        </Link>
                    </div>
                    {user.user_id != "" ? (
                        <div className="flex aligncenter">
                        <Link href="/account" passHref legacyBehavior>
                            <a className={styles.appMyAccount} style={{ marginRight: '5px' }}>
                                <div className={styles.avatar}>
                                    <Image src={`${avatar}`} alt="avatar" layout="fill" />
                                </div>
                                <span className={styles.myAccountTitle}>{user.username}<br /><span>Account</span></span>
                            </a>
                        </Link>
                        <Link href="/" passHref legacyBehavior>
                            <a className={styles.appLogoutMobile} onClick={logout}>
                                <span className="material-icons">logout</span>
                            </a>
                        </Link>
                    </div>
                    ) : (
                        <div className="flex aligncenter">
                            <Link href="/vip/" passHref legacyBehavior>
                                <a className="appBtnV1">Register now</a>
                            </Link>
                            <Link href="/login/" passHref legacyBehavior>
                                <a className={styles.appLogoutMobile}>
                                    <span className="material-icons">login</span>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
                <div className={`${styles.appmContainer} ${fullmenu}`}>
                    <div className={styles.appmLine} style={{["transform"]: `translateX(${translate})`}}>
                        <div className={`${styles.appmContent} app-st-1`}>
                            <span className={styles.appmTitle}>The most important tools</span>
                            <ul className={styles.appmPrimary}>
                                <li onClick={openMenu}><LinkMenu icon="timer" value="Livescore" href="/fussball/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="done_all" value="Results" href="/ergebnisse/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="settings_suggest" value="Predictions Tools" href="/top-5-predictions-tools/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="tips_and_updates" value="WinTips" href="/football-tips-prediction/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="smart_toy" value="WinBot" href="/prediction-live-football" /></li>
                                <li onClick={openMenu}><LinkMenu icon="calculate" value="WinOdds" href="/winodds/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="equalizer" value="WinScore" href="/winscore/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="difference" value="WinComparator" href="/wincomparator/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="add_task" value="WinGoal" href="/wingoal/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="emoji_events" value="WinRank" href="/winrank/" /></li>
                                <li onClick={openMenu}><LinkMenu icon="login" value="Einloggen" href="/login/" /></li>
                            </ul>
                            <span className={styles.appmTitle}>Popular Leagues</span> 
                            <ul className={styles.appmPrimary}>
                                <li>
                                    <a className="flex aligncenter space-between" onClick={() => navTo('italy', 'Italy', 'Italie')}>
                                        <div className="flex aligncenter">
                                            <div className={styles.flagTeam}>
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-4.png`} layout="fill" alt="Predictions Italy" />
                                            </div>
                                            Predictions Italy
                                        </div>
                                        <span className="material-icons">chevron_right</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex aligncenter space-between" onClick={() => navTo('france', 'France', 'France')}>
                                        <div className="flex aligncenter">
                                            <div className={styles.flagTeam}>
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-1.png`} layout="fill" alt="Predictions France" />
                                            </div>
                                            Predictions France
                                        </div>
                                        <span className="material-icons">chevron_right</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex aligncenter space-between" onClick={() => navTo('spain', 'Spain', 'Spain')}>
                                        <div className="flex aligncenter">
                                            <div className={styles.flagTeam}>
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-3.png`} layout="fill" alt="Predictions Spain" />
                                            </div>
                                            Predictions Spain
                                        </div>
                                        <span className="material-icons">chevron_right</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex aligncenter space-between" onClick={() => navTo('germany', 'Germany', 'Germany')}>
                                        <div className="flex aligncenter">
                                            <div className={styles.flagTeam}>
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-3.png`} layout="fill" alt="Predictions Germany" />
                                            </div>
                                            Predictions Germany
                                        </div>
                                        <span className="material-icons">chevron_right</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex aligncenter space-between" onClick={() => navTo('england', 'England', 'England')}>
                                        <div className="flex aligncenter">
                                            <div className={styles.flagTeam}>
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-2.png`} layout="fill" alt="Predictions England" />
                                            </div>
                                            Predictions England
                                        </div>
                                        <span className="material-icons">chevron_right</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="flex aligncenter space-between" onClick={() => navTo('belgium', 'Belgium', 'Belgium')}>
                                        <div className="flex aligncenter">
                                            <div className={styles.flagTeam}>
                                                <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/drapeau-15.png`} layout="fill" alt="Predictions Belgium" />
                                            </div>
                                            Predictions Belgium
                                        </div>
                                        <span className="material-icons">chevron_right</span>
                                    </a>
                                </li>
                            </ul>                                   
                        </div>
                        <div className={`${styles.appmContent} app-st-2`}>
                            <ListCountry />
                        </div>
                        <div className={`${styles.appmContent} app-st-3`}>
                            <ListTeams />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999999 }} elevation={1}>
            <div className="noDisplay">
            <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                setHamburger('close')
                setFullMenu('close')
                newValue == 0 ? Router.push("/") : newValue == 1 ? Router.push("/football/") : newValue == 2 ? Router.push("/football-tips-prediction") : Router.push("/top-5-predictions-tools")
            }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Live" icon={<AccessAlarmsIcon />} />
                <BottomNavigationAction label="Wintips" icon={<TipsAndUpdatesIcon />} />
                <BottomNavigationAction label="Tools" icon={<ConstructionIcon />} />
            </BottomNavigation>
            </div>
        </Paper>
        </MenuContext.Provider>
    )
}