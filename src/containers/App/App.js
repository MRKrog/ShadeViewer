import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

import Shade from '../Shade/Shade';
import ScreenLoader from "../../components/ScreenLoader";

class App extends Component {

  componentDidMount() {
    console.log('app mounted');
    this.props.setLoading(true)
    this.fetchImage()
    this.props.setLoading(false)
  }

  fetchImage = async () => {
    const url = 'https://shopifydependencies.s3.amazonaws.com/ar/dc_glb.glb'
    try {

      const response = await fetch(url)
      const data = response.json()
      console.log(data);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="App">
        {
          !loading ? (
            <div className="modal">
               <Shade />
            </div>
          ) : (
            <ScreenLoader />
          )
        }
      </div>
    )
  }
}


export const mapStateToProps = state => ({
  loading: state.loading,
});

export const mapDispatchToProps = dispatch => ({
  setLoading: data => dispatch(actions.setLoading(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
