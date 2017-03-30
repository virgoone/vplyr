import utils from '../utils/util';

export const buildControls = (config)=>{
  const { controls } = config;
    const html = ['<div class="vplyr-video-loader-container">',
      '<div class="vplyr-video-loader">',
      '<div class="loader-inner one"></div>',
      '<div class="loader-inner two"></div>',
      '<div class="loader-inner three"></div>',
      '</div>',
      '</div><div class="vplyr-gradient-bottom"></div>'];
    html.push('<div class="vplyr-bottom-container">')
    if (utils.inArray(controls, 'progress')) {
      html.push(
        '<div class="vplyr-progress-bar-container">',
        '<input id="seek{id}" type="range" min="0" max="100" value="0" step="0.1" class="vplyr-progress-bar" data-video="seek"/>',
        '<progress class="vplyr-progress-played" max="100" role="presentation"></progress>',
        '<progress class="vplyr-progress-buffer" max="100" value="100">',
        '<span>100.00</span>% buffered',
        '</progress>',
        '</div>'
      );
    }
    html.push('<div class="vplyr-controls">')
    html.push('<div class="left-controls">')
    if (utils.inArray(controls, 'play')) {
      html.push(
        '<div class="btn-controls">',
        '<div class="btn-wrap">',
        '<div class="play" data-video="play"></div>',
        '<div class="pause" data-video="pause"></div>',
        '</div>',
        '</div>'
      );
    }
    if (utils.inArray(controls, 'time')) {
      html.push(
        '<div class="time-mod-controls">',
        '<div class="control-currenttime">00:00</div>',
        '<div class="control-separator">/</div>',
        '<div class="control-duration">00:00</div>',
        '</div>'
      );
    }
    html.push('</div>')//close vplyr left controls
    html.push('<div class="right-controls">')
    if (utils.inArray(controls, 'fullscreen')) {
      html.push(
        '<div class="fullscreen-controls" data-video="fullscreen">',
        '<svg class="icon-exit-fullscreen">',
        '<use xlink:href="#vplyr-exit-fullscreen"></use>',
        '</svg>',
        '<svg class="icon-enter-fullscreen">',
        ' <use xlink:href="#vplyr-enter-fullscreen"></use>',
        '</svg>',
        '</div>'
      );
    }
    html.push('<div class="volume-controls">')
    if (utils.inArray(controls, 'mute')) {
      html.push(
        '<div class="vplyr-volume" data-video="mute">',
        '<svg class="icon-muted">',
        '<use xlink:href="#vplyr-muted"></use>',
        '</svg>',
        '<svg class="icon-volume">',
        '<use xlink:href="#vplyr-volume"></use>',
        '</svg>',
        '</div>'
      );
    }
    if (utils.inArray(controls, 'volume')) {
      html.push(
        '<div class="vplyr-volume-progress">',
        '<input type="range" id="volume{id}"  class="vplyr-volume-input"  min="0"  max="10" data-video="volume" value="8">',
        '<progress class="vplyr-volume-display" max="10" role="presentation"></progress>',
        '</div>'
      );
    }
    html.push('</div>')//close vplyr volume controls

    html.push('</div>')//close vplyr right controls

    html.push('</div>')//close vplyr controls
    html.push('</div>')//close
    return html.join('');
}