import React from 'react'
import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'

export default function Match({data}){
    return (
        <div className="flex justicenter w100">
            <div className={`w100 flex aligncenter app-item-resultat app-item-side app-match-effect ${data.result} wm100 mBot5`}>
                <div className="w20 app-resultat-metas text-center">
                    <span className="material-icons" data-icon="sports_soccer"></span>
                    <span className="resultat-type">Football</span>
                    <span className="resultat-date">{data.date}</span>
                </div>
                <div className="w60 app-resultat-prono">
                    <span className="resultat-match-team flex aligncenter mBot10">
                        <div className="teamflag">
                            <Image src={`https://winflix.net/logo/logo_${data.homeTeam.id}.png`} alt={`prediction ${data.homeTeam.name}`} layout="fill" />
                        </div>                       
                        <span className="mLeft8">{data.homeTeam.name}</span>
                    </span>
                    <span className="resultat-match-team flex aligncenter">
                        <div className="teamflag">
                            <Image src={`https://winflix.net/logo/logo_${data.awayTeam.id}.png`} alt={`prediction ${data.awayTeam.name}`} layout="fill" />
                        </div>       
                        <span className="mLeft8">{data.awayTeam.name}</span>
                    </span>
                </div>
                <div className="w20 flex aligncenter match-icon">
                    <div>
                        <span className="result-score mBot5">{data.goalsTeamA}</span>
                        <span className="result-score">{data.goalsTeamB}</span>
                    </div>
                    <span className="material-icons" data-icon={data.picto}></span>
                </div>
            </div>
        </div>
    )
}