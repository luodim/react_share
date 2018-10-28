import React from 'react'
import * as PIXI from 'pixi.js'
import {
  easing,
  keyframes,
  timeline
} from 'popmotion'

class DynamicBg extends React.Component {

  initCanvas() {
    let app = new PIXI.Application({
      autoResize: true,
      width: window.innerWidth,
      height: window.innerHeight,
      resolution: devicePixelRatio,
      antialias: true,
      transparent: false, // default: false
    })
    app.renderer.backgroundColor = 0x40C4FF
    document.getElementById('dybg_root').appendChild(app.view)
    window.addEventListener('resize', () => {
      app.renderer.resize(window.innerWidth, window.innerHeight)
    })
    document.addEventListener('visibilitychange', () => {
      let isHidden = document.hidden
      if (isHidden) {
        clearTimeout(this.timer)
      } else {
        this.startGenRipples()
      }
    })
    this.stage = app.stage
    this.rect = this.getRect()
    this.ripplePool = []
    this.initRipplePool()
    this.startGenRipples()
  }

  animFinishCB(index) {
  	if (index > 1) {
  	  this.ripplePool.splice(index, 1)
  	  console.log(`clear----${index}`)
  	}
  }

  getRect() {
  	let rectangle = new PIXI.Graphics()
  	rectangle.beginFill(0x40C4FF)
  	rectangle.drawRect(0, 0, window.innerWidth, window.innerHeight)
  	rectangle.endFill()
  	this.stage.addChild(rectangle)
  	rectangle.interactive = true
    rectangle.on('pointerdown', (e) => {
      this.getRipple().setRippleParams({
      	x: e.data.global.x,
        y: e.data.global.y,
        radius: 10,
        maxOpacity: 0.6,
        midRatio: 0.1,
        maxScale: 10,
        duration: 2000
      }).startAnim()
    })
  	return rectangle
  }

  // 如果不点击自动生成水波纹，最多有两个绘制对象既可，后续生成可复用
  initRipplePool() {
  	for (let i = 0; i < 2; i ++) {
  	  this.addRipple(i)
  	}
  }

  getRipple() {
  	for (let ripple of this.ripplePool) {
  	  if (!ripple.getAnimState()) {
  	  	return ripple
  	  }
  	}
  	let i = this.ripplePool.length
  	return this.addRipple(i)
  }

  addRipple(index) {
  	let ripple = new Ripple(this.stage, index, (index) => this.animFinishCB(index))
    this.ripplePool.push(ripple)
    return ripple
  }

  startGenRipples() {
    this.getRipple().startAnim()
    this.timer = setTimeout(() => {
      this.startGenRipples()
    }, getRandom(3, 8) * 1000)
  }

  componentDidMount() {
    this.initCanvas()
  }

  componentWillUnmount() {
  	clearTimeout(this.timer)
  }

  render() {
    return <div id='dybg_root'></div>
  }
}

const getRandom = (a, b) => {
  return Math.floor(Math.random() * (b + 1 - a) + a)
}

class Ripple {
  constructor(stage, index, f) {
    this.stage = stage
    this.index = index
    this.handleAnimFinish = (index) => f(index)
    this.colorList = [0x01579B, 0x0288D1, 0x81D4FA, 0xE1F5FE]
    this.el = this.getRipple()
    this.isInAnim = false
  }

  getAnimState() {
    return this.isInAnim
  }

  getRipple() {
    let x = getRandom(0, window.innerWidth)
    let y = getRandom(0, window.innerHeight)
    let radius = getRandom(5, 20)
    let color = this.colorList[Math.floor(Math.random() * 4)]
    let circle = new PIXI.Graphics()
    let maxOpacity = getRandom(4, 8) / 10
    let midRatio = getRandom(3, 4) / 10
    let maxScale = getRandom(10, 20)
    let duration = getRandom(5, 10) * 1000
    circle.beginFill(color)
    circle.drawCircle(x, y, radius)
    circle.endFill()
    circle.alpha = 0
    return {
      ripple: circle,
      x: x,
      y: y,
      radius: radius,
      color: color,
      maxOpacity: maxOpacity,
      midRatio: midRatio,
      maxScale: maxScale,
      duration: duration
    }
  }

  setRippleParams(obj) {
  	if (obj) {
      Object.assign(this.el, obj)
  	}
  	return this
  }

  startAnim() {
  	console.log(`start------${this.index}`)
  	let el = this.el
  	this.stage.addChild(el.ripple)
  	this.isInAnim = true
    keyframes({
      values: [{
        scale: 0,
        opacity: 0
      }, {
        scale: el.maxScale * el.midRatio,
        opacity: el.maxOpacity
      }, {
        scale: el.maxScale,
        opacity: 0
      }],
      duration: el.duration,
      times: [0, el.midRatio, 1],
      easings: [easing.easeIn, easing.linear, easing.easeOut]
    }).start({
      update: v => this.updateAnim(v),
      complete: () => this.completeAnim()
    })
  }

  updateAnim(v) {
  	let el = this.el
    if (v.scale !== undefined) {
      el.ripple.clear()
      el.ripple.beginFill(el.color)
      el.ripple.drawCircle(el.x, el.y, el.radius * v.scale)
      el.ripple.endFill()
    }
    if (v.opacity !== undefined) {
      el.ripple.alpha = v.opacity
    }
  }

  completeAnim() {
    this.stage.removeChild(this.el.ripple)
    this.isInAnim = false
    this.handleAnimFinish(this.index)
    this.el.x = getRandom(0, window.innerWidth)
    this.el.y = getRandom(0, window.innerHeight)
    this.el.radius = getRandom(5, 20)
    this.el.color = this.colorList[Math.floor(Math.random() * 4)]
    this.el.maxOpacity = getRandom(4, 8) / 10
    this.el.midRatio = getRandom(4, 8) / 10
    this.el.maxScale = getRandom(10, 20)
    this.el.duration = getRandom(5, 10) * 1000
  }
}

export default DynamicBg