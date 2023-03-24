import Image from 'next/legacy/image'
import styles from '../styles/AvisMembres.module.css'
import Rating from '@mui/material/Rating';
import Head from 'next/head'

export default function Review({datas}){

    const JSONLD = {
        "@context":"http://schema.org",
        "@type":"Review",
        "itemReviewed":
        {
            "@type":"Organization",
            "name":"Winflix - Prediction Tips"
        },
        "author":
        {
            "@type":"Person",
            "name": datas.nom
        },
        "reviewRating":
        {
            "@type":"Rating",
            "bestRating":5,
            "ratingValue":5
        }, 
        "name":"Titre", 
        "reviewBody": datas.reviewText, 
        "publisher":
        {
            "@type":"Organization",
            "name":"Winflix"
        },
        "datePublished":datas.date.replaceAll("/", "-")
    }

    return (
        <>
        <Head>
            <script type="application/ld+json">
            {JSON.stringify(JSONLD)}
            </script>            
        </Head>
        <div className="app-review flex aligncenter flex-start mBot30">
            <div className="w10 text-center mRight30">
                <div className={styles.reviewPerson}>
                    <span className="material-icons" data-icon="perm_identity"></span>
                </div>
                <div className="review-metas">
                    <span className={styles.metaName}>{datas.nom}</span>
                    <span className={styles.metaDate}>{datas.date}</span>
                </div>                  
            </div>
            <div className="w80">                      
                <Image src={`https://wp.winflix.net/wp-content/uploads/2020/10/reviews-.png`} alt="avis-membre winflix" width={50} height={8.6} />
                <span className={styles.reviewText} dangerouslySetInnerHTML={{__html: datas.content}}></span>
            </div>
        </div>
        </>
    )
}