import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import {WINFLIX_URL} from '../config'
import styles from '../styles/Home.module.css'

export default function BoxLink({icon, title, text}){
    return (
        <Link href="/" passHref legacyBehavior>
            <a className={`${styles.boxLink} w48 wm100`}>
                <div className="flex aligncenter">
                    <div className={`${styles.quickPicto}`}>
                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/${icon}.png`} alt="icon" layout="fill" />
                    </div>
                    <span className={styles.outilTitle}>{title}</span>
                </div>
                <p>{text}</p>
            </a>
        </Link>
    )
}