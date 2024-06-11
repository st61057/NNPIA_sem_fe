import './style.css'
import {HashLink as Link} from 'react-router-hash-link';

function Navbar({loggedIn}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Barbershop</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {loggedIn === false ?
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Úvodní strana</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/reservation">Rezervace</Link>
                    </li>
                </ul>
                :
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/adm_procedures">Úprava procedur</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/adm_reservation">Přehled rezervací</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/administration">Administrace uživatelů</Link>
                    </li>
                </ul>
                }
            </div>

            {loggedIn ?
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><Link className="nav-link" to="/edit">Úprava údajů</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/logout">Odhlášení</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/registration">Registrace</Link></li>

                </ul>
                :
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><Link className="nav-link" to="/login">Přihlášení</Link></li>
                </ul>
            }


        </nav>
    )
}

export default Navbar;