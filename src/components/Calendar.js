import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import ClientReservationService from "../service/ClientReservationService";
import './style.css'
import {format} from "date-fns";
import ReservationPage from "./ReservationPage";

function CalendarComponent(props) {
    const firstAvailableDay = new Date();
    firstAvailableDay.setDate(firstAvailableDay.getDate() + 1);
    const maxMonth = new Date();
    maxMonth.setMonth(maxMonth.getMonth() + 4);
    const [date, setDate] = useState(firstAvailableDay);

    const [timeslots, setTimeslots] = useState([]);
    const [tripType, setTripType] = useState("");


    const Reservation = (email, timeSlotDto, date, procedureDto, timestamp) => {
        return {email: email, procedure: procedureDto, reservationDate: date, time: timeSlotDto, createdDate: timestamp}
    }

    const [previousReservation, setPreviousReservation] = useState(null);

    useEffect(() => {
        getTimeSlots(date);
    }, []);

    const getTimeSlots = (date) => {
        setDate(date);
        props.setDateForReservation(date);
        props.setTimeSlot(null);
        setTripType("");
        ClientReservationService.getTimeSlots(date).then(result => {
            if (result.status === 200) {
                setTimeslots(result.data);
            }
        })
    };

    const clickHandler = (row) => {
        if (row.slotFree) {
            props.setTimeSlot(row);

            if (previousReservation !== null) {
                ClientReservationService.deleteLockedReservation(previousReservation).catch(res => {
                    alert(res.response.message)
                })
            }

            const reservation = Reservation("temporary@temporary.com", row, format(formatDate(date), "yyyy-MM-dd"), null, new Date().getTime());
            setPreviousReservation(reservation);
            ClientReservationService.createLockedReservation(reservation).catch(res => {
                alert(res.response.data);
            });

            setTripType(row.startTime);


        }
    };

    return (
        <div className='row w-100'>
            <h3 className='text-center'>Select date</h3>
            <div className='calendar-container col-5'>
                <Calendar onChange={getTimeSlots} value={date} minDate={firstAvailableDay} maxDate={maxMonth}
                          minDetail={"month"} tileDisabled={({date}) => date.getDay() === 0 || date.getDay() === 6}/>
            </div>
            <div className='col-7'>
                <div className="radio-btn-container row">
                    {timeslots.length
                        ? timeslots.map(row => (
                            <div
                                style={{backgroundColor: !row.slotFree ? "grey" : tripType == row.startTime ? "#0dcaf0" : "#0d6efd"}}
                                key={row.startTime}
                                className="radio-btn card text-white col-5 m-2 p-2"
                                onClick={() => {
                                    clickHandler(row)
                                }}
                            >
                                {row.startTime} : {row.endTime}

                            </div>
                        ))
                        : <h3>We have no times available for this day.</h3>
                    }
                </div>
            </div>
        </div>
    );
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default CalendarComponent;