import styles from '/styles/Tools.module.css'
import React, { useEffect } from 'react';

export default function OptionMatch({data}){

    const [percent, setPercent] = React.useState(0)
    useEffect(() => {
        setPercent(data.taux)
    }, [data])

   return (
    <div className={`${styles.matchOption} flex aligncenter space-between ${data.tri === true ? "w100" : "w32"} wm100 mTop10`}>
        <div className="w70">
            <span className={styles.matchOpt}>{data.option}</span>
            <div className="flex aligncenter mTop5">
                <div className={styles.lineProgress}>
                    <span style={{ width: `${percent}%` }} className={styles.lineValue}></span>
                </div>
                <span className={styles.linePercent}>{data.tri === true ? data.taux.toFixed(2) : data.taux.toFixed(1)}%</span>
            </div>
        </div>
        <div className="w30 text-right">
            <span className={styles.oddOption}>{data.cote}</span>
        </div>
    </div>
   ) 
}