import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + '/auth/';

class AuthService {

    addUser(user) {
        return axios.post(BASE_URL + "add", user);
    }

    login(username, password) {
        return axios.post(BASE_URL + "login", username, password);
    };

    logout() {
        return axios.post(BASE_URL + 'logout', {}, null);
    };

    getUserInfo() {
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return {headers: {Authorization: 'Bearer ' + this.getUserInfo().token}};
    }

}

export default new AuthService();
