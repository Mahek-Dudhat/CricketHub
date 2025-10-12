import { Link,NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar({ user, onLogout }) {

    const [isOpen, setIsOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleMenu = () => setShowMenu(!showMenu);

    return (<header role="navigation">
        <div className="container">
            <div className="nav-left">
                <div className="logo">
                    <NavLink to="/"><img src="./criclogo.png" alt="cricket logo" /></NavLink>

                </div>

                <nav className={showMenu ? "mobile-menu" : "menu"}>

                    <ul>
                        <li> <Link className="nav-link" to="/">Home</Link></li>
                        <li> <Link className="nav-link" to="/teams">Rankings</Link></li>
                        <li> <Link className="nav-link" to="/players">Players</Link></li>
                        {user && user.isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Panel</Link>
                            </li>
                        )}

                        
                    </ul>

                </nav>

                <button
                    className={`hamburger ${isOpen ? "is-active" : ""}`}
                    onClick={() => { handleToggle(); handleMenu(); }}
                    aria-label="Toggle menu"
                    id="menu"
                >
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </button>


            </div>

            <div className="nav-right">
                {!user ? (
                            <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login"><button>Login</button></NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register"><button>Register</button></NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-light btn-sm ms-2" onClick={onLogout}>
                                    Logout ({user.name})
                                </button>
                            </li>
                        )}


            </div>




        </div>


    </header >

    );
}