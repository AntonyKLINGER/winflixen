import React, { useEffect, useContext } from 'react'
import {UserContext} from '../UserContext'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { WINFLIX_URL } from '../config'
import Skeleton from '@mui/material/Skeleton'
import Router, { useRouter } from 'next/router'

export function HeaderCTA(){

    const {sub, setSub, loadUser, setLoadUser} = useContext(UserContext)
    const [cta, setCta] = React.useState("")
    const [load, setLoad] = React.useState(false)
    const [test, setTest] = React.useState(true)

    const router = useRouter()

    useEffect(() => {
        fetch(`${WINFLIX_URL}/api/cta/fr/header.php`)
        .then(res => res.json())
        .then(data => {
            setCta(data)
            setLoad(true)
        })
    }, [])

    useEffect(() => {
    
        if(sub.status == "active"){
            setTest(true)
        }
        else{
            setTest(false)
        }
        
    }, [sub, router.route])

    return (
        <div className={test ? "connected" : ""}>
            {/* {load ? (
                <div>
                    <Link href="/vip/" passHref legacyBehavior>
                        <a className="relative ctaDesktopHeader">
                            <Image src={cta.desktop} alt="cta header winflix football predictions" priority="29" layout="fill" quality="100" />
                        </a>
                    </Link>
                    <Link href="/vip/" passHref legacyBehavior>
                        <a className="relative ctaMobileHeader">
                            <Image src={cta.mobile} alt="cta header winflix football predictions" priority="30" layout="fill" quality="100" />
                        </a>
                    </Link>
                </div>
            )
            : (
                <Link href="/vip/" passHref legacyBehavior>
                    <a className="relative ctaDesktopHeader">
                        <Skeleton variant="rectangular" animation="wave" width={1280} height={112} radius="18" />
                    </a>
                </Link>
            )} */}
        </div>
    )
}


export function OutilsCTA(){

    const [cta, setCta] = React.useState("")
    const [load, setLoad] = React.useState(false)

    useEffect(() => {
        fetch(`${WINFLIX_URL}/api/cta/fr/outils.php`)
        .then(res => res.json())
        .then(data => {
            setCta(data)
            setLoad(true)
        })
    }, [])

    return (
        <div>
            {load ? (
                <div>
                <Link href="/vip/" passHref legacyBehavior>
                    <a className="relative ctaDesktopOutils">
                        <Image src={cta.desktop} alt="Test CTA Winflix football tips" priority="55" layout="fill" quality="100" />
                    </a>
                </Link>
                </div>
            )
            : (
                <Link href="/vip/" passHref legacyBehavior>
                    <a className="relative ctaDesktopOutils">
                        <Skeleton variant="rectangular" animation="wave" width={1280} height={112} radius="18" />
                    </a>
                </Link>
            )}
        </div>
    )
}

export function SidebarCTA(){

    const [cta, setCta] = React.useState("")
    const [load, setLoad] = React.useState(false)

    useEffect(() => {
        fetch(`${WINFLIX_URL}/api/cta/fr/sidebar.php`)
        .then(res => res.json())
        .then(data => {
            setCta(data)
            setLoad(true)
        })
    }, [])

    return (
        <div>
            {load ? (
                <div>
                <Link href="/vip/" passHref legacyBehavior>
                    <a className="relative ctaSide">
                        <Image src={cta.desktop} alt="football predictions CTA Sidebar Winflix" layout="fill" priority="50" quality="100" />
                    </a>
                </Link>
                </div>
            )
            : (
                <Link href="/vip/" passHref legacyBehavior>
                    <a className="relative ctaSide">
                        <Skeleton variant="rectangular" animation="wave" width={1280} height={112} radius="18" />
                    </a>
                </Link>
            )}
        </div>
    )
}