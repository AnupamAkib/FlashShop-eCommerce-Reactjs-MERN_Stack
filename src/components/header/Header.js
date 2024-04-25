import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

export default function Header() {
    const navigate = useNavigate();
    let notification = require('../methods.js');
    const [LoginID, setLoginID] = useState(localStorage.getItem("name"));

    function pingMe() {
        axios.get(process.env.REACT_APP_BACKEND, {
            //parameters
        })
            .then((response) => {
                console.log("ping pong");
            }, (error) => {
                notification.msg("Sorry, something went wrong", "red", 2500);
            });
    }

    useEffect(()=>{
        setInterval(pingMe, 10000);
    }, []);

    const user_logout = () => {
        localStorage.setItem("name", "");
        localStorage.setItem("phone", "");
        setLoginID(false);
        navigate('/')
        notification.msg("You are logged out!", "green", 2500);
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{ position: 'fixed', top: '0px', left: '0px', width: '100%' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                        <img src='/images/logo1.png' width='200px' />
                    </font></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li style={{ paddingRight: '30px' }} className="nav-item">

                                <Link className="nav-link" to="/myOrder"><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">My Orders</font></Link>

                            </li>
                            <li style={{ paddingRight: '30px' }} className="nav-item">
                                <Link className="nav-link" to="/contact"><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Contacts</font></Link>
                            </li>
                            <li style={{ paddingRight: '30px' }} className="nav-item">
                                <Link className="nav-link" to="/conditions"><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Terms & Conditions</font></Link>
                            </li>
                            {LoginID ? <li className="nav-item dropdown" style={{ paddingRight: '30px' }}>
                                <a className="nav-link dropdown-toggle firstLetterUpper" href="#" role="button" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" >Phone: <b>{localStorage.getItem("phone")}</b></li>
                                    <li><a className="dropdown-item" onClick={user_logout}><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Log Out</font></a></li>
                                </ul>
                            </li> : ""}

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">More</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin"><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Admin Dashboard</font></Link></li>
                                    <li><Link className="dropdown-item" to="/about"><font data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">About Site</font></Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ marginBottom: '58px' }}></div>
        </>
    )
}
