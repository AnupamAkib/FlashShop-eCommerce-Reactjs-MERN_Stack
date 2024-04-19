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
    const [TotalOrder, setTotalOrder] = useState(0)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [newOrder, setnewOrder] = useState(true);
    //console.log(newOrder)

    useEffect(() => {
        axios.post(process.env.REACT_APP_BACKEND+'package/special/getAll', {

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

    let diamond = "", discountAmount = 0, discountPrice = 0, topUp_type = "", regularPrice = 0;
    let found = false;
    for (let i = 0; i < AllPackage.length; i++) {
        if (AllPackage[i]._id == id) {
            found = true;
            diamond = AllPackage[i].diamond;
            discountAmount = AllPackage[i].discount_amount;
            regularPrice = AllPackage[i].price;
            topUp_type = AllPackage[i].topUp_type;
            discountPrice = regularPrice - discountAmount;
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
    const IDCodeOnChange = (e) => {
        setIDCode(e.target.value);
    }
    const loginIDOnChange = (e) => {
        setLoginID(e.target.value);
    }
    const loginPassOnChange = (e) => {
        setLoginPass(e.target.value);
    }
    const phoneOnChange = (e) => {
        setPhone(e.target.value);
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
            toast.msg("ভুল ফোন নাম্বার দিয়েছেন", "red", 2500);
        }
        else if (!Agree) {
            toast.msg("শর্তাবলী মেনে নিতে হবে", "red", 4000);
        }
        else {
            setBtnDisabled('true');
            let dateTime = require('../methods.js');
            let JSON_data_req = {
                customer_name: Name,
                phone: Phone,
                diamond: diamond,
                price: discountPrice,
                topUp_type: topUp_type,
                discount: discountAmount,
                playerID: IDCode,
                gameLoginID: LoginID,
                gameLoginPassword: LoginPass,
                paymentMethod: paymentlogo,
                paymentSenderNumber: PaymentNumber,
                timeDate: dateTime.todaysDateTime(),
                orderStatus: "PENDING"
            }

            axios.post(process.env.REACT_APP_BACKEND+'order/placeOrder', JSON_data_req)
                .then((response) => {
                    toast.msg("সফল হয়েছে। সব তথ্য ও পেমেন্ট ঠিক থাকলে আপনি অল্প কিছুক্ষণের মধ্যেই ডায়ামন্ড পেয়ে যাবেন। ধন্যবাদ", "green", 8000);
                    setBtnDisabled('');
                    localStorage.setItem("name", Name);
                    localStorage.setItem("id_code", IDCode);
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

    let discount = "(" + en2Bn.number(discountAmount) + " টাকা ছাঁড়ে)";

    if (!IDCode) {
        return (
            <EnterLogin quotes="ডায়ামন্ড কিনতে আপনার নাম ও গেমের ID Code টি লিখে 'CONTINUE' বাটনে টাচ/ক্লিক করুন। তারপর আপনি এই প্যাকেজ সম্পর্কে বিস্তারিত দেখতে পাবেন ও কিনতে পারবেন।" />
        )
    }

    if (!newOrder) {
        return (
            <div className='my_order_card' style={{ fontSize: '21px' }}>
                <h1>Temporarily Closed</h1>
                নতুন অর্ডার নেওয়া সাময়িকভাবে বন্ধ আছে। কিছুক্ষণ পর আবার চেষ্টা করুন।
                পাশে থাকার জন্য ধন্যবাদ :)
            </div>
        )
    }

    if (!found && !loading) {
        return (
            <div align='center' style={{ padding: '20px', background: '#f0f0f0' }} className='container col-4'>
                <br />
                <h1>
                    দুঃখিত, এই প্যাকেজটি পাওয়া যায়নি
                </h1>
                <p>
                    হয়ত আপনি ভুল ঠিকানায় প্রবেশ করেছেন অথবা প্যাকেজটি অ্যাডমিন ডিলিট করে দিয়েছেন।
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
                        <CircularProgress /><br />অপেক্ষা করুন
                    </div>
                    : ""}
                <table className='container col-6' border='0' cellpadding={10}>
                    <tr>
                        <td width='10px'>
                            <div>
                                <img src='/images/diamond.png' width='60' />
                            </div>

                        </td>
                        <td>
                            <div>
                                <font style={{ fontSize: '25px', fontWeight: 'bold' }}>{diamond}</font><br />
                                <font style={{ fontSize: '22px' }}>{regularPrice != discountPrice ? <font color='#dadada'><s>{en2Bn.number(regularPrice)} টাকা</s></font> : ""} {en2Bn.number(discountPrice)} টাকা</font>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div className='container' style={{ marginTop: '15px', marginBottom: '15px' }}>
                <div className='container col-6' style={{ background: '#f0f0f0', padding: '25px', boxShadow: '0 0 5px rgba(0,0,0,0.35)' }}>
                    <form onSubmit={formOnSubmit} action="">
                        <b>Top Up Type:</b><br />
                        <input type='text' value={topUp_type} className='inputField col-12 capitalize' readOnly /><br />

                        <b>প্যাকেজঃ</b><br />
                        <input type='text' value={diamond} className='inputField col-12' readOnly /><br />

                        <b>মূল্যঃ </b><font color='red'>{discountAmount != "0" ? discount : ""}</font><br />
                        <input type='text' value={en2Bn.number(discountPrice) + " টাকা"} className='inputField col-12' readOnly /><br />

                        <b>আপনার নামঃ</b><br />
                        <input onChange={nameOnChange} type='text' placeholder='Enter Your Name' className='inputField col-12' value={Name} required /><br />

                        <b>ID Code (গেমের প্লেয়ার আইডি):</b><br />
                        <input onChange={IDCodeOnChange} type='number' placeholder='Enter Player ID' className='inputField col-12' value={IDCode} readOnly /><br />

                        <b>Email/Phone/Username:</b><br />
                        (ID Code এর জন্য না দিলেও চলবে)<br />
                        <input onChange={loginIDOnChange} type='text' placeholder='Enter Game Login Email/Username' className='inputField col-12' required={topUp_type == "id password" ? 'true' : ''} /><br />

                        <b>Password:</b><br />
                        (ID Code এর জন্য না দিলেও চলবে)<br />
                        <input onChange={loginPassOnChange} type='text' placeholder='Enter Login Password' className='inputField col-12' required={topUp_type == "id password" ? 'true' : ''} /><br />

                        <b>আপনার ফোন নাম্বারঃ </b><br />
                        <input onChange={phoneOnChange} type='text' placeholder='Enter Your Phone Number' className='inputField col-12' required /><br />

                        <b>Payment Information:</b><br />
                        <center><img src={"/images/" + paymentlogo + ".png"} width='120' /><br />
                            <div>
                                বিকাশ করুনঃ <b>01770246754</b><br />
                                নগদ করুনঃ <b>01309094712</b><br />
                                <br />
                            </div>
                            <b>আপনি যে নাম্বার থেকে {paymentlogo} করেছেনঃ</b><br />
                            <select style={{ padding: '12px', border: '1px solid gray', fontSize: 'large', borderRadius: '5px', outline: 'none' }} onChange={changePaymentMethod}>
                                <option value='bKash'>বিকাশ</option>
                                <option value='Nagad'>নগদ</option>
                                <option value='Rocket'>রকেট</option>
                            </select>

                            <input onChange={paymentNumberOnChange} type='number' placeholder={'Enter ' + paymentlogo + ' Number'} className='inputField' style={{ width: '175px' }} required /><br />

                            <br />
                            <div class="checkbox" style={{ fontSize: 'large', marginBottom: '10px' }}>
                                <label><input onChange={agreeOnChange} type="checkbox" checked={Agree} /> আমি সকল শর্তাবলী মেনে নিচ্ছি</label>
                            </div>
                            <Button type='submit' color="primary" variant="contained" disabled={BtnDisabled || loading}>
                                <font style={{ padding: '0px 50px 0px 50px', fontSize: 'large' }}>
                                    {loading ? "অপেক্ষা..." : "সাবমিট করুন"}
                                </font>
                            </Button>
                        </center>
                    </form>
                </div></div>
        </div >
    )


}
