import './style.css';
import AuthService from "../service/AuthService";
import Pagination from './Pagination';
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ReservationService from "../service/ReservationService";
import SorterBar from "./SorterBar";
import {format} from 'date-fns';
import * as React from "react";


function ManageReservationsPage() {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [sortType, setSortType] = useState("asc");
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState("ALL");
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();
    const pageSize = 3;
    const sortBy = "startTime";

    let timeOption = ["asc", "desc"];
    let statusOption = ["ALL", "CREATED", "CONFIRMED", "DONE", "CANCELED", "LOCKED"];

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate('/');
        }
        reloadCartList(sortBy + ',' + sortType)
    }, [page, sortBy, sortType, date, status]);


    const reloadCartList = (sort) => {
        ReservationService.getReservation(date, status, page, pageSize, sort, AuthService.getUserInfo())
            .then((res) => {
                if (res.status === 200) {
                    setReservations(res.data);
                    setMaxPage(Math.ceil(res.data.numberOfReservations / pageSize));
                } else {
                    setReservations([]);
                    setMaxPage(0);
                }
            });
    }

    const onChangeStatus = (event) => {
        setStatus(event.target.value);
        setPage(0);
    }

    const onChangeValueType = (event) => {
        setSortType(event.target.value);
        setPage(0);
    }

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }
    const onChangeDate = (date) => {
        setDate(new Date(date.target.value));
        setPage(0);
    }
    const setAsDone = (id) => {
        ReservationService.setReservationAsDone(id).then(result => {
            if (result.status === 200) {
                reloadCartList(sortBy + ',' + sortType)
            }
        });
    }
    const confirm = (id) => {
        ReservationService.confirmReservation(id).then(result => {
            if (result.status === 200) {
                reloadCartList(sortBy + ',' + sortType)
            }
        });
    }
    const remove = (id) => {
        ReservationService.deleteReservation(id).then(result => {
            if (result.status === 200) {
                reloadCartList(sortBy + ',' + sortType)
            }
        })
    }

    const cancel = (id) => {
        ReservationService.cancelReservation(id).then(result => {
            if (result.status === 200) {
                reloadCartList(sortBy + ',' + sortType);
                if ((maxPage - 1) % pageSize === 0 && page !== 0) {
                    setPage(page - 1);
                }
            }
        });
    }

    return (
        <div className="cardWrap mx-auto w-75">
            <div>
                <SorterBar sortType={sortType} onChangeType={onChangeValueType} order={"Order by time:"}
                           data={timeOption}/>
                <SorterBar sortType={status} onChangeType={onChangeStatus} order={"Status:"} data={statusOption}/>
                <input name="date" type="date"
                       value={format(date, "yyyy-MM-dd")} onChange={onChangeDate}/>
            </div>
            <div className="row">
                {Array.isArray(reservations.reservationsList) && reservations.numberOfReservations > 0
                    ? reservations.reservationsList.map(row => (
                        <div className="card col-4" key={row.id}>
                            <div className="card-header text-capitalize">
                                <h4>{row.procedure.name}</h4>
                                <h5>{row.reservationDate}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{row.startTime} - {row.endTime}<br/>
                                    {row.email}<br/>
                                    {row.status}</p>
                                {row.status === "CREATED"
                                    ? <div>
                                        <button className="btn btn-outline-primary"
                                                onClick={() => confirm(row.id)}>
                                            Confirm
                                        </button>
                                        <button className="btn btn-outline-primary"
                                                onClick={() => cancel(row.id)}>
                                            Cancel
                                        </button>
                                    </div>
                                    : row.status === "CONFIRMED"
                                        ? <div>
                                            <button className="btn btn-outline-primary"
                                                    onClick={() => setAsDone(row.id)}>
                                                Done
                                            </button>
                                            <button className="btn btn-outline-primary"
                                                    onClick={() => cancel(row.id)}>
                                                Cancel
                                            </button>
                                        </div>
                                        : <p></p>
                                }
                                {<button className="btn btn-outline-primary"
                                         onClick={() => remove(row.id)}>
                                    Delete
                                </button>}
                            </div>
                        </div>
                    ))
                    : <h2 className="mt-5">No reservations for this day</h2>
                }</div>
            {reservations.numberOfReservations > 0 ?
                <Pagination
                    currentPage={page}
                    totalPages={maxPage}
                    onPageChange={handlePageChange}
                />
                :
                <></>
            }

        </div>
    );
}

export default ManageReservationsPage;