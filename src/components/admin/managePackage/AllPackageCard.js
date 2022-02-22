import React from 'react'
import PackageCard from './PackageCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";

export default function AllPackageCard() {
    const navigate = useNavigate();
    const [AllPackage, setAllPackage] = useState([])
    const [Loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://flash-shop-server.herokuapp.com/package/allPackages', {
            //parameters
        })
            .then((response) => {
                setAllPackage(response.data.result)
                setLoading(false);
            }, (error) => {
                console.log(error);
            });
    }, [])

    const createPackageAction = () => {
        navigate("/admin/package/create")
    }

    let res = [];
    for (let i = 0; i < AllPackage.length; i++) {
        res.push(
            <ConfirmProvider><PackageCard
                id={AllPackage[i]._id}
                diamond={AllPackage[i].diamond}
                topUp_type={AllPackage[i].topUp_type}
                discount={AllPackage[i].discountAmount}
                regularPrice={AllPackage[i].regularPrice}
                discountPrice={AllPackage[i].discountPrice}
            /></ConfirmProvider>
        )
    }
    if (Loading) {
        return (
            <div align="center" style={{ paddingBottom: '40vh' }}>
                <br /><br /><br />
                <CircularProgress />
            </div>
        )
    }
    //res.reverse();
    return (
        <div className='container col-6'>
            {res}
            <button onClick={createPackageAction} className='createPackageButton'><i class="fa fa-plus"></i></button>
        </div>
    )
}
