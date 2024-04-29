import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/api/procedure';

class ProcedureService {

    createProcedure(procedure) {
        return axios.post(BASE_URL, procedure);
    }

    updateProcedure(procedure) {
        return axios.put(BASE_URL, procedure);
    }

    deleteProcedure(id) {
        return axios.delete(BASE_URL + '?id=' + id);
    }


}

export default new ProcedureService();