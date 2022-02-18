import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [disabled, setdisabled] = useState(false);

    var md5 = require('md5');
    var notification = require('../methods.js');

    const loginSubmit = (e) => {
        //console.log(Username);
        //console.log(Password);
        setdisabled(true)
        axios.post('https://flash-shop-server.herokuapp.com/admin/loginInfo', {
            username: Username,
            password: md5(Password)
        })
            .then((response) => {
                let ar = response.data;
                if (ar.status == "failed") {
                    setdisabled(false)
                    notification.msg("Incorrect Username or Password", "red", 2000)
                }
                else {
                    notification.msg("Login Successful", "green", 2000)
                    let name = ar.name;
                    //console.log(name);
                    localStorage.setItem("u", Username);
                    localStorage.setItem("p", md5(Password));
                    localStorage.setItem("n", name);
                    navigate('/admin/viewOrder')
                }
            }, (error) => {
                notification.msg("Sorry, something wrong", "red", 4000);
            });

        e.preventDefault();
    }
    return (
        <div className='container col-5'>
            <br />
            <div className='my_order_card' style={{ padding: '35px' }}>
                <h1 align='center'>Admin Login</h1><br />
                <form onSubmit={loginSubmit}>
                    <TextField onChange={(e) => { setUsername(e.target.value) }} id="filled-basic" label="Username" variant="outlined" type='text' fullWidth required />
                    <br /><br />
                    <TextField onChange={(e) => { setPassword(e.target.value) }} id="filled-basic" label="Password" variant="outlined" type='password' fullWidth required />
                    <br /><br />
                    <Button type='submit' size="large" variant="contained" fullWidth disabled={disabled}>{disabled ? "PLEASE WAIT" : "LOGIN"}</Button>
                </form>
            </div>
        </div>
    )
}
