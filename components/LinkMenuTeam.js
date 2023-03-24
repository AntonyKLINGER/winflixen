import Link from 'next/link'
import Image from 'next/legacy/image'
import styles from '../styles/Header.module.css'

export default function LinkMenu(props){
    return (
        <Link href={props.href} passHref legacyBehavior>
            <a>
                <div className={styles.flagTeam}>
                    <Image src={props.logo} layout="fill" alt={props.value} />
                </div>
                {props.value}
            </a>
        </Link>
    )
}