import React, { useEffect } from 'react'

export default function Barchart({type, a, b, theme}){

    const [scoreA, setScoreA] = React.useState(a)
    const [scoreB, setScoreB] = React.useState(b)

    useEffect(() => {
        if(a !== null && b !== null){
            if(a.toString().includes("%") == false){
                setScoreA((a/(Math.floor(a)+Math.floor(b))*100)+"%")
            }
            if(b.toString().includes("%") == false){
                setScoreB((b/(Math.floor(a)+Math.floor(b))*100)+"%")
            }
        }
    }, [scoreA, scoreB])


    return (
        <div className="mBot20">
            <span className="app-context">{type}</span>
            <div className="flex aligncenter w100">
                <div className="flex w50 mRight10">
                    <span className="app-stat-percent">{a}</span>
                    <div className="app-bar-l w100" style={{ height : theme == "medium" ? "15px" : "20px"}}>
                        {(Math.floor(a) < Math.floor(b) && a != "" && b != "") ? (
                            <div className="app-bar-i" style={{width: scoreA, right: 0, opacity: 0.4}}></div>
                        ) : (
                            <div className="app-bar-i" style={{width: scoreA, right: 0, opacity:1}}></div>
                        )}                                                   
                    </div>
                </div>
                <div className="flex w50">
                    <div className="app-bar-l w100" style={{ height : theme == "medium" ? "15px" : "20px"}}>
                        {(Math.floor(b) > Math.floor(a) && a!= "" && b != "") ? (
                            <div className="app-bar-i" style={{width: scoreB, left: 0, opacity: 1}}></div>
                        ) : (
                            <div className="app-bar-i" style={{width: scoreB, left: 0, opacity:0.4}}></div>
                        )}  
                    </div>
                    <span className="app-stat-percent">{b}</span>
                </div>
            </div>
        </div>
    )
}