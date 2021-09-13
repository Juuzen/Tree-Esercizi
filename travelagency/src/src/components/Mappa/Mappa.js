import React from 'react'
import Summary from '../Summary/Summary'
import './Mappa.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default function Mappa({ tappe }) {

    let avarageLat = 0
    let avarageLong = 0
    let sommaLat = 0;
    let sommaLong = 0

    tappe.forEach(tappa => {
        sommaLat += parseFloat(tappa.latitude)
        sommaLong += parseFloat(tappa.longitude)
    });

    avarageLat = sommaLat / tappe.length
    avarageLong = sommaLong / tappe.length

    return (<>
        <div id="mappa" className="container mt-5 p-0">
            <div className="row">
                <div className="col-12">
                    <Map center={[avarageLat, avarageLong]} zoom={8} zoomControl={false} doubleClickZoom={false} dragging={false} scrollWheelZoom={false} zoomSnap={false} zoomDelta={false} touchZoom={false}>
                        {/* Serve a prendere i tile (immagini della mappa) da open streetmap */}
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {
                            tappe.map((tappa, i) => {
                                return (
                                    <Marker key={i} position={[tappa.latitude, tappa.longitude]}>
                                        <Popup>
                                            <h6>{tappa.placeName}</h6>
                                        </Popup>
                                    </Marker>
                                )
                            })
                        }

                    </Map>
                    <Summary tappe={tappe}></Summary>
                </div>
            </div>
        </div>
    </>)
}

