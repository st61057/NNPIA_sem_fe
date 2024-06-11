import axios from 'axios';
import {format} from 'date-fns';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/public/';

class ClientReservationService {

    getProcedures() {
        return axios.get(BASE_URL + 'procedures');
    }

    getActiveProcedures() {
        return axios.get(BASE_URL + 'procedures-active');
    }

    getTimeSlots(date) {
        return axios.get(BASE_URL + 'reservation?date=' + format(date, "yyyy-MM-dd") + '&id=1');
    }

    createReservation(reservation) {
        return axios.post(BASE_URL + 'reservation', reservation)
    }

    createLockedReservation(reservation) {
        return axios.post(BASE_URL + 'reservation-locked', reservation)
    }

    deleteLockedReservation(reservation) {
        return axios.post(BASE_URL + 'reservation-locked-temp', reservation)
    }

}

export default new ClientReservationService();
