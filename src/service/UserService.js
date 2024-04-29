import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN + 'api/user';

class UserService {
    editUser(user) {
        return axios.put(BASE_URL, user);
    }
}

export default new UserService();