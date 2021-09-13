import React, { useState, useEffect } from 'react'

import MyContext from './MyContext';

import NavBar from './components/NavBar/NavBar'
import WelcomeSlideShow from './components/WelcomeSlideShow/WelcomeSlideShow';
import Mappa from './components/Mappa/Mappa';
import OperatorCard from './components/OperatorCard/OperatorCard';
import Accordion from './components/Accordion/Accordion';
import Footer from './components/Footer/Footer';

import "bootstrap/dist/css/bootstrap.css";
import './App.css';



export default function App() {
  const [dati, setDati] = useState(null)

  useEffect(() => {
    const getDati = async () => {
      const datiDalServer = await fetch('http://51.77.82.133:86/api/quotations/QUO_5e5e2952ae57f').then(res => res.json())
      setDati(datiDalServer.results.data)
    }
    getDati();
  }, [])

  let tappe = [];

  //Ristrutturazione JSON
  if (dati !== null) {
    console.log(dati)
    let places = [];
    let precedente = undefined;

    places = dati.rows.map((row) => {
      let dayTemp = {
        name: row.days[0].name,
        dayDate: row.dayDate,
        images: row.days[0].images,
        description: row.days[0].description,
        activities: row.activities,
        transports: row.transports,
        accomodations: row.accomodations,
      }

      let oggettoTemp = {
        placeId: row.place.id,
        placeName: row.place.name,
        placeAddressName: row.place.address,
        latitude: row.place.latitude,
        longitude: row.place.longitude,
        days: [dayTemp]
      }

      return oggettoTemp;
    })

    places.forEach((row) => {
      if (precedente) {
        //ho almeno un oggetto in tappe
        if (precedente === row.placeId) {
          // chiave città già inserita
          tappe[tappe.length - 1].days.push(row.days[0])
        } else {
          // città non presente 
          //aggiornare la chiave precedente e mettere il valore ID della città attuale
          precedente = row.placeId;
          // prendere obj e metterlo dentro tappe
          tappe.push(row)
        }
      } else {
        //è il primo inserimento in tappe
        //aggiornare la chiave precedente e mettere il valore ID della città attuale
        precedente = row.placeId
        // prendere obj e metterlo dentro tappe
        tappe.push(row)
      }



    })

    // console.log(dati.rows)
    // console.log(tappe)
  }


  if (dati === null) {
    return false
  } else {
    console.log(tappe)
    return (<>
      <NavBar />
      <MyContext.Provider value={dati}>
        <div className='container-fluid px-0'>
          <div className='row no-gutters'>
            <div className="col">
              <WelcomeSlideShow images={dati.images} title={dati.title} customerName={dati.customerName} />
              <Mappa tappe={tappe}></Mappa>
              <OperatorCard></OperatorCard>
              <div id='tappe'>
                {tappe.map((tappa, index) => {
                  return (<Accordion key={index} tipo='tappa' tappa={tappa}></Accordion>)
                })}
              </div>
              <div id='documenti'>
                <Accordion tipo='tariffa' partecipants={dati.partecipants} priceTotal={dati.priceTotal} included={dati.included} notIncluded={dati.notIncluded} ></Accordion>
                <Accordion tipo='note' note={dati.note}></Accordion>
                <Accordion tipo='documentiRichiesti' documentiRichiesti={dati.documentsRequested.description}></Accordion>
                <Accordion tipo='assicurazione' assicurazione={dati.documentsInsurance.description}></Accordion>
                <Accordion tipo='cancellazione' cancellazione={dati.documentsCancellation.description}></Accordion>
                <Accordion tipo='pagamento' pagamento={dati.documentsPayment}></Accordion>
              </div>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </MyContext.Provider>
    </>);
  }
}