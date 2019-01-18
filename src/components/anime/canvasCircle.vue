<template>
  <div>
     <canvas  id="canvasgraph" width="300" height="300"></canvas>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    drawMain(percent, forecolor, bgcolor, circleWidth,currentTime) {
      /*
        @drawing_elem: 绘制对象
        @percent：绘制圆环百分比, 范围[0, 100]
        @forecolor: 绘制圆环的前景色，颜色代码
        @bgcolor: 绘制圆环的背景色，颜色代码#16ade6 f9ed69 f08a5d b83b5e 6a2c70
        @circleWidth:width
        */
      var drawing_elem = document.querySelector("#canvasgraph");
      if(!drawing_elem){return}
      var context = drawing_elem.getContext("2d");
      var center_x = drawing_elem.width / 2;
      var center_y = drawing_elem.height / 2;
      var rad = Math.PI * 2;
      context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
      backgroundCircle();
      text(currentTime);
      foregroundCircle(percent);
      percentdoll(percent)
      // 绘制圆圈dian
      function percentdoll(n) {
        
        var para =  n * Math.PI * 2;
        var px = center_x + circleWidth * Math.cos(para + Math.PI*1.5) - 2.5;
        var py = center_y + circleWidth * Math.sin(para + Math.PI*1.5) - 2.5; 
        context.save();
        context.beginPath();
        context.arc(px, py, 5, 0, Math.PI * 2, false);
        context.fillStyle = forecolor;
        context.fill();
        context.restore();
      }
      // 绘制背景圆圈
      function backgroundCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = 2; //设置线宽
        var radius = circleWidth - context.lineWidth;
        context.lineCap = "round";
        context.strokeStyle = bgcolor;
        context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
      }

      //绘制运动圆环
      function foregroundCircle(n) {
        context.save();
        context.strokeStyle = forecolor;
        context.lineWidth = 2;
        context.lineCap = "round";
        var radius = circleWidth - context.lineWidth;
        context.beginPath();
        context.arc(
          center_x,
          center_y,
          radius,
          -Math.PI / 2,
          -Math.PI / 2 + n * rad,
          false
        ); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
      }

      //绘制文字
      function text(time) {
        time = dateFormat(Math.round(time))
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = "#fff";
        var font_size = 18;
        context.font = font_size + "px Helvetica";
        var text_width = 40;
        context.fillText(
          time,
          center_x - text_width / 2,
          center_y + font_size / 2
        );
        context.restore();
      }
      function dateFormat(value) {
        let left =
          parseInt(value / 60) < 10
            ? "0" + parseInt(value / 60)
            : parseInt(value / 60);
        let right = value % 60 < 10 ? "0" + (value % 60) : value % 60;
        return left + ":" + right;
      }
    }
  }
};
</script>
<style lang='less' scoped>
</style>
