import Link from 'next/link'

export default function MenuMatch({page, base}){
    return (
        <div className="appPrimaryMatchMenu">
            <Link href={`/football/live-match/${base}/`} passHref legacyBehavior><a className={`appPrimlink ${page == 0 ? 'isPage' : ''}`}>Match Infos</a></Link>
            <Link href={`/football/soccerstat/statistics-${base}/`} passHref legacyBehavior><a className={`appPrimlink ${page == 1 ? 'isPage' : ''}`}>Statistics</a></Link>
            <Link href={`/football/predictions/prediction-${base}/`} passHref legacyBehavior><a className={`appPrimlink ${page == 2 ? 'isPage' : ''}`}>Prediction</a></Link>
            <Link href={`/football/predictions/exact-result-${base}/`} passHref legacyBehavior><a className={`appPrimlink ${page == 3 ? 'isPage' : ''}`}>Exact Result</a></Link>
            <Link href={`/football/videos-highlights/highlights-goals-${base}/`} passHref legacyBehavior><a className={`appPrimlink ${page == 4 ? 'isPage' : ''}`}>Highlights</a></Link>
            <Link href={`/football/prediction-line-up/line-up-${base}/`} passHref legacyBehavior><a className={`appPrimlink ${page == 5 ? 'isPage' : ''}`}>Line up</a></Link>
        </div>
    )
}