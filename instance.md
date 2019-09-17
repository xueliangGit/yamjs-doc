# yamjs组件实例

## 组件实例

每一个yamjs组件都需要使用**装饰器和`class`**方式去创建，

```js
// 描述一个组件的行为 [推荐，使用构建工具来构建] 
@Component({
  tagName: "tag-name",
  style: require("./tagname.stylus"),
  props: ["msg"]
})
//一个组件的具体表现
class App extend yamjs {
  // 选项
}
export default App
//或者 （后续由于使用第三方js环境来演示事例，故使用的这个方式来做的）
export default Component({
  tagName: "tag-name",
  style: require("./tagname.stylus"),
  props: ["msg"]
})(
  class App extend yamjs {
    // 选项
  }
)
```

创建时会先注册自定义元素标签名进而可以通过标签名来驱动程序的运行。

## 适配器的使用

配置项有

- `tagName` 组件名/标签名(带链接符)

  - 在 webComponent 模式下（即默认模式下：`customElements:true`），该名字就是标签名字。组件内外直接写标签就可以渲染出来，组件内也可以写成引入的组件名字。
  - 在非 webComponent 模式下（即`customElements:false`），在组件环境外需要使用`renderAt(el)`函数去执行 root 元素渲染，组件内部需要写引入的组件名字。

- `style`样式

  - 暂时支持引入写法，样式暂时使用 stylus 语法，框架约定了一种规则，在样式文件顶部若是出现`[scope]`关键字，那么这个样式仅仅对该组件生效，若是没有出现`[scope]`关键字，那么该样式在 dom 根结点下全局有效：例如

    - 带有`[scope]`

      ```stylus
      // styl 样式
      [scope]
      div
        height 100%
        font-weight bold
      a
        display inline-block
      ```

      编译后是

      ```html
      <style>
        [dom="com_go-top"] div {
          height: 100%;
          font-weight: bold;
        }
        [dom="com_go-top"] a {
          display: inline-block;
        }
      </style>
      <div dom="com_go-top">
        ....
      </div>
      ```

    - 若是不带有`[scope]`

      ```stylus
      // styl 样式
      div
        height 100%
        font-weight bold
      a
        display inline-block
      ```

      编译后是

      ```html
      <style>
        div {
          height: 100%;
          font-weight: bold;
        }
        a {
          display: inline-block;
        }
      </style>
      <div dom="com_go-top">
        ....
      </div>
      ```

      - [root]根结点 是\$dom 元素

  - 支持使用@import 引入外部样式文件

- `shadow`影子树（`false`）是否使用影子树，影子树，参考[MDN 的解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/shadow)，简单来说就是隔离开原有的 dom 环境，新建一个环境，次新环境与外环境样式不相冲突。默认是`false`

- `customElements`使用 webcomponent 形式（`true`）是否使用原生 webComponent 形式，默认是`true`，将影响组件的写法。为`true`时，直接写`tagName`即可，为`false`时，需要在 js 里使用`renderAt(el)`来渲染。

- `props`父级传值（`[]`）

  - 来自于父级的传值。在组件内部传值随意，
  - **组件环境外部向组件传值时只能是字符串形式**。

- `canBeCalledExt`是否可以被外部调用(false)

  - 主要是用外组件环境外界调用内部组件内部方法时使用，默认是 false

## 数据与方法

当一个yamjs实例被创建时，会先处理$data、prop中的所有属性会依次加入到yamjs的响应系统中当这些属性改变时，视图将会产生相应的修改，展示最新视图。

```js
@Component({
  tagName: "tag-name",
  style: require("./tagname.stylus"),
  props: ["msg"]
})
//一个组件的具体表现
class App extend yamjs {
  $data(){
    return {
      list:[]
    }
  }
  getList(i){
    return (<li>{{i}}</li>)
  }
  $created(){
    this.list=[1,2,3,4,5]
  }
redenr(){
  return {this.list.map(v=>this.getList(v))}
}
}
```

若是你在程序运行中去手动添加参数，区更改改参数是没有变化的，需要调用update方法统一管理（亦可自己写一个公共类似setData的方法去管理）



<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs-demo-1" src="//codepen.io/xueliang/embed/eYOjxoY/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/eYOjxoY/'>yamjs-demo-1</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>



## 生命周期

和一般的框架类似，yamjs也有自己的生命周期，和其他的类似

* 创建实例，并且组件启动->启动`init`函数

- `$beforeCreate(){}`组件实例被创建之前
- `$created(){}`组件实例被创建之后
- `$beforeMount(){}`组件实例数据渲染之前
- `$mounted(){}`组件实例数据渲染之后（这个时候基本上已经渲染完了 dom）
- `$beforeUpdate(){}`组件内部数据后 dom 更新之前调用
- `$updated(){}`组件内部数据更新后 dom 更新后调用（*注意：在此回调里进行给数据赋值，可能会导致死循环，ruturn false 可以避免*)
- `$beforeDestroyed(){}`组件销毁之前调用
- `$destroyed(){}`组件销毁之后调用

## 公共方法

- `emit` 触发本组件的方法，主要用在组件外环境调用组件方法
- `emitProp` 触发通过属性传递的方法，适用于组件内外环境
- `update`手动进行更新
- `render`渲染的模版
- `onReady`组件加载渲染完成，主要是时用于与外部接触的组件

## 模板语法

yamjs暂时只支持使用了react的jsx语言去编写的，选择jsx的原因是jsx语言可以快速生成虚拟dom，方便框架的进一步的开发，后期将自定义适合yamjs自身的jsx语法。暂时语法与react的jsx一样；

样式写法选用的stylus语法，需要自己使用require导入。

