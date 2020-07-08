import React, { Component } from 'react'

export default class Counter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter : 0
    };
  }

  add = () => {
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      }

    })
  }
  
  render() {
    return (
      <div>
        <h1>Sono un bottone contatore!</h1>
        <h2>{this.state.counter}</h2>
        <button onClick={this.add}>Incrementa</button>
      </div>
    )
  }
}
