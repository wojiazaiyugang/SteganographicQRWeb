(function(t){function e(e){for(var n,r,o=e[0],p=e[1],h=e[2],l=0,c=[];l<o.length;l++)r=o[l],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&c.push(a[r][0]),a[r]=0;for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(t[n]=p[n]);d&&d(e);while(c.length)c.shift()();return s.push.apply(s,h||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,o=1;o<i.length;o++){var p=i[o];0!==a[p]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=i[0]))}return t}var n={},a={app:0},s=[];function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],p=o.push.bind(o);o.push=e,o=o.slice();for(var h=0;h<o.length;h++)e(o[h]);var d=p;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";i("85ec")},"31f2":function(t,e,i){"use strict";i("ebce")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("a026"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("HelloWorld")],1)},s=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("el-tabs",{staticStyle:{width:"100%",height:"100%",display:"flex","flex-direction":"column"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[n("el-tab-pane",{attrs:{label:"编码",name:"encode"}},[n("div",{staticStyle:{display:"flex","justify-content":"center","align-items":"center"}},[t._v(" 编码内容： "),n("el-input",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{placeholder:"只支持整数"},model:{value:t.data,callback:function(e){t.data=e},expression:"data"}}),t._v(" 不透明度(0-1，推荐小于0.3)： "),n("el-input",{staticStyle:{width:"80px"},model:{value:t.opacity,callback:function(e){t.opacity=e},expression:"opacity"}}),n("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.encode}},[t._v("编码")])],1),n("img",{staticStyle:{height:"80%",width:"auto"},attrs:{src:i("c39f")}})]),n("el-tab-pane",{attrs:{label:"解码",name:"decode"}},[1==t.step?n("div",[t._v("拖动四个定位点，使其分别位于解码原平面中的一个矩形的四个顶点（注意顶点的顺序）")]):t._e(),2==t.step?n("div",[t._v("拖动两个定位点，分别位于一个矩形的左上角和右下角。")]):t._e(),n("div",{style:{width:t.konvaWidth+"px",height:t.konvaWidth+"px"},attrs:{id:"konva"}}),n("input",{attrs:{type:"file",accept:"image/*"},on:{change:t.selectFile}}),n("el-button",{staticStyle:{"margin-top":"20px"},on:{click:t.pretreatment}},[t._v("下一步")])],1)],1)],1)},o=[],p=(i("d3b7"),i("25f0"),i("2b3d"),i("3ca3"),i("ddb0"),i("7591")),h=i.n(p),d=i("bc3a"),l=i.n(d),c=i("5c96"),u=i.n(c),g="qr",f="https://steganography.rosc.org.cn/api",y={mounted:function(){this.stage=new Konva.Stage({container:"konva",width:this.konvaWidth,height:this.konvaWidth}),this.imageLayer=new Konva.Layer,this.pointLayer=new Konva.Layer,this.lineLayer=new Konva.Layer,this.stage.add(this.imageLayer),this.stage.add(this.lineLayer),this.stage.add(this.pointLayer)},data:function(){return{activeName:"encode",data:"",file:null,opacity:.15,konvaWidth:1e3,stage:null,imageLayer:null,pointLayer:null,lineLayer:null,points1:[],points2:[],imageShape:[],imageBinaryShape:[],step:1}},methods:{install:function(t){return new Promise((function(e,i){var n=document.getElementById(g);null!=n&&n.parentNode.removeChild(n),l.a.get("".concat(f,"/encode"),{params:{data:t}}).then((function(t){if(200==t.data.code){var n=document.createElement("div");n.id=g,n.style.opacity=opacity,n.style.width="100vw",n.style.height="100vh",n.style.position="fixed",n.style.left="0px",n.style.top="0px",n.style.backgroundImage="url(data:image/png;base64,".concat(t.data.data,")"),n.style.pointerEvents="none",document.body.appendChild(n),e("ok")}else i(t.data.msg)})).catch((function(t){i(t.toString())}))}))},encode:function(){this.install(this.data,this.opacity).then((function(){c["Message"].success("加密成功")})).catch((function(t){c["Message"].error("加密失败："+t)}))},selectFile:function(t){var e=this;this.imageLayer.clear(),this.file=t.target.files[0];var i=new FileReader;i.onload=function(t){var i=new Image;i.src=t.target.result,i.onload=function(){e.imageShape=[i.height,i.width]}},i.readAsDataURL(this.file);var n=URL.createObjectURL(this.file),a=new Image;a.src=n,a.onload=function(){var t=new Konva.Image({image:a,x:0,y:0,width:e.stage.width(),height:e.stage.height()});e.imageLayer.add(t),e.imageLayer.draw(),e.initPoints1(),e.updateLines()}},appendPoints1:function(t){var e=this.stage.width()/this.imageShape[1],i=this.stage.height()/this.imageShape[0];t.append("x1",parseInt(this.points1[0].x()/e)),t.append("y1",parseInt(this.points1[0].y()/i)),t.append("x2",parseInt(this.points1[1].x()/e)),t.append("y2",parseInt(this.points1[1].y()/i)),t.append("x3",parseInt(this.points1[2].x()/e)),t.append("y3",parseInt(this.points1[2].y()/i)),t.append("x4",parseInt(this.points1[3].x()/e)),t.append("y4",parseInt(this.points1[3].y()/i))},appendPoints2:function(t){var e=this.stage.width()/this.imageBinaryShape[1],i=this.stage.height()/this.imageBinaryShape[0];t.append("x5",parseInt(this.points2[0].x()/e)),t.append("y5",parseInt(this.points2[0].y()/i)),t.append("x6",parseInt(this.points2[1].x()/e)),t.append("y6",parseInt(this.points2[1].y()/i))},pretreatment:function(){var t=this;if(this.file){var e=new FormData;e.append("image",this.file),0==this.points2.length?(this.appendPoints1(e),l.a.post("".concat(f,"/pretreatment"),e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){if(200!=e.data.code)c["Message"].error(e.data.msg);else{t.imageLayer.removeChildren();var i=new Image;i.onload=function(){t.imageBinaryShape=[i.height,i.width],t.imageLayer.add(new Konva.Image({image:i,x:0,y:0,width:t.stage.width(),height:t.stage.height()})),t.imageLayer.draw()},i.src="data:image/png;base64,".concat(e.data.data),t.initPoints2()}}))):2==this.points2.length&&(this.appendPoints1(e),this.appendPoints2(e),l.a.post("".concat(f,"/decode"),e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){200!=t.data.code?c["Message"].error(t.data.msg):c["Message"].success("解码成功:".concat(t.data.data))})))}},initPoints1:function(){var t=this;this.step=1,this.points1=[],this.points2=[];var e=[[100,100],[300,100],[300,300],[100,300]];this.pointLayer.removeChildren();for(var i=0,n=e;i<n.length;i++){var a=n[i],s=new Konva.Circle({x:a[0],y:a[1],radius:8,fill:"red",draggable:!0});s.on("dragstart",(function(){t.updateLines()})),s.on("dragmove",(function(){t.updateLines()})),this.pointLayer.add(s),this.points1.push(s)}this.pointLayer.draw()},initPoints2:function(){var t=this;this.step=2,this.points2=[],this.lineLayer.removeChildren(),this.lineLayer.draw();var e=[[200,200],[300,300]];this.pointLayer.removeChildren();for(var i=0,n=e;i<n.length;i++){var a=n[i],s=new Konva.Circle({x:a[0],y:a[1],radius:8,fill:"red",draggable:!0});s.on("dragstart",(function(){t.updateGrid()})),s.on("dragmove",(function(){t.updateGrid()})),this.pointLayer.add(s),this.points2.push(s),this.updateGrid()}this.pointLayer.draw()},getLine:function(t,e,i,n){return new Konva.Line({points:[t,e,i,n],stroke:"green",strokeWidth:3})},updateLines:function(){this.lineLayer.removeChildren(),this.lineLayer.add(this.getLine(this.points1[0].x(),this.points1[0].y(),this.points1[1].x(),this.points1[1].y())),this.lineLayer.add(this.getLine(this.points1[1].x(),this.points1[1].y(),this.points1[2].x(),this.points1[2].y())),this.lineLayer.add(this.getLine(this.points1[2].x(),this.points1[2].y(),this.points1[3].x(),this.points1[3].y())),this.lineLayer.add(this.getLine(this.points1[3].x(),this.points1[3].y(),this.points1[0].x(),this.points1[0].y())),this.lineLayer.draw()},updateGrid:function(){if(!(this.points2.length<2)){this.lineLayer.removeChildren();var t=this.points2[1].x()-this.points2[0].x(),e=this.points2[0].x(),i=[];while(e>0)i.unshift(e),e-=t;e=this.points2[1].x();while(e<this.stage.width())i.push(e),e+=t;for(var n=0,a=i;n<a.length;n++){var s=a[n];this.lineLayer.add(this.getLine(s,0,s,this.stage.height()))}var r=this.points2[1].y()-this.points2[0].y(),o=this.points2[0].y(),p=[];while(o>0)p.unshift(o),o-=r;o=this.points2[1].y();while(o<this.stage.height())p.push(o),o+=r;for(var h=0,d=p;h<d.length;h++){var l=d[h];this.lineLayer.add(this.getLine(0,l,this.stage.width(),l))}this.lineLayer.draw()}}}},v=y,m=(i("31f2"),i("2877")),w=Object(m["a"])(v,r,o,!1,null,null,null),x=w.exports,L={name:"App",components:{HelloWorld:x}},b=L,S=(i("034f"),Object(m["a"])(b,a,s,!1,null,null,null)),k=S.exports;i("0fae");n["default"].config.productionTip=!1,n["default"].use(u.a),n["default"].use(h.a),new n["default"]({render:function(t){return t(k)}}).$mount("#app")},"85ec":function(t,e,i){},c39f:function(t,e,i){t.exports=i.p+"assets/img/3.2b937106.png"},ebce:function(t,e,i){}});
//# sourceMappingURL=app.dc767e2d.js.map