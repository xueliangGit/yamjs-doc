# 深入了解组件

## 组件传值

在写业务时，组件间传值经常会遇到，对此yamjs也做了处理

### 环境内部组件间传值

​	在组件环境内，组件间传值类似`react`，只是取值不一样，取值的时候直接`this.data`的形式取值就行。

​	**组件间传值需要在装饰器中的`prop`注明才能去到值**

<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs-demo-2(组件内部使用传值)" src="//codepen.io/xueliang/embed/ZEzMKoZ/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/ZEzMKoZ/'>yamjs-demo-2(组件内部使用传值)</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 外环境给组件传值

​	组件环境外，即直接使用用在html，vue，react等环境中使用yamjs编写的组件时，一切传值只能字符串形式，	若是需要传json对象，可以自己转成 json 字符串，再组件内部接收时再转过去就行

<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs-demo-3(和html结合使用)" src="//codepen.io/xueliang/embed/MWgqmrZ/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/MWgqmrZ/'>yamjs-demo-3(和html结合使用)</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## 组件调用父级方法

### 环境内部调用

- 父组件调用子组件方法：通过在子组件上设置`ref`属性（`ref=elm`），父组件中通过`this.$refs`来获取子组件的信息(`this.$refs.elm`)，直接直接调用子组件的方法。  
- 子组件调用父组件方法：通过子组件以属性方式去绑定一个方法，这样就会传到子组件内，子组件内通过`this.emitProp('fnName'[,...param])`方法来出发，第一个参数是方法名，后面参数。该属性不需要在注解的 prop 内声明。

### 环境外部调用

外部调用组件内方法(需要在注解中设置`canBeCalledExt:true`)，可以通过先获取该组件渲染的根元素，例如是跟元素的 id 是 App，那么调用其组件方法是`App.emit('fnName'[,...param])`方法（`app.emit('init')`调用组件的 init 方法），获取组件内的子组件，设置子组件 ref 后通过`App.$refs('ref')`获取子组件，再进行操作。

- 在非框架的页面中使用组件触发组件外的方法

  需要定义全局的 function，属性绑定该方法名，组件内使用`this.emitProp()`方法去触发；

  ```html
  <date-picker id="datePicker" change="change" />
  <script>
    //组件外部
    function change() {
      // 要触发的方法
    }
  </script>
  <script>
    // 组件内部
    import Yam, { Component } from "../lib/index";
    @Component({
      tagName: "date-picker"
    })
    class App extends Yam {
      update() {
        this.emitProp("change");
      }
    }
    //...
  </script>
  ```

  

-  在第三方框架内使用组件触发组件外的方法

  各个框架都有自己的一套事件传递，触发方法，另外随着框架的更新，方式可能会改变，所以这里没有去做适配，添加了一个方法`addWatcher`来监听组件内部触发外部方法。由于在第三方框架中，div 大多都是动态渲染所以，需要使用`onReady`方法来检测加载完后的处理事件

  > _仅使用在在初始化中为加载完毕时，建议使用 **isInited**来检测一下看是否使用 onReady 方法_

  ```js
  <date-picker ref="datePicker" />
  <script>
    //组件外部
    new Vue({
      el: "App",
      mounted: () => {
        if (this.$refs.datePicker.isInited) {
          this.$refs.datePicker.emit("addWatcher", "change", e => {
            console.log(e);
          });
        } else {
          this.$refs.datePicker.onReady = function() {
            this.emit("addWatcher", "change", e => {
              console.log(e);
            });
          };
        }
      }
    });
    // react 类似
  </script>
  <script>
    // 组件内部
    import Yam, { Component } from "../lib/index";
    @Component({
      tagName: "date-picker"
    })
    class App extends Yam {
      update() {
        this.emitProp("change");
      }
    }
    //...
  </script>
  ```

调用组件的方法

<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs-demo-4(组件调用外部方法)" src="//codepen.io/xueliang/embed/WNegOPN/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/WNegOPN/'>yamjs-demo-4(组件调用外部方法)</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

运用在三方框架中

（和vue）

<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs and vue" src="//codepen.io/xueliang/embed/PrzVOj/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/PrzVOj/'>yamjs and vue</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

（和react）

<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs and react" src="//codepen.io/xueliang/embed/wLzERM/?height=265&theme-id=0&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/wLzERM/'>yamjs and react</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 组件插槽

Yamjs支持插槽 slot 方式渲染内容。

渲染规则：

- 组件内只有一个 slot 时，会默认渲染到这个 slot 里，不管是否设定 name 值

- 组件内有多个 slot 时，**需要设定 name 值来区分**，相应在组件外部写的时候需要设定 slot 属性，将根据 slot 和 name 匹配来渲染内容

- 组件内没有 slot 时，会默认把内容渲染到组件内容的尾部。

  _**注意，在使用 slot 时 shadow 不要是设为 True，否则，样式将不生效**_

<iframe height="265" style="width: 100%;" scrolling="no" title="yamjs-demo-5(组件插槽使用)" src="//codepen.io/xueliang/embed/aboayYa/?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/xueliang/pen/aboayYa/'>yamjs-demo-5(组件插槽使用)</a> by Xuxueliang
  (<a href='https://codepen.io/xueliang'>@xueliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>