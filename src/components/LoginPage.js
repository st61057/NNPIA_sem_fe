import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../service/AuthService';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await AuthService.login(username, password);
            setLoading(false);
            navigate.push('/App')
        } catch (error) {
            setErrorMessage('Failed to login');
            setLoading(false);
        }
    };

    return (
        <div>
            <Link to="/">Hlavní stránka</Link>
            <h1>Přihlášení</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Uživatelské jméno:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Heslo:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br/>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
}

export default LoginPage;
