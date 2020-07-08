import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "./DayCard.css";


export default function DayCard({title}) {
  return (
    <div className="container-card">
      <div className="row header-card-day">
        <div className="col-12">
          <p className="color-orange subtitle">{title}<span className="date-text">25 Dicembre</span></p>
        </div>
      </div>

      <div className="img-cover">

      </div>
    </div>
  )
}
