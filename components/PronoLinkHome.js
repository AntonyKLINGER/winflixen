import Link from 'next/link'
import Image from 'next/legacy/image'
import styles from '../styles/Home.module.css'

export default function PronoLink({flag, title, url}){
    return (
        <Link href={url} passHref legacyBehavior>
            <a className={`${styles.pronoLink} flex aligncenter space-between wm100`}>
                <div className="flex aligncenter">
                    <div className={styles.flagCountry}>
                        <Image src={flag} alt="logo pays" layout="fill" />
                    </div>
                    <span className={styles.titleCountry}>{title}</span>
                </div>
                <div className={`${styles.iconmd} material-icons`} data-icon="ads_click"></div>
            </a>
        </Link>
    )
}