import React, { Component } from 'react';
import { handleGFX } from '../../utility/featureDetection';

import queryString from 'query-string';

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../redux/actions";

import Shade from '../Shade/Shade';
import ScreenLoader from "../../components/ScreenLoader";

class App extends Component {

  componentDidMount() {
    this.props.setLoading(true);
    this.handleParams()
    this.handleEngine()


    // this.props.setShadeReady('SHADE_READY');
  }

  handleEngine = () => {
    const detectEngine = handleGFX()
    this.props.setEngine(detectEngine)
  }

  handleParams = () => {
    let params = queryString.parse(this.props.location.search);
    this.props.setVariant(params.varid);
  }

  render() {
    const { loading, shadeState } = this.props;
    let params = queryString.parse(this.props.location.search)
    const url = `https://shopifydependencies.s3.amazonaws.com/ar/${params.varid}.glb`;

    return (
      <div className="App">
        {
          (shadeState === 'SHADE_READY') ? (
            <div className="modal">
              {/*<Shade url={url} />*/}
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
  variant: state.variant,
  shadeState: state.shadeState,
  engine: state.engine
});

export const mapDispatchToProps = dispatch => ({
  setLoading: data => dispatch(actions.setLoading(data)),
  setVariant: data => dispatch(actions.setVariant(data)),
  setShadeReady: data => dispatch(actions.setShadeReady(data)),
  setEngine: data => dispatch(actions.setEngine(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
