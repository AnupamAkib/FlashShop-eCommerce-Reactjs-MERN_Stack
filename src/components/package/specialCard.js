import React from 'react'
import './style.css'
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function SpecialCard(props) {
    const navigate = useNavigate();
    let diamond = props.diamond;
    let regularPrice = props.regularPrice;
    let discountAmount = props.discountAmount;
    let discountPrice = parseInt(regularPrice) - parseInt(discountAmount);
    let topUp_type = props.topUp_type;
    let id = props.id;
    let classN = 'packageCard col-6 special';

    let en2Bn = require('../methods.js');
    let orderLink = "/order/special/" + id;
    return (
        <div className={classN}>
            <div className='packageTitle special-Title'>স্পেশাল প্যাকেজ</div>
            <table border='0' width='100%' cellPadding={2}>
                <tr>
                    <td width='10' align='center'><i className="fa fa-diamond"></i></td>
                    <td><font style={{ fontWeight: 'bold', fontSize: '23px' }}>{diamond}</font></td>
                    {discountAmount != 0 ?
                        <td rowSpan={2} className='offerTag'>
                            <div align='center' style={{ paddingRight: '0px' }}>
                                <b><font style={{ marginRight: '2px' }}>৳</font>{en2Bn.number(discountAmount)}</b><br />
                                <font style={{ fontSize: '11px' }}>মূল্য ছাঁড়</font>
                            </div>
                        </td> : ""}
                </tr>
                <tr>
                    <td width='10' align='center'><img src='images/taka.png' width='13px' /></td>
                    <td>{discountAmount != 0 ? <font><s>{en2Bn.number(regularPrice)} টাকা</s> <font color='green' style={{ fontWeight: 'bold' }}>{en2Bn.number(discountPrice)} টাকা</font></font> : <font color='green' style={{ fontWeight: 'bold' }}>{en2Bn.number(regularPrice)} টাকা</font>}</td>
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
