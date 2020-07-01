import React, { Component } from 'react';
import "./lamp.css";

export default class Lamp extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOn : false
    }
  }

  toggleLamp = () => {
    this.setState((prevState, props) => {
      return { isOn : !prevState.isOn }
    });
  }

  render() {
    return (
      <div className={`lamp-container ${this.state.isOn ? "lamp-on" : "lamp-off"}`}> 
        <p className="h1">Sono una lampadina {this.state.isOn ? "accesa" : "spenta"}.</p>
    <button onClick={this.toggleLamp} className="btn btn-primary">{this.state.isOn ? "Spegnimi" : "Accendimi"}</button>
      </div>
    )
  }
}
