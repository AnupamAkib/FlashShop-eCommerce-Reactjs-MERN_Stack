import React, { useState } from 'react'
import Package from './package.js'
import { useEffect } from 'react'
import axios from 'axios'
import Title from '../title.js'

export default function WholePackage() {
    const [Type, setType] = useState("all")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const selectOnChange = (e) => {
        let topUp_type = e.target.value;
        console.log(topUp_type);
        setType(topUp_type)
    }

    /*let setting = require('../settings.js')
    setting.fetch();
    let fixed_notice = setting.getFixedNotification();*/
    const [fixed_notice, setfixed_notice] = useState("");
    const [popUp_notification, setpopUp_notification] = useState("")

    useEffect(() => {
        axios.post('https://flash-shop-server.herokuapp.com/settings/all', {
            //parameters
        })
            .then((res) => {
                //console.log(response.data.result[0].takeNewOrder)
                setfixed_notice(res.data.result[0].fixed_notification);
                setpopUp_notification(res.data.result[0].popUp_notification);
            }, (error) => {
                console.log(error);
            });
    }, [])



    const notification = require("../methods.js");
    useEffect(() => {
        if (popUp_notification != "") {
            notification.msg(<div dangerouslySetInnerHTML={{ __html: popUp_notification.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />, "blue", 5000);
        }
    }, [popUp_notification])


    return (
        <>
            <div className='welcomeMsg container col-6'>
                <h1 style={{ fontWeight: 'bold' }}>Welcome Gamer!</h1>
                <p>
                    Welcome to FlashShop. FlashShop is an online FreeFire Diamond Top Up service in BD!
                    <br />
                    This is very trusted and well managed service. You can pay through bKash, Nagad and Rocket here.

                    Scroll down to view our packages. Happy gaming! :)
                </p>
            </div>
            <div className='container'>
                <div className='container col-8'>
                    {fixed_notice != "" ?
                        <div align='center' className='fixedNotice'>
                            <div dangerouslySetInnerHTML={{ __html: fixed_notice.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
                        </div>
                        : ""}

                    <div align='center' style={{ marginTop: '15px' }}>
                        <select onChange={selectOnChange} className='selectTopUpType col-6'>
                            <option value="all">All</option>
                            <option value="id code">ID Code</option>
                            <option value="id password">ID Password</option>
                        </select>
                    </div>

                    <Package topUp_type={Type} />
                </div>
            </div>
        </>
    )
}
