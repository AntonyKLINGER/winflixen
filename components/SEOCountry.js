import React from 'react'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'
import styles from '../styles/Home.module.css'


export default function SEOCountry({title, flag, alt, content}){

    const [open, setOpen] = React.useState(false)

    return (
        <div className={styles.toggleCountry}>
            <h3 className="flex aligncenter" onClick={() => setOpen(prevState => !prevState)}>
            <div className={`${styles.flagProno} mRight10`}>
                <Image src={flag} alt={alt} layout="fill" />
            </div>
            <span>{title}</span>
            </h3>
            {open && (
                <p dangerouslySetInnerHTML={{__html: content}}></p>
            )}
        </div>
    )
}