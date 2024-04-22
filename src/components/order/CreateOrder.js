import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import EnterLogin from '../EnterLogin.js'

export default function CreateOrder() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [AllPackage, setAllPackage] = useState([])
    const [paymentlogo, setPaymentLogo] = useState("bkash");
    const [loading, setloading] = useState(true);

    const [Name, setName] = useState(localStorage.getItem("name"));
    const [IDCode, setIDCode] = useState(localStorage.getItem("id_code"));
    const [LoginID, setLoginID] = useState("");
    const [LoginPass, setLoginPass] = useState("");
    const [Phone, setPhone] = useState("");
    const [PaymentNumber, setPaymentNumber] = useState("");
    const [Agree, setAgree] = useState(false);
    const [BtnDisabled, setBtnDisabled] = useState('')
    const [TotalOrder, setTotalOrder] = useState(0);

    const [quantity, setQuantity] = useState(1);
    const [shippingAddress, setShippingAddress] = useState("");
    const [totalPay, setTotalPay] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        //here 
        setTotalPay(quantity*price);
    }, quantity);

    const [newOrder, setnewOrder] = useState(true);
    //console.log(newOrder)

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND+'package/allPackages', {

        })
            .then((response) => {
                //setnewOrder(setting.getTakeNewOrder());
                axios.post(process.env.REACT_APP_BACKEND+'settings/all', {
                    //parameters
                })
                    .then((res) => {
                        //console.log(response.data.result[0].takeNewOrder)
                        //return response.data.result[0].takeNewOrder;
                        setnewOrder(res.data.result[0].takeNewOrder);
                        if (res.data.result[0].takeNewOrder == true) {
                            setloading(false)
                        }
                        else {
                            setnewOrder(false);
                        }

                    }, (error) => {
                        console.log(error);
                    });
                setAllPackage(response.data.result)

            }, (error) => {
                console.log(error);
            });
    }, [])
    //console.log(AllPackage)

    let title, description, discount=0, price=0, category;
    let found = false;
    for (let i = 0; i < AllPackage.length; i++) {
        if (AllPackage[i]._id == id) {
            found = true;
            title = AllPackage[i].title;
            description = AllPackage[i].description;
            price = AllPackage[i].price;
            discount = AllPackage[i].discount;
            category = AllPackage[i].category;
            //setTotalPay(AllPackage[i].price);
            break;
        }
    }

    let en2Bn = require('../methods.js');

    const changePaymentMethod = (e) => {
        setPaymentLogo(e.target.value);
    }

    const nameOnChange = (e) => {
        setName(e.target.value);
    }
    const paymentNumberOnChange = (e) => {
        setPaymentNumber(e.target.value);
    }
    const agreeOnChange = () => {
        setAgree(!Agree);
    }
    let toast = require('../methods.js');

    const formOnSubmit = (e) => {
        if (Phone.length < 11) {
            toast.msg("Invalid Phone Number", "red", 2500);
        }
        else if (!Agree) {
            toast.msg("Please read & agree the terms & conditions first.", "red", 4000);
        }
        else {
            setBtnDisabled('true');
            let dateTime = require('../methods.js');
            let JSON_data_req = {
                customer_name: Name,
                phone: Phone,
                title: title,
                price: price,
                category: category,
                discount: discount,
                paymentMethod: paymentlogo,
                transactionID: PaymentNumber,
                timeDate: dateTime.todaysDateTime(),
                orderStatus: "PENDING"
            }

            axios.post(process.env.REACT_APP_BACKEND+'order/placeOrder', JSON_data_req)
                .then((response) => {
                    toast.msg("Order successfully placed! You can see order status from 'My Order'", "green", 5000);
                    setBtnDisabled('');
                    localStorage.setItem("name", Name);
                    localStorage.setItem("phone", IDCode);
                    navigate('/myOrder');
                    //increase life-time order count
                    axios.post(process.env.REACT_APP_BACKEND+'dashboard/increaseOrder')
                        .then((re) => { }, (error) => { });

                }, (error) => {
                    setBtnDisabled('');
                    toast.msg("Sorry, something wrong", "red", 4000);
                    //console.log(error);
                });
        }

        e.preventDefault();
    }


    //if (!IDCode) {
        //return (//<>fu</>
          //  <EnterLogin quotes="ডায়ামন্ড কিনতে আপনার নাম ও গেমের ID Code টি লিখে 'CONTINUE' বাটনে টাচ/ক্লিক করুন। তারপর আপনি এই প্যাকেজ সম্পর্কে বিস্তারিত দেখতে পাবেন ও কিনতে পারবেন।" />
        //)
   // }

    if (!newOrder) {
        return (
            <div className='my_order_card' style={{ fontSize: '21px' }}>
                <h1>Temporarily Closed</h1>
                New order is temporarily closed. Please try again after few hours. Thanks for being with us!
            </div>
        )
    }

    if (!found && !loading) {
        return (
            <div align='center' style={{ padding: '20px', background: '#f0f0f0' }} className='container col-4'>
                <br />
                <h1>
                    Sorry, this product is not available
                </h1>
                <p>
                    Please check the link & try again. Or the product may be deleted by admin.
                </p>
                <b>Error Code: 404</b>
            </div>
        )
    }



    return (
        <div>
            <div className='createOrder_title'>
                {loading ?
                    <div className='hovered_loading'>
                        <CircularProgress /><br />Please Wait
                    </div>
                    : ""}
                
                            <div className="container" style={{padding:"12px"}}>
                                <font style={{ fontSize: '25px', fontWeight: 'bold' }}>{title}</font><br />
                                <font style={{ fontSize: '22px' }}>{discount>0? <font size="4"><s>{price} BDT </s></font> : ""} {price-discount} BDT</font>
                            </div>
            </div>

            <div className='container' style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div className='container col-6' style={{ background: '#f0f0f0', padding: '25px', boxShadow: '0 0 5px rgba(0,0,0,0.35)' }}>
                    <form onSubmit={formOnSubmit} action="">
                        <b>Category:</b><br />
                        <input type='text' value={category} className='inputField col-12 capitalize' readOnly /><br />


                        <b>Total Payable </b><br />
                        <input type='text' value={totalPay} className='inputField col-12' readOnly /><br />

                        <b>Quantity </b><br />
                        <input type='number' value={quantity} className='inputField' style={{width:"60%"}} readOnly/>
                        <button type="button" onClick={()=>setQuantity(quantity+1)} style={{width:"20%", padding:"5px", fontSize:"22px", fontWeight:"bold", border:"1px solid gray"}}>+</button>
                        <button type="button" onClick={()=>setQuantity((quantity-1)==0? 1 : quantity-1)} style={{width:"20%", padding:"5px", fontSize:"22px", fontWeight:"bold", border:"1px solid gray"}}>-</button>
                        <br />

                        <b>Your Name</b><br />
                        <input onChange={nameOnChange} type='text' placeholder='Enter Your Name' className='inputField col-12' value={Name} required /><br />

                        <b>Shipping Address</b><br />
                        <input onChange={(e)=>setShippingAddress(e.target.value)} type='text' placeholder='Enter Shipping Address' className='inputField col-12' required /><br />

                        <b>Your Phone Number: </b><br />
                        <input type='text' value={localStorage.getItem('phone')} placeholder='Enter Your Phone Number' className='inputField col-12' readOnly required /><br />

                        <b>Payment Information:</b><br />
                        <center><img src={"/images/" + paymentlogo + ".png"} width='120' /><br />
                            <div>
                                bKash: <b>01304160705</b><br />
                                Nagad: <b>01304160705</b><br />
                                Rocket: <b>01304160705</b><br />
                                <br />
                            </div>
                            <b>Enter the {paymentlogo} Transaction Number:</b><br />
                            <select style={{ padding: '12px', border: '1px solid gray', fontSize: 'large', borderRadius: '5px', outline: 'none' }} onChange={changePaymentMethod}>
                                <option value='bKash'>bKash</option>
                                <option value='Nagad'>Nagad</option>
                                <option value='Rocket'>Rocket</option>
                            </select>

                            <input onChange={paymentNumberOnChange} type='text' placeholder={'Enter ' + paymentlogo + ' Tnx ID'} className='inputField' style={{ width: '175px' }} required /><br />

                            <br />
                            <div class="checkbox" style={{ fontSize: 'large', marginBottom: '10px' }}>
                                <label><input onChange={agreeOnChange} type="checkbox" checked={Agree} /> I agree all the terms & conditions</label>
                            </div>
                            <Button type='submit' color="primary" variant="contained" disabled={BtnDisabled || loading}>
                                <font style={{ padding: '0px 50px 0px 50px', fontSize: 'large' }}>
                                    {loading ? "Wait..." : "place order"}
                                </font>
                            </Button>
                        </center>
                    </form>
                </div></div>
        </div >
    )


}
