import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function EditPackage() {
    const navigate = useNavigate();
    useEffect(() => {
        let auth = require('.././authorization.js');
        //console.log(auth.checkAdmin())
        if (auth.checkAdmin() == false) {
            notification.msg("You must login first", "red", 2500)
            navigate('/admin')
        }
    }, [])

    const { id } = useParams();
    //console.log(id)
    const settings = require('../.././settings.js');
    settings.fetch()
    let idCodeUSD = settings.getUSD_idcode();
    let idPasswordUSD = settings.getUSD_idpassword();

    const notification = require('../../methods.js')

    const [Diamond, setDiamond] = useState()
    const [Discount, setDiscount] = useState()
    const [topUp_type, settopUp_type] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [Loading, setLoading] = useState(true)

    const [PackagePrice, setPackagePrice] = useState(0);

    useEffect(() => {
        axios.post('https://flash-shop-server.herokuapp.com/package/singlePackage', {
            //parameters
            _id: id
        })
            .then((response) => {
                let ar = response.data.result[0];
                //console.log(ar)
                setDiamond(parseInt(ar.diamond));
                setDiscount(parseInt(ar.discount));
                settopUp_type(ar.topUp_type);
                calculatePrice(ar.diamond, ar.discount, ar.topUp_type)
                setLoading(false)
            }, (error) => {
                console.log(error);
                notification.msg("Sorry, something went wrong", "red", 2500);
            });
    }, [])



    const editPackageNow = (e) => {
        if (parseInt(Diamond) < 50) {
            notification.msg("Diamond amount should be greater than 50", "red", 2500);
        }
        else if (parseInt(Discount) > parseInt(Diamond)) {
            notification.msg("Discount can't be greater than Diamond amount", "red", 2500);
        }
        else if (PackagePrice == 0) {
            notification.msg("Invalid Information!", "red", 2500);
        }
        else {
            setDisabled(true)
            //edit request
            axios.post('https://flash-shop-server.herokuapp.com/package/edit', {
                //parameters
                _id: id,
                diamond: Diamond,
                topUp_type: topUp_type,
                discount: Discount
            })
                .then((response) => {
                    notification.msg("Edit successful", "green", 2500);
                    navigate('/admin/package/view');
                }, (error) => {
                    setDisabled(false)
                    console.log(error);
                    notification.msg("Sorry, something went wrong", "red", 2500);
                });
        }

        e.preventDefault();
    }

    const calculatePrice = (dmnd, disc, tt) => {
        let price = 0;
        price = parseInt(dmnd) / 100;
        if (tt == 'id code') {
            price *= idCodeUSD;
        }
        else {
            price *= idPasswordUSD;
        }
        price = Math.floor(price);
        price -= disc;
        setPackagePrice(Math.max(price, 0))
    }

    const changeDiamond = (e) => {
        setDiamond(e.target.value);
        calculatePrice(e.target.value, Discount, topUp_type);
    }
    const changeDiscount = (e) => {
        setDiscount(e.target.value);
        calculatePrice(Diamond, e.target.value, topUp_type);
    }
    const changeType = (e) => {
        settopUp_type(e.target.value);
        calculatePrice(Diamond, Discount, e.target.value);
    }

    return (
        <div className='container'>
            <h1 align='center'>Edit Package</h1>
            <div className='container col-5'>

                {Loading ? <center><br /><br /><br /><br />
                    <CircularProgress /><br />Please Wait<br /><br /><br /><br /><br /></center> :
                    <form onSubmit={editPackageNow}>
                        <TextField onChange={changeDiamond} id="filled-basic" label="Diamond Amount" variant="filled" type='number' value={Diamond} focused fullWidth required />
                        <FormControl variant='filled' fullWidth focused>
                            <InputLabel id="demo-simple-select-helper-label">Select Top Up Type</InputLabel>
                            <Select
                                value={topUp_type}
                                onChange={changeType}
                                label="TopUp Type"
                            >
                                <MenuItem value="id code">ID Code</MenuItem>
                                <MenuItem value="id password">ID Password</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField onChange={changeDiscount} id="filled-basic" label="Discount (in Taka)" variant="filled" type='number' value={Discount} focused fullWidth required />
                        <TextField id="filled-basic" label="Package Price" variant="filled" type='text' InputProps={{ readOnly: true }} value={PackagePrice + " BDT"} fullWidth required />

                        <Button type='submit' size="large" variant="contained" fullWidth disabled={disabled}>{disabled ? "PLEASE WAIT" : "Save Changes"}</Button>
                    </form>}

                <div style={{ background: '#dedede', padding: '15px', marginTop: '20px' }}>
                    <font style={{ fontSize: '19px', fontWeight: 'bold' }}>Unit Price / 100 Diamonds</font><br />
                    <ul>
                        <li>ID Code : {idCodeUSD} USD</li>
                        <li>ID Password : {idPasswordUSD} USD</li>
                    </ul>
                    <a href='#'>Change Unit Price</a>
                </div>
            </div><br /><br />
        </div>
    )
}
