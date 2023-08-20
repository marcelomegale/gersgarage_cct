import logo_gg from "../assets/logotype.png";
import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { AuthContext } from "./AuthContext";
import {Profiles} from "../utilities/Enums";

const Head = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    return  (
        <header className="navbar navbar-expand-lg navbar-dark bg_ggHeader header-shadow fixed-header">
            <div className="container-fluid">
                {/* logo type */}
                <div id="logo">
                    <a className="navbar-brand" href="/">
                        <img src={logo_gg} alt="Logo Ger's Garage" className="logo-img" />
                    </a>
                </div>
                {/* menu service */}
                <div id="menu">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navbarNav" className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/who-we-are" className="nav-link">
                                    Who we are
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                    <DropdownToggle nav caret>
                                        Services
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <Link to="/AnnualService" className="dropdown-item">
                                                Annual Service
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/MajorService" className="dropdown-item">
                                                Major Service
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/MajorRepair" className="dropdown-item">
                                                Major Repair
                                            </Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to="/RepairFault" className="dropdown-item">
                                                Repair Fault
                                            </Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                            {user !== null && (
                                <>
                                    { user.profile_type_id == Profiles.Customer &&
                                        <>
                                        <li className="nav-item">
                                            <Link to="/booking" className="nav-link">Booking</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/profile" className="nav-link">Profile</Link>
                                        </li>
                                        </>
                                    }
                                    { !(user.profile_type_id == Profiles.Customer) &&
                                        <li className="nav-item">
                                            <Link to="/Management" className="nav-link">
                                            Management
                                            </Link>
                                        </li>
                                    }
                                </>
                            )}
                        </ul>
                    </div>
                </div>
                {/* botoes */}
                <div id="buttons">
                    {(user == null) &&
                    <div>
                        <Link to="/Register">
                        <Button outline color="warning">Register</Button>{' '}
                        </Link>
                        <Link to="/login">
                        <Button color="warning">Login</Button>
                        </Link>
                    </div>
                    }
                    {(user != null) &&
                        <div>
                            <span style={{marginRight: "5px"}}>
                                welcome, {user.username}
                            </span>
                            <Link to="/login" onClick={() => { setUser(null); localStorage.clear() }}>
                                <span style={{fontSize: "0.75em", textDecoration: "underline", color: "indianred"}}>Logout</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
};

export default Head;