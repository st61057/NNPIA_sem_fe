import './style.css'
import {HashLink as Link} from 'react-router-hash-link';

function Navbar({loggedIn}) {
    return (
        <nav className="navbar bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active"><Link className="nav-link" to="/">Barbershop</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/reservation">Reservation</Link></li>
                    {loggedIn ?
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/summary_procedures">Edit procedures</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/manage_reservation">Summary reservations</Link></li>
                        </>
                        :
                        <></>
                    }
                </ul>
            </div>

            {loggedIn ?
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><Link className="nav-link" to="/logout">Logout</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/adduser">Adding user</Link></li>
                </ul>
                :
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                </ul>
            }
        </nav>
    )
}

export default Navbar;