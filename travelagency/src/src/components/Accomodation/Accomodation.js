import React from 'react';
import Gallery from '../Gallery/Gallery';
import Modale from '../Modale/Modale';
import BodyAccomodation from '../Modale/BodyAccomodation/BodyAccomodation'
import './Accomodation.css';

export default function Accomodation({ accomodation }) {
    // console.log(accomodation)

    const [modaleVisible, setVisible] = React.useState(false)
    const clickModale = () => {
        setVisible(!modaleVisible)
    }

    return (<>

        <div className="row">
            <div className="col d-flex">
                <Gallery images={accomodation.images}></Gallery>

                <div className="col ml-4 p-0">
                    <p className="normal-text font-weight-bold">{accomodation.name}</p>
                    <div className="d-flex mb-3">
                        {
                            accomodation.tags.map((t, i) => {
                                return (
                                    <div key={i} className="transfer-outline mr-2">
                                        <p className="tags-accomodation m-0 small-text color-blue">{t.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className="normal-text text-clamp m-0">
                        {accomodation.description}
                    </p>
                    <span className="color-blue cursor hover-underlined" onClick={clickModale}>Scopri di pi&ugrave;</span>
                </div>

            </div>

            {/* MODALE */}
            <Modale title={accomodation.name} clickModale={clickModale} visible={modaleVisible}>
                <BodyAccomodation accomodation={accomodation}></BodyAccomodation>
            </Modale>
        </div>

    </>)
}