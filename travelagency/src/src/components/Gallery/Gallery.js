import React from 'react'
import './Gallery.css'

export default function Gallery({ images }) {

    let totImages = images.length
    let restImages = 0
    let firstImages = null
    let secondImages = null
    let thirdImages = null
    let fourthImages = null

    if (totImages > 0) {

        images.forEach((ele, i) => {
            if (i === 0) {
                firstImages = ele
            }
            if (i === 1) {
                secondImages = ele
            }
            if (i === 2) {
                thirdImages = ele
            }
            if (i === 3) {
                fourthImages = ele
            }

        });

        //Serve a inizializzare la variabile contatore
        if (totImages >= 4) {
            restImages = totImages - 4
        }
    }

    return (<>
        {/* Conterrà le immagini grandi */}
        <div className="d-flex">
            {
                (totImages === 0 ? (
                    <p className="normal-text m-0">Immagini non disponibili</p>
                ) : (<></>))
            }
            {
                (firstImages !== null ? (
                    <div className="contentImage" style={{ backgroundImage: 'url(' + firstImages.image + ')' }}></div>
                ) : (<></>))
            }
            {
                (secondImages !== null ? (
                    <div className="contentImage" style={{ backgroundImage: 'url(' + secondImages.image + ')' }}></div>
                ) : (<></>))
            }
        </div>

        {/* Conterrà le miniature + il counter image */}
        <div className="d-flex flex-column">
            {
                (thirdImages !== null ? (
                    <div className="content-lastImages" style={{ marginBottom: '10px', backgroundImage: 'url(' + thirdImages.image + ')' }}></div>
                ) : (<></>))
            }
            {
                restImages >= 0 ? (
                    <div className="content-lastImages" style={{ backgroundImage: 'url(' + fourthImages.image + ')' }}>
                        {
                            (restImages === 0 ? (<></>) : (
                                <div className="overlayLastImage d-flex align-items-center justify-content-center">
                                    +{restImages}
                                </div>
                            ))

                        }

                    </div>
                ) : (<></>)
            }

        </div>
    </>)
}