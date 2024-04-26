import React from 'react'

export default function DB_Card(props) {
    return (
        <center>
            <button className='db_card'>
                <font style={{ fontSize: '26px', fontWeight: 'bold' }}>{props.number}</font>
                <br />
                <font className='firstLetterUpper'>{props.name}</font>
            </button>
        </center>
    )
}
