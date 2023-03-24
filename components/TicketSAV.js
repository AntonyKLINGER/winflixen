import React from 'react'
import styles from '/styles/Account.module.css'

export default function TicketSAV({data}){
    
    const [open, setOpen] = React.useState(false)

    const openToggle = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
            <a className={styles.ticket} onClick={openToggle}>
                #{data.id} - {data.sujet}
                <span>{data.status}</span>
            </a>
            {open && (
                <div className={`${styles.contenu}`}>
                {data.discuss.map((ticket, index) => {
                    return (
                        <div key={index} className={`${styles.answer}`}>
                            <span className={styles.auteur}>Autor : {ticket.author} <span className="x_date">({ticket.date})</span></span>
                            <span dangerouslySetInnerHTML={{ __html: ticket.content}}></span>
                        </div>                   
                    )
                })}
                </div>                  
            )}
  
        </>
    )
}