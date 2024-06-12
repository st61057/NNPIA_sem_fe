import './style.css'
import {useEffect, useState} from "react";
import ProcedureList from "./ProceduresList";
import ClientReservationService from "../service/ClientReservationService";


function Main() {

    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        ClientReservationService.getActiveProcedures().then(result => {
            setProcedures(result.data);
        })
    },[]);

    return (
        <div>
            <div className="card">
                <h1 className="h1">Our procedures</h1>
                <div className="card-body w-50 mx-auto" id="procedures">
                    {procedures.length
                        ? procedures.map(row => <ProcedureList clickable={false} key={row.name} row={row}
                                                               setProcedure={() => {
                                                               }}/>)
                        : <h3>We currently do not offer any procedures</h3>
                    }
                </div>
            </div>

        </div>
    )
}
export default Main;