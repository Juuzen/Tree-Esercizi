import React, { useContext } from 'react'

import MyContext from '../../MyContext'

import './Footer.css'

export default function Footer() {
    const datiAgenzia = useContext(MyContext)

    return (
        <>
            <div className="container-fluid">
                <div className="row" id="footer-content">
                    <div className="container my-5">
                        <div className="row p-4">
                            <div className="col-12 col-md-10 offset-md-1">
                                <p className="normal-text text-white m-0">{datiAgenzia.agency.name}  |  Licenza n° {datiAgenzia.agency.licenseNumber}</p>
                                <p className="normal-text text-white m-0"> {datiAgenzia.agency.contact.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
