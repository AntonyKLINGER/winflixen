import React from 'react'
import styles from '../styles/Home.module.css'

export default function FAQ({question, answer}){

    const [open, setOpen] = React.useState(false)

    return (
        <div className={styles.faqToggle}>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 onClick={() => setOpen(prev => !prev)} className={styles.faqTitle} itemProp="name">{question}</h3>
            {open && (
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <div itemProp="text" dangerouslySetInnerHTML={{__html: answer}}></div>
                </div>
            )}
            </div>
        </div>
    )
}