import Link from 'next/link'

export default function LinkMenu(props){
    return (
        <Link href={props.href} passHref legacyBehavior>
            <a className="flex aligncenter">
                <span className="material-icons" data-icon={props.icon}></span>
                {props.value}
            </a>
        </Link>
    )
}