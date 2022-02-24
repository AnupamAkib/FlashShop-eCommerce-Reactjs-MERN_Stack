import React from 'react'
import AllPackageCard from './AllPackageCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../title';

export default function ViewPackage() {
    const navigate = useNavigate();
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
            <Title title="All Packages" />
            <AllPackageCard />
        </div>
    )
}
