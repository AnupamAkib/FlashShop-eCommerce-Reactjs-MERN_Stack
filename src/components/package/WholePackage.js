import React, { useState } from 'react'
import Package from './package.js'
import { useEffect } from 'react'
import axios from 'axios'
import Title from '../title.js'

export default function WholePackage() {
    const [Type, setType] = useState("All")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const selectOnChange = (e) => {
        let topUp_type = e.target.value;
        console.log(topUp_type);
        setType(topUp_type)
    }

    const backtoTop = () => {
        window.scrollTo(0, 0)
    }

    const [fixed_notice, setfixed_notice] = useState("");
    const [popUp_notification, setpopUp_notification] = useState("")

    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'settings/all', {
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


    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    //console.log(scrollPosition)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className='bgImg'>
                <div className='welcomeMsg container col-6'>
                    <h1 style={{ fontWeight: 'bold' }}>Welcome to FlashShop!</h1>
                    <p>
                        FlashShop is a small E-commerce application where user can order products. Admin can manage products & process orders.
                        <br />
                        This is very trusted and well managed service. You can pay through bKash, Nagad and Rocket here.

                        Scroll down to view our products. Thanks!
                    </p>
                </div>
            </div>
            <div className='container'>
                <div className='container col-8'>
                    {fixed_notice != "" ?
                        <div align='center' className='fixedNotice'>
                            <div dangerouslySetInnerHTML={{ __html: fixed_notice.replace(/(?:\r\n|\r|\n)/g, '<br>') }} />
                        </div>
                        : ""}

                    <div align='center' className='getInTouch'>
                        <a href='https://www.facebook.com/' target='_blank' className='social'>
                            <i style={{ color: '#4267b3' }} className='fa fa-facebook-square'></i>
                        </a>
                        <a href='' target='_blank' className='social'>
                            <i style={{ color: '#c4302b' }} className='fa fa-youtube-play'></i>
                        </a>
                        <a href='tel:01' className='social'>
                            <i style={{ color: 'green' }} className='fa fa-phone-square'></i>
                        </a>
                        <a href='mailto:' className='social'>
                            <i style={{ color: '#bb0018' }} className='fa fa-envelope'></i>
                        </a>
                    </div>

                    <div align='center' style={{ marginTop: '15px' }}>
                        <select onChange={selectOnChange} className='selectTopUpType col-6'>
                            <option value="All">All</option>
                            <option value="Technology">Technology</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <Package topUp_type={Type} />
                </div>
                <div style={{ clear: 'both' }}></div>
            </div>

            {!scrollPosition ? "" :
                <div className='backToTop' onClick={backtoTop} align='center'>
                    <i className="fa fa-arrow-up"></i>
                </div>
            }

        </>
    )
}
