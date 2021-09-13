import React from 'react'

import Timeline from '../Timeline/Timeline'
import DayIntro from '../DayIntro/DayIntro'
import Activities from '../Activities/Activities'
import Accomodation from '../Accomodation/Accomodation'
import Transportion from '../Transport/Transport'

import './Day.css'

export default function Day({ dati, accomodation }) {

    // console.log(dati.transports)
    let componentsArray = []

    //Titolo della giornata
    if (dati.name !== "") componentsArray.push(<h2 className='color-orange' key='title'>{dati.name}</h2>)

    //Componente copertina del giorno + descrizione
    if (dati.description !== "") {
        if (dati.images.length > 0) {
            componentsArray.push(<DayIntro key={'intro' + dati.dayDate} img={dati.images} description={dati.description}></DayIntro>)
        } else {
            componentsArray.push(<DayIntro key={'intro' + dati.dayDate} description={dati.description}></DayIntro>)
        }
    }

    //Componenti per le attività (se presenti)
    if (dati.activities.length > 0) {
        dati.activities.map((act, i) => {
            componentsArray.push(<Activities key={'act' + act.id} activity={act}></Activities>)
            return ''
        })
    }

    //Componenti per i trasporti (se presenti)
    if (dati.transports.length > 0) {
        dati.transports.map((tra, i) => {
            componentsArray.push(<Transportion key={'trans' + tra.id} transport={dati.transports[0]}></Transportion>)
            return ''
        })
    }

    //Componenti per gli hotel (se presenti)
    if (accomodation) {
        componentsArray.push(<h4 key={Math.random()} className='accomodation-reminder'> Ricorda che pernotti al <span>{accomodation}</span></h4>)
    } else {
        if (dati.accomodations.length > 0) {
            dati.accomodations.map((acc, i) => {
                componentsArray.push(<Accomodation key={'accom' + acc.id} accomodation={acc}></Accomodation>)
                return ''
            })
        }
    }

    //Return della lista dei componenti presenti in una giornata
    return (<div className="mt-4 d-flex">
        <Timeline dati={dati} />
        <div>
            {componentsArray}
        </div>
    </div>)

}