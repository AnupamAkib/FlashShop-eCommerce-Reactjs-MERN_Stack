import React from 'react'
import './style.css'
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

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

    const trimText = (text, len) =>{
        let s = "";
        for(let i=0; i<text.length; i++){
            if(i>len){
                s += "...";
                break;
            }
            s += text[i];
        }
        return s;
    }

    return (
        <div className={classN} style={{maxHeight:"350px"}}>
            <div style={{background:"", height:"57px"}}>
                <Tooltip title={title}>
                    <h2><b>{trimText(title, 41)}</b></h2>
                </Tooltip>
            </div>
            <hr/>
            <table width="100%" border='0' cellPadding={4} style={{ marginBottom: '8px' }}>
                <tbody>
                    <tr>
                        <td align='center' width='7px'><i className="fa fa-diamond"></i></td>
                        <td><font size="4">{category}</font></td>
                        <td rowSpan={2} align='right'>
                            {
                                discount>0 ?
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
            <textarea type="text" style={{width:"100%", height:"80px", background:"transparent", border:"none", fontSize:"17px", resize: "none", outline:"none"}} readOnly>{"Description: "+ description}</textarea>
            
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
