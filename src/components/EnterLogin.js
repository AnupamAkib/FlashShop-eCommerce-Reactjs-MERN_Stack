import React from 'react'
import { useState } from 'react'
import { Button } from '@material-ui/core';

export default function EnterLogin(props) {
    console.log("aise")
    const [Name, setName] = useState(localStorage.getItem("name"));
    const [Phone, setPhone] = useState(localStorage.getItem("phone"));
    let idc, _name;
    const idCodeSetHandleChange = (e) => {
        idc = e.target.value;
    }
    const nameSetHandleChange = (e) => {
        _name = e.target.value;
    }
    const idCodeSetSubmit = () => {
        setPhone(idc);
        setName(_name);
        localStorage.setItem("phone", idc);
        localStorage.setItem("name", _name);
        window.location.reload()
    }
    return (
        <div className="container col-4 enter_id_code" align='center'>
            <form onSubmit={idCodeSetSubmit}>
                {props.quotes}<br />
                <br />

                <input onChange={nameSetHandleChange} type='text' placeholder='Enter Your Name' className='inputField' style={{ width: '250px' }} required /><br />
                <input onChange={idCodeSetHandleChange} type='number' placeholder='Enter Your Phone Number' className='inputField' style={{ width: '250px' }} required /><br />
                <Button type='submit' color="primary" variant="contained">
                    <font style={{ padding: '0px 60px 0px 60px', fontSize: 'large' }}>
                        Continue to Order
                    </font>
                </Button>
            </form>
        </div>
    )
}
