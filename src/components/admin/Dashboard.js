import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Title from '../title.js';
import DB_Card from './dashboard_card.js';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function Dashboard() {
    const navigate = useNavigate();
    const notification = require('../methods.js');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        let auth = require('./authorization.js');
        //console.log(auth.checkAdmin())
        if (auth.checkAdmin() == false) {
            notification.msg("You must login first", "red", 2500)
            navigate('/admin')
        }
    }, [])

    const [totalLifeTimeOrder, settotalLifeTimeOrder] = useState(0);
    const [totalLifeTimeSell, settotalLifeTimeSell] = useState(0);
    const [sellPending, setsellPending] = useState(0);
    const [successfulOrderCnt, setsuccessfulOrderCnt] = useState(0)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND+'dashboard/all')
            .then((response) => {
                settotalLifeTimeOrder(response.data.result.totalOrder);
                settotalLifeTimeSell(response.data.result.totalSell);
                setsellPending(response.data.result.sellPending);
                setsuccessfulOrderCnt(response.data.result.successfulOrderCount);
                setloading(false);
            }, (error) => {
                notification.msg("Sorry, something wrong", "red", 4000);
            });
    }, [])


    const logAdminOut = () => {
        localStorage.setItem("u", "");
        localStorage.setItem("p", "");
        localStorage.setItem("n", "");
        notification.msg("You've successfully logged out", "green", 2500);
        navigate('/admin');
    }
    return (
        <>
            <Title title='Dashboard' />
            <div className='container col-6'>
                {loading ?
                    <div className='hovered_loading'>
                        <CircularProgress /><br />Please Wait
                    </div>
                    : ""}
                <table width='100%'>
                    <tr>
                        <td>Hello, <font className='firstLetterUpper'><b>{localStorage.getItem("n")}</b></font></td>
                        <td width='120px'><button className='btn btn-primary' onClick={logAdminOut}><i class="fa fa-sign-out"></i> LOGOUT</button></td>
                    </tr>
                </table>
                <hr />

                <center>
                    <div className='container'>
                        <DB_Card name='Life Time Order' number={totalLifeTimeOrder} />
                        <DB_Card name='Life Time Sell' number={"৳ " + totalLifeTimeSell} />
                    </div>
                    <div className='container'>
                        <DB_Card name='Sell Pending' number={"৳ " + sellPending} />
                        <DB_Card name='Successful Order' number={successfulOrderCnt} />
                    </div>

                    <div style={{ clear: 'both' }} className='container'><br />
                        <Link style={{ textDecoration: 'none' }} to='/admin/viewOrder'><div className='actionBtn'><i className='	fa fa-cubes'></i> Manage Orders</div></Link><br />
                        <Link style={{ textDecoration: 'none' }} to='/admin/package/view'><div className='actionBtn'><i className='fa fa-diamond'></i> View All Products</div></Link><br />
                        <Link style={{ textDecoration: 'none' }} to='/admin/package/create'><div className='actionBtn'><i className='fa fa-plus-square'></i> Add New Product</div></Link><br />
                        {//}<Link style={{ textDecoration: 'none' }} to='/admin/package/special/create'><div className='actionBtn'><i className='fa fa-plus-square'></i> Create Offered Product</div></Link><br />
                        }
                        <Link style={{ textDecoration: 'none' }} to='/admin/settings'><div className='actionBtn'><i className='fa fa-cogs'></i> Change settings</div></Link><br />
                    </div>
                </center>
                <br />
            </div>
        </>
    )
}
