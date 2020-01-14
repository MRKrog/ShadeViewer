export const ARMode = 'quick-look'|'ar-viewer'|'unstable-webxr'|'none';

const ARMode: {[index: string]: ARMode} = {
  QUICK_LOOK: 'quick-look',
  AR_VIEWER: 'ar-viewer',
  UNSTABLE_WEBXR: 'unstable-webxr',
  NONE: 'none'
};



const activateAR = () => {
  switch (this[$arMode]) {
    case ARMode.QUICK_LOOK:
      openIOSARQuickLook(this.iosSrc!);
      break;
    case ARMode.UNSTABLE_WEBXR:
      await this[$enterARWithWebXR]();
      break;
    case ARMode.AR_VIEWER:
      openSceneViewer(this.src!, this.alt || '', this.arScale);
      break;
    default:
      console.warn('No AR Mode can be activated. This is probably due to missing configuration or device capabilities');
      break;
  }
}
