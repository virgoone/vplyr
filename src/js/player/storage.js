import utils,{ storageSupport } from '../utils/util';
export const updateStorage = (value, config, storage) => {
  if (!storageSupport || !config.storage.enabled) {
    return;
  }
  utils.extend(storage, value);
  window.localStorage.setItem(config.storage.key, JSON.stringify(storage));
}
export const setupStorage = (config, storage) => {
  var value = null;
  if (!storageSupport || !config.storage.enabled) {
    return;
  }

  window.localStorage.removeItem('vplyr-volume');

  // load value from the current key
  value = window.localStorage.getItem(config.storage.key);

  if (!value) {
    return;
  } else if (/^\d+(\.\d+)?$/.test(value)) {
    updateStorage({ volume: parseFloat(value) }, config, storage);
  } else {
    // Assume it's JSON from this or a later version of plyr
    storage = JSON.parse(value);
  }
}
