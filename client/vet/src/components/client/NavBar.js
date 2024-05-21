import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // Check if the current path is login or register
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    // Render the Navbar only if not on login or register page
    if (isLoginPage || isRegisterPage) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">
                    <b>PETOPIA</b>
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav ml-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">
                                LOGIN
                            </NavLink>
                        </li>
                        
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">
                                PRODUCTS
                            </NavLink>
                        </li> 
                        <li>   
                            <NavLink className="nav-link" to="/services">
                                SERVICES
                            </NavLink>
                        </li>
                        
                    </ul>
                    <form className="d-flex">
                        <input
                            className="form-control ml-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
