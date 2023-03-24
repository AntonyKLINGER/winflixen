import Image from 'next/legacy/image'
import Link from 'next/link'
import { WINFLIX_URL } from '../config'

export default function PronoNext({data}){
    return (
        <div className="w48 flex aligncenter app-prono-league wm100">
            <div className="w15 mRight10 flex aligncenter justicenter text-center">
                <div className="teamflag mRight2">
                    <Image src={`https://winflix.net/logo/logo_${data.homeTeam.team_id}.png`} alt={`prediction ${data.homeTeam.name}`} layout="fill" />
                </div>
                <div className="teamflag">
                    <Image src={`https://winflix.net/logo/logo_${data.awayTeam.team_id}.png`} alt={`prediction ${data.awayTeam.name}`} layout="fill" />
                </div>
            </div>
            <div className="w80">
                <Link href={data.url} passHref className="app-pro-btn">
                    <span className="app-title-pro">{data.name}</span>
                    <span className="app-date-pro">{data.league} - {data.date}</span>
                </Link>
            </div>
        </div>
    )
}