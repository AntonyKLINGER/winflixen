import React, { useEffect, useContext } from 'react'
import styles from '../styles/Wintips.module.css'
import Link from 'next/link'
import Alert from '@mui/material/Alert';
import { WINFLIX_URL } from '../config'
import { UserContext } from '../UserContext'

export default function Tips({id, datas, handleChoice, choix, index, prevChoices, choixAdmin, handleChoiceAdmin, valider}){

    const {user, setUser} = useContext(UserContext)
    const [choose, setChoose] = React.useState(null)
    const [chooseAdmin, setChooseAdmin] = React.useState(null)
    const [verif, setVerif] = React.useState(true)

    useEffect(() => {
        if(choix.length > 0){
            choix.map((match, i) => {
                if(match.match == index){
                    setChoose(match.choix)
                }
            })
        }
    }, [choix])

    useEffect(() => {
        if(choixAdmin.length > 0){
            choixAdmin.map((match, i) => {
                if(match.match == index){
                    setChooseAdmin(true)
                }
            })
        }
    }, [choixAdmin])

    // index -> nb_match
    // id -> page id

    useEffect(() => {
        const check = async () => {
            const fetcher = await fetch(`${WINFLIX_URL}/api/wintips/fr/verif/?page=${id}&match=${index+1}`)
            const json = await fetcher.json()
            if(json.message == "valid"){
                setVerif(false)
            }
        }
        check()
    })

    return (
        <>
        <div className={`${styles.contentTips} w100`}>
            <div className={`${styles.wintipsSingle} flex aligncenter mwrap mBot10`}>
                <div className="w60 wm80 mRight10 mRnone">
                    <span className={styles.heureM}>Time : {datas.heure_du_match}</span>
                    <span className={styles.matchM}>
                        <span className={styles.prebox}>
                            <span className="material-icons" data-icon="sports_soccer"></span>
                            Football
                        </span>
                        <span className="teamA">{datas.equipe_a_it ? datas.equipe_a_it : datas.equipe_a_c}</span>
                        -
                        <span className="teamA">{datas.equipe_b_it ? datas.equipe_b_it : datas.equipe_b_c}</span>
                    </span>
                    <span className={`${styles.prebox}`}>
                        Prediction
                    </span>
                    <span className={`${styles.pronoM}`}>
                        {datas.le_pronostic_it ? datas.le_pronostic_it : datas.le_pronostic_c}
                    </span>
                </div>
                <div className="w10 wm20">
                    <span className={styles.coteM}>
                        {datas.la_cote_c}
                    </span>
                </div>
                <div className="w40 wm100 mmTop20 text-right mCenter">
                    <button className={`${styles.btnGood} ${choose == 1 ? `${styles.active1}` : ""}`} onClick={() => handleChoice(index, 1)}>Yes</button>
                    <button className={`${styles.btnNotgood} ${choose == 0 ? `${styles.active2}` : ""}`} onClick={() => handleChoice(index, 0)}>No</button>
                    {(verif && user.user_id == 1 && (valider.find(choice => choice != index+1) || valider.length == 0)) && (
                        <button className={`${styles.btnValidate} ${chooseAdmin ? `${styles.active3}` : ""}`} onClick={() => handleChoiceAdmin(index, 2)}>Validé</button>
                    )}
                </div>
            </div>
        </div>
        <Alert severity="success" sx={{ marginTop: '15px', color: 'green' }}>Wetten Sie mit Ihren Werbegeschenken! <Link href={datas.url_stats_match} className={styles.betNow}>Bet</Link></Alert>
        </>
    )
}