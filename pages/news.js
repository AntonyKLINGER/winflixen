import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Head from 'next/head'
import { HeaderCTA } from '/components/CTA'
import Sidebar from '/components/Sidebar'
import { WINFLIX_URL } from '/config'
import styles from '/styles/Actualites.module.css'
import BlogPostList from '../components/BlogPostList'
import Skeleton from '@mui/material/Skeleton'

export default function Actualites({datas}){

    const [actus, setActus] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [formations, setFormations] = React.useState(null)
    const [loadf, setLoadf] = React.useState(false)

    useEffect(() => {
        const fetcher = async () => {
            const reque = await fetch(`${WINFLIX_URL}/api/blog/fr/`)
            const json = await reque.json()
            setActus(json)
            setLoad(true)
        }
        fetcher()
    }, [])

    useEffect(() => {
        const fetcher2 = async () => {
            const reque = await fetch(`${WINFLIX_URL}/api/blog/fr/?cat=18&limit=20`)
            const json = await reque.json()
            setFormations(json)
            setLoadf(true)
        }
        fetcher2()
    }, [])

    return (
        <div className={styles.appActualites}>
            <Head>
                <title>Follow all football news 100% with Winflix!</title>
                <meta name="description" content="Need to find the best base site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Fiablite and VIP Recommended!" />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/actualites/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/news/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/news/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/news/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/actualites/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/news/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/news/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/news/" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className="app-title-h2" style={{ marginTop: '0px' }}>The news training in football predictions and sports betting</h1>
                            <p className="mBot20">The entire Winflix team shares their knowledge and all their tips to help you understand how the outcome of a match prevails and use the tools better for your sports betting.</p>
                            {loadf ? formations.map((article, index) => {
                                return <BlogPostList key={index} datas={article} />
                            }) : (
                                <>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                </>
                            )}                        
                        </div>
                        <div className="app-content mBot30">
                            <h2 className="app-title-h2" style={{ marginTop: '0px' }}>All football 100% news</h2>
                            <p className="mBot20">Follow the latest football news on Winflix!</p>
                            {load ? actus.map((article, index) => {
                                return <BlogPostList key={index} datas={article} />
                            }) : (
                                <>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                    <div className="flex aligncenter mBot20">
                                        <div className="w30 mRight20">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '15px'}} height={120} />
                                        </div>
                                        <div className="w70">
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '10px', borderRadius: '10px'}} height={40} />
                                            <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '0px', borderRadius: '5px'}} height={20} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w35 wm100">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}