import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useConfirm } from "material-ui-confirm";


export default function MyOrderCard(props) {
    const confirm = useConfirm();
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
    const [opct, setOpct] = useState(1)
    const [btnDisabled, setbtnDisabled] = useState(false);
    const [showhide, setshowhide] = useState("Show")


    const changeThisOrderStatus = (e) => {
        let _status = e.target.value;
        let previous_status = orderStatus;
        setbtnDisabled(true);
        axios.post(process.env.REACT_APP_BACKEND+'order/status', {
            _id: id,
            newStatus: _status
        })
            .then((response) => {
                setOrderStatus(_status);
                setbtnDisabled(false);
                let amount = 0;
                if (previous_status == "PENDING" && _status == "RECEIVED") {
                    amount = price;
                }
                else if (previous_status == "RECEIVED") {
                    amount = price * -1;
                }
                axios.post(process.env.REACT_APP_BACKEND+'dashboard/increaseSell', { increaseAmount: amount })
                    .then((re) => { }, (error) => { });
            }, (error) => {
                setbtnDisabled(false);
                notification.msg("Sorry, something wrong", "red", 4000);
            });
    }


    let en2Bn = require('../../methods.js')

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

    let notification = require('../../methods.js')


    const deleteThisOrder = () => {
        confirm({ description: `This order's information will be deleted permanently` })
            .then(() => {
                //console.log("yes")
                axios.post(process.env.REACT_APP_BACKEND+'order/delete', {
                    _id: id
                })
                    .then((response) => {
                        setOpct(0.4)
                        notification.msg("Deleted Successfully!", "green", 2500);
                    }, (error) => {
                        //setbtnDisabled(false);
                        notification.msg("Sorry, something went wrong", "red", 4000);
                    });
            })
            .catch(() => {
                console.log("Deletion cancelled.")
            });
    }

    function isLetter(c) {
        c = String(c);
        //console.log(c)
        return c.toLowerCase() != c.toUpperCase();
    }

    return (
        <div className='my_order_card' style={{ opacity: opct }}>
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
            

            {opct == 1 ?
                <center>
                    <hr/>
                    <FormControl variant='filled'>
                        <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                        <Select
                            value={orderStatus}
                            onChange={changeThisOrderStatus}
                            label="Status"
                            disabled={btnDisabled}
                        >
                            <MenuItem value="PENDING">Pending</MenuItem>
                            <MenuItem value="RECEIVED">Received</MenuItem>
                            <MenuItem value="REJECTED">Rejected</MenuItem>
                            <MenuItem value="CANCELLED">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                    <a href={"tel:" + phone} style={{ paddingTop: '15px', paddingBottom: '15px' }} className='btn btn-primary'><i class="fa fa-phone" style={{ fontSize: '20px' }}></i> CALL</a>
                    <button style={{ paddingTop: '15px', paddingBottom: '15px' }} className='btn btn-danger' onClick={deleteThisOrder}><i class="fa fa-trash-o" style={{ fontSize: '20px' }}></i> DEL</button>
                </center> : ""}
        </div >
    )
}
