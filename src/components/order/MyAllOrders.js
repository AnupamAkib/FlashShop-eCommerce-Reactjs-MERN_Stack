import React from 'react'
import MyOrder from './MyOrder'
import EnterLogin from '../EnterLogin.js'
import { useState } from 'react';

export default function MyAllOrders() {
    const [IDCode, setIDCode] = useState(localStorage.getItem("id_code"));

    console.log("id code = " + IDCode)
    if (!IDCode || IDCode == '') {
        return (
            <EnterLogin quotes="আপনার অর্ডার দেখতে আপনার নাম ও গেমের ID Code টি লিখে 'CONTINUE' বাটনে টাচ/ক্লিক করুন।" />
        )
    }
    else {
        return (
            <div>
                <center>
                    <h1 align='center' style={{ fontWeight: 'bold', marginTop: '17px' }}>আমার অর্ডার</h1>
                    <font size='5'>আইডি কোডঃ {localStorage.getItem("id_code")}</font>
                </center>
                <br />
                <div className='container col-6'>
                    <MyOrder />
                </div>
            </div>
        )
    }
}
