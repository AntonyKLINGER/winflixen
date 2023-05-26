import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { NextResponse, NextRequest } from 'next/server'
import Image from 'next/legacy/image'
import Sidebar from '../../components/Sidebar'
import Tips from '../../components/ContentTips'
import GestionDeMise from '../../components/GestionDeMise'
import TipsRank from '../../components/TipsRank'
import { HeaderCTA, OutilsCTA } from '../../components/CTA'
import Skeleton from '@mui/material/Skeleton'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import styles from '../../styles/Wintips.module.css'
import { WINFLIX_URL } from '../../config'

export default function WintipsSingle({datas}){

    const title = `Football Prediction | Winflix 🏆 → the trusted site!`;

    const {user, setUser, sub, setSub, loadUser, setLoadUser} = React.useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const [open, setOpen] = React.useState(false)
    const [wintips, setWintips] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [data, setData] = React.useState(datas[0])
    const [pronos, setPronos] = React.useState([])
    const [loadPronos, setLoadPronos] = React.useState(false)
    const [choix, setChoix] = React.useState([])
    const [choixAdmin, setChoixAdmin] = React.useState([])
    const [msg, setMsg] = React.useState(null)
    const [check, setCheck] = React.useState(false)
    const [choose, setChoose] = React.useState(null)
    const [play, setPlay] = React.useState(false)
    const [rank, setRank] = React.useState(null)
    const [dateJour, setDate] = React.useState(null)
    const [loadDate, setLoadDate] = React.useState(false)
    const [loadRank, setLoadRank] = React.useState(false)
    const [stats, setStats] = React.useState(false)
    const [resultats, setResultats] = React.useState(false)
    const [valider, setValider] = React.useState([])

    const [tri, setTri] = React.useState([
        "Ligue 1 / Ligue 2", "Bundesliga / Bundesliga 2", "Eerste Divisie", "LaLiga / LaLiga 2", "Raiffeisen Super League", "Serie A / Serie B", "Premier League / Championship", "Jupiler Pro League", "Autre Monde", "MLS", "Liga NOS", "Autre EU", "Super Lig"
    ])

    const openBox = () => {
        setOpen(true)
    }

    useEffect(() => {
        let date = new Date()
        setDate(date)
        setLoadDate(true)
    }, [])

    useEffect(() => {
        if(sub.status != "active" && loadUser){
            Router.push("/vip/")
        }
    }, [user])

    
        useEffect(() => {
            if(user.user_id == 1){
                const checker = async () => {
                    const req = await fetch(`${WINFLIX_URL}/api/wintips/vote/admin/check/?idpost=${data.id}`)
                    const json = await req.json()
                    if(json[0].exist == "yes"){
                        setStats(true)
                    }
                    else{
                        setStats(false)
                    }
                }
                checker()
            }
        }, [])
    

    const createStats = async () => {
        const req = await fetch(`${WINFLIX_URL}/api/wintips/vote/admin/create/?idpost=${data.id}`)
        const json = await req.json()
        if(json[0].message == "success"){
            setStats(true)
        }
        else{
            setStats(false)
        }
    }

    const addResults = async () => {
        let matchs = []
        choixAdmin.map((match, i) => {
            matchs.push(match.match+1)
        })
        if(matchs.length > 0){
            const req = await fetch(`${WINFLIX_URL}/update_results.php?postid=${data.id}&match=${matchs.toString()}&date=${data.acf.date_formatee}&format=${data.acf.date_formatee}`)
            const json = await req.json()
            if(json[0].message == "success"){
                setResultats(true)
            }
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setResultats(false)
          }, 2000);
          return () => clearTimeout(timer);
    }, [resultats])

    useEffect(() => {
        const leagues = []
        const championnats = data.acf.pronostic_option.map((prono, index) => {
            if(leagues.includes(prono.championnat_c) == false){
                leagues.push(prono.championnat_c)
            }
        })
        setPronos(leagues)
        setLoadPronos(true)
    }, [])

    const handleChoice = (m, c) => {
        const exist = choix.find(choice => choice.match === m)
        if(!exist){
            setChoix(prevChoix => {
                return [...prevChoix, {match: m, choix: c}]
            })
        }
        else{
            setChoix(prevChoix => {
                const newChoice = prevChoix.map((match, index) => {
                    if(match.match == m){
                        return {match: m, choix: c}
                    }
                    return [...prevChoix, match]
                })
                return newChoice
            })
        }
    }

    const handleChoiceAdmin = (m, c) => {
        const exist = choixAdmin.find(choice => choice.match === m)
        if(!exist){
            setChoixAdmin(prevChoixAdmin => {
                return [...prevChoixAdmin, {match: m, valid: true}]
            })
        }
        else{
            setChoixAdmin(prevChoixAdmin => {
                return prevChoixAdmin.filter(matching => matching.match != m)
            })
        }
    }


    const confirmChoices = async () => {
        if(choix.length > 0){

            let matchs = []
            let choices = []

            choix.map((match, i) => {
                matchs.push(match.match+1)
                choices.push(match.choix)
            })

            // envoi des datas via api
            const fetcher = await fetch(`${WINFLIX_URL}/engine.php?postid=${data.id}&joueur=${user.user_id}&lang=EN&match=${matchs.toString()}&res=${choices.toString()}`)
            const json = await fetcher.json()
            setMsg("Success")
        }
        else{
            setMsg("Nessuna scelta")
        }
    }

    useEffect(() => {
        const check = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/wintips/vote/?idpost=${data.id}&idjoueur=${user.user_id}`)
            const json = await fetcher.json()
            if(json[0].message == "play"){
                setCheck(true)
            }else{
                // ajout des choix
                setChoix(
                    prev => {
                        const newC = json[0].choices.matchs.map((t, i) => {
                            return {
                                match: t-1,
                                choix: json[0].choices.choices[i]
                            }
                        })
                        return newC
                    }
                )
                setCheck(false)
            }
        }
        check()
    }, [])

    useEffect(() => {
        const fetchRank = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/wintips/rank/?idpost=${data.id}`)
            const json = await fetcher.json()
            setRank(json)
            setLoadRank(true)
        }
        fetchRank()
    }, [msg])

    useEffect(() => {
        const fetchValider = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/wintips/vote/admin/results/?idpost=${data.id}`)
            const json = await fetcher.json()
            if(json.length > 0){
                setValider(json)
            }
        }
        fetchValider()
    }, [resultats])

    return (
        <div className={styles.appWintips}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Need to find the best football predictions site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Trusted and Recommended by VIP!`} />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={`Need to find the best football predictions site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Trusted and Recommended by VIP!`} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_EN" />    
            </Head>
            <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/">
                <span itemProp="name">Football Predictions Website</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/football/">
                <span itemProp="name">Football</span></a>
                <meta itemProp="position" content="2" />
              </li>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href={`https://winflix.net/en/football-tips-prediction/`}>
                <span itemProp="name">All the football predictions of the day from the experts</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <div className="flex aligncenter">
                                <div className="iconTitle mRight10">
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="icon safe" layout="fill" />
                                </div>
                                <h1>{data.title.rendered}</h1>                                
                            </div>
                            <p>Find a selection of the best European/World football predictions every day.</p>
                            <GestionDeMise />
                        </div>
                        {data.acf.numero_du_prono_safe && (
                            <>
                            <div className="app-content mBot30">
                                <span className="app-title-h2"> The sure promise of the day! </span>
                                <p className="mtop10 mbot20"> The safe of the day rings <strong>every day</strong>. If the safe of the day is a loser, use the bet management tool to adjust your bet the next day. </p>
                                <div className={`flex aligncenter toColumn ${styles.itemWt}`}>
                                    <div className={`w10 ${styles.iconS} mRight40 mRnone`}>
                                        <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="icon safe" layout="fill" />
                                    </div>
                                    <div className="x_item w70 wm100 mmTop30">
                                        <span className={styles.heureS}>Time : {data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].heure_du_match}</span>
                                        <div className="flex aligncenter toColumn relative">
                                            <div className="w50 wm100 mmBot10">
                                                <span className={styles.matchS}>Game :</span>
                                                <span className={styles.pronoS}>{data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_a_it ? data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_a_it : data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_a_c} - {data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_b_it ? data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_b_it : data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_b_c}</span>                                
                                            </div>
                                            <div className="w40 wm100">
                                                <span className={styles.matchS}>Prediction :</span>
                                                <span className={styles.pronoS}>{data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].pronostic_it ? data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].pronostic_it : data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].le_pronostic_c}</span>                              
                                            </div>
                                            <span className={`x_odds odds_orange w10 ${styles.xOdd}`}>{data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].la_cote_c}</span>
                                        </div>                                        
                                    </div>                    
                                </div>
                            </div>
                            <div className="app-content mBot30">
                                <span className="app-title-h2">Methode STAXX</span>
                                <p className="mTop10 mBot20">You must play <strong> 2 games in combined BET </strong>. In case of loss, use the bet manager to adjust your bet during the next bet. </p>
                                <div className={`flex aligncenter toColumn ${styles.itemWt}`}>
                                    <div className={`w10 ${styles.iconS} mRight40 mRnone`}>
                                        <Image src={`https://wp.winflix.net/wp-content/uploads/2021/12/logo-staxx-methode.png`} alt="logo staxx winflix" className="w100 micon mRnone mmBot20" layout="fill" />
                                    </div>
                                    <div className="w70 wm100 mmTop30">
                                        <div className="x_item mBot20">
                                            <span className={styles.heureS}>Time : {data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].heure_du_match}</span>
                                            <div className="flex aligncenter toColumn relative">
                                                <div className="w50 wm100 mmBot10">
                                                    <span className={styles.matchS}>Game :</span>
                                                    <span className={styles.pronoS}>{data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_a_it ? data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_a_it : data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_a_c} - {data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_b_it ? data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_b_it : data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].equipe_b_c}</span>
                                                </div>
                                                <div className="w40 wm100">
                                                    <span className={styles.matchS}>Prediction :</span>
                                                    <span className={styles.pronoS}>{data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].pronostic_it ? data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].pronostic_it : data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].le_pronostic_c}</span>                                          
                                                </div>
                                                <span className={`x_odds odds_rouge w10 ${styles.xOdd}`}>{data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].la_cote_c}</span>
                                            </div>
                                        </div>  
                                        <div className="x_item mBot20 app-sep-top">
                                            <span className={styles.heureS}>Time : {data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].heure_du_match}</span>
                                            <div className="flex aligncenter toColumn relative">
                                                <div className="w50 wm100 mmBot10">
                                                    <span className={styles.matchS}>Game :</span>
                                                    <span className={styles.pronoS}>{data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].equipe_a_it ? data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].equipe_a_it : data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].equipe_a_c} - {data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].equipe_b_it ? data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].equipe_b_it : data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].equipe_b_c}</span>
                                                </div>
                                                <div className="w40 wm100">
                                                    <span className={styles.matchS}>Prediction :</span>
                                                    <span className={styles.pronoS}>{data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].pronostic_it ? data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].pronostic_it : data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].le_pronostic_c}</span>                                          
                                                </div>
                                                <span className={`x_odds odds_rouge w10 ${styles.xOdd}`}>{data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].la_cote_c}</span>
                                            </div>
                                        </div>  
                                        <div className="x_item x_resume_item relative">
                                            <div className="flex aligncenter space-between">
                                                <div>
                                                    <span className={styles.matchS}>Summary :</span>
                                                    <span className={styles.pronoS}>Total :</span>                              
                                                </div>
                                                <span className={`x_odds odds_rouge w10 ${styles.xOddG}`}>
                                                    {(1*(data.acf.pronostic_option[data.acf.numero_du_prono_safe-1].la_cote_c)*(data.acf.pronostic_option[data.acf.numero_du_prono_staxx-1].la_cote_c)).toFixed(2)}
                                                </span>
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            </>                              
                        )}
                        <div className="app-content mBot30">
                            <h2>All predictions from the Winflix team</h2>
                            {(loadPronos && pronos.includes("Ligue 1 / Ligue 2")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Ligue 1 / Ligue 2"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Bundesliga / Bundesliga 2")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Bundesliga / Bundesliga 2"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Eerste Divisie")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Eerste Divisie"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("LaLiga / LaLiga 2")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "LaLiga / LaLiga 2"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Raiffeisen Super League")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Raiffeisen Super League"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Serie A / Serie B")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Serie A / Serie B"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Premier League / Championship")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Premier League / Championship"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Jupiler Pro League")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Jupiler Pro League"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Autre Monde")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Autre Monde"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("MLS")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "MLS"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Liga NOS")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Liga NOS"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Autre EU")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Autre EU"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            {(loadPronos && pronos.includes("Super Lig")) && data.acf.pronostic_option.map((prono, index) => {
                                if(prono.championnat_c == "Super Lig"){
                                    return (
                                        <>
                                        <div key={index} className={`${styles.boxChampionnat} w100 mTop20`}>
                                            <span className={`${styles.titleChampionnat} w100 flex aligncenter`}>
                                                <div className="teamflag mRight8">
                                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="safe icon" layout="fill" />
                                                </div>
                                                <span>{prono.championnat_c}</span>
                                            </span>
                                            <Tips id={datas[0].id} datas={prono} choix={choix} choixAdmin={choixAdmin} index={index} prevChoices={choose} handleChoice={handleChoice}
                                            handleChoiceAdmin={handleChoiceAdmin} valider={valider} />
                                        </div>
                                        </>
                                    )
                                }
                            })}
                            <div className="mTop30 text-center">
                                {msg == "Aucun choix" ? (
                                    <Alert severity="error" variant="outlined" sx={{color:'red', display: 'inline-flex', marginInline: 'auto'}}>You have not made any selection at the moment.</Alert>
                                ) : msg == "Success" && (
                                    <Alert severity="success" variant="outlined" sx={{color:'green', display: 'inline-flex', marginInline: 'auto'}}>Thank you for voting for these WinTips!</Alert>
                                )}
                                
                            </div>
                            {(msg != "Success" && check == true) && (
                                <div className="text-center mTop20">
                                    {(loadDate && loadPronos && (new Date(data.acf.date_formatee).valueOf() > dateJour.valueOf())) ? (
                                        <Button variant="contained" onClick={confirmChoices} disableElevation>
                                            Confirm my choice
                                        </Button>
                                    ) : (
                                        <Button sx={{fontSize: '14px !important'}} variant="outlined" disabled disableElevation>
                                            Voting is closed
                                        </Button>
                                    )}

                                </div>
                            )}
                            {check == false && (
                                <div className="mTop30 text-center">
                                    <Alert severity="success" variant="outlined" sx={{color:'green', display: 'inline-flex', marginInline: 'auto'}}>Vielen Dank, dass Sie für diese WinTips gestimmt haben !</Alert>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w35 wm100">
                        {user.user_id == 1 && (
                            <div className="app-content mBot30">
                                <span className="app-title-h2">Administration</span>
                                <div className="flex aligncenter mTop10">
                                    {stats ? (
                                        <Button variant="outlined" sx={{fontSize: '13px', fontWeight: '700', padding: '8px 20px', width: '50%', marginRight: '10px'}} disabled disableElevation>
                                            À jour.
                                        </Button>  
                                    ) : (
                                        <Button variant="outlined" onClick={createStats} sx={{fontSize: '13px', fontWeight: '700', padding: '8px 20px', width: '50%', marginRight: '10px'}} disableElevation>
                                            Créer les stats
                                        </Button>      
                                    )} 
                                    <Button variant="outlined" sx={{fontSize: '13px', fontWeight: '700', padding: '8px 20px', width: '50%', marginRight: '10px'}} onClick={addResults} disableElevation>
                                        Ajouter résultats
                                    </Button>                       
                                </div>
                                {resultats && (
                                    <Alert severity="success" sx={{marginTop: '15px', color: 'green', display: 'flex'}}>Les résultats ont été mise à jour !</Alert>
                                )}
                                
                            </div>
                        )}
                        <div className="app-content mBot30">
                            <span className="app-title-h2">Member Opinion</span>
                            <p>Based on Yes/No by WinTips</p>
                            {loadRank ? rank.map((line, index) => {
                               return <TipsRank key={index} datas={line} />
                            }) : (
                               <>
                                <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} width={370} height={60} />
                                <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} width={370} height={60} />
                                <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} width={370} height={60} />
                               </>
                            )}
                            
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

