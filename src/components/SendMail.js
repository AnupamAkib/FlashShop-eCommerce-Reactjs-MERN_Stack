import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios';


export default function SendMail() {
    const [To, setTo] = useState("");
    const [Subject, setSubject] = useState("");
    const [Msg, setMsg] = useState("");
    const [loading, setloading] = useState(false);

    const formSubmit = (e) =>{
        e.preventDefault();
        console.log(To);
        console.log(Subject);
        console.log(Msg);

        setloading(true);

        axios.post('https://flash-server.onrender.com/library/send_mail', {
            //parameters
            sendTo : To,
            subject : Subject,
            emailBody : Msg
        })
            .then((response) => {
                //done
                console.log('success')
                alert("Email sent!");
                setloading(false);
            }, (error) => {
                console.log(error);
            });

    }

    return (
        <div className='container'>
            <br/>
            <h1 align='center'>NodeMailer Check</h1>
            <form onSubmit={formSubmit}>
                <input value={To} onChange={(e)=>setTo(e.target.value)} className='form-control' placeholder='To' required/>
                <input value={Subject} onChange={(e)=>setSubject(e.target.value)} className='form-control' placeholder='Subject' required/>
                <textarea rows="5" value={Msg} onChange={(e)=>setMsg(e.target.value)} className='form-control' placeholder='Email Body' required></textarea>
                <button type='submit' className='btn btn-primary btn-lg' style={{width:'100%'}} disabled={loading}>Send Email</button>
            </form>
            {loading?
            <div class="d-flex justify-content-center">
                <br/><br/>
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
            : ""}
        </div>
    )
}
