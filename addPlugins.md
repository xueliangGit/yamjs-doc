# yamjs扩展编写

yamjs支持自己编写扩展

## 扩展规则

yamjs提供一个静态方法`Yam.use`用来安装扩展

一个扩展的形式应该是个对象

有`name`值和`install`方法，例如下面这个样子

```js
let plugin = {
  name: "",
  install: target => {
    terget.addPrototype("fadeIn", function() {});
  }
};
```

- `name`
  - 扩展名字，用来区分其他扩展，避免重复加载的。
- `needs`依赖某个扩展，若设置了，检测到没有安装这个依赖，会有警告信息；接受数组`[]`
- `install`
  - 安装扩展的方法，接受一个参数`target`,参数暂时只有一个方法`addPrototype`用来添加框架公共方法，接受两个参数，第一个是方法名，第二个是方法函数；若是方法名与内置名或者已经有的方法冲突，该方法将添加失败。当使用元素时，可以通过`this.elm`获取

> ##### 组件内一些写扩展时可能用到的值值的说明

- `this.elm` 该组件的最外层`dom`，主要是用来包裹组件
- `this.$dom` 该组件的内容`dom`，若是样式中使用了`[root]`属性，那就是应用到这个 dom 上
- `this.prop` 是组件内部属性传值的缓存值，虽然你可以直接从这里取到来自父级元素的值或者方法，但是建议不要做，当你的组件运营在外部环境中时，是没有`this.prop`,所以用这样取值会报错的。建议使用`this.emitProp`来触发父级传递的方法，去`prop`值，直接用`this.`取值就行
- `this.addDestory`添加组件消除时要销毁的方法，例如 setTimeout

## 扩展编写

例子

```js
import Yam from "yamjs";
import animate from "./animate";
Yam.use(animate);
```



```js
//animate.js
export default {
  name: "animate",
  needs: ["tolls"],
  install: function(terget) {
    terget.addPrototype("fadeOut", function(duration = 300) {
      const keyframes = [
        { opacity: 1, marginTop: "0" },
        { opacity: 0, marginTop: "50px" }
      ];
      return _animate.call(this, keyframes, duration).finished;
    });
    terget.addPrototype("fadeIn", function(duration = 300) {
      const keyframes = [
        { opacity: 0, marginTop: "50px" },
        { opacity: 1, marginTop: "0px" }
      ];
      return _animate.call(this, keyframes, duration).finished;
    });
  }
};
function _animate(keyframes, duration) {
  console.log(this);
  for (let i in keyframes[0]) {
    this.elm.style[i] = keyframes[0][i];
  }
  this.elm.style.display = "block";
  this.elm.style.transition = duration + "ms";
  for (let i in keyframes[1]) {
    this.elm.style[i] = keyframes[1][i];
  }
  setTimeout(() => {
    this.elm.style.transition = "";
  }, duration);
  return {};
}
```

