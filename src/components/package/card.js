import React from 'react'
import './style.css'
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    const navigate = useNavigate();
    let diamond = props.diamond;
    let regularPrice = props.regularPrice;
    let discountPrice = props.discountPrice;
    let discountAmount = props.discountAmount;
    let topUp_type = props.topUp_type;
    let id = props.id;
    let classN = 'packageCard col-6 ';
    if (discountAmount != "0") {
        classN += 'offer';
    }
    let en2Bn = require('../methods.js');
    let orderLink = "/order/" + id;
    return (
        <div className={classN}>
            <table border='0' width='100%'>
                <tr>
                    <td width='10'><img src='images/diamond.png' width='22px' /></td>
                    <td><font style={{ fontWeight: 'bold', fontSize: '19px' }}>{en2Bn.number(diamond)} ডায়ামন্ড</font></td>
                    {discountAmount != "0" ?
                        <td rowSpan={2} className='offerTag'>
                            <div align='right' style={{ paddingRight: '13px' }}>
                                <b>{en2Bn.number(discountAmount)} ৳</b><br />
                                <font style={{ fontSize: '10px' }}>মূল্য ছাঁড়</font>
                            </div>
                        </td> : ""}
                </tr>
                <tr>
                    <td width='10'><img src='images/taka.png' width='16px' /></td>
                    <td>{discountAmount != "0" ? <font><s>{en2Bn.number(regularPrice)} টাকা</s> <font color='green' style={{ fontWeight: 'bold' }}>{en2Bn.number(discountPrice)} টাকা</font></font> : <font color='green' style={{ fontWeight: 'bold' }}>{en2Bn.number(regularPrice)} টাকা</font>}</td>
                </tr>
                <tr>
                    <td width='10'><img src='images/topup.png' width='20px' /></td>
                    <td className='capitalize'>{topUp_type}</td>
                </tr>
            </table>
            <div style={{ textAlign: 'right' }} >
                <Button
                    onClick={() => { navigate(orderLink) }}
                    color="primary"
                    variant="contained"
                ><b>ক্রয় করুন</b></Button>
            </div>
        </div>
    )
}
