import axios from 'axios';
import {format} from "date-fns";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/reservation';


class ReservationService {

    getReservation(date, status, pageNo, pageSize, sortBy) {
        return axios.get(BASE_URL + '?salonId=1&date=' + format(date, "yyyy-MM-dd") + '&status=' + status + '&size=' + pageSize + '&page=' + pageNo + '&sort=' + sortBy);
    }

    setReservationAsDone(reservationId) {
        return axios.put(BASE_URL + '/asDone', {reservationId: reservationId});
    }

    confirmReservation(id) {
        return axios.put(BASE_URL + '/confirm', {reservationId: id});
    }

    cancelReservation(reservationId, description) {
        return axios.put(BASE_URL + '/cancel', {
            reservationId: reservationId,
            description: description
        });
    }


}

export default new ReservationService();