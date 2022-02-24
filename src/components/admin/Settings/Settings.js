import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Title from '../../title.js';

export default function Settings() {
    const navigate = useNavigate();
    const notification = require('../../methods.js')
    const [popUp_notification, setpopUp_notification] = useState("")
    const [fixed_notification, setfixed_notification] = useState("")
    const [conditions, setconditions] = useState("")
    const [usd_idcode, setusd_idcode] = useState(0)
    const [usd_idpassword, setusd_idpassword] = useState(0)
    const [newOrder, setnewOrder] = useState()
    const [id, setID] = useState("")
    const [disabledFlag, setdisabledFlag] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        let auth = require('../authorization.js');
        if (auth.checkAdmin() == false) {
            notification.msg("You must login first", "red", 2500)
            navigate('/admin')
        }
    }, [])

    useEffect(() => {
        axios.post('https://flash-shop-server.herokuapp.com/settings/all', {
            //parameters
        })
            .then((response) => {
                let st = response.data.result[0];
                //console.log(st)
                setpopUp_notification(st.popUp_notification);
                setfixed_notification(st.fixed_notification);
                setconditions(st.rulesAndConditions);
                setnewOrder(st.takeNewOrder);
                setusd_idcode(st.playerID_USD_Unit_per_hundredDiamond);
                setusd_idpassword(st.gameLogin_USD_Unit_per_hundredDiamond);
                setID(st._id)
                setdisabledFlag(false)
            }, (error) => {
                notification.msg("Sorry, something went wrong", "red", 2500);
            });
    }, [])


    const changeSettings = (e) => {
        setdisabledFlag(true)
        axios.post('https://flash-shop-server.herokuapp.com/settings/edit', {
            //parameters
            _id: id,
            popUp_notification: popUp_notification,
            fixed_notification: fixed_notification,
            rulesAndConditions: conditions,
            playerID_USD_Unit_per_hundredDiamond: usd_idcode,
            gameLogin_USD_Unit_per_hundredDiamond: usd_idpassword,
            takeNewOrder: newOrder

        })
            .then((response) => {
                notification.msg("Settings Updated", "green", 2500);
                setdisabledFlag(false)
            }, (error) => {
                notification.msg("Sorry, something went wrong", "red", 2500);
            });
        e.preventDefault();
    }

    //console.log(newOrder)
    return (
        <>
            <Title title="Settings" />
            <div className='container'>
                <div className='container col-6'>
                    {disabledFlag ?
                        <div className='hovered_loading'>
                            <CircularProgress /><br />Please Wait
                        </div>
                        : ""}
                    <form onSubmit={changeSettings}>
                        <TextField value={fixed_notification} onChange={(e) => { setfixed_notification(e.target.value) }} variant='filled' label='Fixed Notification' rows={2} type='text' fullWidth multiline />
                        <TextField value={popUp_notification} onChange={(e) => { setpopUp_notification(e.target.value) }} variant='filled' label='Pop Up Notification' rows={2} type='text' fullWidth multiline />
                        <TextField value={conditions} onChange={(e) => { setconditions(e.target.value) }} variant='filled' label='Rules & Conditions' rows={3} type='text' fullWidth multiline required />
                        <TextField value={usd_idcode} onChange={(e) => { setusd_idcode(e.target.value) }} variant='filled' label='ID Code USD Unit/100 Diamonds' type='number' fullWidth required />
                        <TextField value={usd_idpassword} onChange={(e) => { setusd_idpassword(e.target.value) }} variant='filled' label='ID Password USD Unit/100 Diamonds' type='number' fullWidth required />
                        <FormControlLabel control={<Switch checked={newOrder} onClick={() => { let f = newOrder; setnewOrder(!f) }} />} label="Take New Order" />
                        <br />
                        <Button type='submit' variant='contained' size='large' disabled={disabledFlag} fullWidth>{disabledFlag ? "Please wait" : "save settings"}</Button>

                    </form>
                    <br />
                </div>
            </div>
        </>
    )
}
