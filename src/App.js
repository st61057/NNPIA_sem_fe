import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import LoginPage from "./components/LoginPage";
import EditUser from "./components/EditUser";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/edituser" element={<EditUser/>}/>
                    <Route path="/" element={<Main/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
