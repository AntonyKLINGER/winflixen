import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import styles from '../styles/Footer.module.css'
import { WINFLIX_URL } from '../config'
import Skeleton from '@mui/material/Skeleton'

export default function ListTeams({title, league}){

    const [list, setList] = React.useState([{}])
    const [isLoad, setIsLoad] = React.useState(false)

    useEffect(() => {
        fetch(`${WINFLIX_URL}/api/teams/league.php?id=${league}`)
        .then(res => res.json())
        .then(data => {
            setList(data)
            setIsLoad(true)
        })
    }, [league])

    return (
        <div>
            <h3 className={styles.titleFooter}>{title}</h3>
            <ul className={styles.menuFooter}>
                {isLoad ? 
                    list.map((team, index) => {
                        return (
                            <li key={index}>
                                <Link href={team.url} passHref legacyBehavior>
                                    <a className="flex aligncenter mCenter">
                                        <div className={styles.flagCountry}><Image src={team.logo} alt="flag pays" layout="fill" /></div> Football Prediction {team.name}
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                : (
                    <li>
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                        <Skeleton variant="rectangular" animation="wave" width={210} height={20} />
                    </li>
                )}
            </ul>
        </div>
    )
}