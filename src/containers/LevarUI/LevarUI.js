import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
// import { handleGFX } from '../../utility/featureDetection';
// import queryString from 'query-string';
// import { withRouter } from "react-router";
// import Shade from '../Shade/Shade';
// import Spinner from "../../components/Spinner/Spinner";
import arBtn from '../../assets/icons/viewAR.svg';

class LevarUI extends Component {

  componentDidMount() {
    // console.log('LevarUI Loaded');
  }

  handleLaunchAR = (event) => {
    event.preventDefault();
    this.props.setLoading(true)
  }

  render() {
    const { variant } = this.props;
    const url = `https://shopifydependencies.s3.amazonaws.com/ar/${variant}.usdz`;
    // https://cwervo-assets.netlify.com/models/cwervo/logo-3m-scaled.usdz

    return (
      <div className="LevarUI-IOS">
        <a href={url} rel="ar">
          <img src={arBtn} alt="Launch in AR"/>
        </a>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loading: state.loading
});

export const mapDispatchToProps = dispatch => ({
  setLoading: data => dispatch(actions.setLoading(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LevarUI);
