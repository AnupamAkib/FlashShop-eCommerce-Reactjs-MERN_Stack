import React from 'react'
import { useState } from 'react'
import { Button } from '@material-ui/core';

export default function EnterLogin(props) {
    console.log("aise")
    const [Name, setName] = useState(localStorage.getItem("name"));
    const [IDCode, setIDCode] = useState(localStorage.getItem("id_code"));
    let idc, _name;
    const idCodeSetHandleChange = (e) => {
        idc = e.target.value;
    }
    const nameSetHandleChange = (e) => {
        _name = e.target.value;
    }
    const idCodeSetSubmit = () => {
        setIDCode(idc);
        setName(_name);
        localStorage.setItem("id_code", idc);
        localStorage.setItem("name", _name);
        window.location.reload()
    }
    return (
        <div className="container col-4 enter_id_code" align='center'>
            <form action="" onSubmit={idCodeSetSubmit}>
                {props.quotes}<br />
                <br />

                <input onChange={nameSetHandleChange} type='text' placeholder='আপনার নাম লিখুন' className='inputField' style={{ width: '250px' }} required /><br />
                <input onChange={idCodeSetHandleChange} type='number' placeholder='আপনার ID Code লিখুন' className='inputField' style={{ width: '250px' }} required /><br />
                <Button type='submit' color="primary" variant="contained">
                    <font style={{ padding: '0px 60px 0px 60px', fontSize: 'large' }}>
                        Continue
                    </font>
                </Button>
            </form>
        </div>
    )
}
