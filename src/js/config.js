export const defaultConfig = {
  enabled:                 true,
  debug:                  true,
  autoplay:               false,
  loop:                   false,
  seekTime:               10,
  volume:                 10,
  volumeMin:              0,
  volumeMax:              10,
  volumeStep:             1,
  duration:               null,
  displayDuration:        true,
  loadSprite:             true,
  controls:               ['play-large', 'play', 'progress', 'time', 'mute', 'volume', 'captions', 'fullscreen'],
  selectors: {
    html5:                'video, audio',
    editable:             'input, textarea, select, [contenteditable]',
    container:            '.vplyr',
    controls: {
        container:        null,
        wrapper:          '.vplyr-controls'
    },
    buttons: {
        seek:             '[data-video="seek"]',
        play:             '[data-video="play"]',
        pause:            '[data-video="pause"]',
        mute:             '[data-video="mute"]',
        fullscreen:       '[data-video="fullscreen"]'
    },
    volume: {
        input:            '[data-video="volume"]',
        display:          '.vplyr-volume-display'
    },
    progress: {
        container:        '.vplyr-progress-bar-container',
        buffer:           '.vplyr-progress-buffer',
        played:           '.vplyr-progress-played'
    },
    volume: {
        input:          '[data-video="volume"]',
        display:        '.vplyr-volume-display'
    },
    currentTime:          '.control-currenttime',
    duration:             '.control-duration'
},
  // Custom control listeners
  listeners: {
      seek:               null,
      play:               null,
      pause:              null,
      restart:            null,
      rewind:             null,
      forward:            null,
      mute:               null,
      volume:             null,
      captions:           null,
      fullscreen:         null
  },
  types: {
    html5:              ['video']
  },
  classes:{
    type:               'vplyr-{0}',
    videoWrapper:'vplyr-video-container',
    playing:'vplyr-plying',
    loading:            'vplyr-loading',
    hover:              'vplyr-hover',
    stopped:'vplyr-stopped',
    isIos:              'vplyr--is-ios',
    isTouch:            'vplyr--is-touch',
    isWechat:           'vplyr--is-wechat',
    isChrome:           'vplyr--is-chrome',
    tabFocus:           'tab-focus'
  },
  events:                 ['ready', 'ended', 'progress', 'stalled', 'playing', 'waiting', 'canplay', 'canplaythrough', 'loadstart', 'loadeddata', 'loadedmetadata', 'timeupdate', 'volumechange', 'play', 'pause', 'error', 'seeking', 'seeked', 'emptied'],
  // Logging
  logPrefix:              '[VPlyr]'
}
export function createDefaultConfig() {
  return Object.assign({}, defaultConfig);
}