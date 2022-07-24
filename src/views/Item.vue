<template>
  <div>
      Item
      <router-link to="1">Item1</router-link> |
      <router-link to="2">Item2</router-link><br>
      {{ $route.params.id }}
      <div style="display:flex">
      <div class="canvas">
        <div class="box"></div>
        <div class="svg">
          <svg width="1000" height="500" viewBox="0, 0, 1000, 500" xmlns="http://www.w3.org/2000/svg"
            @mouseup.prevent.stop="initialize"
            @mousemove.prevent.stop="resize"
            @click="selectIdx = -1"
            :class="actionCarsor">
            <rect v-for="(r, idx) in rects" :key="idx"
              @click="selectRect(idx)"
              @mousedown="move($event, idx)"
              @mousemove="mouseMove"
              @mouseup="initialize"
              @click.prevent.stop
              fill="white" stroke="red" fill-opacity="0.1"
              :rx="r.rx"
              :x="r.x" :y="r.y" :width="r.w" :height="r.h"
              :class="rectCarsor">
            </rect>
            <!-- 左上 -->
            <circle v-if="selectIdx != -1 && !resizing"
              @mousedown='setResizeFlag("leftTop", true);resizing=true'
              @mouseup='initialize'
              @click.prevent.stop
              :cx="rects[selectIdx].x"
              :cy="rects[selectIdx].y"
              r="5"
              stroke="white"
              fill="white"
              stroke-width="2px"
              :class="carsorLeftTop"
            />
            <!-- 左下 -->
            <circle v-if="selectIdx != -1 && !resizing"
              @mousedown='setResizeFlag("leftBottom", true);resizing=true'
              @mouseup='initialize'
              @click.prevent.stop
              :cx="rects[selectIdx].x"
              :cy="rects[selectIdx].y + rects[selectIdx].h"
              r="5"
              stroke="white"
              fill="white"
              stroke-width="2px"
              class="carsor-left-bottom"
            />
            <!-- 右上 -->
            <circle v-if="selectIdx != -1 && !resizing"
              @mousedown.prevent.stop='setResizeFlag("rightTop", true);resizing=true'
              @mousemove.prevent.stop='resize'
              @mouseup.prevent.stop='initialize'
              @click.prevent.stop
              :cx="rects[selectIdx].x + rects[selectIdx].w"
              :cy="rects[selectIdx].y"
              r="5"
              stroke="white"
              fill="white"
              stroke-width="2px"
              class="carsor-right-top"
            />
            <!-- 右下 -->
            <circle v-if="selectIdx != -1 && !resizing"
              @mousedown='setResizeFlag("rightBottom", true);resizing=true'
              @mouseup='initialize'
              @click.prevent.stop
              :cx="rects[selectIdx].x + rects[selectIdx].w"
              :cy="rects[selectIdx].y + rects[selectIdx].h"
              r="5"
              stroke="white"
              fill="white"
              stroke-width="2px"
              class="carsor-right-bottom"
              @click="aaa"
            />
            <rect stroke="darkblue" stroke-width="5" fill="none" 
              x="600" :y="100" :width="300" :height="300">
            </rect>
          </svg>
        </div>
      </div>

      <!-- ゲイン調節 -->
      <svg width="400" height="500" viewBox="0, 0, 400, 500" xmlns="http://www.w3.org/2000/svg"
        :class="actionCarsor"
      >
        <rect stroke="darkblue" stroke-width="5" fill="gray"
          @mouseup.prevent.stop="initializeLine"
          @mousemove.prevent.stop="moveLine"
          x="0" y="0" width="400" height="500">
        </rect>
        <polyline fill="none" stroke="red" stroke-width="1"
          :points="polyline"
        />
        <circle
          v-for="(l, idx) in line" :key="idx"
          @click.prevent.stop
          @mousedown='setLineFlag(idx);lineFlag=true'
          @mouseup='initializeLine'
          :cx="l.x - 2.5"
          :cy="l.y - 2.5"
          r="5"
          stroke="black"
          fill="white"
          stroke-width="2px"
          class="carsor-w-resize"
          @click="aaa"
        />
      </svg>
      </div>

  </div>
</template>

