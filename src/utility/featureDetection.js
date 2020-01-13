import * as THREE from "three";
import * as settings from "./deviceSettings";
import { handleDeliveryTarget } from "./deliveryTargets";

export const handleGFX = () => {
  // Detected Device returns string based on device
  const detectedTarget = handleDeliveryTarget();
  return setDeliveryTarget(detectedTarget);
};

const setDeliveryTarget = (currUA) => {
  switch (currUA) {
    case 'isSafariiOSdata':
      return settings.safariiOS_Settings;
    case 'isMacOS':
      return settings.macOS_Settings;
    case 'isChromeiOS':
      return settings.chromeiOS_Settings;
    default:
      return 'N/A'
  }
};

  // console.log('setTarget', setTarget);
  // console.log('testSEttings', settings.safariiOS_Settings);
  // console.log('testSEttings', settings.macOS_Settings);
  // console.log('testSEttings', settings.chromeiOS_Settings);
  // console.log('testSEttings', settings.instagramiOS_Settings);
  // console.log('testSEttings', settings.snapchatiOS_Settings);
  // console.log('testSEttings', settings.firefoxiOS_Settings);
  // console.log('testSEttings', settings.facebookiOS_Settings);
  // console.log('testSEttings', settings.chromeAPK_Settings);
  // console.log('testSEttings', settings.mainlineAPK_Settings);
  // console.log('testSEttings', settings.instagramAPK_Settings);
  // console.log('testSEttings', settings.snapchatAPK_Settings);
  // console.log('testSEttings', settings.facebookAPK_Settings);
  // console.log('testSEttings', settings.magicLeapHelio_Settings);
  // console.log('testSEttings', settings.linuxNotLeap_Settings);

  // have undefined global gfx settings object
  // Device detection
  // set based on detection update gfx settings
  // return gfx settings
  // store in redux
  // on shade load inject gfx settings into shade object
