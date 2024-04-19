import React from 'react'
import './style.css'
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    const navigate = useNavigate();
    let title = props.title;
    let description = props.description;
    let price = props.price;
    let discount = props.discount;
    let category = props.category;
    let id = props.id;
    let classN = 'packageCard col-6 ';

    let en2Bn = require('../methods.js');
    let orderLink = "/order/" + id;

    let desc = "";

    for(let i=0; i<description.length; i++){
        if(i > 80 && description[i] == ' '){
            desc += "...";
            break;
        }
        desc += description[i];
    }


    return (
        <div className={classN}>
            <h2>{title}</h2><hr/>
            <table width="100%" border='0' cellPadding={4} style={{ marginBottom: '8px' }}>
                <tbody>
                    <tr>
                        <td align='center' width='10px'><i className="fa fa-diamond"></i></td>
                        <td><b>{category}</b></td>
                        <td rowSpan={2} align='right'>
                            {
                                discount ?
                                    <s><font>{price} BDT<br /></font></s>
                                    : ''
                            }
                            <font style={{ fontSize: '20px', fontWeight: 'bold', color: 'darkgreen' }}>{price-discount} BDT</font>
                        </td>
                    </tr>
                    <tr>
                        <td align='center'><i className="fa fa-cog"></i></td>
                        <td colSpan={2}><font size="2">{discount} BDT Discount</font></td>
                    </tr>
                </tbody>
            </table>
            <b>Description: </b>{desc} <br/>
            <div style={{ textAlign: 'right' }} >
                <Button
                    onClick={() => { navigate(orderLink) }}
                    color="primary"
                    variant="contained"
                    style={{ fontSize: '18px' }}
                ><b>Order</b></Button>
            </div>
        </div>
    )
}
