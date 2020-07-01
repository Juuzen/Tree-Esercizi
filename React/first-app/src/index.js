import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Lamp from "./Lamp.js";

ReactDOM.render(
    <>
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <Lamp />
          </div>
        </div>
      </div>
    </>
  , document.getElementById("root"));
