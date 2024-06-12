import axios from 'axios';
import {format} from "date-fns";
import AuthService from './AuthService';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/reservation/';


class ReservationService {

    getReservation(date, status, pageNo, pageSize, sortBy) {
        return axios.get(BASE_URL + '?salonId=1&date=' + format(date, "yyyy-MM-dd") + '&status=' + status + '&size=' + pageSize + '&page=' + pageNo + '&sort=' + sortBy, AuthService.getAuthHeader());
    }

    setReservationAsDone(reservationId) {
        return axios.put(BASE_URL + 'asDone/' + reservationId, AuthService.getAuthHeader());
    }

    confirmReservation(id) {
        return axios.put(BASE_URL + 'confirm/' + id, AuthService.getAuthHeader());
    }

    cancelReservation(reservationId) {
        return axios.put(BASE_URL + 'cancel/' + reservationId, AuthService.getAuthHeader());
    }

    deleteReservation(reservationId) {
        return axios.delete(BASE_URL + 'delete/' + reservationId, AuthService.getAuthHeader())
    }

}

export default new ReservationService();