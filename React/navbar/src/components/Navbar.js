import React from 'react'
import { NavHashLink } from "react-router-hash-link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <NavHashLink className="navbar-brand" to="/">MyNav</NavHashLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavHashLink className="nav-link" to="/about">About</NavHashLink>
        </li>
        <li className="nav-item">
          <NavHashLink className="nav-link" to="/scroll#red">Scroll red</NavHashLink>
        </li>
        <li className="nav-item">
          <NavHashLink className="nav-link" to="/scroll#green">Scroll green</NavHashLink>
        </li>
      </ul>
    </div>
  </nav>
  )
}
