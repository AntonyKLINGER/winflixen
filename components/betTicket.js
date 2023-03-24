import React, { useEffect, useContext } from 'react'
import Image from 'next/legacy/image'
import { UserContext } from '../UserContext'
import { WINFLIX_URL } from '../config'

export default function BetTicket(){

    const {open, setOpen} = useContext(UserContext)
    const {loadTicket, setLoadTicket} = useContext(UserContext)
    const {user, setUser, loadUser, setLoadUser} = useContext(UserContext)
    const {ticket, setTicket} = useContext(UserContext)
    const [add, setAdd] = React.useState(false)
    const [mise, setMise] = React.useState(undefined)
    const {cote, setCote} = React.useContext(UserContext)
    const {gain, setGain} = React.useContext(UserContext)
    const {timer, setTimer} = React.useContext(UserContext)
    const [credits, setCredits] = React.useState(100.00)
    const [msg, setMsg] = React.useState(null)
    const [loader, setLoader] = React.useState(false)
    const [json, setJson] = React.useState({
        user: user.user_id,
        lang: 'IT'
    })

    const removeBet = (id) => {
        setTicket(prevTicket => {
            const newTicket = prevTicket.filter((bet) => {
                return bet.id != id
            })
            return newTicket
        })
    }

    const handleChangeMise = (e) => {
        setMise(prevMise => e.target.value)
    }

    useEffect(() => {
        
        setCote(prevCote => {    
            let total = (1).toFixed(2)      
            ticket.map((bet) => {
                total = total*bet.odd
                total = total.toFixed(2)
            })
            return total
        })
    }, [ticket])

    useEffect(() => {
        
        setGain(prevGain => {
            let total = 1
            ticket.map((bet) => {
                total = total*bet.odd
                total = total.toFixed(2)
            })
            return (total*mise).toFixed(2)
        })
    }, [mise, ticket])

    useEffect(() => {
        if(ticket.length == 0){
            setTimer(null)
        }
    }, [ticket])


    useEffect(() => {
        const getcr = async () => {
            const geter = await fetch(`${WINFLIX_URL}/api/user/credits/?user_id=${user.user_id}&lang=EN`)
            const credi = await geter.json()
            setCredits(credi.credits)
        }
        getcr()   
    }, [ticket, credits, loadUser, add])


    useEffect(() => {

        setJson(prevJson => {
            let fixtures = []
            let matchs = []
            let options = []
            let cotes = []
            ticket.map((bet, i) => {
                fixtures.push(bet.fix_id)
                matchs.push(bet.match)
                options.push(bet.option)
                cotes.push(bet.odd)
            })

            return {
                ...prevJson,
                mise: mise,
                gain: gain,
                cote: cote,
                fixtures: fixtures,
                matchs: matchs,
                pronos: options,
                cotes: cotes,
                user: user.user_id
            }
        })
    }, [ticket, mise, gain])


    const miser = (e) => {
        e.preventDefault()

        if(parseFloat(mise) > 0 && parseFloat(credits) > 0 && parseFloat(mise) <= parseFloat(credits) && ticket.length > 0 && user.user_id != 0){
            setAdd(false)
            setLoader(true)
            fetch(`${WINFLIX_URL}/api/tickets/add/?data=${JSON.stringify(json)}`)
            .then(response => response.json())
            .then(jsonDatas => {
                setAdd(true)
                setLoader(false)
            })

            setTicket([])
            setCredits(prev => parseFloat(prev)-parseFloat(mise))
            setMise("")

            setMsg(prevMsg => {
                return (
                    <span className="isComplete">Your ticket has been registered! You can find it in your Mywin section.</span>
                )
            })
        }
        else{
            setMsg(prevMsg => {
                return (
                    <span className="noCredits">Sorry, this action is not possible.</span>
                )
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setMsg(null)
            setOpen(false)
        }, 7000);
    }, [msg])

    return (
        <>
            <div className={`myTicket box-infos ticket ${open ? 'betOpen' : ''}`}>
                <div className="ticket-inside">
                    <div className="app-metas-bet flex aligncenter space-between">
                        <span className="timer_clear">
                            <Image src={`https://wp.winflix.net/wp-content/uploads/2022/08/icon-winflix-mini.png`} alt="logo winflix" layout='fixed' width={18} height={12.5} />
                            <span className="mLeft5">Your Ticket</span>
                        </span>
                        <div className="flex aligncenter">
                            <input type="hidden" id="creditsUser" value="100.00"/>
                            <span id="myCredits" className="all_credits flex aligncenter">
                                {loader ? (
                                    <>
                                        Refresh
                                        <span className="material-icons" data-icon="autorenew"></span>
                                    </>
                                ) : user.user_id == 0 ? (
                                    <>
                                        0.00
                                    <span className="material-icons" data-icon="sell"></span>
                                    </>
                                ) : (
                                    <>
                                        {credits}
                                        <span className="material-icons" data-icon="sell"></span>
                                    </>
                                )}                                
                            </span>
                            <span className="amb-close" onClick={() => setOpen(prev => !prev)}>Close</span>
                        </div>
                    </div>
                    {timer}
                    <div id="allSelection">
                        {loadTicket && ticket.map((bet, index) => {
                            return (
                                <div key={index} className="resume_box">
                                    <a className="trash" onClick={() => removeBet(bet.id)}>
                                        <span className="material-icons" data-icon="delete"></span>
                                    </a>
                                    <div className="match_ticket">
                                        <span className="title_mtc">{bet.match}</span>
                                        <div className="box_cote multimax">
                                            <span className="cote_p">{bet.option}</span>
                                            <span className="cote_c">{bet.odd}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {msg}
                    <div className="footage">
                        <div className="flex space-between aligncenter">
                            <div className="cote_totale">
                                <span className="flex aligncenter">
                                    <span className="material-icons icon-bet" data-icon="poll"></span>
                                    Total Odds
                                </span>
                                <span id="total_cote">{cote}</span>
                            </div>
                            <div className="gain_pot">
                                <span className="flex aligncenter">
                                    <span className="material-icons icon-bet" data-icon="emoji_events"></span>
                                    Possible win
                                </span>
                                <span id="total_gain">{gain == "NaN" ? 0.00 : gain}</span>
                            </div>
                        </div>
                        <form className="flex aligncenter mTop10">
                            <input type="text" id="making" placeholder="Your bet" value={mise} onChange={handleChangeMise} name="miseBet" />
                            <button className="validerTicket" onClick={miser}>Bet</button>
                        </form>
                    </div>
                </div>
            </div>

            <span className="app-btn-open" onClick={() => setOpen(prev => !prev)}>
                   <span className="material-icons" data-icon="sticky_note_2"></span> 
            </span>
        </>
    )
}