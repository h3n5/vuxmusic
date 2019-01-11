class Drag {
    constructor(ball, bar) {
        this.target = document.querySelector(ball)
        this.limit = document.querySelector(bar)
        this.flag = false
        this.per = 0
        this.event = {}
        this.init()
    }
    init() {
        this.target.ontouchstart = this.touchstart.bind(this)
        this.target.ontouchend = this.touchend.bind(this)
        this.target.ontouchmove = this.touchmove.bind(this)
    }
    touchstart() {
        this.flag = true
    }
    touchend() {
        this.flag = false
        this.event.end.call(this, this.per)
    }
    touchmove(e) {
        if (this.flag) {
            e = e.touches[0]
            var left = this.limit.offsetLeft
            var width = this.limit.offsetWidth
            var targetWidth = this.target.offsetWidth
            var distance = e.clientX - left - targetWidth / 2
            distance = distance > width - targetWidth / 2 ? width - targetWidth / 2 : distance
            distance = distance < 0 ? 0 : distance
            this.per = distance / width
        }
    }
    on(event, callback) {
        this.event[event] = callback
    }
}
export default Drag