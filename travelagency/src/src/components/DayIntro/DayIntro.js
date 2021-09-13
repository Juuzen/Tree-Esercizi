import React from 'react'
import './DayIntro.css'

export default function DayIntro(props) {
    return (<div>
        <div className="img-cover" style={{ backgroundImage: `url(${props.img[0].image})` }}></div>
        <p>{props.description}</p>
    </div>)
}