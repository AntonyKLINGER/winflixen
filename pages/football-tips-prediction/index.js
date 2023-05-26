import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../../components/Sidebar'
import PronoNext from '../../components/PronoNextMatch'
import MetasWintips from '../../components/MetasWintips'
import PronoBoxResult from '../../components/PronoBoxResult'
import { HeaderCTA, OutilsCTA } from '../../components/CTA'
import { RedButton } from '../../components/Buttons'
import Skeleton from '@mui/material/Skeleton'
import styles from '../../styles/Wintips.module.css'
import { WINFLIX_URL } from '../../config'

export default function PronosticFoot({datas}){

    const JSONLD = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `The best predictions to win at kicks`,
        "url": `https://winflix.net/de/wintips/`,
        "about": {
          "@type": "SportsEvent",
          "name": "Football Predictions Tips",
          "sport": "Football"
        },
        "inLanguage": "fr",
        "mainContentOfPage": {
          "@type": "NewsArticle",
          "headline": `Predictions for all football leagues`,
          "datePublished": "2022-11-12T08:00:00+00:00",
          "dateModified": "2022-11-12T09:20:00+00:00",
          "author": {
            "@type": "Person",
            "name": "Winflix"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Winflix | Football Predictions Tipster"
          },
          "description": `View all Winflix football predictions for upcoming matches!`
        }
      }

    const title = `Football Prediction | Winflix 🏆 → The most trusted site!`;

    const {user, setUser} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const {sub, setSub} = useContext(UserContext)
    const [open, setOpen] = React.useState(false)
    const [wintips, setWintips] = React.useState(null)
    const [load, setLoad] = React.useState(false)

    const openBox = () => {
        setOpen(true)
    }

    useEffect(() => {
        const fetchWintips = async () => {
            const req = await fetch(`${WINFLIX_URL}/api/wintips/fr/list/`)
            const json = await req.json()
            setWintips(json)
            setLoad(true)
        }
        fetchWintips()
    }, [])

    return (
        <div className={styles.appWintips}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Need to find the best football predictions site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Trusted and Recommended by VIP!`} />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/pronostic-foot/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/fussball-vorhersagen-wintipps/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/pronostici-calcio/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/football-tips-prediction/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/pronostic-foot/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/fussball-vorhersagen-wintips/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/pronostici-calcio/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/football-tips-prediction/" />
                <meta property="og:image" content="https://winflix.net/_next/image/?url=https%3A%2F%2Fwp.winflix.net%2Fwp-content%2Fuploads%2F2021%2F04%2FWinflix-pronostic-foot.png&w=3840&q=75" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={`Need to find the best football predictions site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Trusted and Recommended by VIP!`} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_EN" />
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
                <a itemProp="item" href={`https://winflix.net/en/football-tips-prediction/`}>
                <span itemProp="name">All the football predictions of the day from the experts</span></a>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <div className="flex aligncenter">
                                <div className="iconTitle mRight10">
                                    <Image src={`https://wp.winflix.net/wp-content/uploads/2021/06/safe-icon.png`} alt="icon safe" layout="fill" />
                                </div>
                                <h1>Soccer Expert Prediction</h1>
                             </div>
                            <p>Every day you will find a selection of the best European/World football predictions.</p>
                            <h2>Find out the latest Winflix predictions</h2>
                            <p>Every day Winflix experts create the best football predictions on the market. These pronos combine the highest reliability with an interesting dimension to find the best sports bets to place. 100% of bettors using Winflix make real profits thanks to our game strategies and our football predictions.</p>
                            <div className="flex wrap space-between">
                                {load ? wintips.map((wintips, index) => {
                                    return <MetasWintips key={index} datas={wintips} />
                                }) : (
                                    <>
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                        <Skeleton animation="wave" variant="rectangular" sx={{marginBottom: '20px', borderRadius: '10px'}} width={360} height={220} />
                                    </>
                                )}
                            </div>
                        </div>
                        {sub.status != "active" && (
                            <OutilsCTA />
                        )}   
                        <div className="app-content mTop30 mBot30">
                        <h2>How to become a professional soccer forecaster?</h2>
                            <p>The 2021 home and away season will be packed. A benefit for bettors looking for a football prediction for the leagues of club matches! And if you haven't excelled at sports betting over the last year, it's time to review your methods! A good football bet must be prepared in advance! You can't help but speculate about the outcome simply by following your hunches. To evaluate the outcome of a football game, you need to learn the methods of the pros. How to make a good football betting prediction.</p>
                            <h2>How to make a good football prediction?</h2>
                            <p>
                            You don't become a roundball expert overnight. Even the most experienced bettors consult various statistical sites and bookmakers to refine their analysis. In reality, several criteria must be taken into account in order to optimize your chances of making a good football prediction.</p>
                            {!open && (
                            <div className="text-right">
                                <span onClick={openBox} className={`${styles.appReadMore}`}>Read more</span>
                            </div>
                            )}
                            {open && (
                                <>
                                  <h3>Expert Analysis</h3>
                                  <p>The opinion of a football prediction expert is not enough to make good predictions. You'll be able to think more clearly by comparing the experts' opinions on the teams participating in the next game. You should also hear what commentators think of the highlights of the week. In these reports you often collect valuable information. The latter will not hesitate to confirm the potential of any team, revised up or down.</p>
                                  <h3>Statistics to estimate the potential of the two opposing teams</h3>
                                  <p>The statistics give you a maximum of clues to estimate the outcome of a game. Don't just read general soccer prediction stats. Dive deeper into your search by looking at previous results. Determining the number of shots on goal, corner kicks or ball possession provides information about the level of the respective team and their chances of winning. score goals.</p>
                                  <h3>Consider all factors that can affect the result</h3>
                                  <p>Even if you have to support a favorite team, it's not uncommon for missing an item to reduce its potential. They must therefore be aware of any issues affecting their performance on the lawn.</p>
                                  <p>If key players are on the sanctioned or injured list, it could have a negative impact on the result. It is best to find out about the composition of the teams and their state of mind after defeats or successes. If your favorite team has a series of bad passes, it's better not to use football prediction to avoid disappointment.</p>
                                  <h2>Choose which soccer prediction?</h2>
                                  <p>Having multiple betting sites should increase your chances of making good bets. However, not all websites are created equal. Few of them reveal real numbers about their success rate. In addition, their predictions may be based on fictional data far from reality. In order not to waste time, here are some sites recommended by football prediction experts.</p>
                                  <h3>What is the best soccer prediction website?</h3>
                                  <p>To optimize and validate your bets, use these prediction sites:</p>
                                  <p>To optimize and validate your bets, these few soccer prediction websites will be of great use to you: Whoscored: For those who are very interested in the Champions League, this website will satisfy your curiosity. Provides real-time insights into future dating stats, taking past performance into account. You will also find data on the likely composition of a squad after some players are out. You can also see their opinion on each team's strengths and weaknesses.
                                  SportRadar: The company SportRadar is very active in the field of e-sports and offers free statistics on football predictions through bookmakers. It offers a wealth of information for professional bettors who want to consult the predictions before placing a bet. SportRadar gives you information about the team standings or the number of games with goals scored for each team or.
                                  Coteur: This website offers great statistical analysis that allows you to keep track of football predictions. It also guides you in choosing the bet based on the result of the last game. Thanks to a thorough analysis of the strengths and weaknesses of the teams, Coteur allows you to know the real stakes of the matches and make more reliable estimates.</p>
                                  <h3>Where can I find good football predictions?</h3>
                                  <p>It is important for all bettors to add the best tipster or football prediction site. With the market exploding, it is also a good idea to refer you to the safest bookmakers to secure your games. The following list lists licensed bookmakers that offer a great gaming experience and have a good reputation: Unibet: With secure payment options and multiple bets offered daily, Unibet has something to offer! As a bonus, high odds to multiply your combined winnings by ten and a live HD interface. In addition, welcome bonuses and referral bonuses in the form of benefits allow you to chain sports bets without worrying about your finances.</p>
                                  <p>Betting Sport: Recommended by professional players, Betting Sport will not disappoint in terms of features, odds and promotions. On this page you have the opportunity to benefit from a bonus of up to €150 when registering. Thanks to these benefits, free bets allow you to double or triple your deposit.</p>
                                  <p>Betclic: What pleases bettors on this site is the speed and security of transactions once a football prediction has been verified. The ergonomics of the site, the variety of sports betting, as well as promotions and bonuses are not excluded. A chance to wager up to €100 during Football Top Picks, plus giveaways all year round.</p>
                                  <p>Winamax: With very high 1N2 odds, Winamax also offers the possibility to watch games in video streaming via your mobile phone. The navigation performance and user-friendly features give this site an excellent reputation. Winamax also multiplies your leisure activities by offering a selection of sports bets in different disciplines.</p>
                                  <p>All you have to do is choose the right football prediction method to win a bet!</p>
                                  <h2>How to win with soccer prediction?</h2>
                                  <p>If you follow football matches and check the stats regularly, your games will be optimized. But that's not enough to win with a soccer tip. Here are some other things to consider when placing a bet.</p>
                                  <h3>Rate the challenge of the team you support</h3>
                                  <p>Regardless of a club's know-how and reputation, the team can let go when they no longer have a challenge to overcome. Avoid blindly backing a team in every new game, that's right, it's your favorite. If he's in a friendly instead of a qualifier, he might be inclined to resign.</p>
                                  <h3>Don't underestimate the rating</h3>
                                  <p>A score indicates the probability that a prediction will come true. Sometimes a superstitious player tends to offer low odds despite the strengths of the team he supports. Take the time to evaluate his recent games on the pitch. For example, if the team has won 4 games in a row and you only rated it 1.3, you run a big risk of minimizing your profit.</p>
                                  <h3>Test alternative bets</h3>
                                  <p>In addition to the classic 1, N and 2, there is a wide range of alternative bets where you can place a football bet. As such, bookmakers compete in their inventiveness to meet your every whim. and most importantly, to build your loyalty. For example, dare to bet on a mid-term forecast instead of a final result.</p>
                                  <p>You can also test the over/under concept if your estimates remain rough. Other formulas such as the refund bet, double chance or handicap bet are also available for testing. In fact, there are original concepts whose odds are higher than those of classic bets.</p>
                                  <h3>Get maximum recommendations</h3>
                                  <p>As mentioned above, sponsorships allow you to continuously collect bonuses depending on the number of your referrals. These bonuses increase the amount of your deposit and can be used for your football prediction. This means you can access paid bets without having to spend your own money. So the more bets you place, the more you increase your chances of winning. Win with a football prediction.</p>
                                  <p>In conclusion, it is entirely possible to have a good prediction on football if you have done your analysis correctly. The stats and opinions of a soccer prediction expert should put you on the right track. Choose and determine your bet. Current team news, whether goals conceded or missing players, is important information for confirming your sports bet.</p>
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

