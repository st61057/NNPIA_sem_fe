import './style.css'

function ProcedureList({clickable, row, setProcedure}){
    return(
        <div className="card">
            <div className="card-header">
                <h4 className="text-capitalize">{row.name}</h4>
            </div>
            <div className="card-body">
                <div className="row">
                    <>
                        <div className="col-8 text-start">{row.description}</div>
                        <div className="col-3 text-start">Price: {row.price}</div>

                        {clickable &&
                            <input className="form-check-input col-1 p-0" type="radio" name="procedure" value={row.name} onClick={() => {
                                setProcedure(row)
                            }}/>
                        }
                    </>
                </div>
            </div>
        </div>
    )
}
export default ProcedureList;
