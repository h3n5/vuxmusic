import Auplayer from './index'
const install = vue => {
  const au = new Auplayer()
  console.log('初始化音乐播放器')
  au.on(
    'ended',
    function() {
      this.next()
    }.bind(au)
  )
  au.on(
    'canplay',
    function(e) {
      this.setdurationTime(e.target.duration)
    }.bind(au)
  )
  au.on(
    'timeupdate',
    function(e) {
      this.setcurrentTime(e.target.currentTime)
    }.bind(au)
  )
  vue.prototype.$music = au
}
export default install
