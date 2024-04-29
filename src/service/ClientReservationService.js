import axios from 'axios';
import {format} from 'date-fns';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/client';

class ClientReservationService {
    getProcedures() {
        return axios.get(BASE_URL + 'procedures');
    }

    getTimeSlots(date) {
        return axios.get(BASE_URL + 'reservation?date=' + format(date, "yyyy-MM-dd") + '&id=1');
    }

    createReservation(reservation) {
        return axios.post(BASE_URL + 'reservation', reservation)
    }

}

export default new ClientReservationService();
