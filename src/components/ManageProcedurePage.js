import React, {useEffect, useState} from 'react';
import AuthService from "../service/AuthService";
import {useLocation, useNavigate} from 'react-router-dom';
import ProcedureService from "../service/ProcedureService";

function ManageProcedurePage(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (AuthService.getUserInfo().username === null) {
            navigate('/');
        }
        if (location.state !== null) {
            if (location.state.name !== null) {
                setName(location.state.name);
            }
            if (location.state.description !== null) {
                setDescription(location.state.description);
            }
            if (location.state.price !== null) {
                setPrice(location.state.price);
            }
            if (location.state.checked === true) {
                setChecked(true)
            } else {
                setChecked(false)
            }

        }

    }, []);

    const edit = (e) => {
        e.preventDefault();
        const procedure = {
            id: location.state.id,
            name: name,
            description: description,
            price: price,
            checked: checked,
        };
        ProcedureService.updateProcedure(procedure).then(res => {
            if (res.status === 200) {
                navigate('/summary_procedures');
            } else {
                alert(res.message);
            }
        });
    };

    const create = (e) => {
        e.preventDefault();
        const procedure = {
            name: name,
            description: description,
            price: price,
            status: checked,
        };
        ProcedureService.createProcedure(procedure).then(res => {
            if (res.status === 200) {
                navigate('/summary_procedures');
            } else {
                alert(res.message);
            }
        });
    };

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleChangeStatus = () => {
        setChecked(!checked)
    }

    return (
        <div className="container w-50 mx-auto mt-4">
            <h3>Procedure</h3>
            <hr/>
            <form onSubmit={location.state != null ? edit : create}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <input type="text" placeholder={name !== "" ? name : "Name"} className="form-control"
                           value={name} onChange={handleChangeName}
                           required/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Description</label>
                    <textarea type="text" placeholder={description !== "" ? description : "Description"}
                              className="form-control"
                              value={description} onChange={handleChangeDescription}
                              required/>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Price</label>
                    <input type="number" min="0" placeholder={price !== 0 ? price : "Price"}
                           className="form-control"
                           value={price} onChange={handleChangePrice}
                           required/>
                </div>

                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Status</label>
                    <input type="checkbox" className="form-control"
                           checked={checked} onChange={handleChangeStatus}/>
                </div>
                <button type="submit" className="btn btn-primary w-25 mt-3">Save</button>
            </form>
        </div>


    );
}

export default ManageProcedurePage;