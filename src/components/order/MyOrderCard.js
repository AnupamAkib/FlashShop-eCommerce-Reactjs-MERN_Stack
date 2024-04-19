import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';

export default function MyOrderCard(props) {
    let id = props._id;
    let customer_name = props.customer_name;
    let phone = props.phone;
    let diamond = props.diamond;
    let price = props.price;
    let topUp_type = props.topUp_type;
    let discount = props.discount;
    let playerID = props.playerID;
    let gameLoginID = props.gameLoginID;
    let gameLoginPassword = props.gameLoginPassword;
    let paymentMethod = props.paymentMethod;
    let paymentSenderNumber = props.paymentSenderNumber;
    let timeDate = props.timeDate;
    const [orderStatus, setOrderStatus] = useState(props.orderStatus)

    let en2Bn = require('../methods.js')
    let status_icon = "";
    let status_color = "";

    if (orderStatus == "PENDING") {
        status_color = "darkgoldenrod";
        status_icon = "fa fa-refresh fa-spin";
    }
    else if (orderStatus == "RECEIVED") {
        status_color = "green";
        status_icon = "fa fa-check";
    }
    else if (orderStatus == "REJECTED") {
        status_color = "#d40000";
        status_icon = "fa fa-remove";
    }
    else if (orderStatus == "CANCELLED") {
        status_color = "#ff2626";
        status_icon = "fa fa-remove";
    }

    let notification = require('../methods.js')

    const [btnDisabled, setbtnDisabled] = useState('');

    const cancelOrder = () => {
        //cancel this order
        setbtnDisabled('true');
        axios.post(process.env.REACT_APP_BACKEND+'order/status', {
            _id: id,
            newStatus: "CANCELLED"
        })
            .then((response) => {
                //console.log(response.data)
                //setLoading(false)
                setOrderStatus("CANCELLED");
            }, (error) => {
                //console.log(error);
                setbtnDisabled('');
                notification.msg("Sorry, something wrong", "red", 4000);
            });
        //console.log("cancelled")
    }

    function isLetter(c) {
        c = String(c);
        //console.log(c)
        return c.toLowerCase() != c.toUpperCase();
    }

    let packageName = "";
    if (isLetter(diamond)) {
        packageName = diamond;
    }
    else {
        packageName = en2Bn.number(diamond) + " ডায়ামন্ড"
    }


    return (
        <div className='my_order_card'>
            <table border='0' width='100%'>
                <tr>
                    <td width='30px' align='center'><i className='fa fa-user'></i></td>
                    <td className='firstLetterUpper'>{customer_name}</td>
                    <td rowSpan={2} width='40'>
                        <div align='center' className='order_status' style={{ background: status_color }}>
                            <i class={status_icon}></i> {orderStatus}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-diamond'></i></td>
                    <td><font color='darkblue'><b>{packageName}</b></font></td>
                </tr>
                <tr>
                    <td align='center'><b>৳</b></td>
                    <td colSpan={2}><font color='darkgreen' style={{ fontWeight: 'bold' }}>{en2Bn.number(price)} টাকা </font>{discount == "0" ? "" : <font color='gray'>({en2Bn.number(discount)} টাকা ছাঁড়ে)</font>}</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-gear'></i></td>
                    <td colSpan={2}>{topUp_type}</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-credit-card'></i></td>
                    <td colSpan={2}>{paymentSenderNumber} (My {paymentMethod})</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-clock-o'></i></td>
                    <td colSpan={2}>{timeDate}</td>
                </tr>

            </table>
            {orderStatus == "PENDING" ?
                <Button onClick={cancelOrder} style={{ backgroundColor: btnDisabled == 'true' ? "gray" : "#d40000", color: 'white', fontSize: '15px' }} variant="contained" disabled={btnDisabled}>
                    অর্ডার বাতিল করি
                </Button> : ""}
        </div >
    )
}
