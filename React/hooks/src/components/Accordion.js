import React from 'react'
import { useState } from 'react';

import "../css/Accordion.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Accordion({title, date, content}) {

  const [collapseStatus, setCollapseStatus] = useState(true);

  const toggleCollapse = () => {
    setCollapseStatus(!collapseStatus);
  }

  return (
    <>
      <div className="accordion m-4">
        <div className="row accordion-title">
          <div className="d-flex align-items-center col-10">
            <p className="title m-0 ml-3">{title}<span className="date ml-3">{date}</span></p>
          </div>
          <div className="d-flex align-items-center justify-content-center col-2">
            <FontAwesomeIcon onClick={toggleCollapse} className="dropdown-arrow" rotation={collapseStatus ? 0 : 180} icon={faAngleDown} />
          </div>
        </div>
        <div className="row">
          <div className={`col-12 col-md-10 offset-md-1 accordion-body ${collapseStatus ? "close" : "open"}`}>
            {
              (collapseStatus ? "" : (
                <div className="accordion-content">
                  {content}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
