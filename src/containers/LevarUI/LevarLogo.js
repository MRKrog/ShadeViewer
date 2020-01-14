import React from 'react';
import logo from '../../assets/icons/levAR_logo.svg';

const LevarLogo = () => {
  return (
    <div className="LevarLogo">
      <a href="https://levar.io/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Levar Site"/>
      </a>
    </div>
  )
}

export default LevarLogo;
