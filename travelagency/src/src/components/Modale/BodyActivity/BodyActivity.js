import React from 'react'

import './BodyActivity.css'

export default function BodyActivity({ activity }) {

    return (<>
        <div className='row mb-3 mx-3 d-flex align-items-center justify-content-center'>

            {
                activity.images.map((img, i) => {
                    return (
                        <div key={i} style={{ backgroundImage: 'url(' + img.image + ')' }} className="contentImages"></div>
                    )
                })
            }

        </div>
        <div className='row mb-3 mx-3'>
            <p>{activity.description}</p>
            <a href={"tel:" + activity.contact.phone}>{activity.contact.phone}</a>
        </div>
    </>)
}

