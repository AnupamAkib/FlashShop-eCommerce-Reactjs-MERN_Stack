import React from 'react'

export default function PackageCard(props) {
    let diamond = props.diamond;
    let topUp_type = props.topUp_type;
    let discount = props.discount;
    let id = props.id
    return (
        <div className='my_order_card'>
            <b>Diamond: </b>{diamond}<br />
            <b>topUp_type: </b>{topUp_type}<br />
            <b>discount: </b>{discount}<br />
            <a href='#'>Edit</a> <a href='#'>Delete</a>
        </div>
    )
}
