import axios from 'axios';
import AuthService from "./AuthService";

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + 'api/user/';

class UserService {
    editUser(user) {
        return axios.put(BASE_URL, user, AuthService.getAuthHeader());
    }
}

export default new UserService();