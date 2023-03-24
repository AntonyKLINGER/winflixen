import React from 'react'

export default function ReadMore({content}){

    const [state, setState] = React.useState(false)

    return (
        <div>
            <h2> Winflix, the best VIP in football prediction? </h2>
            <p> A VIP is a member classified as "very important person", which means "important person" in French. When a prediction site offers you to become a VIP member, it is generally the case that access is paid for, but in return you benefit from full access to the best predictions offered by the sports betting advice site. There are different types of “VIP forecast feet”. Either a member becomes a VIP by paying for a subscription or one-time access, or a member becomes a VIP by paying for a subscription or one-time access Register on one of the sports betting sites, also known as bookmakers. In all cases, VIP access to football prediction sites allows you to see the PROno or PRONOS selected by an expert to offer a higher than average profitability rate. VIP is therefore lucrative for the amateur bettor. Regardless of your level at sports betting, VIP access to a prediction site is usually lucrative. Whether you are a novice bettor, casual bettor or expert, the Winflix VIP will help you improve your results and increase profitability from month one with effective bankroll management.</p>
            {!state ? (
                <div className="flex flex-end">
                    <button className="readMore" onClick={() => setState(prevState => !prevState)}>Read more</button>
                </div>
            ) : (
                <></>
            )}
            {state ? (
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            ) : (
                <></>
            )}
        </div>
    )
}