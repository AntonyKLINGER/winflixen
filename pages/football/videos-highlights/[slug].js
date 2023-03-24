import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../../../components/Sidebar'
import FullBarChart from '../../../components/FullBarChart'
import MenuMatch from '../../../components/MenuMatch'
import ButStats from '../../../components/ButStats'
import Barchart from '../../../components/Barchart'
import Countdown from '../../../components/Countdown'
import StatusMatch from '../../../components/StatusMatch'
import { HeaderCTA, OutilsCTA } from '../../../components/CTA'
import Match from '../../../components/Match'
import BetTicket from '../../../components/betTicket'
import styles from '../../../styles/FormeStats.module.css'
import { WINFLIX_URL } from '../../../config'
import Others from '../../../components/OtherMatchs'

export default function FormeStats({datas}){

    const data = datas.datas
    const title = `Highlights, Goals and Videos ${data.homeTeam.team_name} ${data.awayTeam.team_name} from ${data.date}`;

    const [odds, setOdds] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [rank, setRank] = React.useState(null)
    const [loadRank, setLoadRank] = React.useState(false)
    const {user, setUser} = useContext(UserContext)
    const {sub, setSub} = useContext(UserContext)
    const {open, setOpen} = useContext(UserContext)
    const {ticket, setTicket} = useContext(UserContext)
    const {cote, setCote} = useContext(UserContext)
    const {timer, setTimer} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const [lastA, setLastA] = React.useState(null)
    const [loadA, setLoadA] = React.useState(false)
    const [lastB, setLastB] = React.useState(null)
    const [loadB, setLoadB] = React.useState(false)
    
    return (
        <div className="appInfos">
            <Head>
                <title>{title}</title>
                <meta name="description" content={`😎 All goals of the game in the video! Best deeds and game summary ${data.homeTeam.team_name} against ${data.awayTeam.team_name}`} />
                <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/actions-videos/videos-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/fussball-highlights/tore-video-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/diretta-gol/gol-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en/football/videos-highlights/highlights-goals-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
                <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/actions-videos/videos-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/fussball-highlights/tore-video-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/diretta-gol/gol-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en/football/videos-highlights/highlights-goals-${data.homeTeam.team_url}-${data.awayTeam.team_url}-${data.date.replaceAll("/", "-")}-${data.league_name.replaceAll(" ", "-").toLowerCase()}/`} />
            </Head>
            <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/">
                <span itemProp="name">Football Predictions Website</span></a>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/en/football/">
                <span itemProp="name">Football</span></a>
                <meta itemProp="position" content="2" />
              </li>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href={`https://winflix.net/en/football/videos-highlights/${datas.slug}`}>
                <span itemProp="name">Highlights and videos {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : Goals and highlights</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
                
            <div itemScope itemType="https://schema.org/SportsEvent" style={{display: "none"}}>
                  <span itemProp="name">Videos {data.homeTeam.team_name} {data.awayTeam.team_name} {data.date}</span>
                  <span itemProp="description">Summary, video goals {data.homeTeam.team_name} {data.awayTeam.team_name} {data.league_name_fr}</span>
                  <span itemProp="startDate" content={data.event_date}>{data.event_date}</span>
            	  <span itemProp="homeTeam">{data.homeTeam.team_name}</span>
                  <span itemProp="awayTeam">{data.awayTeam.team_name}</span>
                  <span itemProp="sport">Football</span>
                  <div itemProp="location" itemScope itemType="http://schema.org/Place">
                  <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                      <span itemProp="addressLocality">{data.venue}</span>
                      <span itemProp="addressRegion">{data.country}</span>
                    </div>
                </div>
                <span itemProp="competitor">{data.homeTeam.team_name}</span>
                <span itemProp="competitor">{data.awayTeam.team_name}</span>
                <span itemProp="eventStatus">{data.status}</span>
            </div>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
                <p className={`${styles.breadcrump} mTop30 mBot20`}><Link href="/football/">Football</Link> {'>'} <Link href="/football/">Videos</Link> {`> ${datas.title}`}</p>     
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <MenuMatch page="4" base={datas.guid} />
                        <div className="app-content relative mBot30">
                            <StatusMatch datas={data} id={datas.fixture_id} />
                            <h1>Goals and Highlights Videos {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date}</h1>
                            <p className="text-center mBot20 mmBot40">If you love soccer you will love seeing the goals and summaries. Whether or not we've watched the {data.homeTeam.team_name} vs. {data.awayTeam.team_name} game, it's always a pleasure to see the best action, recaps and goals on video. Achievements can be found here, right during the game {data.homeTeam.team_name} {data.awayTeam.team_name} minutes after the action.</p>
                        </div>
                        <div className="app-content mBot30 text-center">
                            <span className="app-title-h2">No videos yet</span>
                            <p>Sorry, there are no videos for this game yet. Come back later to see all the in-game achievements.</p>
                            <Link href={`https://www.youtube.com/results?search_query=${data.homeTeam.team_name}+vs+${data.awayTeam.team_name}+06%2F12%2F2022+goals`} passHref legacyBehavior>
                                <a target="_blank" className="videoTag">
                                    <span className="material-icons" data-icon="smart_display"></span>
                                    Watch Goal Highlights on YouTube!
                                </a>
                            </Link>
                        </div>
                        {sub.status != "active" && (
                            <div className="mBot30">
                                <OutilsCTA />
                            </div>   
                        )}
                        
                    </div>
                    <div className="w35 wm100 mmTop30">
                        <Others fixture_id={datas.fixture_id} league_id={data.league_id} league_name_fr={data.league_name_fr} />
                        <Sidebar />
                    </div>
                </div>
                <BetTicket />
            </div>
        </div>
    )
}


// export async function getServerSideProps(context){
//     // Fetch data from external API
//     const slug = context.query.slug
//     const resq = await fetch(`${WINFLIX_URL}/api/pages/fr/?slug=${slug}`)
//     const datas = await resq.json()
  
//     // Pass data to the page via props
//     return { props: { datas } }
// }

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const { slug } = params
    const res = await fetch(`https://wpen.winflix.net/api/pages/fr/?slug=${slug}`)
    const datas = await res.json()

    return {
        props: {datas},
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 2, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch('https://wpen.winflix.net/wp-json/wp/v2/pages?parent=161')
    const posts = await res.json()

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}