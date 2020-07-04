import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Counter from "./components/Counter";

const images = [1, 2, 3, 4, 5, 6].map((element, index) => {
  return "https://via.placeholder.com/100x100/000000?text=" + index;
});

ReactDOM.render(<Counter gallery={images} />, document.getElementById("root"));
