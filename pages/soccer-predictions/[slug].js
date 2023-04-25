import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../../components/Sidebar'
import PronoNext from '../../components/PronoNextMatch'
import PronoBoxResult from '../../components/PronoBoxResult'
import { HeaderCTA, OutilsCTA } from '../../components/CTA'
import styles from '../../styles/PronoTeam.module.css'
import { WINFLIX_URL } from '../../config'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function FormeStats({datas}){

    const router = useRouter();
    const JSONLD = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `Prediction ${datas[0].name} ⊳ The best pono you can win in football`,
        "url": `https://winflix.net/en/soccer-predictions/${datas[0].slug}/`,
        "about": {
          "@type": "SportsEvent",
          "name": datas[0].name,
          "sport": "Soccer",
          "location": datas[0].name,
          "startDate": "2022-01-01 00:00:00"
        },
        "inLanguage": "fr",
        "mainContentOfPage": {
          "@type": "NewsArticle",
          "headline": `Predictions ${datas[0].name} football`,
          "datePublished": "2022-11-12T08:00:00+00:00",
          "dateModified": "2022-11-12T09:20:00+00:00",
          "author": {
            "@type": "Person",
            "name": "Winflix"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Winflix | Football Predictions Tipster",
            "logo": {
              "@type": "ImageObject",
              "url": `https://winflix.net/logo/logo_${datas[0].team_id}.png`
            }
          },
          "description": `${datas[0].name} : All football predictions, predictions and results`
        }
      }
      

    const data = datas[0]
    const title = `🥇 Prediction ${datas[0].name} ⊳ The best predictions you can win in football`;
    const [datal, setDatal] = React.useState([])
    const [datam, setDatam] = React.useState([])
    const [load, setLoad] = React.useState(false)
    const [loadm, setLoadm] = React.useState(false)

    const {user, setUser} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)

   
    useEffect(() => {
        if(data.flag !== null){
        const getD = async () => {
            setLoad(false) 
            const fetcher = await fetch(`${WINFLIX_URL}/api/prono-foot/fr/league/?id=${data.page_id}`)
            const json = await fetcher.json()
            setDatal(json[0])
            setLoad(true)           
        }
        getD()
    }
    }, [data])
    
    useEffect(() => {
        if(data.flag === null){
        const getD = async () => {
            setLoadm(false)
            const fetcher = await fetch(`${WINFLIX_URL}/api/prono-foot/fr/team/?id=${data.page_id}`)
            const json = await fetcher.json()
            setDatam(json[0])
            setLoadm(true)
        }        
        getD()
    }
    }, [data])
 
    return (
        <div className="appInfos">
            <Head>
                <title>{title}</title>
                <meta name="description" content={`🥇 Best predictions ${data.name} Bet only! Our reliable tips and predictions for your sports betting`} />
                <link rel="alternate" hrefLang="fr-fr" href={`https://winflix.net/prono-foot/pronostic-${data.trads.fr}/`} />
                <link rel="alternate" hrefLang="de-de" href={`https://winflix.net/de/sportwetten-tipps/prognose-${data.trads.de}/`} />
                <link rel="alternate" hrefLang="it-it" href={`https://winflix.net/it/scommessa-calcio/pronostici-${data.trads.it}/`} />
                <link rel="alternate" hrefLang="en-en" href={`https://winflix.net/en${router.asPath}`} />
                <link rel="alternate" hrefLang="fr" href={`https://winflix.net/prono-foot/pronostic-${data.trads.fr}/`} />
                <link rel="alternate" hrefLang="de" href={`https://winflix.net/de/sportwetten-tipps/prognose-${data.trads.de}/`} />
                <link rel="alternate" hrefLang="it" href={`https://winflix.net/it/scommessa-calcio/pronostici-${data.trads.it}/`} /> 
                <link rel="alternate" hrefLang="en" href={`https://winflix.net/en${router.asPath}`} />               
                <script type="application/ld+json">
                    {JSON.stringify(JSONLD)}
                </script>       
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
                <a itemProp="item" href={`https://winflix.net/en/soccer-predictions/${data.slug}/`}>
                <span itemProp="name">Prediction {datas[0].name}</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
  
                {data.flag === null ? (
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        {datas[0].is_country == "yes" && (
                            <div className="mCenter mTop20">
                                {datas[0].is_country_leagues.map((ligue, i) => {
                                    return <Link key={i} href={`/soccer-predictions/prediction-${ligue.slug}`} className="backtoligue mRight10"><span className="material-icons" data-icon="emoji_events"></span>Predictions {ligue.nom_fr}</Link>
                                })}
                            </div>
                        )}
                        <div className="app-content mBot30">
                            <h1 className={`app-title-h2 ${styles.title}`}>
                                <div className={`${styles.logoTeamT} mRight10`}>
                                    <Image src={`https://winflix.net/logo/logo_${datas[0].team_id}.png`} alt={`prediction ${data.name}`} layout="fill" />
                                </div>    
                                Predictions {data.name}
                            </h1>
                            <p><strong>Get a winning prediction by betting on it {data.name} :</strong></p>
                            <p>WWhen you decide to bet on football and teams betting {data.name}, there is only one goal: to win. You want Paris in football {data.name}, then use Winflix's VIP service to access all football predictions on {data.name} ({data.country_fr}) in the following competitions : &nbsp; 
                            {data.competitions.map((league, index) => {
                                return league+', '
                            })}
                            </p>
                            <h2>What a prognosis for the next game of {data.name} ?</h2>
                            <p dangerouslySetInnerHTML={{ __html: data.start}}></p>
                            {data.odds_next.win != null ? (
                                <>
                                <p>The win of {data.name} is quoted at <strong>{data.odds_next.win}</strong> <br />
                                The draw of {data.name} is quoted at <strong>{data.odds_next.draw}</strong> <br />
                                The defeat of {data.name} is quoted at <strong>{data.odds_next.lose}</strong> </p>

                                <Link href={`https://winflix.net/de/fussball/vorhersagen/prognose-tipp-${data.url_next}/`} passHref legacyBehavior>
                                    <a className={styles.appBtnV2}>
                                        Prediction {data.match_next}
                                    </a>
                                </Link>
                                </>
                            ) : (
                                <></>
                            )}
                            <p>Winflix soccer predictions with an average success rate <strong>of 84%</strong>, thanks to Winflix VIP benefits from all Pono feet in Parma and over 540 winning soccer predictions every month in all leagues.</p>
                        </div>
                        <div className="app-content mBot30">
                            <h2>Analysis of {data.name} before prediction</h2>
                            <p>Analyzing and developing a game method to maximize profits by betting on Parma is essential if you want to become profitable. In this article, we analyze football club {data.name} to extract data from the team and develop the best predictions for future matches.</p>
                            <h2>Latest earnings forecast on {data.name}</h2>
                            <p>Winflix offers a selection of reliable predictions {data.name} for all football team matches and whatever the competition was playing. Here is the latest Winflix validated pono parme:</p>
                            <h3>The last prediction {data.name}</h3> won by Winflix
                            <div className={`flex space-between ${styles.results} wrap mTop20`}>
                                {loadm ? datam["top10win"].map((prono, index) => {
                                    return <PronoBoxResult key={index} data={{date: prono.date, match: prono.match, prono: prono.prono, cote: prono.odd }} />
                                }) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                )}
                            </div>
                        </div>
                        <OutilsCTA />
                        <div className="app-content mBot30 mTop30">
                            <h3 className="app-title-h2">Largest coast won by Winflix in a game of {data.name}</h3>
                            <p>The top soccer team {data.name} cost validated by any of the Winflix Pronos is {data.topOdd} during the match {data.topMatch} Choose to focus more on reliability than rating , so that predictions on {data.name} have the best success rates.</p>
                            <h3>Top 10 reviews from our {data.name} predictions</h3>
                            <div className={`flex space-between ${styles.results} wrap mTop20 mBot20`}>
                                {loadm ? datam["top10odds"].map((prono, index) => {
                                    return <PronoBoxResult key={index} data={{date: prono.date, match: prono.match, prono: prono.prono, cote: prono.odd }} />
                                }) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                )}
                            </div>
                            <h2>Predict {data.name} in every football competition</h2>
                            <p>{data.name} is represented in the following leagues and competitions:</p>
                            {data.competitions.map((league, index) => {
                                return <span key={index} className={styles.tagChamp}>{league}</span>
                            })}
                            <p>Winflix invites you to find the {data.name} push-up you need for every soccer match of the team in these soccer competitions and leagues.</p>
                            <p>If you want to bet on {data.name} you need to follow the team's analysis and stats as {data.name}'s form counts the competition.</p>
                        </div>
                        <div className="app-content mBot30">
                            <h2>The best prediction {data.name}: the statistics for a winning bet</h2>
                            <h3 className="flex aligncenter mTop20">
                                <span className={`material-icons ${styles.icon}`} data-icon="task_alt"></span>
                                Bet on 1x2 - what a prediction on {data.name}
                            </h3>
                            <h4>Form in {data.name}'s last 5 games</h4>
                            <p>The form of {data.name} is bad. {data.name} has won {loadm && datam.stats.general.win} times in the last 5 games, drawing {loadm && datam.stats.general.draw} and drawing {loadm && datam.stats.general.lose} Lost in the last 5 games. The form of the team is therefore an important element when it comes to creating a reliable football prediction for the next game of {data.name}.</p>
                            <h4>Analysis of {data.name} home and away matches</h4>
                            <p>In order to make a reliable soccer prediction it is also necessary to differentiate home and away matches of {data.name} as the form or odds can vary as well as the number of goals.</p>
                            <p><strong>- Home game</strong> : In the last 5 home games, {data.name} has won {loadm && datam.stats.domicile.win} times at home, {loadm && datam.stats.domicile.draw } Home games at home and lost {loadm && datam.stats.domicile.lose} time always at home. We can therefore consider your home form to be poor.</p>
                            <p><strong>- Away game</strong> : In the last 5 outdoor games, {data.name} has won {loadm && datam.stats.exterieur.win} times, {loadm && datam.stats.exterieur.draw } null and lost {loadm && datam.stats.exterieur.lose} external games. The {data.name} prognosis will therefore depend on the form of {data.name}, but also on the location of the sports meeting. Today we can assume that the form of {data.name} is negative for an external match.</p>
                        </div>
        
                        <div className="app-content mBot30">
                            <h3 className="app-title-h2">Predicted number of goals in the next game {data.name}</h3>
                            <h4>Predict the number of goals scored by {data.name}</h4>
                            <p>In all of their last 5 games at {loadm && datam.buts.where}, {data.name} have scored {loadm && datam.buts.nb_buts_m} goals. This is already a very good indicator to participate in the analysis of a forecast based on the number of goals like +1.5 goals, +2.5 goals or -3.5 goals see -4.5 goals on this basis you can we predict {data.name} {loadm && datam.buts .moy_buts_m.toFixed( 1)} average goals in his next game.</p>
                            <p>Another parameter to consider is that the {data.name} team has scored at least 1 goal in {loadm && datam.buts.nb_match_w_buts} of ses 5 derniers games. Sur cette base on peut imagine that there is 60% luck that team {data.name} will score at least 1 goal in the next game. </p>
                            <h4>Vulnerable predictor for number of goals granted by {data.name}</h4>
                            <p>In allen letzten 5 Spielen erzielte {data.name} {loadm && datam.total_e} Tore. Da das Team gegen {loadm && datam.where} spielt, UND {data.name} sammelte {loadm && datam .buts. nb_buts_e} In den letzten 5 Spielen bei {loadm && datam.where} wird das Team voraussichtlich {loadm && datam.moy_buts_e} Tore in diesem Spiel kassieren.</p>
                            <h4>Estimated number of goals in the next game {data.name}</h4>
                            {/* <p>Ovviamente tutto dipende dall'avversario e dalla squadra allineata dall'allenatore. Ma prendendo solo basi statistiche, potremmo aspettarci cosa esiste {loadm && datam.buts.final.tofixed(1)} nella prossima partita di {data.name}. La prognosi di Winflix riguardante il numero di obiettivi in ​​questa partita sarà sicuramente più affidabile e terrà conto dell'avversario scegliendo di andare direttamente al VIP con informazioni molto più precise.</p> */}
                            <h3>Goalkeeper predictions {data.name}</h3>
                            <p>Want to find the best tips for betting on the goalscorer in {data.name}'s next game? Contact Winflix VIP to get our prediction and find out who is most likely to score for {data.name} in the next game.</p>
                            <p>Here are the <strong>4 top goalscorers</strong> of team {data.name} in the last 15 games:</p>
                            {loadm && datam.buteurs.map((buteur, index) => {
                                return <span key={index} className={styles.tagChamp}>{buteur} gol</span>
                            })}
                        </div>

                        <div className="app-content mBot30">
                            <h2>Conclusion for {data.name}'s next play while prone</h2>
                            <p>We find that the statistics are different depending on the type of game played, since they do not depend on the team of {data.name}, but also on the opponents, due to the football match at home or away, even the Team competition with injured or suspended players will affect {data.name} prediction.</p>
                            <p>Winflix creates its football predictions based on detailed analysis related to {data.name} to find the rating that maximizes earnings while maintaining high reliability and security.</p>
                            <Link href={`https://winflix.net/it/calcio/pronostico/`} passHref legacyBehavior>
                                <a className={styles.appBtnV2}>
                                    Today's Predictions
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="w35 wm100">
                        <div className={`${styles.pronoTeamCover} mBot30`}>
                            <Image src={`${WINFLIX_URL}/image_team.php?team=${data.team_id}`} alt={`prediction ${data.name}`} layout="fill" />
                        </div>
                        <Sidebar />
                    </div>
                </div>
                ) : (
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <h1 className={`app-title-h2 ${styles.title}`}>
                            <div className={`${styles.logoTeamT} mRight10`}>
                                    <Image src={`${data.flag}`} alt={`tips on ${data.name}`} layout="fill" />
                                </div>    
                                Predictions {data.name}
                            </h1>   
                            <p><strong>Get a winning bet by focusing on {data.name} :</strong></p>
                            <p>To find the best football predictions in the {data.name} competition, you can follow the guides on this dedicated football predictions page and become a VIP premium member at Winflix. Our sports betting tips for football competitions come from a detailed analysis.</p>
                            <h2>All upcoming forecasts {data.name}</h2>
                            <p>What is the best prediction for {data.name}'s next games?</p>
                            <p>Below is the list of predictions for {data.name} with a confidence rate of 84%. Join the community and become a VIP member to get full access to all Winflix football predictions.</p>                            <div className="flex wrap space-between mTop20">
                                {(load && datal.pronos_league.length > 0) && datal.pronos_league.map((prono, index) => {
                                    return <PronoNext key={index} data={prono} />
                                })}
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <h2>Our announcements about the {data.name} teams</h2>
                            <p>Winflix offers you football predictions for all matches of all participating teams of the {data.name} competition. All football of your favorite team already in Winflix!</p>
                            <div className="flex wrap">
                            {load ? datal.teams_league.map((team, index) => {
                                return (
                                    <Link key={index} className={styles.tagChamp} href={team.url} passHref>
                                        <div className="teamflag mRight8">
                                            <Image src={`https://winflix.net/logo/logo_${team.team_id}.png`} alt={`vorhersagen ${team.team_name}`} layout="fill" />
                                        </div>
                                        <span>Prediction {team.team_name}</span>
                                    </Link>
                                )
                            }) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                    <CircularProgress sx={{ color: "red" }} />
                                </Box>
                            )}                                
                            </div>
                        </div>
                        <div className="app-content mBot30">
                            <h2>The last 10 predictions won by Winflix from {data.name}</h2>
                            <p>Winflix has an average success of 84% on our predictions {data.name}. Regardless of which bookmaker you placed your bet with, you can optimize your bets by following Winflix tips. Below is the list of the last 10 predictions { data.name} won by the Winflix team.</p>
                            <div className={`flex space-between ${styles.results} wrap mTop20`}>
                                {load ? datal["top10win"].map((prono, index) => {
                                    return <PronoBoxResult key={index} data={{date: prono.date, match: prono.match, prono: prono.prono, cote: prono.odd }} />
                                }) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                )}
                            </div>
                        </div>
                        <OutilsCTA />
                        <div className="app-content mTop30 mBot30">
                            <h2>Top 10 large format {data.name} won with our announcements</h2>
                            <p>Looking for the best reviews to bet on {data.name}? Join the Winflix VIP! Below is the list of the 10 largest sizes from our predictions for the {data.name} contest</p>
                            <div className={`flex space-between ${styles.results} wrap mTop20`}>
                                {load ? datal["top10odds"].map((prono, index) => {
                                    return <PronoBoxResult key={index} data={{date: prono.date, match: prono.match, prono: prono.prono, cote: prono.odd }} />
                                }) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                )}
                            </div>                                
                        </div>
                        <div className="app-content mBot30">
                            <h2>Detailed analysis and statistics {data.name}</h2>
                            <h3 className="flex aligncenter mTop20">
                                <span className={`material-icons ${styles.icon}`} data-icon="task_alt"></span>
                                Bet on 1x2
                            </h3>
                            <p> This is the most popular betting option among bettors and forecasters. This game option allows you to bet on whether a team will win, draw or lose. Here are the key statistics that help provide a reliable forecast for concurrency {data.name}. </p>
                            <h4> Plan the result of a team when they play at home in {data.name} </h4>
                            <p> If a football team participates in the {data.name} competition, we may statistically collect the following participation data from our pronos: </p>
                             <p>- The home team wins the game: {load && datal.stats_league[0].domicile.win.toFixed(2)} % games<br />
                             - Home team draw: {load && datal.stats_league[0].domicile.draw.toFixed(2)} % games<br />
                             - Home team loses the game: {load && datal.stats_league[0].domicile.lose.toFixed(2)} % games
                            </p>
                            <h4>Enter a team's score when playing outside of {data.name}</h4>
                            <p>If you're looking to bet on a team playing away from home in the {data.name} competition, you need to consider the following stats to make an effective prediction.</p>
                            <p>- Outdoor team wins game: {load && datal.stats_league[0].exterieur.win.toFixed(2)} % games<br />
                            - The visiting team draws : {load && datal.stats_league[0].exterieur.draw.toFixed(2)} % games<br />
                            - Outdoor team loses game: {load && datal.stats_league[0].exterieur.lose.toFixed(2)} % games
                            </p>
                        </div>
                        {(datas[0] !== null && datas[0].content != "" && datas[0].content !== null) && (
                            <div className={`app-content mBot30 ${styles.seoTxt}`} dangerouslySetInnerHTML={{ __html: datas[0].content }}></div>
                        )}
                    </div>
                    <div className="w35 wm100">
                        <div className="app-content mBot30">
                            <span className="app-title-h2">Ranking {data.name}</span>
                            <div className="flex rank_line top_line space-between mTop20">
                                <div className="w20">
                                    <span className="rank_number">Pos</span>
                                </div>
                                <div className="w50">
                                    <span className="rank_name">Team</span>
                                </div>
                                <div className="w10">
                                    <span className="rank_pts">Pts</span>
                                </div>
                                <div className="w10">
                                    <span className="rank_played">P</span>
                                </div>
                                <div className="w10">
                                    <span className="rank_buts">+/-</span>
                                </div>
                            </div>
                            {load ? datal.rank.map((team, index) => (
                                <div key={index} className="flex rank_line space-between">
                                    <div className="w20">
                                        <span className="rank_number">{team.rank}</span>
                                    </div>
                                    <div className="w50 flex aligncenter">
                                        <Image src={team.logo} alt={`logo ${team.name}`} layout="fixed" width={16} height={10} />
                                        <span className="rank_name mLeft5">{team.name}</span>
                                    </div>
                                    <div className="w10">
                                        <span className="rank_pts">{team.points}</span>
                                    </div>
                                    <div className="w10">
                                        <span className="rank_played">{team.plays}</span>
                                    </div>
                                    <div className="w10">
                                        <span className="rank_buts">{team.goalsDiff}</span>
                                    </div>
                                </div> 
                                )) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
                                        <CircularProgress sx={{ color: "red" }} />
                                    </Box>
                                )
                            }
                        </div>
                        <Sidebar />
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}


// export async function getServerSideProps(context){
//     context.res.setHeader(
//         'Cache-Control',
//         'public, s-maxage=10, stale-while-revalidate=59'
//     )
//     // Fetch data from external API
//     const slug = context.query.slug
//     const resq = await fetch(`${WINFLIX_URL}/api/prono-foot/fr/?slug=${slug}`)
//     const datas = await resq.json()
  
//     // Pass data to the page via props
//     return { props: { datas } }
// }


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
    const { slug } = params
    const res = await fetch(`https://wpen.winflix.net/api/prono-foot/fr/?slug=${slug}`)
    const datas = await res.json()

    return {
        props: {datas},
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch('https://wpen.winflix.net/wp-json/wp/v2/pronos')
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