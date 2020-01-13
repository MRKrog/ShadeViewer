import React, { Component } from 'react';
import { handleDevice } from '../../utility/featureDetection';

import queryString from 'query-string';

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../redux/actions";

import Shade from '../Shade/Shade';
import ScreenLoader from "../../components/ScreenLoader";

class App extends Component {

  componentDidMount() {
    this.props.setLoading(true);
    let params = queryString.parse(this.props.location.search);
    this.props.setVariant(params.varid);

    const deviceSet = handleDevice()

    this.props.setShadeReady('SHADE_READY');





    // let params = queryString.parse(this.props.location.search)
    let setDevice = handleDevice()
    console.log('setDevice', setDevice);

    // console.log('App Mounted', params);
    this.props.setLoading(true)

    // this.fetchImage(params)
    this.props.setLoading(false)
  }

  //

  fetchImage = async (params) => {
    // https://shopifydependencies.s3.amazonaws.com/ar/31685891326045.glb
    // const url = `https://shopifydependencies.s3.amazonaws.com/ar/${params.varid}.glb`
    // console.log(url);
    // try {
    //   const response = await fetch(url)
    //   console.log('response', response);
    //   const data = await JSON.stringify(response)
    //   console.log('data', data);
    // } catch(error) {
    //   console.log(error);
    // }
  }

  render() {
    const { loading } = this.props;
    let params = queryString.parse(this.props.location.search)
    const url = `https://shopifydependencies.s3.amazonaws.com/ar/${params.varid}.glb`;


    return (
      <div className="App">
        {
          !loading ? (
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
});

export const mapDispatchToProps = dispatch => ({
  setLoading: data => dispatch(actions.setLoading(data)),
  setVariant: data => dispatch(actions.setVariant(data)),
  setShadeReady: data => dispatch(actions.setShadeReady(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
