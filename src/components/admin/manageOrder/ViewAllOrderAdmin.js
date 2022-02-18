import React from 'react'
import Card from './Card'
import AllOrderCard from './allOrderCard.js'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';

export default function ViewAllOrderAdmin() {
    const [searchStatus, setsearchStatus] = useState(localStorage.getItem("searchedStatus") ? localStorage.getItem("searchedStatus") : "ALL")
    const changeSearchStatus = (e) => {
        //setsearchStatus(e.target.value);
        localStorage.setItem("searchedStatus", e.target.value)
        window.location.reload();
        //console.log(e.target.value)
    }
    return (
        <div>
            <div className='container col-6'>
                <br /><h1 align='center'>All Orders</h1>
                <div className='container col-8' style={{ marginBottom: '20px' }}>
                    <center>
                        <FormControl variant='filled' fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Search by Status</InputLabel>
                            <Select
                                value={searchStatus}
                                onChange={changeSearchStatus}
                                label="Search by Status"
                            >
                                <MenuItem value="ALL">ALL</MenuItem>
                                <MenuItem value="PENDING">PENDING</MenuItem>
                                <MenuItem value="RECEIVED">RECEIVED</MenuItem>
                                <MenuItem value="REJECTED">REJECTED</MenuItem>
                                <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                            </Select>
                        </FormControl>
                    </center>
                </div>
                <AllOrderCard status={searchStatus} />
            </div>
        </div>
    )
}

/*


<Card
                _id="620fe5b6b76ee52b8540860e"
                customer_name="mir akib"
                phone="01458759631"
                diamond="400"
                price="340"
                topUp_type="id code"
                discount="5"
                playerID="452454212121"
                gameLoginID="mirakib25@gmail.com"
                gameLoginPassword="akib007"
                paymentMethod="bkash"
                paymentSenderNumber="01777985263"
                timeDate="16 Feb 2021, 23:45"
                orderStatus="PENDING"
            />
*/