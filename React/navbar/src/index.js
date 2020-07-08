import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Text from "./components/Text";

import "bootstrap/dist/css/bootstrap.min.css";
import './css/index.css';

ReactDOM.render(
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/about" component={About}></Route>
      <Route path="/scroll" component={Text}></Route>
    </Switch>
  </BrowserRouter>
  ,
  document.getElementById('root')
);
