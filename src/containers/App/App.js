import React, { Component } from 'react';
import Shade from '../Shade';
import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      isMounted: true
    }
  }

  handleMount = () => {
    this.setState({
      isMounted: !this.state.isMounted
    })
  }

  render() {
    const { isMounted } = this.state;

    return (
      <div className="App">
        {
          isMounted &&
          <div className="modal">
             <Shade />
          </div>
        }
      </div>
    )
  }
}

export default App;
