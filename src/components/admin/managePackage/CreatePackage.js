import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreatePackage() {
    const navigate = useNavigate();
    const notification = require('../../methods.js')
    const [Diamond, setDiamond] = useState(0)
    const [Discount, setDiscount] = useState(0)
    const [topUp_type, settopUp_type] = useState('id code')
    const createPackageNow = (e) => {
        console.log(Diamond);
        console.log(Discount);
        console.log(topUp_type);

        axios.post('https://flash-shop-server.herokuapp.com/package/create', {
            //parameters
            diamond: Diamond,
            topUp_type: topUp_type,
            discount: Discount
        })
            .then((response) => {
                notification.msg("Package successfully added", "green", 2500);
                navigate('/admin/package/view');
            }, (error) => {
                console.log(error);
                notification.msg("Sorry, something went wrong", "red", 2500);
            });

        e.preventDefault();
    }
    return (
        <div>
            <h1 align='center'>Create Package</h1>
            <form onSubmit={createPackageNow}>
                <input onChange={(e) => { setDiamond(e.target.value) }} className='form control' placeholder='Enter diamond amount' required /><br />
                <select onChange={(e) => { settopUp_type(e.target.value) }} >
                    <option value='id code'>ID code</option>
                    <option value='id password'>ID password</option>
                </select>
                <br />
                <input onChange={(e) => { setDiscount(e.target.value) }} className='form control' placeholder='Enter discount' value='0' required /><br />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
