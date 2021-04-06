<template>
  <div class="page">
    <el-tabs v-model="activeName" style="width: 100%;height: 100%;display: flex;flex-direction: column;">
      <el-tab-pane label="编码" name="encode">
        <div style="display: flex;justify-content: center;align-items: center;">
          编码内容：
          <el-input v-model="data" style="width: 200px;margin-right: 20px;" placeholder="只支持整数"></el-input>
          不透明度(0-1，推荐小于0.3)：
          <el-input v-model="opacity" style="width: 80px;"></el-input>
          <el-button style="margin-left: 20px;" type="primary" @click="encode">编码</el-button>
        </div>
        <img style="height: 80%;width: auto;" src="./3.png"/>
      </el-tab-pane>
      <el-tab-pane label="解码" name="decode">
        <div v-if="step == 1">拖动四个定位点，使其分别位于解码原平面中的一个矩形的四个顶点（注意顶点的顺序）</div>
        <div v-if="step == 2">拖动两个定位点，分别位于一个矩形的左上角和右下角。</div>
        <div id="konva" :style="{width: konvaWidth +'px', height: konvaWidth + 'px'}">
        </div>
        <input type="file" @change="selectFile" accept="image/*"></input>
        <el-button @click="pretreatment" style="margin-top: 20px;">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="解码说明" name="instruction">
        <div style="display: flex;flex-direction: column;align-items: center">
          1、拖动四个顶点在原图上框选出一个矩形,注意：<br>
          1)选取的矩形要求在原始图片/屏幕中也是一个矩形<br>
          2)所选取的矩形区域尽可能大<br>
          3)注意四个顶点的顺序
          <img style="width: 500px;height: auto" src="./1.jpg" />
          2、拖动两个顶点标记一个色块的对角点<br>
          1)注意两个顶点的顺序<br>
          2)不同图片色块区域可能有缺损，可以估计位置，<br>
          但要保证不但标记出来的是一个完整的色块，所画出来的其它网格中也较好的匹配其它色块
          <div style="display: flex">
            <img style="width: 400px;height: auto" src="./2.jpg" />
            <img style="width: 400px;height: auto" src="./3.jpg" />
          </div>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
const domId = "qr"
export const server = "https://steganography.rosc.org.cn/api"
// export const server = "http://127.0.0.1:5000"
import VueKonva from 'vue-konva'
import axios from "axios"
import {
  Message
} from 'element-ui'

