import React from 'react'
import MyOrder from './MyOrder'
import EnterLogin from '../EnterLogin.js'
import { useState } from 'react';
import Title from '../title.js'

export default function MyAllOrders() {
    const [IDCode, setIDCode] = useState(localStorage.getItem("id_code"));

    if (!IDCode || IDCode == '') {
        return (
            <EnterLogin quotes="আপনার অর্ডার দেখতে আপনার নাম ও গেমের ID Code টি লিখে 'CONTINUE' বাটনে টাচ/ক্লিক করুন।" />
        )
    }
    else {
        return (
            <div>
                <center>
                    <Title title="আমার অর্ডার" />
                    <font size='5'>আইডি কোডঃ {localStorage.getItem("id_code")}</font>
                    <br />
                    (পরিবর্তন করতে উপরের মেনুবার থেকে লগ আউট করে নতুন আইডি কোড দিয়ে পুনরায় লগ-ইন করুন)
                </center>
                <br />
                <div className='container col-6'>
                    <MyOrder />
                </div>
            </div>
        )
    }
}
