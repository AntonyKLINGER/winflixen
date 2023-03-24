import styles from '../styles/PronosticMatch.module.css'

export default function Probabox({text}){
    return (
        <div className={`w20 wm45 text-center ${styles.cProba}`}>
            {text}
        </div>
    )
}