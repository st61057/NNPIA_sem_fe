import axios from 'axios';

const BASE_URL = process.env.REACT_APP_TARGET_DOMAIN +'/api/auth';

const login = async (username, password) => {
    try {
        const response = await axios.post(BASE_URL + 'login', {
            username,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    login,
    logout
};
