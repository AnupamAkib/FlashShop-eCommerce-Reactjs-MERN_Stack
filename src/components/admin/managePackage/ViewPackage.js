import React from 'react'
import AllPackageCard from './AllPackageCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Title from '../../title';

export default function ViewPackage() {
    const navigate = useNavigate();
    const [Type, setType] = useState("All")
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const notification = require('../../methods');
    useEffect(() => {
        let auth = require('.././authorization.js');
        //console.log(auth.checkAdmin())
        if (auth.checkAdmin() == false) {
            notification.msg("You must login first", "red", 2500)
            navigate('/admin')
        }
    }, [])
    return (
        <div>
            <Title title="All Products" />

            <div className='container'>
                <div className='container col-6'>
                    <FormControl variant='filled' fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                        <Select
                            value={Type}
                            onChange={(e) => { setType(e.target.value) }}
                            label="Select Category"
                        >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Technology">Technology</MenuItem>
                                <MenuItem value="Gadgets">Gadgets</MenuItem>
                                <MenuItem value="Men">Men</MenuItem>
                                <MenuItem value="Women">Women</MenuItem>
                                <MenuItem value="Kids">Kids</MenuItem>
                                <MenuItem value="Others">Others</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
            </div>

            <AllPackageCard type={Type} />
        </div>
    )
}
