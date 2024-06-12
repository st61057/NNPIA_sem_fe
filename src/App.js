import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import LoginPage from "./components/LoginPage";
import {useState} from "react";
import AuthService from "./service/AuthService";
import Navbar from "./components/Navbar";
import LogoutPage from "./components/LogoutPage";
import ReservationPage from "./components/ReservationPage";
import ManageProcedurePage from "./components/ManageProcedurePage";
import SummaryProceduresPage from "./components/SummaryProceduresPage";
import ManageReservationsPage from "./components/ManageReservationsPage";
import AddingUserPage from "./components/AddingUserPage";

function App() {
    const [loggedIn, setLoggedIn] = useState(AuthService.getUserInfo() !== null);

    return (
        <div className="App">
            <Router>
                <Navbar {...{loggedIn}}/>
                <Header/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/logout" element={<LogoutPage/>}/>
                    <Route path="/summary_procedures" element={<SummaryProceduresPage/>}/>
                    <Route path="/manage_reservation" element={<ManageReservationsPage/>}/>
                    <Route path="/reservation" element={<ReservationPage/>}/>
                    <Route path="/create_update_procedure" element={<ManageProcedurePage/>}/>
                    <Route path="/adduser" element={<AddingUserPage/>}/>

                </Routes>
            </Router>
        </div>
    );
}

export default App;
