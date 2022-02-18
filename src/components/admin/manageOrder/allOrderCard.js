import React from 'react'
import Card from './Card.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function AllOrderCard(props) {
    let order_status = props.status;
    //const [order_status, setorder_status] = useState(props.status)
    const [allOrder, setAllOrder] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://flash-shop-server.herokuapp.com/order/allOrder', {
            //parameters
        })
            .then((response) => {
                setAllOrder(response.data.result)
                setLoading(false);
            }, (error) => {
                console.log(error);
            });
    }, [])

    let res = [];
    for (let i = 0; i < allOrder.length; i++) {
        if (allOrder[i].orderStatus == order_status || order_status == "ALL") {
            res.push(<Card
                _id={allOrder[i]._id}
                customer_name={allOrder[i].customer_name}
                phone={allOrder[i].phone}
                diamond={allOrder[i].diamond}
                price={allOrder[i].price}
                topUp_type={allOrder[i].topUp_type}
                discount={allOrder[i].discount}
                playerID={allOrder[i].playerID}
                gameLoginID={allOrder[i].gameLoginID}
                gameLoginPassword={allOrder[i].gameLoginPassword}
                paymentMethod={allOrder[i].paymentMethod}
                paymentSenderNumber={allOrder[i].paymentSenderNumber}
                timeDate={allOrder[i].timeDate}
                orderStatus={allOrder[i].orderStatus}
            />)
        }
    }
    if (loading) {
        return (
            <div align="center">
                <br /><br /><br />
                <CircularProgress />
            </div>
        )
    }
    localStorage.setItem("searchedStatus", "ALL")
    res.reverse();
    return (
        <div>
            {res.length ? res : <div align='center'><br /><br /><h1>Nothing Found</h1></div>}
        </div>
    )
}

