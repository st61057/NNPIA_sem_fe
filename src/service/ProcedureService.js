import axios from 'axios';
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/';

class ProcedureService {

    createProcedure(procedure) {
        return axios.post(BASE_URL + 'procedure-add', procedure, AuthService.getAuthHeader());
    }

    updateProcedure(procedure) {
        return axios.put(BASE_URL + 'procedure-update', procedure, AuthService.getAuthHeader());
    }

    deleteProcedure(id) {
        return axios.delete(BASE_URL + 'procedure-delete/' + id, AuthService.getAuthHeader());
    }


}

export default new ProcedureService();