export default {
  mounted() {
    this.stage = new Konva.Stage({
      container: "konva",
      width: this.konvaWidth,
      height: this.konvaWidth
    })
    this.imageLayer = new Konva.Layer()
    this.pointLayer = new Konva.Layer()
    this.lineLayer = new Konva.Layer()
    this.stage.add(this.imageLayer)
    this.stage.add(this.lineLayer)
    this.stage.add(this.pointLayer)
  },
  data() {
    return {
      activeName: "instruction",
      data: "",
      file: null,
      opacity: 0.15,
      konvaWidth: 1000,
      stage: null,
      imageLayer: null,
      pointLayer: null,
      lineLayer: null,
      points1: [], // lt rt rb lb
      points2: [],
      imageShape: [], // 高 宽
      imageBinaryShape: [], // 高 宽
      step: 1,
    }
  },
  methods: {
    install(data, opacity) {
      return new Promise(function(resolve, reject) {
        let idObject = document.getElementById(domId);
        if (idObject != null)
          idObject.parentNode.removeChild(idObject);
        axios.get(`${server}/encode`, {
          params: {
            data: data
          }
        })
            .then((resp) => {
              if (resp.data.code == 200) {
                let div = document.createElement("div")
                div.id = domId
                div.style.opacity = opacity
                div.style.width = "100vw"
                div.style.height = "100vh"
                div.style.position = "fixed"
                div.style.left = "0px"
                div.style.top = "0px"
                div.style.backgroundImage = `url(data:image/png;base64,${resp.data.data})`
                div.style.pointerEvents = "none"
                document.body.appendChild(div)
                resolve("ok")
              } else {
                reject(resp.data.msg)
              }
            })
            .catch((err) => {
              reject(err.toString())
            })
      })
    },
    encode() {
      this.install(this.data, this.opacity).then(() => {
        Message.success("加密成功")
      }).catch((err) => {
        Message.error("加密失败：" + err);
      })
    },
    selectFile(e) {
      this.imageLayer.clear()
      this.file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (result) => {
        let image = new Image()
        image.src = result.target.result
        image.onload = () => {
          this.imageShape = [image.height, image.width]
        }
      }
      reader.readAsDataURL(this.file)
      let url = URL.createObjectURL(this.file)
      let image = new Image()
      image.src = url
      image.onload = () => {
        let konvaImage = new Konva.Image({
          image: image,
          x: 0,
          y: 0,
          width: this.stage.width(),
          height: this.stage.height()
        })
        // konvaImage.cache()
        // konvaImage.filters([Konva.Filters.Enhance])
        // konvaImage.enhance(2)
        this.imageLayer.add(konvaImage)
        this.imageLayer.draw()
        this.initPoints1()
        this.updateLines()
      }
    },
    appendPoints1(formData) {
      let widthRatio = this.stage.width() / this.imageShape[1]
      let heightRatio = this.stage.height() / this.imageShape[0]
      formData.append("x1", parseInt(this.points1[0].x() / widthRatio))
      formData.append("y1", parseInt(this.points1[0].y() / heightRatio))
      formData.append("x2", parseInt(this.points1[1].x() / widthRatio))
      formData.append("y2", parseInt(this.points1[1].y() / heightRatio))
      formData.append("x3", parseInt(this.points1[2].x() / widthRatio))
      formData.append("y3", parseInt(this.points1[2].y() / heightRatio))
      formData.append("x4", parseInt(this.points1[3].x() / widthRatio))
      formData.append("y4", parseInt(this.points1[3].y() / heightRatio))
    },
    appendPoints2(formData) {
      let widthRatio = this.stage.width() / this.imageBinaryShape[1]
      let heightRatio = this.stage.height() / this.imageBinaryShape[0]
      formData.append("x5", parseInt(this.points2[0].x() / widthRatio))
      formData.append("y5", parseInt(this.points2[0].y() / heightRatio))
      formData.append("x6", parseInt(this.points2[1].x() / widthRatio))
      formData.append("y6", parseInt(this.points2[1].y() / heightRatio))
    },
    pretreatment() {
      if (!this.file) return
      let formData = new FormData()
      formData.append("image", this.file)
      if (this.points2.length == 0) {
        this.appendPoints1(formData)
        axios.post(`${server}/pretreatment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then((resp) => {
              if (resp.data.code != 200) {
                Message.error(resp.data.msg)
              } else {
                this.imageLayer.removeChildren()
                let image = new Image()
                image.onload = () => {
                  this.imageBinaryShape = [image.height, image.width]
                  this.imageLayer.add(new Konva.Image({
                    image: image,
                    x: 0,
                    y: 0,
                    width: this.stage.width(),
                    height: this.stage.height()
                  }))
                  this.imageLayer.draw()
                }
                image.src = `data:image/png;base64,${resp.data.data}`
                this.initPoints2()
              }
            })
      } else if (this.points2.length == 2) {
        this.appendPoints1(formData)
        this.appendPoints2(formData)
        axios.post(`${server}/decode`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then((resp) => {
              if (resp.data.code != 200) {
                Message.error(resp.data.msg)
              } else {
                Message.success(`解码成功:${resp.data.data}`)
              }
            })
      }
    },
    initPoints1() {
      this.step = 1
      this.points1 = []
      this.points2 = []
      let pointPositions = [[100, 100], [300, 100], [300, 300], [100, 300]]
      this.pointLayer.removeChildren()
      for (let pointPosition of pointPositions) {
        let circle = new Konva.Circle({
          x: pointPosition[0],
          y: pointPosition[1],
          radius: 8,
          fill: "red",
          draggable: true
        })
        circle.on("dragstart", () => {
          this.updateLines()
        })
        circle.on("dragmove", () => {
          this.updateLines()
        })
        this.pointLayer.add(circle)
        this.points1.push(circle)
      }
      this.pointLayer.draw()
    },
    initPoints2() {
      this.step = 2
      this.points2 = []
      this.lineLayer.removeChildren()
      this.lineLayer.draw()
      let pointPositions = [[200, 200], [300, 300]]
      this.pointLayer.removeChildren()
      for (let pointPosition of pointPositions) {
        let circle = new Konva.Circle({
          x: pointPosition[0],
          y: pointPosition[1],
          radius: 8,
          fill: "red",
          draggable: true
        })
        circle.on("dragstart", () => {
          this.updateGrid()
        })
        circle.on("dragmove", () => {
          this.updateGrid()
        })
        this.pointLayer.add(circle)
        this.points2.push(circle)
        this.updateGrid()
      }
      this.pointLayer.draw()
    },
    getLine(x1, y1, x2, y2) {
      return new Konva.Line({
        points: [x1, y1, x2, y2],
        stroke: "green",
        strokeWidth: 3
      })
    },
    updateLines() {
      this.lineLayer.removeChildren()
      this.lineLayer.add(this.getLine(this.points1[0].x(), this.points1[0].y(), this.points1[1].x(), this.points1[1].y()))
      this.lineLayer.add(this.getLine(this.points1[1].x(), this.points1[1].y() , this.points1[2].x(), this.points1[2].y() ))
      this.lineLayer.add(this.getLine(this.points1[2].x() , this.points1[2].y(), this.points1[3].x(), this.points1[3].y()))
      this.lineLayer.add(this.getLine(this.points1[3].x(), this.points1[3].y() , this.points1[0].x(), this.points1[0].y() ))
      this.lineLayer.draw()
    },
    updateGrid() {
      if (this.points2.length < 2) return
      this.lineLayer.removeChildren()
      let xStep = this.points2[1].x()- this.points2[0].x()
      let cx = this.points2[0].x()
      let xs = []
      while (cx > 0) {
        xs.unshift(cx)
        cx = cx - xStep
      }
      cx = this.points2[1].x()
      while (cx < this.stage.width()) {
        xs.push(cx)
        cx = cx + xStep
      }
      for (let x of xs) {
        this.lineLayer.add(this.getLine(x,0,x,this.stage.height()))
      }
      let yStep = this.points2[1].y() - this.points2[0].y()
      let cy = this.points2[0].y()
      let ys = []
      while (cy > 0) {
        ys.unshift(cy)
        cy = cy - yStep
      }
      cy = this.points2[1].y()
      while (cy < this.stage.height()) {
        ys.push(cy)
        cy = cy + yStep
      }
      for (let y of ys) {
        this.lineLayer.add(this.getLine(0,y,this.stage.width(),y))
      }
      this.lineLayer.draw()
    }
  }
}
</script>

<style>
.page {
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
  overflow: auto;
}

.el-tabs__content {
  display: flex;
  justify-content: center;
  flex: 1;
}

.el-tab-pane {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
