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
import Title from '../../title.js';

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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { id } = useParams();

    const notification = require('../../methods.js')

    const [Diamond, setDiamond] = useState("")
    const [Discount, setDiscount] = useState()
    const [topUp_type, settopUp_type] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [PackagePrice, setPackagePrice] = useState(0);

    useEffect(() => {
        axios.post('https://flash-shop-server.herokuapp.com/package/special/getAll', {
            //parameters
            _id: id
        })
            .then((response) => {
                let ar = response.data.result;
                for (let i = 0; i < ar.length; i++) {
                    if (ar[i]._id == id) {
                        setDiamond(ar[i].diamond);
                        setDiscount(ar[i].discount_amount);
                        settopUp_type(ar[i].topUp_type);
                        setPackagePrice(ar[i].price);
                        setLoading(false)
                    }
                }
            }, (error) => {
                console.log(error);
                notification.msg("Sorry, something went wrong", "red", 2500);
            });
    }, [])



    const editPackageNow = (e) => {
        if (PackagePrice == 0) {
            notification.msg("Invalid Information!", "red", 2500);
        }
        else {
            setDisabled(true)
            //edit request
            //console.log(Discount)
            axios.post('https://flash-shop-server.herokuapp.com/package/special/edit', {
                //parameters
                _id: id,
                diamond: Diamond,
                topUp_type: topUp_type,
                price: PackagePrice,
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

    const changeDiamond = (e) => {
        setDiamond(e.target.value);
    }
    const changeDiscount = (e) => {
        setDiscount(e.target.value);
    }
    const changeType = (e) => {
        settopUp_type(e.target.value);
    }
    const changePrice = (e) => {
        setPackagePrice(e.target.value);
    }

    return (
        <>
            <Title title="Edit Package" />
            <div className='container'>

                <div className='container col-5'>

                    {Loading ?
                        <div className='hovered_loading'>
                            <CircularProgress /><br />Please Wait
                        </div>
                        : ""}
                    <form onSubmit={editPackageNow}>
                        <TextField onChange={changeDiamond} id="filled-basic" label="Special Package Name" variant="filled" value={Diamond} fullWidth required />
                        <FormControl variant='filled' fullWidth >
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
                        <TextField onChange={changePrice} id="filled-basic" label="Package Price" variant="filled" type='number' value={PackagePrice} fullWidth required />

                        <TextField onChange={changeDiscount} id="filled-basic" label="Discount Amount (in Taka)" variant="filled" type='number' value={Discount} fullWidth focused required />

                        <Button type='submit' size="large" variant="contained" fullWidth disabled={disabled}>{disabled ? "PLEASE WAIT" : "Save Changes"}</Button>
                    </form>
                </div><br />
            </div></>
    )
}
