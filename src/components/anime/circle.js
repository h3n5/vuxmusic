class Circle {
  constructor(id, width = 375, height = 375) {
    this.element = document.querySelector(id)
    this.element.width = this.width = width
    this.element.height = this.height = height
    this.context = this.element.getContext('2d')
    const c = [
      [22, 173, 230],
      [249, 237, 105],
      [240, 138, 93],
      [184, 59, 94],
      [106, 44, 112],
      [195, 214, 0]
    ]
    const color = c[~~(c.length * Math.random())]
    this.config = {
      radius: 100,
      num: 8,
      color: color,
      speed: 0.3,
      play: true
    }
    this.circles = Array(this.config.num)
      .fill({})
      .map((v, i) => {
        return {
          radius: (i + 1) * (this.width / this.config.num),
          alpha: 1,
          angel: (360 / this.config.num) * (i + 1)
        }
      })
    this.context.lineWidth = 0.5
    this.context.rect(0, 0, this.width, this.height)
    this.context.arc(this.width / 2, this.height / 2, 225 / 2, 0, 2 * Math.PI)
    this.context.clip('evenodd')
    this.drawCircle()
  }
  switch (v = true) {
    this.config.play = v
  }
  drawCircle() {
    if (this.config.play) {
      var context = this.context
      context.save()
      context.clearRect(0, 0, this.width, this.height)
      context.translate(this.width / 2, this.height / 2)
      for (let index = 0; index < this.config.num; index++) {
        var radius = this.circles[index].radius / 2
        var alpha = this.circles[index].alpha
        if (radius < this.width / 2) {
          this.circles[index].radius += this.config.speed
        } else {
          this.circles[index].radius = 0
        }
        if (alpha < this.config.speed * -1) {
          this.circles[index].alpha = 1
        } else if (radius > 160) {
          this.circles[index].alpha -= this.config.speed / 50
        }
        this.circles[index].angel += this.config.speed
        var angel = (this.circles[index].angel / 360) * 2 * Math.PI
        this.paint(this.context, 0, 0, radius, this.config.color, alpha)
        this.littleCircle(
          this.context,
          0,
          0,
          radius,
          5,
          angel,
          this.config.color,
          alpha
        )
      }
      context.restore()
    }
    requestAnimationFrame(this.drawCircle.bind(this))
  }
  paint(ctx, x, y, radius, color, alpha = 1) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
    ctx.stroke()
  }
  littleCircle(ctx, x, y, radius, length, angel, color, alpha) {
    ctx.beginPath()
    ctx.arc(
      x + radius * Math.cos(angel),
      y + radius * Math.sin(angel),
      length,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
    ctx.fill()
  }
}
export default Circle