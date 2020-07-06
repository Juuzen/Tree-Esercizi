import React, { Component } from 'react'
import AccordionContent from "./AccordionContent";

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentCollapsed : true
    };
  }
  


  showContent = () => {
    this.setState((prevState) => {
      return {
        contentCollapsed : !prevState.contentCollapsed
      }
    })
  }

  componentDidMount = () => {
    console.log(this.state.contentCollapsed);
  }

  render() {
    return (
      <div className="card-box">
        <div className="card-bar">
          <div className="card-title-text">
            <span className="card-title">{this.props.title}</span>
            <span className="card-date">{this.props.date}</span>
          </div>
          <div className="dropdown-btn">
            <button onClick={this.showContent}>Espandi</button>
          </div>
        </div>
        <AccordionContent collapsed={this.state.contentCollapsed}/>
      </div>
    )
  }
}
