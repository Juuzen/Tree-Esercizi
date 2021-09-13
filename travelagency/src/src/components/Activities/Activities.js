import React, { useState } from 'react';

import Modale from '../Modale/Modale'
import BodyActivity from '../Modale/BodyActivity/BodyActivity'

import './Activities.css'

export default function Activities({ activity }) {
    const [modaleVisible, setVisible] = useState(false)
    const clickModale = () => {
        setVisible(!modaleVisible)
    }
    return (<>
        <div className="media my-4 d-flex align-items-center ">

            <div className='preview' style={{ backgroundImage: `url(${activity.images[0].image})` }}></div>

            <div className="media-body ml-4 align-items-center">

                <h5 className='step-tour font-weight-bold'>{activity.name}</h5>
                <p>{activity.description} <span className="color-blue cursor hover-underlined" onClick={clickModale}>Scopri di pi&ugrave;</span></p>

            </div>
        </div>

        {/* MODALE */}
        <Modale title={activity.name} clickModale={clickModale} visible={modaleVisible}>
            <BodyActivity activity={activity}></BodyActivity>
        </Modale>
    </>)

}