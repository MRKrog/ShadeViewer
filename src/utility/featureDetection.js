import * as THREE from "three";
import * as settings from "./deviceSettings";
import { handleDeliveryTarget } from "./deliveryTargets";

export const handleGFX = () => {
  const detectedTarget = handleDeliveryTarget();
  return setDeliveryTarget(detectedTarget);
};

const setDeliveryTarget = (currUA) => {
  switch (currUA) {
    case 'isSafariiOS':
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
      console.log('in default', webGLFD());
      if(webGLFD()) return settings.webgl_Settings
      return 'YOU CANT USE OUR VIEWER'
  }
};


 const webGLFD = () => {
   if (!!window.WebGLRenderingContext) {
     var canvas = document.createElement("canvas"),
     names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
     context = false;

     for (var i in names) {
       try {
         context = canvas.getContext(names[i]);
         if (context && typeof context.getParameter === "function") {
           return 1;
         }
       } catch (e) {
         console.log('webgl catch idk', e);
       }
     }
     return 0;
   }
 }
