import Image from 'next/legacy/image'
import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'
import { WINFLIX_URL } from '../config'

export default function PronoBoxHome({data}){
    return (
        <div itemScope itemType="https://schema.org/SportsEvent">
            <Link href={`https://winflix.net/it/calcio/pronostico/${data.url}`} passHref legacyBehavior>
                <a className={styles.linkProno}>
                    <div className="flex aligncenter justicenter">
                        <Image src={`https://winflix.net/logos/logo/logo_${data.homeTeam.team_id}.webp`} alt="logo team a" width={25} height={25} />
                        <span className={styles.space}></span>
                        <Image src={`https://winflix.net/logos/logo/logo_${data.awayTeam.team_id}.webp`} alt="logo team a" width={25} height={25} />
                    </div>
                    <span itemProp="name" className={styles.pronoText}>Football Prediction<br /><strong><span itemProp="homeTeam">{data.homeTeam.team_name}</span> - <span itemProp="awayTeam">{data.awayTeam.team_name}</span></strong><br /><span className={styles.pronoDate}>{data.date} {data.league_name}</span></span>
                    <div className="text-center justicenter flex mTop5">
                        <span className={`material-icons ${styles.pronoBtn}`} data-icon="chevron_right"></span>
                    </div>
                    <span itemProp="description" className="disnone">Find prediction {data.homeTeam.team_name} - {data.awayTeam.team_name} Given by Winflix algorithm, reliable soccer prediction. Look for the best prediction to bet on{data.homeTeam.team_name} - {data.awayTeam.team_name} , Finden Sie es auf winflix.net/de heraus {data.homeTeam.team_name} - {data.awayTeam.team_name}  1x2 BTTS über / unter dem genauen ET-Score.</span>
                    <span itemProp="startDate" className="disnone">{data.date}</span>
                    <div itemProp="location" className="disnone" itemScope itemType="https://schema.org/Place">
                        <span itemProp="name"></span>
                        <span itemProp="address">{data.address}</span>
                        <span itemProp="url">https://winflix.net/en/football/predictions/{data.url}</span>
                    </div>
                    <span className="disnone" itemProp="sport">Football</span>
                </a>
            </Link>
        </div>
    )
}