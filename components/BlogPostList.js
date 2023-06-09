import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Blog.module.css'

export default function BlogPostList({datas}){
    return (
        <div className={`${styles.blogPost} flex aligncenter`}>
            <div className={`w30 mRight20 ${styles.blogCover2}`}>
                <Image src={`${datas.media}`} alt={`${datas.title}`} layout='fill' quality="20" />
            </div>
            <div className="w70">
                <Link href={datas.url.replaceAll('https://wpen.winflix.net', '')} passHref legacyBehavior>
                    <a className={styles.blogTitle} dangerouslySetInnerHTML={{__html: datas.title}}></a>
                </Link>
                <span className={styles.blogDate}>Published on {datas.date}</span>
            </div>
        </div>
    )
}