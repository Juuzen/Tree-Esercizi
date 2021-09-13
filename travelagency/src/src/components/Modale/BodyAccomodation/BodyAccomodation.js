import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import './BodyAccomodation.css'

export default function BodyAccomodation({ accomodation }) {
    let stars = {
        '5_Luxury': Array(5).fill(''),
        '4': Array(4).fill('')

    }
    // console.log(accomodation)

    return (
        <>
            <div className="row">
                <div className="col-12 d-flex">
                    <p className="normal-text mr-4">{accomodation.typology}</p>
                    {
                        stars[accomodation.stars].map((ele, i) => {
                            return (
                                <FontAwesomeIcon className="mx-2" key={i} icon={faStar}></FontAwesomeIcon>
                            )
                        })
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex">
                    {
                        accomodation.images.map((img, i) => {
                            return (
                                <div key={i} style={{ backgroundImage: 'url(' + img.image + ')' }} className="contentImageDialog"></div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="normal-text">{accomodation.description}</p>
                    <p className="normal-text">{accomodation.descriptionRestaurant}</p>
                    <p className="normal-text">{accomodation.descriptionRooms}</p>
                    <p className="normal-text">{accomodation.descriptionServices}</p>
                    <a href={'http://' + accomodation.contact.email} className="normal-text">{accomodation.contact.email}</a>
                </div>
            </div>

        </>
    )
}