<script>
export default {
  created () {
      console.log("Item.vue:created")
  },
  data () {
    return {
      ratio: 1,
      dx: 0,
      dy: 0,
      viewport: '0 0 500 500',
      isMove: false,
      beforeMouseX: null,
      beforeMouseY: null,
      selectIdx: -1,
      resizeFlag: {
        leftTop: false,
        rightTop: false,
        leftBottom: false,
        rightBottom: false,
      },
      resizing: false,
      moveLineIdx: -1,
      lineFlag: false,
      minWidth: 15,
      minHeight: 15,
      line: [
        {x:50, y: 25},
        {x:70, y: 50},
        {x:60, y: 75},
        {x:80, y: 100},
        {x:100, y: 125},
        {x:160, y: 150},
        {x:140, y: 175},
        {x:160, y: 200},
        {x:180, y: 225},
        {x:100, y: 250},
        {x:220, y: 275},
        {x:140, y: 300},
        {x:260, y: 325},
        {x:280, y: 350},
        {x:200, y: 375},
        {x:220, y: 400},
        {x:300, y: 425},
        {x:360, y: 450},
        {x:380, y: 475},
        {x:200, y: 500},
      ],
      rects: [
        {
          x: 10,
          y: 10,
          w: 100,
          h: 100,
          id: "green",
          color: 'green',
          stroke: 'black',
        },
        {
          x: 200,
          y: 150,
          w: 100,
          h: 100,
          color: 'red',
          stroke: 'black',
        },
        {
          x: 310,
          y: 410,
          w: 200,
          h: 100,
          color: 'blue',
          stroke: 'black',
        },
        {
          x: 100,
          y: 200,
          w: 200,
          h: 100,
          color: 'yellow',
          stroke: 'black',
        },
        {
          x: 300,
          y: 300,
          w: 50,
          h: 50,
          color: 'skyblue',
          stroke: 'black',
        },
        {
          x: 280,
          y: 280,
          w: 50,
          h: 50,
          color: 'white',
          stroke: 'black',
        },
        {
          x: 300,
          y: 300,
          w: 50,
          h: 50,
          color: 'pink',
          stroke: 'black',
        },
        {
          x: 150,
          y: 300,
          w: 50,
          h: 50,
          color: 'lightgreen',
          stroke: 'black',
        },
        {
          x: 50,
          y: 400,
          w: 200,
          h: 50,
          color: 'black',
          stroke: 'black',
        },
        {
          x: 50,
          y: 450,
          w: 200,
          h: 50,
          color: 'brown',
          stroke: 'black',
        },
      ]
    }
  },
  computed:  {
    carsorLeftTop () {
      return this.resizeFlag.leftTop ? "carsor-left-top-resize"  : "carsor-left-top-hover";
    },
    actionCarsor () {
      return this.resizing ? "carsor-resizing"  : null;
    },
    rectCarsor () {
      return this.resizing ? "carsor-resizing"  : "rect";
    },
    polyline () {
      let string = "";
      for (const s of this.line) {
        string += `${s.x},${s.y} `;
      }
      return string;
    }
  },
  watch: {
      $route(to, from) {
          console.log(to)
          console.log(from)
      }
  },
  methods: {
    initialize () {
      console.debug('log debug', this.isMove);
      console.info('log info', this.isMove);
      console.log('log normal', this.isMove);
      console.warn('log warning', this.isMove);
      console.error('log error', this.isMove);
      this.isMove = false
      this.setResizeFlag("leftTop", false);
      this.setResizeFlag("leftBottom", false);
      this.setResizeFlag("rightTop", false);
      this.setResizeFlag("rightBottom", false);
      this.resizing = false;
      this.beforeMouseX = null;
      this.beforeMouseY = null;
    },
    initializeLine () {
      this.lineFlag = false;
      this.beforeMouseX = null;
      this.beforeMouseY = null;
    },
    selectRect (i) {
      this.selectIdx = i;
    },
    aaa () {
      console.log("aaaaaaaaaaaaaaaaaaa")
    },
    setResizeFlag (pos, flag) {
      this.resizeFlag[pos] = flag;
      console.log("setResizeFlag", this.resizeFlag);
    },
    setLineFlag (idx) {
      this.moveLineIdx = idx;
    },
    // 図形を動かすフラグを立てる
    move (e, i) {
      this.isMove = true
      this.selectIdx = i
      e.preventDefault()
    },
    // マウスのクリックが終わった段階で初期化
    mouseUp (e) {
      this.isMove = false
      this.beforeMouseX = null
      this.beforeMouseY = null
      e.preventDefault()
    },
    // move中は前回まで動かした差分を取りながら座標を変化させていく
    mouseMove (e) {
      if (!this.isMove) return
      // console.log("mouseMove", e, this.dx, this.dy)
      // var mouseX = e.offsetX * this.ratio + this.dx
      // var mouseY = e.offsetY * this.ratio + this.dy

      var mouseX = e.offsetX
      var mouseY = e.offsetY
      var dx = 0
      var dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX
          dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      var tempX = dx + Number(this.rects[this.selectIdx].x)
      var tempY = dy + Number(this.rects[this.selectIdx].y)
      console.log("mouseMove", dx, dy, this.beforeMouseX, this.beforeMouseY, tempX, tempY);
      //var tempX = dx + Number(this.polygons[this.selectIdx].x)
      //var tempY = dy + Number(this.polygons[this.selectIdx].y)
      if (tempX > 0) this.rects[this.selectIdx].x = tempX
      if (tempY > 0 && tempY < 500) this.rects[this.selectIdx].y = tempY
      e.preventDefault()
    },
    resize (e) {
      if (!this.resizeFlag.leftTop && !this.resizeFlag.leftBottom && !this.resizeFlag.rightTop && !this.resizeFlag.rightBottom) return;
      var mouseX = e.offsetX
      var mouseY = e.offsetY
      var dx = 0
      var dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX
          dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      var tempX = dx + Number(this.rects[this.selectIdx].x)
      var tempY = dy + Number(this.rects[this.selectIdx].y)
      console.log(mouseX, mouseY, dx, dy, tempX, tempY);
      if (this.isMove) {
        console.log("Move");
        if (tempX > 0) this.rects[this.selectIdx].x = tempX;
        if (tempY > 0) this.rects[this.selectIdx].y = tempY;
      } else if (this.resizeFlag.leftTop) {
        console.log("LeftUp");
        if (tempX > 0 && this.rects[this.selectIdx].w - dx > this.minWidth) {
          this.rects[this.selectIdx].x = tempX;
          this.rects[this.selectIdx].w = this.rects[this.selectIdx].w - dx;
        }

        if (tempY > 0 && this.rects[this.selectIdx].h - dy > this.minHeight) {
          this.rects[this.selectIdx].y = tempY;
          this.rects[this.selectIdx].h = this.rects[this.selectIdx].h - dy;
        }
      } else if (this.resizeFlag.leftBottom) {
        console.log("LeftDown");
        if (tempX > 0 && this.rects[this.selectIdx].w - dx > this.minWidth) {
          this.rects[this.selectIdx].x = tempX;
          this.rects[this.selectIdx].w = this.rects[this.selectIdx].w - dx;
        }

        if (tempY > 0 && this.rects[this.selectIdx].h + dy > this.minHeight) {
          this.rects[this.selectIdx].h = this.rects[this.selectIdx].h + dy;
        }
      } else if (this.resizeFlag.rightTop) {
        console.log("RightUp");
        if (tempX > 0 && this.rects[this.selectIdx].w + dx > this.minWidth) {
          console.log("RightUp:x")
          this.rects[this.selectIdx].w = this.rects[this.selectIdx].w + dx;
        }

        if (tempY > 0 && this.rects[this.selectIdx].h - dy > this.minHeight) {
          console.log("RightUp:y")
          this.rects[this.selectIdx].y = tempY;
          this.rects[this.selectIdx].h = this.rects[this.selectIdx].h - dy;
        }
      } else if (this.resizeFlag.rightBottom) {
        console.log("RightDown");
        if (tempX > 0 && this.rects[this.selectIdx].w + dx > this.minWidth) {
          this.rects[this.selectIdx].w = this.rects[this.selectIdx].w + dx;
        }

        if (tempY > 0 && this.rects[this.selectIdx].h + dy > this.minHeight) {
          this.rects[this.selectIdx].h = this.rects[this.selectIdx].h + dy;
        }
      }
    },
    moveLine (e) {
      if (!this.lineFlag) return;
      var mouseX = e.offsetX
      var mouseY = e.offsetY
      var dx = 0
      var dy = 0
      if (this.beforeMouseX && this.beforeMouseY) {
          dx = mouseX - this.beforeMouseX
          dy = mouseY - this.beforeMouseY
      }
      this.beforeMouseX = mouseX
      this.beforeMouseY = mouseY
      var tempX = dx + Number(this.line[this.moveLineIdx].x)
      var tempY = dy + Number(this.line[this.moveLineIdx].y)
      console.log(mouseX, mouseY, dx, dy, tempX, tempY);
      if (tempX > 0) this.line[this.moveLineIdx].x = tempX;
    }
  },
  mounted () {
    console.log('MOUNT LISTENER ON')
    // document.addEventListener('mouseup', this.mouseUp)
    // document.addEventListener('mousemove', this.mouseMove)
  },
  beforeDestroy () {
    console.log('MOUNT LISTENER OFF')
    // document.removeEventListener('mouseup', this.mouseUp)
    // document.removeEventListener('mousemove', this.mouseMove)
  },
}
</script>

<style scoped>
.box {
    width        : 1000px;
    height       : 500px;
    background   : linear-gradient(to bottom, #99ccff, #0059b3);
    z-index: 1;
}

.canvas {
    position: relative;
}

.svg {
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
}

.rect {
  cursor: move;
}
 .carsor-left-top-hover {
  cursor: nwse-resize;
}

.carsor-left-top-resize {
  cursor: crosshair;
}

.carsor-resizing {
  cursor: crosshair;
}

.carsor-right-bottom {
  cursor: nwse-resize;
}
.carsor-right-top {
  cursor: nesw-resize;
}
.carsor-left-bottom {
  cursor: nesw-resize;
}

.carsor-w-resize {
  cursor: ew-resize
}
</style>
