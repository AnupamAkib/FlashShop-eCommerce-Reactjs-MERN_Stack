import React from 'react'
import AllPackageCard from './AllPackageCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewPackage() {
    const navigate = useNavigate();
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
            <h1 align='center'>All Packages</h1>
            <AllPackageCard />
        </div>
    )
}
