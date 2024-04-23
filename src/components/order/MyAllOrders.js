import React from 'react'
import MyOrder from './MyOrder'
import EnterLogin from '../EnterLogin.js'
import { useState } from 'react';
import Title from '../title.js'

export default function MyAllOrders() {
    const [IDCode, setIDCode] = useState(localStorage.getItem("phone"));

    if (!IDCode || IDCode == '') {
        return (
            <EnterLogin quotes="Please provide your login information & click on 'Submit' view your orders." />
        )
    }
    else {
        return (
            <div>
                <center>
                    <Title title="My Orders" />
                    <font size='5'>Phone Number: {localStorage.getItem("phone")}</font>
                    <br />
                    (If you want to change account then log out from the system & relogin )
                </center>
                <br />
                <div className='container col-6'>
                    <MyOrder />
                </div>
            </div>
        )
    }
}
