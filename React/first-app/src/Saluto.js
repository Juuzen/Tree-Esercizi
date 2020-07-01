import React, {Component} from "react";

function getDate(date) {
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

class Saluto extends Component {
  render() {
    return (
      <>
        <h1>Ciao</h1>
    <h2>Oggi è {new Date().toLocaleDateString()} e sono le ore {new Date().toLocaleTimeString()}</h2>
    <h2>Nuovo oggi {getDate(new Date())}</h2>
      </>
    );
  }
}

export default Saluto;
