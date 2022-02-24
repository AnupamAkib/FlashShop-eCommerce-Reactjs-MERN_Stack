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
            {discountAmount ? <div className='packageTitle offer-title'>অফার প্যাকেজ</div> : <div className='packageTitle normal-title'>সাধারণ প্যাকেজ</div>}
            <table border='0' width='100%' cellPadding={2}>
                <tr>
                    <td width='10' align='center'><i className="fa fa-diamond"></i></td>
                    <td><font style={{ fontWeight: 'bold', fontSize: '23px' }}>{en2Bn.number(diamond)} ডায়ামন্ড</font></td>
                    {discountAmount != "0" ?
                        <td rowSpan={2} className='offerTag'>
                            <div align='center' style={{ paddingRight: '0px' }}>
                                <b><font style={{ marginRight: '2px' }}>৳</font>{en2Bn.number(discountAmount)}</b><br />
                                <font style={{ fontSize: '11px' }}>মূল্য ছাঁড়</font>
                            </div>
                        </td> : ""}
                </tr>
                <tr>
                    <td width='10' align='center'><img src='images/taka.png' width='13px' /></td>
                    <td>{discountAmount != "0" ? <font><s>{en2Bn.number(regularPrice)} টাকা</s> <font color='green' style={{ fontWeight: 'bold' }}>{en2Bn.number(discountPrice)} টাকা</font></font> : <font color='green' style={{ fontWeight: 'bold' }}>{en2Bn.number(regularPrice)} টাকা</font>}</td>
                </tr>
                <tr>
                    <td width='10' align='center'><i className="fa fa-cog"></i></td>
                    <td className='capitalize' colSpan={2}><font size='4'>{topUp_type}</font></td>
                </tr>
            </table>
            <div style={{ textAlign: 'right' }} >
                <Button
                    onClick={() => { navigate(orderLink) }}
                    color="primary"
                    variant="contained"
                    style={{ fontSize: '18px' }}
                ><b>ক্রয় করুন</b></Button>
            </div>
        </div>
    )
}
