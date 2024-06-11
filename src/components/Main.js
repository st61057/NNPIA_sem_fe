import './style.css'
import {Link} from "react-router-dom";
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
                <h1 className="h1">Naše procedury!</h1>
                <div className="card-body w-50 mx-auto" id="procedures">
                    {procedures.length
                        ? procedures.map(row => <ProcedureList clickable={false} key={row.name} row={row}
                                                               setProcedure={() => {
                                                               }}/>)
                        : <h3>Žádné procedury nejsou dostupné nyní, zkuste to prosím později.</h3>
                    }
                </div>
            </div>
            <Link to="/reservation">Create reservation</Link>
            <Link to="/login">Login</Link>
            <Link to="/edituser" >Uprav uživatele</Link>

        </div>
    )
}
export default Main;