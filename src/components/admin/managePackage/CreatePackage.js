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
import { Link } from 'react-router-dom';
import Title from '../../title.js';

export default function CreatePackage() {
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

    const [idCodeUSD, setidCodeUSD] = useState(0);
    const [idPasswordUSD, setidPasswordUSD] = useState(0);

    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'settings/all', {
            //parameters
        })
            .then((res) => {
                //console.log(response.data.result[0].takeNewOrder)
                setidCodeUSD(res.data.result[0].playerID_USD_Unit_per_hundredDiamond);
                setidPasswordUSD(res.data.result[0].gameLogin_USD_Unit_per_hundredDiamond);
            }, (error) => {
                console.log(error);
            });
    }, [])

    const notification = require('../../methods.js')
    const [Diamond, setDiamond] = useState(0)
    const [Discount, setDiscount] = useState(0)
    const [topUp_type, settopUp_type] = useState('Gadgets')
    const [disabled, setDisabled] = useState(false)

    const [PackagePrice, setPackagePrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState(0);


    const createPackageNow = (e) => {
        if (parseInt(Discount) > parseInt(productPrice)) {
            notification.msg("Discount can't be greater than product price", "red", 2500);
        }
        else if (PackagePrice == 0) {
            notification.msg("Invalid Information!", "red", 2500);
        }
        else {
            setDisabled(true);
            //if(Discount)
            axios.post(process.env.REACT_APP_BACKEND+'package/create', {
                //parameters
                title: Diamond,
                description: productDescription,
                price: productPrice,
                category: topUp_type,
                discount: Discount
            })
                .then((response) => {
                    notification.msg("Package successfully added", "green", 2500);
                    navigate('/admin/package/view');
                }, (error) => {
                    setDisabled(false)
                    console.log(error);
                    notification.msg("Sorry, something went wrong", "red", 2500);
                });
        }

        e.preventDefault();
    }

    useEffect(() => {
        if(Discount > 0 && Discount < productPrice) setPackagePrice(parseInt(productPrice)-parseInt(Discount));
        else setPackagePrice(parseInt(productPrice));
    },[productPrice, Discount]);
   
    const changeType = (e) => {
        settopUp_type(e.target.value);
    }


    return (
        <>
            <Title title="Add New Product" />
            <div className='container'>
                <div className='container col-5'>

                    <form onSubmit={createPackageNow}>
                        <TextField onChange={(e)=>setDiamond(e.target.value)} id="filled-basic" label="Product Title" variant="filled" type='text' fullWidth required />
                        <TextField onChange={(e)=>setProductDescription(e.target.value)} id="filled-basic" label="Product Description" variant="filled" type='text' fullWidth required />
                        <TextField onChange={(e)=>setProductPrice(e.target.value)} id="filled-basic" label="Product Price" variant="filled" type='number' fullWidth required />
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
                        <TextField id="filled-basic" label="Package Price" variant="filled" type='text' InputProps={{ readOnly: true }} value={PackagePrice + " BDT"} fullWidth required />

                        <Button type='submit' size="large" variant="contained" fullWidth disabled={disabled}>{disabled ? "PLEASE WAIT" : "ADD PRODUCT"}</Button>
                    </form>
                    <div style={{ background: '#f0f0f0', padding: '15px', marginTop: '20px', color:"#b0b0b0" }}>
                        Enter all product details & then click 'ADD PRODUCT' to add the product to the system
                    </div>
                </div><br /><br />
            </div>
        </>
    )
}
