import React from 'react'
import Card from './Card.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { ConfirmProvider } from "material-ui-confirm";
import { useNavigate } from 'react-router';

export default function AllOrderCard(props) {
    let order_status = props.status;
    const [Page, setPage] = useState(1);
    const [isPrevDisabled, setisPrevDisabled] = useState(true)
    const [isNextDisabled, setisNextDisabled] = useState(false)
    let totalCardInPage = 5;
    let startFrom = (Page - 1) * totalCardInPage;
    let endTo = Page * totalCardInPage;
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
            res.push(<ConfirmProvider><Card
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
            /></ConfirmProvider>)
        }
    }

    if (loading) {
        return (
            <div align="center" style={{ paddingBottom: '40vh' }}>
                <br /><br /><br />
                <CircularProgress /><br />Please Wait
            </div>
        )
    }
    localStorage.setItem("searchedStatus", "PENDING")
    res.reverse();


    let tmp = [];
    if (order_status == "ALL") {
        for (let i = 0; i < res.length; i++) {
            tmp.push(res[i]);
        }
    }
    else {
        for (let i = startFrom; i < Math.min(endTo, res.length); i++) {
            tmp.push(res[i]);
        }
    }


    const changeNextPage = (e) => {
        let cur = Page;
        setPage(cur + 1);
        setisPrevDisabled(false)
        if (Page * totalCardInPage + totalCardInPage >= res.length) {
            setisNextDisabled(true);
        }
        window.scrollTo(0, 0)
    }
    const changePrevPage = (e) => {
        let cur = Page;
        setPage(Math.max(cur - 1, 1));
        setisNextDisabled(false);
        if (Page == 2) {
            setisPrevDisabled(true);
        }
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <center className='container'>
                <div style={{ background: '#cce0ff', padding: '10px', marginBottom: '20px' }}>
                    <font size='4'><b>Page: {Page}</b></font><br />
                    {order_status} Order Count: {res.length}
                </div>

            </center>
            {tmp.length ? tmp : <div align='center'><br /><br /><br /><h1>Nothing Found</h1><br /><br /><br /><br /></div>}

            {order_status != "ALL" && res.length > totalCardInPage ?
                <center>
                    <Button onClick={changePrevPage} size="large" variant="contained" disabled={isPrevDisabled}>Prev</Button>
                    <Button onClick={changeNextPage} size="large" variant="contained" disabled={isNextDisabled}>Next</Button>
                </center> : ""}
        </div>
    )
}

