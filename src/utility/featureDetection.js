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
    case 'isInstagramiOS':
      return settings.instagramiOS_Settings;
    case 'isSnapchatiOS':
      return settings.snapchatiOS_Settings;
    case 'isFirefoxiOS':
      return settings.firefoxiOS_Settings;
    case 'isFaceBookiOS':
      return settings.facebookiOS_Settings;
    case 'isChromeAPK':
      return settings.chromeAPK_Settings;
    case 'isMainlineAPK':
      return settings.mainlineAPK_Settings;
    case 'isInstagramAPK':
      return settings.instagramAPK_Settings; 
    case 'isSnapchatAPK':
      return settings.snapchatAPK_Settings; 
    case 'isFacebookAPK':
      return settings.facebookAPK_Settings;
    case 'isMagicLeapHelio':
      return settings.magicLeapHelio_Settings; 
    case 'isLinuxNotLeap':
        return settings.linuxNotLeap_Settings;     
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
