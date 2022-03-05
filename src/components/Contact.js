import React from 'react'
import { useEffect } from 'react'
import Title from './title'

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <Title title='যোগাযোগ' />
            <div className='container'>
                <div className='my_order_card'>
                    <b>ফোনঃ </b>+8801309094712<br />
                    <b>ইমেইলঃ </b>golposadid02@gmail.com<br />
                    <b>অফিসঃ </b>বসুন্ধরা লেন, পশ্চিম কাজিপাড়া, ঢাকা<br />
                    <b>ফেসবুক: </b>
                    <a href='https://www.facebook.com/Flashytbd/' target='_blank'>https://www.facebook.com/Flashytbd/</a>
                    <br /><br />
                    <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=west%20kazipara&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org"></a></div></div>
                </div>
            </div>
        </div>
    )
}
