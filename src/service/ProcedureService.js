import axios from 'axios';
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/procedure';

class ProcedureService {

    createProcedure(procedure) {
        return axios.post(BASE_URL, procedure, AuthService.getAuthHeader());
    }

    updateProcedure(procedure) {
        return axios.put(BASE_URL, procedure, AuthService.getAuthHeader());
    }

    deleteProcedure(id) {
        return axios.delete(BASE_URL + '?id=' + id, AuthService.getAuthHeader());
    }


}

export default new ProcedureService();