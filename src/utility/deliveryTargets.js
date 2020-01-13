export const handleDeliveryTarget = () => {

  if(isSafariiOS){
    console.log('>>> isSafariiOS');
    return 'isSafariiOS';

  } else if(isMacOS) {
    console.log('>>> isMacOS');
    return 'isMacOS';

  } else if(isChromeiOS) {
    console.log('>>> isChromeiOS');
    return 'isChromeiOS';

  } else if(isInstagramiOS) {
    console.log('>>> isInstagramiOS');
    return 'isInstagramiOS';

  } else if(isSnapchatiOS) {
    console.log('>>> isSnapchatiOS');
    return 'isSnapchatiOS';

  } else if(isFirefoxiOS) {
    console.log('>>> isFirefoxiOS');
    return 'isFirefoxiOS';

  } else if(isFaceBookiOS) {
    console.log('>>> isFaceBookiOS');
    return 'isFaceBookiOS';

  } else if(isChromeAPK) {
    console.log('>>> isChromeAPK');
    return 'isChromeAPK';

  } else if(isMainlineAPK) {
    console.log('>>> isMainlineAPK');
    return 'isMainlineAPK';

  } else if(isInstagramAPK) {
    console.log('>>> isInstagramAPK');
    return 'isInstagramAPK';

  } else if(isSnapchatAPK) {
    console.log('>>> isSnapchatAPK');
    return 'isSnapchatAPK';

  } else if(isFacebookAPK) {
    console.log('>>> isFacebookAPK');
    return 'isFacebookAPK';

  } else if(isMagicLeapHelio) {
    console.log('>>> isMagicLeapHelio');
    return 'isMagicLeapHelio';

  } else if(isLinuxNotLeap) {
    console.log('>>> isLinuxNotLeap');
    return 'isLinuxNotLeap';

  } else {
    console.log('no detection');
  }
}


const isSafariiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('OS 13') > -1 &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1 &&
    navigator.userAgent.indexOf('FBIOS') === -1;

const isMacOS = /Macintosh/i.test(navigator.userAgent) &&
	navigator.userAgent.indexOf('OS X') > -1;

const isChromeiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('CriOS') > -1;

const isInstagramiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') > -1;

const isSnapchatiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Snapchat') > -1;

const isFirefoxiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FxiOS') > -1;

const isFaceBookiOS = /iPhone|iPad/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FBIOS') > -1;

const isChromeAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Chrome') > -1 &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FBAV') === -1;

const isMainlineAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') === -1 &&
    navigator.userAgent.indexOf('Snapchat') === -1 &&
    navigator.userAgent.indexOf('FBAV') === -1;

const isInstagramAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('Instagram') > -1;

const isSnapchatAPK = /Android/i.test(navigator.userAgent) &&
	navigator.userAgent.indexOf('Snapchat') > -1;

const isMagicLeapHelio = /X11/i.test(navigator.userAgent) &&
  navigator.userAgent.indexOf('Is Helio') > -1;

const isLinuxNotLeap = /X11/i.test(navigator.userAgent) &&
  navigator.userAgent.indexOf("Is Linux Not Leap") === -1;

const isFacebookAPK = /Android/i.test(navigator.userAgent) &&
    navigator.userAgent.indexOf('FBAV') > -1;
