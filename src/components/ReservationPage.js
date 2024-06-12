import './style.css'
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ProceduresList from "./ProceduresList";
import ClientReservationService from "../service/ClientReservationService";
import CalendarComponent from "./Calendar";
import {format} from "date-fns";

function ReservationPage() {
    const [email, setEmail] = useState("");
    const [procedures, setProcedures] = useState([]);
    const [procedure, setProcedure] = useState(null);
    const [timeSlot, setTimeslot] = useState(null);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    let formIsValid = true;

    const Reservation = (email, timeSlotDto, date, procedureDto, timestamp) => {
        return {email: email, procedure: procedureDto, reservationDate: date, time: timeSlotDto, createdDate: timestamp}
    }

    useEffect(() => {
        ClientReservationService.getActiveProcedures().then(result => {
            if (result.status === 200) {
                setProcedures(result.data);
            }
        })
    }, []);

    function validateEmail(email) {
        const lastAtPos = email.lastIndexOf("@");
        const lastDotPos = email.lastIndexOf(".");

        const isValid = lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            email.indexOf("@@") === -1 &&
            lastDotPos > 2 &&
            email.length - lastDotPos > 2;

        return isValid;
    }


    const createReservation = (e) => {
        e.preventDefault();
        handleValidation(e);
    };

    const showAlert = (message) => {
        formIsValid = false;
        alert(message);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleValidation = (e) => {

        if (email === "") {
            showAlert("Email cannot be empty");
        }else if (!validateEmail(email)) {
            showAlert("Email is not valid");
        }

        if (procedure === null) {
            showAlert("You must pick some procedure");
        }
        if (date === null) {
            showAlert("You must pick some date");
        }
        if (timeSlot === null) {
            showAlert("You must pick some time");
        }

        if (formIsValid) {
            const reservation = Reservation(email, timeSlot, format(date, "yyyy-MM-dd"), procedure, new Date().getTime());
            ClientReservationService.createReservation(reservation).then(result => {
                if (result.status === 200) {
                    navigate("/");
                } else {
                    alert(result.response.data);
                }
            })
        }
    }

    return (
        <div className="container w-50 mx-auto mt-4">
            <h2>Create Reservation</h2>
            <hr/>
            <form>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-7">
                        <input type="email" className="form-control" placeholder="Enter email" name="username"
                               value={email} onChange={handleChangeEmail} required={true}/>
                    </div>
                </div>

                <div className="card mt-5">
                    <h3>Select Procedure</h3>
                    <div className="card-body" id="procedures">
                        {procedures.length
                            ? procedures.map(row => <ProceduresList clickable={true} key={row.name} row={row}
                                                                    setProcedure={setProcedure}/>)
                            : <h3>Currently there are not available any procedures.</h3>
                        }
                    </div>
                </div>
                <CalendarComponent setTimeSlot={setTimeslot} setDateForReservation={setDate}/>
                <button type="submit" className="btn btn-primary w-50 m-3" onClick={createReservation}>Create
                    Reservation
                </button>
            </form>
        </div>
    )
}

export default ReservationPage;