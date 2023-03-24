import React, { useEffect } from 'react'
import styles from '../styles/PronosticMatch.module.css'
import { WINFLIX_URL } from '../config'

export default function Option({type, prono, odd, id}){

    const [percent, setPercent] = React.useState(0)
    const [load, setLoad] = React.useState(false)

    useEffect(() => {
        const fetchPercent = async () => {
            const request = await fetch(`${WINFLIX_URL}/api/pronos/stats/?id=${id}&prono=${prono}`)
            const json = await request.json()
            setPercent(json)
            setLoad(true)
        }
        fetchPercent()
    }, [prono])

    return (
        <div className="flex mwrap mBot10 relative">
            <div className={`w40 ${styles.cOption} wm100`}>
                <span className={styles.cLabel}>Game option :</span>
                <span>{type}</span>
            </div>
            <div className={`w40 ${styles.cPerc} wm100 mmTop10`}>
                <span className={styles.cLabel}>
                    Rate :
                    <span className={styles.cNumb}>{load ? `${percent.percent}%` : ""}</span>
                </span>
                <div className={styles.cTotal}>
                    <div className={styles.cRempli} style={{ width: load ? `${percent.percent}%` : "0%" }}></div>
                </div>
            </div>
            <div className={`w20 ${styles.cOdds} wm25`}>
                <span className={styles.cLabel}>
                    Odd :
                </span>
                <span className={styles.cOddsMin}>
                    {odd}
                </span>
            </div>
        </div>
    )
}