import './style.css'
import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import {useNavigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
    }, []);


    const login = (e) => {
        e.preventDefault();

        const credentials = {username, password};
        AuthService.login(credentials).then(res => {
            if (res.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                navigate('/');
            }
        }).catch(error => {
            alert(error.response.data);
        });
    };

    const handleChangeUser = (e) => {
        setUsername(e.target.value);
    }

    const handleChangePass = (e) => {
        setPassword(e.target.value);
    }


    return (
        <div className="container w-50 mx-auto mt-4">
            <h3>Login</h3>
            <hr/>
            <form>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Username</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" placeholder="Enter username" name="username"
                               value={username} onChange={handleChangeUser} required={true}/>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" placeholder="Password" name="password"
                               value={password} onChange={handleChangePass} required={true}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-25" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;