import Image from 'next/legacy/image'
import { WINFLIX_URL } from '../config'

export default function ButStats({bm, be}){
    return (
        <>
            <div className="flex justicenter mTop30">
                <div className="w33 text-center">
                    <Image src={`https://wp.winflix.net/wp-content/uploads/2019/10/buts.png`} alt="gol" layout="fixed" width={30} height={30} />
                    <span className="title_but">Scored goals</span>
                    <span className="nb_buts app-effect">{bm}</span>
                </div>
                <div className="w33 text-center">
                    <Image src={`https://wp.winflix.net/wp-content/uploads/2019/10/but-out.png`} alt="gol" className="inverter" layout="fixed" width={30} height={30} />
                    <span className="title_but">Goals conceded</span>
                    <span className="nb_buts app-effect">{be}</span>
                </div>
            </div>
        </>
    )
}