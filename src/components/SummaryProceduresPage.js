import './style.css';
import AuthService from "../service/AuthService";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import * as React from "react";
import ClientReservationService from "../service/ClientReservationService";
import ProcedureService from "../service/ProcedureService";


function SummaryProceduresPage() {
    const navigate = useNavigate();
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate('/');
        }
        reloadProcedures();
    }, []);


    const reloadProcedures = () => {
        ClientReservationService.getProcedures().then(result => {
            if (result.status === 200) {
                setProcedures(result.data);
            }
        })
    }

    const deleteProcedure = (row) => {
        if (window.confirm('Do you really want to delete this procedure?')) {
            ProcedureService.deleteProcedure(row.id).then(result => {
                if (result.status === 200) {
                    reloadProcedures();
                } else {
                    alert(result.message);
                }
            });
        }
    }

    return (
        <div className="cardWrap mx-auto w-75">
            <h1 className="h1 mt-5">Procedures</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Procedure name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Active</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {procedures.length
                    ? procedures.map(row => <tr key={row.name}>
                        <th scope="row" className="text-capitalize">{row.name}</th>
                        <td>{row.description}</td>
                        <td>{row.price}</td>
                        <td>{row.checked === true ? "Yes" : "No"}</td>
                        <td><Link to='/create_update_procedure'
                                  state={{
                                      name: row.name,
                                      description: row.description,
                                      price: row.price,
                                      id: row.id,
                                      checked: row.checked
                                  }}
                                  className="btn btn-primary">Edit</Link></td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteProcedure(row)}>Delete</button>
                        </td>
                    </tr>)
                    : <></>
                }
                </tbody>
            </table>
            <Link to="/create_update_procedure" className="btn btn-primary">Create new procedure</Link>
        </div>
    );
}

export default SummaryProceduresPage;