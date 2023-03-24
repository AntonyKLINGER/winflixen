import React, { useContext } from 'react'
import { MenuContext } from '../MenuContext'
import { WINFLIX_URL } from '../config'
import Link from 'next/link'
import Image from 'next/legacy/image'
import LinkMenu from '../components/LinkMenu'
import LinkMenuTeam from '../components/LinkMenuTeam'
import styles from '../styles/Header.module.css'
import Skeleton from '@mui/material/Skeleton'

export default function ListCountry(props){

    const {translate, setTranslate, infosCountry, setInfosCountry, teams, setTeams, league, setLeague, paysDatas, setPaysDatas, openMenu} = useContext(MenuContext)

    function backTo(){
        setTranslate("-33.3%")
    }

    return (
        <div className={styles.appmCountry}>
            <a className={styles.appmTitleBack} onClick={backTo}>
                <span className="material-icons" data-icon="chevron_left"></span>
                Back
            </a>
            <span className={styles.appmSub}>
            {league ? (
                <div className="flex aligncenter">
                    <div className={styles.appmFlag}>                
                        <Image src={`https://wp.winflix.net/wp-content/themes/winflix/img/${paysDatas[0].drapeau}`} layout="fill" alt="logo pays" />
                    </div>
                    Predictions {league}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            </span>
            <ul className={styles.appmPrimary}>
                {teams[0] ? 
                    teams.map((item, index) => {
                        return (
                            <li onClick={openMenu} key={index}><LinkMenuTeam logo={item.flag} value={`Predictions ${item.nom}`} href={item.url} /></li>
                        )
                    })
                : (
                    <>
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>   
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>   
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>   
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>   
                        <li><a><Skeleton animation="wave" variant="rectangular" width={360} height={20} /></a></li>     
                    </>
                )}
            </ul> 
        </div>
    )
}