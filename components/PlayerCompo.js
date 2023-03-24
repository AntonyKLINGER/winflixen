export default function Player({num, name}){
    return (
        <div className="player_round_m">
            <span className="num_player_c">
                {num}
            </span>
            <span className="name_player_c">
                {name}
            </span>
        </div>
    )
}