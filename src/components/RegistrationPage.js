import './style.css'
import {useEffect, useState} from "react";
import AuthService from "../service/AuthService";
import {useNavigate} from 'react-router-dom';

function RegistrationPage(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const registration = (e) => {
        e.preventDefault();

        const createdUser = {username, email, password};
        AuthService.registration(createdUser).then(res => {
            if (res.status === 200) {
                navigate('/');
            } else {
                alert(res.message);
            }
        });
    };

    const handleChangeUser = (e) => {
        setUsername(e.target.value);
    }

    const handleChangePass = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
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
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-7">
                        <input type="email" className="form-control" placeholder="Email" name="email"
                               value={email} onChange={handleChangeEmail} required={true}/>
                    </div>
                </div>
                <div className="form-group row m-3">
                    <label className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" placeholder="Password" name="password"
                               value={password} onChange={handleChangePass} required={true}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-25" onClick={registration}>Login</button>
            </form>
        </div>
    )
}

export default RegistrationPage;