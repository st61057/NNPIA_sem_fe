import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import LoginPage from "./components/LoginPage";
import EditUser from "./components/EditUser";
import {useState} from "react";
import AuthService from "./service/AuthService";
import Navbar from "./components/Navbar";
import LogoutPage from "./components/LogoutPage";
import ReservationPage from "./components/ReservationPage";
import ManageProcedurePage from "./components/ManageProcedurePage";
import SummaryProceduresPage from "./components/SummaryProceduresPage";
import ManageReservationsPage from "./components/ManageReservationsPage";
import RegistrationPage from "./components/RegistrationPage";

function App() {
    const [loggedIn, setLoggedIn] = useState(AuthService.getUserInfo() !== null);

    return (
        <div className="App">
            <Router>
                <Navbar {...{loggedIn}}/>
                <Header/>
                <Routes>
                    <Route path="/login" element={<LoginPage {...{setLoggedIn}}/>} />
                    <Route path="/logout" element={<LogoutPage {...{setLoggedIn}}/>}/>
                    <Route path="/adm_procedures" element={<SummaryProceduresPage />}/>
                    <Route path="/adm_reservation" element={<ManageReservationsPage />}/>
                    <Route path="/edituser" element={<EditUser/>}/>
                    <Route path="/" element={<Main/>}/>
                    <Route exact path="/" element={<Main/>}/>
                    <Route exact path="/reservation" element={<ReservationPage/>}/>
                    <Route path="/edit" element={<EditUser/>}/>
                    <Route path="/create_update_procedure" element={<ManageProcedurePage />}/>
                    <Route path="/registration" element={<RegistrationPage />}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
