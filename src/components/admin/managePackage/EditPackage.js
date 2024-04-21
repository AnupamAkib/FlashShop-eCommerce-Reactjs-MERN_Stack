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
import { Link } from 'react-router-dom';
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
    //console.log(id)
    const [idCodeUSD, setidCodeUSD] = useState(0);
    const [idPasswordUSD, setidPasswordUSD] = useState(0);



    const notification = require('../../methods.js')

    const [Diamond, setDiamond] = useState("")
    const [Discount, setDiscount] = useState(0)
    const [topUp_type, settopUp_type] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [Loading, setLoading] = useState(true)

    const [PackagePrice, setPackagePrice] = useState(0);


    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);


    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'package/singlePackage', {
            //parameters
            _id: id
        })
            .then((response) => {
                let ar = response.data.result[0];
                console.log(ar);
                setDiamond(ar.title);
                setDiscount(parseInt(ar.discount));
                settopUp_type(ar.category);
                setProductDescription(ar.description);
                setProductPrice(ar.price);

                //useEffect(() => {
                axios.post(process.env.REACT_APP_BACKEND+'settings/all', {
                    //parameters
                })
                    .then((res) => {
                        //console.log(response.data.result[0].takeNewOrder)
                        setidCodeUSD(res.data.result[0].playerID_USD_Unit_per_hundredDiamond);
                        setidPasswordUSD(res.data.result[0].gameLogin_USD_Unit_per_hundredDiamond);
                        setLoading(false)
                    }, (error) => {
                        console.log(error);
                    });
                //}, [])

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
            axios.post(process.env.REACT_APP_BACKEND+'package/edit', {
                //parameters
                _id: id,
                title: Diamond,
                description : productDescription,
                price : productPrice,
                category: topUp_type,
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

    useEffect(() => {
        if(Discount > 0 && Discount < productPrice) setPackagePrice(parseInt(productPrice)-parseInt(Discount));
        else setPackagePrice(parseInt(productPrice));
    },[productPrice, Discount]);
    
    return (
        <>
            <Title title="Edit Product" />
            <div className='container'>

                <div className='container col-5'>

                    {Loading ?
                        <div className='hovered_loading'>
                            <CircularProgress /><br />Please Wait
                        </div>
                        : ""}
                    <form onSubmit={editPackageNow}>
                        <TextField value={Diamond} onChange={(e)=>setDiamond(e.target.value)} id="filled-basic" label="Product Title" variant="filled" type='text' fullWidth required />
                        <TextField value={productDescription} onChange={(e)=>setProductDescription(e.target.value)} id="filled-basic" label="Product Description" variant="filled" type='text' rows={5} fullWidth multiline required />
                        <TextField value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} id="filled-basic" label="Product Price" variant="filled" type='number' fullWidth required />
                        <FormControl variant='filled' fullWidth required>
                            <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                            <Select
                                value={topUp_type}
                                onChange={changeType}
                                label="Select Category"
                            >
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Gadgets">Gadgets</MenuItem>
                                <MenuItem value="Men">Men</MenuItem>
                                <MenuItem value="Women">Women</MenuItem>
                                <MenuItem value="Kids">Kids</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField onChange={(e)=>setDiscount(e.target.value)} id="filled-basic" label="Discount (in Taka)" variant="filled" type='number' value={Discount} fullWidth required />
                        <TextField id="filled-basic" label="Package Price" variant="filled" type='text' InputProps={{ readOnly: true }} value={PackagePrice + " BDT"} fullWidth />

                        <Button type='submit' size="large" variant="contained" fullWidth disabled={disabled}>{disabled ? "PLEASE WAIT" : "save changes"}</Button>
                    </form>
                </div><br /><br />
            </div></>
    )
}
