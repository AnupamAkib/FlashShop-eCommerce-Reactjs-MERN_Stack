import React from 'react'
import Title from './title'
import { useEffect } from 'react'

export default function AboutSite() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Title title='About This App' />
            <div className='container'>
                <div className='my_order_card'>
                    <b>Project Name: </b> FlashShop <br />
                    <b>Description: </b> E-Commerce <br />
                    <b>Project Type: </b> Web Application <br />
                    <b>Project Author: </b> --- <br />
                    <br />
                    <b>Technology Used: </b><br />

                    <div className='techbody'>
                        <u>Back-End:</u>
                        <ul>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>JavaScript</li>
                            <li>MongoDB</li>
                        </ul>

                        <u>Front-End:</u>
                        <ul>
                            <li>React.js</li>
                            <li>Material UI</li>
                            <li>Bootstrap</li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                        </ul>
                    </div>

                    <br /><br />
                    {/*}<b><u>Project Duration: </u></b>
                    <center>
                        <table width='100%'>
                            <tr align='center'>
                                <td>Started<br /><b>13 Feb, 2022</b></td>
                                <td>Finished<br /><b>26 Feb, 2022</b></td>
                            </tr>
                        </table>
                    </center>
    <hr />{*/}
                    Initial Prototype:<br />
                    <button className='btn btn-primary'><i class="fa fa-download"></i> Download</button>
                    <hr />
                    API Documentation:<br />
                    <button className='btn btn-primary'><i class="fa fa-download"></i> Download</button>
                    <br />
                </div>
            </div>
        </>
    )
}
