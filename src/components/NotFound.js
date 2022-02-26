import React from 'react'
import Title from './title'

export default function NotFound() {
    return (
        <>
            <Title title='404' />
            <div className='container'>
                <div className='my_order_card'>
                    <h1 align='center'>:(</h1>
                    <h1 align='center'>Not Found</h1>
                    Your requested URL has not found in our system. Please check your URL and try again
                </div>
            </div>
        </>
    )
}
