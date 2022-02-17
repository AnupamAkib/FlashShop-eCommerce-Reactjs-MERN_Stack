import React from 'react'
import MyOrderCard from './MyOrderCard'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function MyOrder() {
    let pid = localStorage.getItem("id_code");
    const [MyAllOrder, setMyAllOrder] = useState([]);
    const [Loading, setLoading] = useState(true)

    let notification = require('../methods.js');

    useEffect(() => {
        axios.post('https://flash-shop-server.herokuapp.com/order/myOrder', {
            playerID: pid
        })
            .then((response) => {
                let ar = response.data;
                if (ar.status != "failed") {
                    setMyAllOrder(ar.result);
                }
                else {
                    notification.msg("আপনি এখনো কোনো প্যাকেজ ক্রয় করেননি।", "blue", "4000")
                }
                setLoading(false)
            }, (error) => {
                notification.msg("Sorry, something wrong", "red", 4000);
            });
    }, [])

    let orderCard = [];
    let found = false;
    for (let i = 0; i < MyAllOrder.length; i++) {
        found = true;
        orderCard.push(
            <MyOrderCard
                _id={MyAllOrder[i]._id}
                customer_name={MyAllOrder[i].customer_name}
                phone={MyAllOrder[i].phone}
                diamond={MyAllOrder[i].diamond}
                price={MyAllOrder[i].price}
                topUp_type={MyAllOrder[i].topUp_type}
                discount={MyAllOrder[i].discount}
                playerID={MyAllOrder[i].playerID}
                gameLoginID={MyAllOrder[i].gameLoginID}
                gameLoginPassword={MyAllOrder[i].gameLoginPassword}
                paymentMethod={MyAllOrder[i].paymentMethod}
                paymentSenderNumber={MyAllOrder[i].paymentSenderNumber}
                timeDate={MyAllOrder[i].timeDate}
                orderStatus={MyAllOrder[i].orderStatus}
            />
        )
    }

    orderCard.reverse();

    if (Loading) {
        return (
            <div align="center">
                <br /><br /><br />
                <CircularProgress />
            </div>
        )
    }

    if (!found) {
        return (
            <div className='my_order_card'>
                <h1 align='center'>কোনো অর্ডার নেই</h1>
            </div>
        )
    }

    return (
        <>
            {orderCard}
        </>
    )

}
