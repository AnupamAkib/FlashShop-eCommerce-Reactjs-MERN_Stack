import React from 'react'

export default function Title(props) {
    let title = props.title;
    return (
        <div className='page_title_box'>
            <h1 align='center'>{title}</h1>
        </div>
    )
}
