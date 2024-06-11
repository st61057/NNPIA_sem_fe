import './style.css'

function SorterBar(props){
    return(
        <div className="form-check form-check-inline">
            <label className="form-check-label">{props.order}</label>
            <select className="custom-select mx-2" value={props.sortType} onChange={props.onChangeType}>
                {props.data.map(item => {
                    return <option key={item} value={item}>{item}</option>
                })
                }
            </select>
        </div>
    )
}
export default SorterBar;