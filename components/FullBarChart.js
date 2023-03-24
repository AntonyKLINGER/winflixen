export default function FullBarChart({type, percent}){
    return (
        <>
            <div className="flex mBot20">
                <div className="w30 tright">
                    <span className="title_legend">{type}</span>
                </div>
                <div className="w70 app-effect">
                    <div className="progress_multi relative flex aligncenter">
                        <div className="grow" style={{ width: `${percent}%` }}></div>
                        <span className="grow_pourcent">{percent}%</span>
                    </div>
                </div>
            </div>
        </>        
    )
}