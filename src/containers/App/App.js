import React, { Component } from 'react';
import Shade from '../Shade';
import "./App.css";
import bgImage from "../../assets/bgimage.jpg";

class App extends Component {
  constructor() {
    super()
    this.state = {
      isMounted: false
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
      <div className="App" style={{ backgroundImage: `url(${bgImage})` }}>
        {
          isMounted ? (
          <div className="modal">
             <Shade />
          </div>
          ) : (
          <button className="AppBtn" onClick={() => this.handleMount()}>
              {isMounted ? "Exit" : "Modalize dez nuts"}
          </button>
          )
        }
      </div>
    )
  }
}

export default App;
