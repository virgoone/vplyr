# vPlyr
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[![NPM version](https://badge.fury.io/js/vplyr.svg)](http://badge.fury.io/js/vplyr)

A simple, HTML5, FLV media player.

## Using package managers

### npm
```
npm install vplyr
```
[https://www.npmjs.com/package/vplyr](https://www.npmjs.com/package/vplyr)

## Quick setup

#### HTML5 Video
### HTML
```html
<video poster="/path/to/poster.jpg" controls src="/path/to/video.mp4"></video>
```

### CSS
Include the `vplyr.css` stylsheet into your `<head>`

```html
<link rel="stylesheet" href="dist/vplyr.css">
```

### JavaScript 
Include the `vplyr.js` script before the closing `</body>` tag and then call `new vPlayer(tag,options)`

```html
<script src="dist/vplyr.js"></script>
<script>new vPlayer(document.querySelector('video'), { debug: false })</script>
```

## API
<table class="table" width="100%">
<thead>
  <tr>
    <th width="20%">API</th>
    <th width="15%">Required</th>
    <th width="65%">Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>container</code></td>
    <td>&mdash;</td>
    <td>返回播放器容器<code>get : player.container</code></td>
  </tr>
  <tr>
    <td><code>poster</code></td>
    <td>&mdash;</td>
    <td>get or set video poster <code>get : player.poster | set player.poster = '图片地址'</code></td>
  </tr>
  <tr>
    <td><code>readyState</code></td>
    <td>&mdash;</td>
    <td>返回视频播放器状态</td>
  </tr>
  <tr>
    <td><code>loadingState</code></td>
    <td>&mdash;</td>
    <td>返回视频加载状态</td>
  </tr>
  <tr>
    <td><code>duration</code></td>
    <td>&mdash;</td>
    <td>返回视频总时间</td>
  </tr>
  <tr>
    <td><code>play()</code></td>
    <td>&mdash;</td>
    <td>开始播放视频</td>
  </tr>
  <tr>
    <td><code>pause()</code></td>
    <td>&mdash;</td>
    <td>暂停播放视频</td>
  </tr>
  <tr>
    <td><code>stop()</code></td>
    <td>&mdash;</td>
    <td>停止播放视频</td>
  </tr>
  <tr>
    <td><code>currentTime</code></td>
    <td>&mdash; | Number </td>
    <td>拿到或者设置视频当前播放时间 <code>get : player.currentTime | set player.currentTime = Number</code></td>
  </tr>
  <tr>
    <td><code>volume</code></td>
    <td>&mdash; | Number </td>
    <td>返回或者设置视频音量 <code>get : player.volume | set player.volume = Number</code></td>
  </tr>
  <tr>
    <td><code>muted</code></td>
    <td>&mdash; | Boolean</td>
    <td>返回或者设置视频静音 <code>get : player.muted | set player.muted = true || false</code></td>
  </tr>
  <tr>
    <td><code>togglePlay()</code></td>
    <td>Boolean</td>
    <td>切换视频播放状态</td>
  </tr>
  <tr>
    <td><code>paused</code></td>
    <td>&mdash;</td>
    <td>返回视频当前播放状态</td>
  </tr>
  <tr>
    <td><code>toggleMute()</code></td>
    <td>&mdash;</td>
    <td>切换视频静音状态</td>
  </tr>
  <tr>
    <td><code>toggleFullscreen()</code></td>
    <td>Event</td>
    <td>切换视频全屏状态</td>
  </tr>
  <tr>
    <td><code>playing(...)</code></td>
    <td>Event</td>
    <td>监听视频播放事件,callback返回视频当前播放时间</td>
  </tr>
  <tr>
    <td><code>fullscreen</code></td>
    <td>&mdash; | Boolean</td>
    <td>返回或者设置当前视频全屏<code>get : player.fullscreen | set player.fullscreen = true || false </code></td>
  </tr>
  <tr>
    <td><code>src</code></td>
    <td>&mdash; | String</td>
    <td>
      返回或者设置当前视频地址
      <code>get : player.src | set player.src = '视频地址'</code>
    </td>
  </tr>
  <tr>
    <td><code>destroy()</code></td>
    <td>&mdash;</td>
    <td>销毁视频播放器，重置状态</td>
  </tr>
 </tbody>
</table>

## Thanks

- [Plyr](https://github.com/selz/plyr)
- [Flv.js](https://github.com/Bilibili/flv.js)

## Copyright and License
[The MIT license](license.md).