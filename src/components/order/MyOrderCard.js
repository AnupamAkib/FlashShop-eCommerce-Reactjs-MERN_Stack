import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';

export default function MyOrderCard(props) {
    let id = props._id;
    let customer_name = props.customer_name;
    let phone = props.phone;
    let title = props.title;
    let price = props.price;
    let category = props.category;
    let discount = props.discount;
    let paymentMethod = props.paymentMethod;
    let paymentSenderTnxNumber = props.paymentSenderTnxNumber;
    let timeDate = props.timeDate;
    let quantity = props.quantity;
    let shippingAddress = props.shippingAddress;

    let totalPay = (quantity*(price - discount));

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
                    <td><font color='darkblue'><b>{title}</b></font></td>
                </tr>
                <tr>
                    <td align='center'><b>৳</b></td>
                    <td colSpan={2}><font color='darkgreen' style={{ fontWeight: 'bold' }}>{totalPay} BDT</font>{discount == "0" ? "" : <font color='gray' size="2"> Discount Added</font>}</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-gear'></i></td>
                    <td colSpan={2}>{category}</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-credit-card'></i></td>
                    <td colSpan={2}>{paymentSenderTnxNumber} ({paymentMethod})</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-clock-o'></i></td>
                    <td colSpan={2}>{timeDate}</td>
                </tr>
            </table>

            <b>Quantity:</b> {quantity} <br/>
            <b>Unit Price:</b> {price} <br/>
            <b>Total Discount:</b> {quantity*discount} <br/>
            <b>Shipping Address:</b> {shippingAddress}
            <hr/>

            {orderStatus == "PENDING" ?
                <Button onClick={cancelOrder} style={{ backgroundColor: btnDisabled == 'true' ? "gray" : "#d40000", color: 'white', fontSize: '15px' }} variant="contained" disabled={btnDisabled}>
                    Cancel Order
                </Button> : ""}
        </div >
    )
}
