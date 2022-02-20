import React, { useState } from 'react'
import Package from './package.js'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function WholePackage() {
    const [Type, setType] = useState("all")
    const selectOnChange = (e) => {
        let topUp_type = e.target.value;
        console.log(topUp_type);
        setType(topUp_type)
    }
    return (
        <div className='container col-6'>
            <div align='center' style={{ marginTop: '15px' }}>
                <select onChange={selectOnChange} className='selectTopUpType col-6'>
                    <option value="all">All</option>
                    <option value="id code">ID Code</option>
                    <option value="id password">ID Password</option>
                </select>
            </div>
            <Package topUp_type={Type} />
        </div>
    )
}
