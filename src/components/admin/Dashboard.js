import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
    const navigate = useNavigate();
    const notification = require('../methods.js');

    useEffect(() => {
        let auth = require('./authorization.js');
        //console.log(auth.checkAdmin())
        if (auth.checkAdmin() == false) {
            notification.msg("You must login first", "red", 2500)
            navigate('/admin')
        }
    }, [])

    const logAdminOut = () => {
        localStorage.setItem("u", "");
        localStorage.setItem("p", "");
        localStorage.setItem("n", "");
        notification.msg("You've successfully logged out", "green", 2500);
        navigate('/admin');
    }
    return (
        <div className='container'>
            <h1 align='center'>Dashboard</h1>
            Hello, <b>{localStorage.getItem("n")}</b><hr />
            <Link to='/admin/viewOrder'>Manage Orders</Link><br />
            <Link to='/admin/package/view'>View All Package</Link><br />
            <Link to='/admin/package/create'>Create Package</Link><br />
            <Link to='/admin/settings'>Change settings</Link><br />

            <br /><button className='btn btn-primary' onClick={logAdminOut}>LOGOUT</button>
        </div>
    )
}
