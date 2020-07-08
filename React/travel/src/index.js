import React from 'react';
import ReactDOM from 'react-dom';

import Accordion from "./components/Accordion/Accordion";
import DayCard from "./components/DayCard/DayCard";
import './index.css';


ReactDOM.render(
  <div className="container">
    <Accordion 
    title="Catania" 
    date="2 giorni"
    content={<><DayCard title="Benvenuti a Catania!"/></>}
    />
  </div>,
  document.getElementById('root')
);
