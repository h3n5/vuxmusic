import Auplayer from './index'
const install = vue => {
  const au = new Auplayer()
  console.log('初始化音乐播放器')
  vue.prototype.$music = au
}
export default install
