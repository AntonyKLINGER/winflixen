import Link from 'next/link'

export function RedButton({icon, title, href}){
    return (
        <Link href={href} passHref legacyBehavior>
            <a className="app-btn-v1">
                <span className="material-icons" data-icon={icon}></span>
                <span>{title}</span>
            </a>
        </Link>
    )
}