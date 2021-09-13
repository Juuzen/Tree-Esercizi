import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Day from '../Day/Day'

import './Accordion.css'

export default function Accordion(props) {

    const [opened, setOpened] = useState(false)

    const toggleAccordion = () => {
        setOpened(!opened)
    }

    const elaboraData = (inizio, fine) => {
        const nomiMesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        const dateOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }

        if (inizio.getFullYear() === fine.getFullYear()) {
            if (inizio.getMonth() === fine.getMonth()) {
                //Anno uguale, mese uguale
                return ('dal ' + inizio.getDate() + ' al ' + fine.getDate() + ' ' + nomiMesi[fine.getMonth()])
            } else {
                //Anno uguale, mese diverso
                return ('dal ' + inizio.getDate() + ' ' + nomiMesi[inizio.getMonth()] + ' al ' + fine.getDate() + ' ' + nomiMesi[fine.getMonth()])
            }
        } else {
            //Anno diverso
            return ('dal ' + inizio.toLocaleDateString('it-IT', dateOptions) + + ' al ' + fine.toLocaleDateString('it-IT', dateOptions))
        }
    }

    //Se props.tappa è presente, render dell'accordion di una tappa (con giornate all'interno)
    if (props.tipo === 'tappa') {

        const dataInizio = new Date(props.tappa.days[0].dayDate)
        let testoData = ''

        //Calcolo inizio e fine data delle tappe
        if (props.tappa.days.length > 0) {
            const dataFine = new Date(props.tappa.days[props.tappa.days.length - 1].dayDate)
            testoData = elaboraData(dataInizio, dataFine)
        } else {
            testoData = dataInizio.toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
            })
        }

        let accomodationPrecedente = undefined;

        // let notti = 0;
        // //Calcolo durata accomodation
        // if (props.tappa.days.length > 0) {
        //     props.tappa.days.forEach((day, index) => {

        //         if (day.accomodations.length > 0) {
        //             const nomeAccomodation = day.accomodations[0].name;

        //             if (nomeAccomodation === accomodationPrecedente) {
        //                 notti++;
        //             } else {
        //                 accomodationPrecedente = nomeAccomodation;
        //                 notti = 1;
        //             }

        //         } else {
        //             notti = 0;
        //            //Giorni totali = 1
        //         }
        //     })
        // }

        // accomodationPrecedente = undefined;

        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0">{props.tappa.placeName.toUpperCase()} <span className="date-text ml-3">{testoData} </span></p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className="body-props">
                                {props.tappa.days.map((day, index) => {
                                    //If accomodations successive uguali o mancante
                                    if (day.accomodations.length > 0) {
                                        const nomeAccomodation = day.accomodations[0].name;
                                        if (nomeAccomodation === accomodationPrecedente) {
                                            return <Day key={index} dati={day} accomodation={accomodationPrecedente}></Day>
                                        } else {
                                            accomodationPrecedente = nomeAccomodation;
                                            return <Day key={index} dati={day}></Day>
                                        }
                                    } else {
                                        return <Day key={index} dati={day}></Day>
                                    }
                                })}
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }
    //Accordion info - Tariffe
    if (props.tipo === 'tariffa') {
        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0 accordion-info">TARIFFE</p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className='mt-4 mb-5'>
                                <div className="col-10 offset-1">
                                    <p className="mb-0 semi-bold">Prezzo a persona</p>
                                    <p className="title color-orange">{((props.partecipants[0].price)).toFixed(2) + ' €'}</p>

                                    <hr />
                                    {
                                        props.partecipants.map((partecipant, i) => {
                                            return <div key={"partec" + i} className='d-flex my-2'><span className='semi-bold'>{'Persona ' + (i + 1)}</span><span className="ml-auto color-grey font-weight-bold">{(partecipant.price).toFixed(2) + '€'}</span></div>
                                        })
                                    }
                                    <hr />
                                    <div className="text-right">
                                        <p className="mb-0 font-weight-bold">TOTALE</p>
                                        <p className="title color-orange">{((props.priceTotal) / 100).toFixed(2) + '€'}</p>
                                    </div>
                                </div>
                                <div className="text-medium color-grey">
                                    <p className="title color-orange">COSA COMPRENDE IL PREZZO</p>
                                    <p>{props.included}</p>

                                </div>
                                <div className="text-medium color-grey">
                                    <p className="title color-orange ">COSA NON COMPRENDE IL PREZZO</p>
                                    <p>{props.notIncluded ? props.notIncluded : 'Tutto incluso'}</p>

                                </div>
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }

    //------- Da fare refactoring per rimuovere codice ripetuto -------
    //Accordion info - Note
    if (props.tipo === 'note') {
        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0 accordion-info">NOTE</p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className="body-props my-4">
                                {props.note ? props.note : 'Nessuna nota disponibile'}
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }

    //Accordion info - Documenti Richiesti
    if (props.tipo === 'documentiRichiesti') {
        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0 accordion-info">DOCUMENTI RICHIESTI</p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className="body-props my-4">
                                {props.documentiRichiesti ? props.documentiRichiesti : 'Nessun documento richiesto'}
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }

    //Accordion info - Assicurazione
    if (props.tipo === 'assicurazione') {
        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0 accordion-info">ASSICURAZIONE</p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className="body-props my-4">
                                {props.assicurazione ? props.assicurazione : 'Non è prevista nessuna assicurazione'}
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }

    //Accordion info - Condizioni di cancellazione
    if (props.tipo === 'cancellazione') {
        const testoCancellazione = props.cancellazione.split('\n').map((riga, i) => {
            return <p key={i}>{riga}</p>;
        });

        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0 accordion-info">CONDIZIONI DI CANCELLAZIONE</p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className="body-props my-4">
                                {testoCancellazione ? testoCancellazione : 'Contatta il tuo referente per maggior informazioni.'}
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }

    //Accordion info - Condizioni di pagamento
    if (props.tipo === 'pagamento') {
        return (<>
            <div className="accordion container my-4">
                <div className="title-accordion row py-2">
                    <div className="d-flex align-items-center justify-content-between col-12 col-md-10 offset-md-1" onClick={toggleAccordion}>
                        <p className="title m-0 accordion-info">CONDIZIONI DI PAGAMENTO</p>
                        <FontAwesomeIcon className="icon-arrow" rotation={(opened ? 180 : 0)} icon={faAngleDown} />
                    </div>
                </div>

                <div className="row">
                    <div className={`col-12 col-md-10 offset-md-1 body-accordion m-auto ${opened ? 'open' : 'close'}`}>
                        {(opened ? (
                            <div className="body-props my-4">
                                {props.pagamento.name ? <h4>{props.pagamento.name}</h4> : undefined}
                                {props.pagamento.description ? <p>{props.pagamento.description}</p> : undefined}
                            </div>
                        ) : '')}
                    </div>
                </div>
            </div>
        </>)
    }
}   //--------------------------------------------------------------