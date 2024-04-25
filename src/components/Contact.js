import React from 'react'
import { useEffect } from 'react'
import Title from './title'

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <Title title='Contacts' />
            <div className='container'>
                <div className='my_order_card'>
                    <b>Phone: </b>+8801xxxxxx<br />
                    <b>Email: </b>email@gmail.com<br />
                    <b>Office: </b>Rangamati, Bangladesh<br />
                    <br />
                    <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="300" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58916.745361066845!2d92.13193511524024!3d22.64272808685512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3752b5a7b4c418f9%3A0xa63c343bd4a12112!2sRangamati!5e0!3m2!1sen!2sbd!4v1714033109587!5m2!1sen!2sbd" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org"></a></div></div>
                </div>
            </div>
        </div>
    )
}
