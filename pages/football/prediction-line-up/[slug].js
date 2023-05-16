import React, { useEffect, useContext } from 'react'
import { UserContext } from '../../../UserContext'
import Router, { useRouter } from 'next/router'
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
import Compo from '../../../components/Compo'
import BetTicket from '../../../components/betTicket'
import styles from '../../../styles/PronosticMatch.module.css'
import { WINFLIX_URL } from '../../../config'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Others from '../../../components/OtherMatchs'

export default function FormeStats({datas}){

    const data = datas.datas
    const title = `Probable formations ${data.homeTeam.team_name} ${data.awayTeam.team_name} from ${data.date} 👉 Probably and officially`;
    const router = useRouter()

    const {user, setUser} = useContext(UserContext)
    const {sub, setSub} = useContext(UserContext)
    const {open, setOpen} = useContext(UserContext)
    const {ticket, setTicket} = useContext(UserContext)
    const {cote, setCote} = useContext(UserContext)
    const {timer, setTimer} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const [value, setValue] = React.useState(0);
    const [load, setLoad] = React.useState(false)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const organisationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://winflix.net/en/",
        "name": "Winflix",
        "logo": "https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75",
        "sameAs": [
            "https://www.facebook.com/winflixfootball/",
            "https://twitter.com/winflix1/",
            "https://www.instagram.com/winflix_officiel/"
        ]
    }

    const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `Winflix : Line up ${data.homeTeam.team_name} ${data.homeTeam.away_name} ${data.homeTeam.team_name} ${data.date} in ${data.league_name_fr}`,
        "image": "https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75",
        "author": "Winflix",
        "publisher": {
            "@type": "Organization",
            "name": "Winflix",
            "logo": {
            "@type": "ImageObject",
            "url": "https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75"
            }
        },
        "datePublished": `${data.event_date}`,
        "description": `All line up informations about ${data.homeTeam.team_name} ${data.awayTeam.team_name} from ${data.date} in ${data.league_name_fr}.`
    }

    const speakableData = {
        "@context": "https://schema.org",
        "@type": "SpeakableSpecification",
        "xpath": [
          "/html/head/title",
          "/html/head/meta[@name='description']/@content"
        ]
    }
    
    const eventData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `Football Line Up ${data.homeTeam.team_name} vs ${data.awayTeam.team_name} from ${data.date} in ${data.league_name_fr}`,
        "startDate": `${data.event_date}`,
        "location": {
          "@type": "Place",
          "name": `${data.venue}`,
          "address": `${data.country}`
        },
        "organizer": {
          "@type": "Organization",
          "name": "Winflix"
        }
    }

    
    return (
        <div className="appInfos">
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Lineups: Which players will start and who will be substituted for the game ${data.homeTeam.team_name} against ${data.awayTeam.team_name} from ${data.date}`} />
                <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/football/compositions/compositions-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/fussball/aufstellung/aufstellung-${datas.trads.teamA}-${datas.trads.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/calcio/probabili-formazioni/formazione-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en${router.asPath}`} />
                <link rel="alternate" hrefLang="fr" href={`https://winflix.net/football/compositions/compositions-${datas.trads.fr.teamA}-${datas.trads.fr.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.fr.league}/`} />
                <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/fussball/aufstellung/aufstellung-${datas.trads.teamA}-${datas.trads.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.de.league}/`} />
                <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/calcio/probabili-formazioni/formazione-${datas.trads.it.teamA}-${datas.trads.it.teamB}-${data.date.replaceAll("/", "-")}-${datas.trads.it.league}/`} />
                <link rel="alternate" hrefLang="en" href={`https://winflix.net/en${router.asPath}`} />
                <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationData) }}
                />
                <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
                />
                <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableData) }}
                />
                <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
                />  
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
                <a itemProp="item" href={`https://winflix.net/en/football/prediction-line-up/${datas.slug}`}>
                <span itemProp="name">Lineups {data.homeTeam.team_name} - {data.awayTeam.team_name} from {data.date} : probable and official</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
                
            <div itemScope itemType="https://schema.org/SportsEvent" style={{display: "none"}}>
                  <span itemProp="name">Lineup {data.homeTeam.team_name} {data.awayTeam.team_name} {data.date}</span>
                  <span itemProp="description">Lineup {data.homeTeam.team_name} {data.awayTeam.team_name} {data.league_name_fr}</span>
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
                <p className={`${styles.breadcrump} mTop30 mBot20`}><Link href="/football">Football</Link> {'>'} <Link href="/football">Lineups</Link> {`> ${datas.title}`}</p>     
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <MenuMatch page="5" base={datas.guid} />
                        <div className="app-content relative mBot30">
                            <StatusMatch datas={data} id={datas.fixture_id} />
                            <h1>Lineup {data.homeTeam.team_name} - {data.awayTeam.team_name} | {data.date} {data.league_name_fr} : Probably and officially</h1>
                            <p className="text-center mBot20 mmBot40">The probable lineup for {data.homeTeam.team_name} {data.awayTeam.team_name} is already available here! In addition, 1 hour before the game you will find the official compositions for this game of the {data.league_name_fr} competition by {data.date}. Who will be present in the composition of the team? {data.homeTeam.team_name} and the team {data.awayTeam.team_name}, owner or substitute? Winflix will suggest the likely composition based on the last game of {data.homeTeam.team_name} and {data.awayTeam.team_name} and the official lineup once it is available and published on the official match info.</p>
                            <div className="app-secondary-menu-match notOnDesktop">
                                <Box sx={{ width: '100%', bgcolor: '#FFF'}}>
                                    <Tabs value={value} onChange={handleChange} centered>
                                        <Tab label={data.homeTeam.team_name} sx={{textTransform: 'initial', fontSize: '14px'}} />
                                        <Tab label={data.awayTeam.team_name} sx={{textTransform: 'initial', fontSize: '14px'}} />
                                    </Tabs>
                                </Box>
                            </div>
                        </div>

                        {(data.statusShort == "NS" && data.statusShort != "FT") && (
                            <div className="app-content text-center mBot30">
                                <h2>The game has not started yet</h2>
                                <p>The probable line-up is available below, in general the official line-up is available 30 minutes before the start of the game.</p>
                                <Countdown date={data.event_date} />
                                <p>Countdown to start of game.</p>
                            </div>
                        )}
                        
                        <div className="flex align-start toColumn mBot30">
                            <div className={`w50 wm100 mRight30 mRnone app-team ${value == 0 ? "teamActive" : ""}`}>
                            {data.statusShort != "NS" && (
                                <>
                                <div className="app-content flex aligncenter toColumnS mBot30">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`logo team ${data.homeTeam.team_name}`} layout="fill" />
                                    </div> 
                                    <span className="app-title-h2-medium mTop5">Lineup {data.homeTeam.team_name}</span>
                                    <span className="formationLine mTop5">{data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].formation}</span>
                                </div>
                                <div className="app-content flex aligncenter toColumnS mBot30">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`logo team ${data.homeTeam.team_name}`} layout="fill" />
                                    </div> 
                                    <span className="app-title-h2-medium mTop5">Lineup {data.homeTeam.team_name}</span>
                                    <div className="relative mTop20">
                                        <div className="compo_stade">
                                            <Image className="bg_compos" alt="composition" src={`https://wp.winflix.net/wp-content/uploads/2019/10/compo_teams-1.png`} layout="fixed" width={291} height={273} />
                                        </div>
                                        {data.lineups !== null && (
                                            <Compo lineup={data.lineups[`${data.homeTeam.team_name_api}`]} />
                                        )}                                       
                                    </div>
                                </div>
                                <div className="app-content flex justicenter aligncenter toColumnS mBot30">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`logo team ${data.homeTeam.team_name}`} layout="fill" />
                                    </div> 
                                    <span className="app-title-h2-medium mTop5">Sostituti</span>    
                                    <div className="w100 mTop10">
                                        {data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].substitutes.map((player, index) => {
                                            return (
                                                <span key={index} className="substitue flex aligncenter">
                                                    <span className="material-icons" data-icon="group"></span>
                                                    {player.player}
                                                </span>
                                            )
                                        })}
                                    </div>                               
                                </div>
                                </>
                            )}
                                <div className="app-content mBot30">
                                    <span className="app-title-h2-medium block">Probable lineup of {data.homeTeam.team_name}</span>
                                    <p>{data.homeTeam.team_name}'s probable lineup for {data.date}'s game is based on the team's previous soccer game.</p>
                                    <h3 className="app-title-h2-medium block">what is the likely line-up of the {data.homeTeam.team_name} team ?</h3>
                                    <p><strong>Goal : </strong>{data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].startXI[0].player}</p>
                                    <p><strong>Defenders : </strong>
                                        {data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].startXI.map((player, index) => {
                                            if(player.pos == "D"){
                                                return player.player+', '
                                            }
                                        })}
                                    </p>
                                    <p><strong>Midfield player : </strong>
                                        {data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].startXI.map((player, index) => {
                                            if(player.pos == "M"){
                                                return player.player+', '
                                            }
                                        })}
                                    </p>
                                    <p><strong>Attack : </strong>
                                        {data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].startXI.map((player, index) => {
                                            if(player.pos == "F"){
                                                return player.player+', '
                                            }
                                        })}
                                    </p>
                                    <h3 className="app-title-h2-medium block">Substitutes {data.homeTeam.team_name}</h3>
                                    <p><strong>Substitutes : </strong>
                                        {data.lineups !== null && data.lineups[`${data.homeTeam.team_name_api}`].substitutes.map((player, index) => {
                                            return (
                                                player.player+', '
                                            )
                                        })}
                                    </p>
                                    <h3 className="app-title-h2-medium block">Official Lineup  {data.homeTeam.team_name}</h3>
                                    <p>Official lineup of game {data.homeTeam.team_name} {data.awayTeam.team_name} is available 30 minutes before the game {data.date} does not start and you can check it on this page before the game starts using the game system , the team roster and the list of substitutes.</p>
                                </div>
                            </div>
                            <div className={`w50 wm100 app-team ${value == 1 ? "teamActive" : ""}`}>
                            {data.statusShort != "NS" && (
                                <>
                                <div className="app-content flex aligncenter toColumnS mBot30">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`logo team ${data.awayTeam.team_name}`} layout="fill" />
                                    </div> 
                                    <span className="app-title-h2-medium mTop5">Lineup {data.awayTeam.team_name}</span>
                                    <span className="formationLine mTop5">{data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].formation}</span>
                                </div>
                                <div className="app-content flex aligncenter toColumnS mBot30">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`logo team ${data.awayTeam.team_name}`} layout="fill" />
                                    </div> 
                                    <span className="app-title-h2-medium mTop5">Lineup {data.awayTeam.team_name}</span>
                                    <div className="relative mTop20">
                                        <div className="compo_stade">
                                            <Image className="bg_compos" alt="composition" src={`https://wp.winflix.net/wp-content/uploads/2019/10/compo_teams-1.png`} layout="fixed" width={291} height={273} />
                                        </div>
                                        {data.lineups !== null && (
                                            <Compo lineup={data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`]} />
                                        )}                                                                                
                                    </div>
                                </div>
                                <div className="app-content flex justicenter aligncenter toColumnS mBot30">
                                    <div className={`${styles.logoTeamT} mRight10`}>
                                        <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`logo team ${data.awayTeam.team_name}`} layout="fill" />
                                    </div> 
                                    <span className="app-title-h2-medium mTop5">Substitutes</span>    
                                    <div className="w100 mTop10">
                                        {data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].substitutes.map((player, index) => {
                                            return (
                                                <span key={index} className="substitue flex aligncenter">
                                                    <span className="material-icons" data-icon="group"></span>
                                                    {player.player}
                                                </span>
                                            )
                                        })}
                                    </div>                               
                                </div>
                                </>
                            )}
                                <div className="app-content mBot30">
                                    <span className="app-title-h2-medium block">Likely formation of {data.awayTeam.team_name}</span>
                                    <p>{data.awayTeam.team_name}'s probable lineup for {data.date}'s game is based on the team's previous soccer game.</p>
                                    <h3 className="app-title-h2-medium block">What is the likely composition of the team {data.awayTeam.team_name} ?</h3>
                                    <p><strong>Goal : </strong>{data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].startXI[0].player}</p>
                                    <p><strong>Defenders : </strong>
                                        {data.lineups !== null && data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].startXI.map((player, index) => {
                                            if(player.pos == "D"){
                                                return player.player+', '
                                            }
                                        })}
                                    </p>
                                    <p><strong>Midfield players : </strong>
                                        {data.lineups !== null && data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].startXI.map((player, index) => {
                                            if(player.pos == "M"){
                                                return player.player+', '
                                            }
                                        })}
                                    </p>
                                    <p><strong>Angreifer : </strong>
                                        {data.lineups !== null && data.lineups !== null && data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].startXI.map((player, index) => {
                                            if(player.pos == "F"){
                                                return player.player+', '
                                            }
                                        })}
                                    </p>
                                    <h3 className="app-title-h2-medium block">Substitutes {data.awayTeam.team_name}</h3>
                                    <p><strong>Substitutes : </strong>
                                        {data.lineups !== null && data.lineups !== null && data.lineups[`${data.awayTeam.team_name_api}`].substitutes.map((player, index) => {
                                            return (
                                                player.player+', '
                                            )
                                        })}
                                    </p>
                                    <h3 className="app-title-h2-medium block">Official Lineup {data.awayTeam.team_name}</h3>
                                    <p>The official lineup of the game {data.homeTeam.team_name} {data.awayTeam.team_name} is available 30 minutes before the game {data.date} does not start and you can check it on this page before the game starts with the game system, team formation and list of substitutes.</p>
                                </div>
                            </div>
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
    const res = await fetch('https://wpen.winflix.net/wp-json/wp/v2/pages?parent=159')
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