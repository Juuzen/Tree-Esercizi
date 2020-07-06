import React from "react";
import "../css/NavBar2.css";

export default class NavBar2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="nav">
          <p className="active">Home</p>
          <p>Chi siamo</p>
          <p>Contattaci</p>
        </div>
      </>
    )
  }
}