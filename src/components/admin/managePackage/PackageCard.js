import React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from 'react-router-dom';

export default function PackageCard(props) {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const notification = require('../.././methods.js')
    let diamond = props.diamond;
    let topUp_type = props.topUp_type;
    let discount = props.discount;
    let regularPrice = props.regularPrice;
    let discountPrice = props.discountPrice;
    let id = props.id
    const [opct, setOpct] = useState(1)
    const [disabled, setDisabled] = useState(false)

    const deleteThisPackage = () => {
        confirm({ description: "This package will be deleted permanently" })
            .then(() => {
                //console.log("yes")
                setDisabled(true)
                axios.post('https://flash-shop-server.herokuapp.com/package/delete', {
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
            <table width="100%" border='0' cellPadding={3} style={{ marginBottom: '8px' }}>
                <tbody>
                    <tr>
                        <td align='center' width='10px'><i className="fa fa-diamond"></i></td>
                        <td><b>{diamond} Diamonds</b></td>
                        <td rowSpan={2} align='center'>
                            {
                                discount ?
                                    <s><font>{regularPrice} BDT<br /></font></s>
                                    : ''
                            }
                            <font style={{ fontSize: '20px', fontWeight: 'bold', color: 'darkgreen' }}>{discountPrice} BDT</font>
                        </td>
                    </tr>
                    <tr>
                        <td align='center'><i className="fa fa-cog"></i></td>
                        <td className='capitalize'>{topUp_type}</td>
                    </tr>
                    <tr>
                        <td align='center'><i className="fa fa-flash"></i></td>
                        <td colSpan={2}>{discount} BDT Discount</td>
                    </tr>
                </tbody>
            </table>

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
