import React, {useEffect, useState} from 'react';
import UserService from "../service/UserService";
import AuthService from "../service/AuthService";
import {useNavigate} from 'react-router-dom';

function EditUser() {
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate('/');
        }
    }, []);

    const edit = (e) => {
        e.preventDefault();
        const user = {
            username: AuthService.getUserInfo().username,
            passwordNew: passwordNew,
            passwordOld: passwordOld
        };
        UserService.editUser(user).then(res => {
            if (res.data.status === 200) {
                // navigate('/logout');
            } else {
                setMessage(res.data.message);
                setPasswordOld("");
                setPasswordNew("");
            }
        });
    };

    const handleChangePasswordOld = (e) => {
        setPasswordOld(e.target.value);
    }

    const handleChangePasswordNew = (e) => {
        setPasswordNew(e.target.value)
    }


    return (
        <div className="container w-50 mx-auto mt-4">
            <h3>Změna uživatelského hesla</h3>
            <hr/>
            <form onSubmit={edit}>
                <h2 className="text-danger">{message}</h2>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">ůvodní heslo</label>
                    <div className="col-sm-7">
                        <input type="password" placeholder="Původní heslo" minLength="6" className="form-control"
                               value={passwordOld} onChange={handleChangePasswordOld}
                               required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Nové heslo</label>
                    <div className="col-sm-7">
                        <input type="password" placeholder="Nové heslo" minLength="6" className="form-control"
                               value={passwordNew} onChange={handleChangePasswordNew}
                               required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-25 mt-3">Změnit</button>
            </form>
        </div>


    );
}

export default EditUser;