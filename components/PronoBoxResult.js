export default function PronoResult({data}){
    return (
        <div className="w49 flex aligncenter app-item-resultat mBot10 wm100">
            <div className="w20 app-resultat-metas text-center">
                <span className="material-icons" data-icon="sports_soccer"></span>
                <span className="resultat-type">Football</span>
                <span className="resultat-date">{data.date}</span>
            </div>
            <div className="w60 app-resultat-prono">
                <span className="resultat-match">{data.match}</span>
                <span className="resultat-prono">{data.prono}</span>
            </div>
            <div className="w20 app-resultat-odds">
                <a className="odds-box"><span>{data.cote}</span><span className="material-icons" data-icon="done"></span></a>
            </div>
        </div>        
    )
}