// export async function getServerSideProps(context){

//     // Fetch data from external API
//     const slug = context.query.slug
//     const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3dpbmZsaXgubmV0IiwiaWF0IjoxNjcwODQ4NTE3LCJuYmYiOjE2NzA4NDg1MTcsImV4cCI6MTY3MTQ1MzMxNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.NvAFwa1Z4BnLTZdLkZBW4el0uxx4bx-xB9qOv2cLLcU`;

//     const resq = await fetch(`${WINFLIX_URL}/wp-json/wp/v2/pronostic/?slug=${slug}`, {     
//         method: 'GET',
//         headers: { 
//             'Authorization': 'Bearer '+token,
//             'Content-Type': 'application/json'
//         }
//     })
//     const datas = await resq.json()
//     return { props: { datas } }       
    
// }


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    
    const { slug } = params
    const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3dpbmZsaXgubmV0IiwiaWF0IjoxNjcwODQ4NTE3LCJuYmYiOjE2NzA4NDg1MTcsImV4cCI6MTY3MTQ1MzMxNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.NvAFwa1Z4BnLTZdLkZBW4el0uxx4bx-xB9qOv2cLLcU`;

    const res = await fetch(`https://wpen.winflix.net/api/wintips/fr/single/?slug=${slug}`, {     
        method: 'GET',
        headers: { 
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    })
    const datas = await res.json()

    return {
        props: {datas},
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch('https://wp.winflix.net/wp-json/wp/v2/pronostic')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { slug: `wintips-${post.acf.date_du_prono}` },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}