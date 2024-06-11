import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import AuthService from "../service/AuthService";

function LogoutPage(props){
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.logout().then(res =>{
            if(res.status === 200){
                props.setLoggedIn(false);
                navigate('/');
            }else{
                alert(res.message);
            }
        });
    },[]);

    return(
        <div>
            <div className="card">
                <h1 className="h1">Logged out!</h1>
            </div>
        </div>
    )
}
export default LogoutPage;