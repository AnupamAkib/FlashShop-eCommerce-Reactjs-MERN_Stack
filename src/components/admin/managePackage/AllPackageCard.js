import React from 'react'
import PackageCard from './PackageCard'
import SpPackageCard from './SpPackageCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";

export default function AllPackageCard(props) {
    const navigate = useNavigate();
    let type = props.type;
    const [AllPackage, setAllPackage] = useState([])
    const [AllSpPackage, setAllSpPackage] = useState([])
    const [Loading, setLoading] = useState(true)
    const [LoadingSp, setLoadingSp] = useState(true)
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND+'package/allPackages', {
            //parameters
        })
            .then((response) => {
                setAllPackage(response.data.result)
                setLoading(false);
            }, (error) => {
                console.log(error);
            });
    }, [])
    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'package/special/getAll', {
            //parameters
        })
            .then((response) => {
                setAllSpPackage(response.data.result)
                setLoadingSp(false);
                //console.log(response.data.result)
            }, (error) => {
                console.log(error);
            });
    }, [])

    const createPackageAction = () => {
        navigate("/admin/package/create")
    }

    let res = [];
    for (let i = 0; i < AllPackage.length; i++) {
        if(type == "All"){
            res.push(
                <ConfirmProvider><PackageCard
                    id={AllPackage[i]._id}
                    title={AllPackage[i].title}
                    description={AllPackage[i].description}
                    price={AllPackage[i].price}
                    category={AllPackage[i].category}
                    discount={AllPackage[i].discount}
                /></ConfirmProvider>
            );
        }
        else if(AllPackage[i].category == type){
            res.push(
                <ConfirmProvider><PackageCard
                    id={AllPackage[i]._id}
                    title={AllPackage[i].title}
                    description={AllPackage[i].description}
                    price={AllPackage[i].price}
                    category={AllPackage[i].category}
                    discount={AllPackage[i].discount}
                /></ConfirmProvider>
            );
        }
    }
    /*if (type == "Special") {
        for (let i = 0; i < AllSpPackage.length; i++) {
            res.push(
                <ConfirmProvider><SpPackageCard
                    id={AllSpPackage[i]._id}
                    diamond={AllSpPackage[i].diamond}
                    topUp_type={AllSpPackage[i].topUp_type}
                    discount={AllSpPackage[i].discount_amount}
                    regularPrice={AllSpPackage[i].price}
                    discountPrice={AllSpPackage[i].price - AllSpPackage[i].discount_amount}
                /></ConfirmProvider>
            )
        }
    }
    else {
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
    }*/


    if (Loading || LoadingSp) {
        return (
            <div align="center" style={{ paddingBottom: '30vh' }}>
                <br /><br /><br />
                <CircularProgress /><br />Please Wait
            </div>
        )
    }
    //res.reverse();
    return (
        <div className='container col-6'>
            {res.length ? res : <h1 align='center'><br />Nothing Found<br /><br /><br /></h1>}
            <button onClick={createPackageAction} className='createPackageButton'><i class="fa fa-plus"></i></button>
        </div>
    )
}
