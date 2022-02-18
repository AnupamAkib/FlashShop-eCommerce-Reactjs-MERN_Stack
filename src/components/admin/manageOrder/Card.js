import React from 'react'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

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

    const [btnDisabled, setbtnDisabled] = useState(false);

    const changeThisOrderStatus = (e) => {
        let _status = e.target.value;
        setbtnDisabled(true);
        axios.post('https://flash-shop-server.herokuapp.com/order/status', {
            _id: id,
            newStatus: _status
        })
            .then((response) => {
                setOrderStatus(_status);
                setbtnDisabled(false);
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
                    <td><font color='darkblue'><b>{diamond} Diamonds</b></font></td>
                </tr>
                <tr>
                    <td align='center'><b>৳</b></td>
                    <td colSpan={2}><font color='darkgreen' style={{ fontWeight: 'bold' }}>{price} BDT </font>{discount == "0" ? "" : <font color='gray'>(With {discount} Tk Off)</font>}</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-gear'></i></td>
                    <td colSpan={2}>{topUp_type}</td>
                </tr>

                <tr style={{ background: '#c9c9ff' }}>
                    <td align='center'><i className='fa fa-key'></i></td>
                    <td colSpan={2}>PlayerID: {playerID}</td>
                </tr>

                <tr style={{ background: '#ddffc9' }}>
                    <td align='center'><i className='fa fa-sign-in'></i></td>
                    <td colSpan={2}>Login: {gameLoginID == "" ? "Not given" : gameLoginID}</td>
                </tr>

                <tr style={{ background: '#ffc9c9' }}>
                    <td align='center'><i className='fa fa-lock'></i></td>
                    <td colSpan={2}>Password: {gameLoginPassword == "" ? "Not given" : gameLoginPassword}</td>
                </tr>

                <tr style={{ background: '#b5ffd5' }}>
                    <td align='center'><i className='fa fa-credit-card'></i></td>
                    <td colSpan={2}>{paymentMethod}: {paymentSenderNumber}</td>
                </tr>
                <tr>
                    <td align='center'><i className='fa fa-clock-o'></i></td>
                    <td colSpan={2}>{timeDate}</td>
                </tr>
            </table>
            <center>
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
                <a href={"tel:" + phone} style={{ paddingTop: '15px', paddingBottom: '15px' }} className='btn btn-primary'>Call Client</a>
                <button style={{ paddingTop: '15px', paddingBottom: '15px' }} className='btn btn-danger'>Delete</button>
            </center>
        </div >
    )
}

/*

                <select onChange={changeThisOrderStatus} disabled={btnDisabled}>
                    <option value="PENDING">PENDING</option>
                    <option value="RECEIVED">RECEIVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                </select>


                
*/