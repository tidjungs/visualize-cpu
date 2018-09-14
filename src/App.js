import React, { Component } from 'react';
import WebSocket from 'isomorphic-ws';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: []
  }
  componentDidMount() {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = function incoming(point) {
      const data = this.state.data
      if (data.length >= 20) {
        data.shift()
      }
      data.push(point.data)
      this.setState({
        data
      })
    }.bind(this)
  }
  render() {
    return (
      <div className="App">
        <Sparklines data={this.state.data} limit={20}>
          <SparklinesLine color="#1c8cdc" />
          <SparklinesSpots />
        </Sparklines>
      </div >
    );
  }
}

export default App;
