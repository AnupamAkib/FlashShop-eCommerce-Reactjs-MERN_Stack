import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from 'react-router-dom';

export default function PackageCard(props) {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const notification = require('../.././methods.js')
    let title = props.title;
    let description = props.description;
    let discount = parseInt(props.discount);
    let price = props.price;
    let category = props.category;
    let id = props.id
    const [opct, setOpct] = useState(1)
    const [disabled, setDisabled] = useState(false)

    let desc = "";

    for(let i=0; i<description.length; i++){
        if(i > 80 && description[i] == ' '){
            desc += "...";
            break;
        }
        desc += description[i];
    }
    

    const deleteThisPackage = () => {
        confirm({ description: "This package will be deleted permanently" })
            .then(() => {
                //console.log("yes")
                setDisabled(true)
                axios.post(process.env.REACT_APP_BACKEND+'package/delete', {
                    _id: id
                })
                    .then((response) => {
                        setOpct(0.4)
                        notification.msg("Deleted Successfully!", "green", 2500);
                    }, (error) => {
                        setDisabled(false);
                        notification.msg("Sorry, something went wrong", "red", 4000);
                    });
            })
            .catch(() => {
                setDisabled(false)
                //console.log("Deletion cancelled.")
            });
    }

    return (
        <div className='regular_package_card' style={{ opacity: opct }}>
            <h2>{title}</h2>
            <table width="100%" border='0' cellPadding={3} style={{ marginBottom: '8px' }}>
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
            {
                opct == 1 ?
                    <span>
                        <Button onClick={() => { navigate('/admin/package/edit/' + id) }} variant="contained" style={{ marginRight: '7px' }}>Edit</Button>
                        <Button onClick={deleteThisPackage} color='inherit' variant="contained" disabled={disabled}>{disabled ? "WAIT..." : "Delete"}</Button>
                    </span>
                    : ''
            }
        </div >
    )
}
