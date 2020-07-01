import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date : new Date(),
      stopped : false
    }
  }

  startClock() {
    this.timer = setInterval(() => {this.tick()}, 1000);
  }

  stopClock() {
    clearInterval(this.timer);
  }

  toggleWatch = (e) => {
    this.setState((precState, props) => {
      if (precState.stopped) {
        this.startClock();
        return { stopped : false };
      } else {
        this.stopClock();
        return { stopped : true };
      }
    })
  }

  tick () {
    this.setState({date : new Date()})
  }

  render() {
    
    const tempo = this.state.date.getTime() + this.props.timezone*3600*1000;
  const data = new Date(tempo);
  
  return (
    <>
    <h1>In {this.props.citta} è il {data.toLocaleDateString()} e sono le {data.toLocaleTimeString()}</h1> <button onClick={this.toggleWatch}>ZA WARUDO!</button>
    </>
  );
  }

  componentDidMount() {
    this.startClock();
  }
}

export default Clock;