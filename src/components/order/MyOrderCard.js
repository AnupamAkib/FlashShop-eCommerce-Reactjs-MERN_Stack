import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import generatePDF from './PDFGenerator';

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
    else if (orderStatus == "SHIPPED") {
        status_color = "purple";
        status_icon = "fa fa-bicycle";
    }
    else if (orderStatus == "DELIVERED") {
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

    const htmlContent = `
    <html>
    <head>
    </head>
    <body>
        <div>
            <center>
                <br/>
                <h1><b><font color="red">FLASH</font>shop</b></h1>
                <hr/><h3>Customer Receipt</h3><hr/>

                <b>Customer Name: </b> ${customer_name}<br/>
                <b>Phone: </b> ${phone}<br/>
                <b>Shipping Address: </b> ${shippingAddress}<br/>
                <br/>
                <table width="100%">
                    <tr>
                        <td><center><b>Date: </b>${timeDate}</center></td>
                    </tr>
                </table>
                <br/>
                <font size="5">
                    <table border="1" width="100%" cellpadding="15" class="table table-bordered">
                        <tr>
                            <th>Sl.No</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Discount</th>
                            <th>Amount</th>
                        </tr>

                        <tr height="300px">
                            <td>1</td>
                            <td>${title}</td>
                            <td>${quantity}</td>
                            <td>${price}/-</td>
                            <td>${discount}/-</td>
                            <td>${(price-discount)*quantity}/-</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <font size="3"><b>Payment Mathod:</b></font> <img src="/images/${paymentMethod}.png" width="90px"/><br/>
                                <font size="3"><b>Transaction ID:</b></font> ${paymentSenderTnxNumber}
                            </td>
                            <td colspan="4"><div align="right">
                                <font size="5">
                                    G. Total: <b>${(price-discount)*quantity} Taka</b><br/>
                                    Paid: <b>${(price-discount)*quantity} Taka</b><br/>
                                </font></div></td>
                        </tr>
                    </table>
                </font>
                This is an system generated customer receipt. No signature is required.<br/>
                Thanks for shopping from our site.
            </center>
        </div>
    </body>
    </html>
    `;

    const handleGeneratePDF = () => {
        generatePDF(htmlContent);
    };

 
   
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
            

            {orderStatus == "PENDING" ?
                <>
                    <hr/>
                    <Button onClick={cancelOrder} style={{ backgroundColor: btnDisabled == 'true' ? "gray" : "#d40000", color: 'white', fontSize: '15px' }} variant="contained" disabled={btnDisabled}>
                        Cancel Order
                    </Button>
                </> : orderStatus=="DELIVERED"?

                <>
                    <hr/>
                    <button onClick={handleGeneratePDF}>Download receipt</button>
                </> 

                : ""}
        </div >
    )
}
