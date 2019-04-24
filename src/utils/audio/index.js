class Auplayer {
  audio = null
  options = {}
  events = new Events()
  songList = []
  currentIndex = 0
  constructor(options = { preload: true, mode = 1 }) {
    this.options = options
    this.init()
  }
  /**
  * mode =  1,歌单循环;2,歌单随机;3,单曲循环
  */
  init() {
    this.audio = document.createElement('audio')
    this.audio.preload = this.options.preload
    for (let i = 0; i < this.events.audioEvents.length; i++) {
        this.audio.addEventListener(this.events.audioEvents[i], (e) => {
            this.events.trigger(this.events.audioEvents[i], e);
        });
    }
  }
  on(name, callback) {
    this.events.on(name, callback)
  }
  play(){
    this.audio.play()
  }
  pause(){
    this.audio.pause()
  }
  next(){
    const mode  = ~~this.options.mode
    if(mode === 1){
      this.currentIndex === this.songList.length - 1
      ? (this.currentIndex = 0)
      : this.currentIndex++;
    }
    if(mode === 2){

    }
  }
  setAudio(value){
    this.audio.src = value
    if(this.audio.pause){
      this.play()
    }
  }
  loop(value){
    this.audio.loop = value
  }

}
class Events {
  constructor() {
    this.events = {}

    this.audioEvents = [
      'abort',
      'canplay',
      'canplaythrough',
      'durationchange',
      'emptied',
      'ended',
      'error',
      'loadeddata',
      'loadedmetadata',
      'loadstart',
      'mozaudioavailable',
      'pause',
      'play',
      'playing',
      'progress',
      'ratechange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeupdate',
      'volumechange',
      'waiting'
    ]
    this.playerEvents = []
  }

  on(name, callback) {
    if (this.has(name) && typeof callback === 'function') {
      if (!this.events[name]) {
        this.events[name] = []
      }
      this.events[name].push(callback)
    }
  }
  has(name) {
    return this.audioEvents.includes(name) || this.playerEvents.includes(name)
  }
  trigger(name, data) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](data)
      }
    }
  }
}
