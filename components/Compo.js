import React from 'react'
import Player from '../components/PlayerCompo'

export default function Compo({lineup}){

    const [formation, setFormation] = React.useState(lineup.startXI)

    return (
        <>
            <div className="goal_line_man">
                {formation.map((player, index) => {
                    if(player.pos == "G"){
                        return <Player key={index} num={player.number} name={player.player.split(' ').length > 1 ? player.player.split(' ')[1] : player.player.split(' ')[0]} />
                    }
                })}               
            </div>
            <div className="def_line_man">
                {formation.map((player, index) => {
                    if(player.pos == "D"){
                        return <Player key={index} num={player.number} name={player.player.split(' ').length > 1 ? player.player.split(' ')[1] : player.player.split(' ')[0]} />
                    }
                })}   
            </div>
            {lineup.formation.split('-').length > 3 ? (
                <div className="mid_s_line_man">
                    {formation.map((player, index) => {
                        if(player.pos == "M"){
                            return <Player key={index} num={player.number} name={player.player.split(' ').length > 1 ? player.player.split(' ')[1] : player.player.split(' ')[0]} />
                        }
                    })}  
                </div>
            ) : (
                <div className="mid_line_man issub">
                    {formation.map((player, index) => {
                        if(player.pos == "M"){
                            return <Player key={index} num={player.number} name={player.player.split(' ').length > 1 ? player.player.split(' ')[1] : player.player.split(' ')[0]} />
                        }
                    })}  
                </div>
            )}

            <div className="att_line_man">
                {formation.map((player, index) => {
                    if(player.pos == "F"){
                        return <Player key={index} num={player.number} name={player.player.split(' ').length > 1 ? player.player.split(' ')[1] : player.player.split(' ')[0]} />
                    }
                })}                  
            </div>
        </>
    )
}