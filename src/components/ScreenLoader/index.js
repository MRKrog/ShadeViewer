import React from 'react';
import loadingImage from '../../assets/images/loading/levAR_logo.svg';

const ScreenLoader = () => {
  return (
    <div className='ScreenLoader'>
      <img src={loadingImage} className='Loading-logo' alt='loading' />
    </div>
  )
}

export default ScreenLoader;
