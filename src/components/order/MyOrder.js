import React from 'react'
import MyOrderCard from './MyOrderCard'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function MyOrder() {
    let pid = localStorage.getItem("phone");
    const [MyAllOrder, setMyAllOrder] = useState([]);
    const [Loading, setLoading] = useState(true)
    let notification = require('../methods.js');



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'order/myOrder', {
            phone: pid
        })
            .then((response) => {
                let ar = response.data;
                console.log(ar)
                if (ar.status != "failed") {
                    setMyAllOrder(ar.result);
                }
                else {
                    notification.msg("You didn't buy any products", "blue", "4000")
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
                title={MyAllOrder[i].title}
                price={MyAllOrder[i].price}
                category={MyAllOrder[i].category}
                discount={MyAllOrder[i].discount}
                paymentMethod={MyAllOrder[i].paymentMethod}
                paymentSenderTnxNumber={MyAllOrder[i].transactionID}
                timeDate={MyAllOrder[i].timeDate}
                orderStatus={MyAllOrder[i].orderStatus}
                quantity={MyAllOrder[i].quantity}
                shippingAddress={MyAllOrder[i].shippingAddress}
            />
        )
    }

    orderCard.reverse();


    const en2bn = require('../methods')

    if (Loading) {
        return (
            <div align="center" style={{ paddingBottom: '30vh' }}>
                <br /><br /><br />
                <CircularProgress /><br />
                Please Wait
            </div>
        )
    }

    if (!found) {
        return (
            <div className='my_order_card'>
                <h1 align='center'>No order found</h1>
            </div>
        )
    }

    return (
        <>
            <center>
                <b>Total Order: {orderCard.length}</b>
                <hr />
            </center>
            {orderCard}
        </>
    )

}
