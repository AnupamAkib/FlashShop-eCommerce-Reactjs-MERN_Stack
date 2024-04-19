import React from 'react'
import { useEffect, useState } from 'react';
import Title from './title';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function TermsConditions() {
    const [condition, setCondition] = useState("")
    const [loading, setloading] = useState(true)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'settings/all', {
            //parameters
        })
            .then((res) => {
                setCondition(res.data.result[0].rulesAndConditions);
                setloading(false)
            }, (error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <Title title="নিয়ম ও শর্তাবলী" />
            {loading ?
                <div className='hovered_loading'>
                    <CircularProgress /><br />অপেক্ষা করুন
                </div>
                : ""}
            <div className='container col-6'>
                <div dangerouslySetInnerHTML={{ __html: condition.replace(/(?:\r\n|\r|\n)/g, '<br>') }} className='my_order_card' />
            </div>
        </>
    )
}
