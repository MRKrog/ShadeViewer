import * as THREE from "three";
import * as settings from "./deviceSettings";
import { handleDeliveryTarget } from "./deliveryTargets";

// const gfxSettings = {
//   rendererAAStatus: null,
//   pcLightsStatus: null,
//   lightHelperStatus: null,
//   LightingScenario: null,
//   environmentStatus: null,
//   toneMappingConfig: null,
//   toneMappingExposure: null,
//   colorSpace: null,
//   controlType: null,
//   controlDampeningStatus: null,
//   controlDampeningFactor: null,
//   controlScrenPanning: null
// };

export const handleDevice = () => {

  // Detected Device returns string based on device
  const setTarget = handleDeliveryTarget();


  console.log('setTarget', setTarget);
  console.log('testSEttings', settings.criiOS_Settings);

  // have undefined global gfx settings object
  // Device detection
  // set based on detection update gfx settings
  // return gfx settings
  // store in redux
  // on shade load inject gfx settings into shade object

};


const handleDetect = (navUserAgent) => {
  console.log('in detect');

  // if(isChromeiOS) {
  //   console.log('true bitches');
  // }

  // switch () {
  //   case 'expression':
  //
  //     break;
  //   default:
  //
  // }

}
    //
    //
    // if (isiOS) {
    //   if (isCriOS) {
    //     RendererAAStatus = true;
    //     PCLightsStatus = true;
    //     LightHelperStatus = false;
    //     LightingScenario = 0;
    //     EnvironmentStatus = true;
    //     ToneMappingConfig = THREE.ACESFilmicToneMapping;
    //     ToneMappingExposure = 3;
    //     ColorSpace = THREE.LinearEncoding;
    //     ControlType = 1;
    //     ControlDampeningStatus = true;
    //     ControlDampeningFactor = 0.5;
    //     ControlScrenPanning = true;
    //   } else if (isFxiOS) {
    //     RendererAAStatus = true;
    //     PCLightsStatus = true;
    //     LightHelperStatus = false;
    //     LightingScenario = 0;
    //     EnvironmentStatus = true;
    //     ToneMappingConfig = THREE.ACESFilmicToneMapping;
    //     ToneMappingExposure = 3;
    //     ColorSpace = THREE.LinearEncoding;
    //     ControlType = 1;
    //     ControlDampeningStatus = true;
    //     ControlDampeningFactor = 0.5;
    //     ControlScrenPanning = true;
    //   } else if (isSnapchat) {
    //     RendererAAStatus = false;
    //     PCLightsStatus = true;
    //     LightHelperStatus = false;
    //     LightingScenario = 1;
    //     EnvironmentStatus = false;
    //     ToneMappingConfig = THREE.ACESFilmicToneMapping;
    //     ToneMappingExposure = 1;
    //     ColorSpace = THREE.sRGBEncoding;
    //     ControlType = 1;
    //     ControlDampeningStatus = true;
    //     ControlDampeningFactor = 0.5;
    //     ControlScrenPanning = true;
    //   } else if (isInstagram) {
    //     RendererAAStatus = false;
    //     PCLightsStatus = true;
    //     LightHelperStatus = false;
    //     LightingScenario = 1;
    //     EnvironmentStatus = false;
    //     ToneMappingConfig = THREE.ACESFilmicToneMapping;
    //     ToneMappingExposure = 1;
    //     ColorSpace = THREE.sRGBEncoding;
    //     ControlType = 1;
    //     ControlDampeningStatus = true;
    //     ControlDampeningFactor = 0.5;
    //     ControlScrenPanning = true;
    //   }
    // } else if (isAndroid) {
    //   RendererAAStatus = false;
    //   PCLightsStatus = true;
    //   LightHelperStatus = false;
    //   LightingScenario = 1;
    //   EnvironmentStatus = false;
    //   ToneMappingConfig = THREE.ACESFilmicToneMapping;
    //   ToneMappingExposure = 1;
    //   ColorSpace = THREE.sRGBEncoding;
    //   ControlType = 1;
    //   ControlDampeningStatus = true;
    //   ControlDampeningFactor = 0.5;
    //   ControlScrenPanning = true;
    // } else {
    //   RendererAAStatus = true;
    //   PCLightsStatus = true;
    //   LightHelperStatus = false;
    //   LightingScenario = 0;
    //   EnvironmentStatus = true;
    //   ToneMappingConfig = THREE.ACESFilmicToneMapping;
    //   ToneMappingExposure = 1;
    //   ColorSpace = THREE.sRGBEncoding;
    //   ControlType = 1;
    //   ControlDampeningStatus = true;
    //   ControlDampeningFactor = 0.5;
    //   ControlScrenPanning = true;
    // }
