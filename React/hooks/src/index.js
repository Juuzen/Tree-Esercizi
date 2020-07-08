import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import Accordion from "./components/Accordion";
import AccordionContent from './components/AccordionContent';

ReactDOM.render(
  <div className="container">
    <div className="row">
      <div className="col-12 col-md-10 offset-md-1">
        <Accordion title={"Viaggio a Catania"} date={"3 giorni"} content={<><AccordionContent /></>}/>
      </div>
    </div>
  </div>,
  document.getElementById('root')
);
