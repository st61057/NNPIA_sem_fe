import './style.css'
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ProcedureList from "./ProcedureList";
import PublicService from "../service/PublicService";
import CalendarComponent from "./Calendar";
import {format} from "date-fns";

function Reservation() {
    const [email, setEmail] = useState("");
    const [procedures, setProcedures] = useState([]);
    const [messageTxt, setMessage] = useState("");
    const [procedure, setProcedure] = useState(null);
    const [timeSlot, setTimeslot] = useState(null);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();

    const Reservation = (email, timeSlotDto, date, procedureDto, salonId) => { return { email:email, timeSlotDto:timeSlotDto, date:date, procedureDto:procedureDto, salonId:salonId} }

    useEffect(() => {
        PublicService.getProcedures().then(result => {
            if (result.data.status === 200) {
                setProcedures(result.data.result);
            }
        })
    }, []);


    const createReservation = (e) => {
        e.preventDefault();
        handleValidation(e);

    };

    const handleValidation = (e) => {
        let formIsValid = true;
        let errorMsg = "";

        if (email === "") {
            formIsValid = false;
            errorMsg = errorMsg+ "Email cannot be empty ";
        }

        let lastAtPos = email.lastIndexOf("@");
        let lastDotPos = email.lastIndexOf(".");

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf("@@") == -1 && lastDotPos > 2 && email.length - lastDotPos > 2)) {
            formIsValid = false;
            errorMsg = errorMsg+ "Email is not valid ";
        }

        if (procedure === null) {
            formIsValid = false;
            errorMsg = errorMsg +"You must pick some procedure ";
        }
        if (date === null) {
            formIsValid = false;
            errorMsg = errorMsg +"You must pick some date ";
        }
        if (timeSlot === null) {
            formIsValid = false;
            errorMsg = errorMsg+ "You must pick some time ";
        }

        if(formIsValid){
            const reservation = Reservation(email, timeSlot, format(date, "yyyy-MM-dd"), procedure, 1);
            PublicService.createReservation(reservation).then(result => {
                if (result.data.status === 200) {
                    navigate("/");
                }else{
                    setMessage( messageTxt + result.data.message)

                }
            })
            setMessage("");
        }else{
            setMessage(errorMsg)
            alert("Form has errors.");
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
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
                            ? procedures.map(row => <ProcedureList clickable={true} key={row.name} row={row}
                                                                   setProcedure={setProcedure}/>)
                            : <h3>We currently do not offer any cosmetic treatments.</h3>
                        }
                    </div>
                </div>
                <CalendarComponent setTimeSlot={setTimeslot} setDateForReservation={setDate}/>
                <h3 className="text-danger">{messageTxt}</h3>
                <button type="submit" className="btn btn-primary w-50 m-3" onClick={createReservation}>Create
                    Reservation
                </button>
            </form>
        </div>
    )
}

export default Reservation;