import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { HeaderCTA } from '../components/CTA'
import Sidebar from '../components/Sidebar'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'
import styles from '../styles/Blog.module.css'

export default function Article({datas}){
    return (
        <div className={styles.appBlog}>
            <Head>
                <title>{datas[0].title.replaceAll("&quot;", "").replaceAll("&#39;", "'")}</title>
                <meta name="description" content="Need to find the best football predictions ⚽ ? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% fiablite and a VIP recommended!" />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content={datas[0].title.replaceAll("&quot;", "").replaceAll("&#39;", "'")} />
                <meta property="og:description" content="Need to find the best football predictions ⚽ ? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% fiablite and a VIP recommended!" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_EN" />
            </Head>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>               
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content">
                            <p className={styles.breadcrump}><Link href="/">Home</Link> / <Link href="/news/">News</Link> / <span dangerouslySetInnerHTML={{__html:datas[0].title}}></span></p>
                            <h1 className="app-title-h2" dangerouslySetInnerHTML={{__html : datas[0].title}}></h1>
                            <div className="flex aligncenter mTop10 mBot20">
                                <span className={`${styles.writed}`}><span className="material-icons" data-icon="edit_note"></span>Published on {datas[0].date}</span>
                                <span className={`${styles.cat} mLeft10`}><span className="material-icons" data-icon="sports_soccer"></span>Football</span>
                            </div>                    
                            <div className={styles.appFeatured}>
                                <Image src={datas[0].media} alt="featured image" layout="fill" />
                            </div>
                            <div className="mTop30 seoContent" dangerouslySetInnerHTML={{__html : datas[0].content}}></div>
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

export async function getServerSideProps(context){
    // Fetch data from external API
    const slug = context.query.slug
    const resq = await fetch(`${WINFLIX_URL}/api/blog/fr/post/?slug=${slug}`)
    const datas = await resq.json()

    if (!datas[0]) {
        return {
          notFound: true,
        }
    }
    
    // Pass data to the page via props
    return { props: { datas } }
}