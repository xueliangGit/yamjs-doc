## Yamjs-状态信息管理

> yamjs库的一个补充-公共状态管理

在有时候项目中会有一些公共的数据和状态在个组件中共享，使用并且有时候还要涉及到更改，所有用到状态的组件同一进行更新。

`yamjs-Store`是一个简单的状态管理器，可以多个组件或者全体使用或者混合使用。

1. 声明一个状态，其结构如下：

- `state`是状态结构，内部包含了使用的所有状态
- `methods`是自定义方法集，是在`store.commit()`的时候触发

```js
// store.js
import Store from "yamjs/plugins/store";
export default new Store({
  state: {
    width: 500
  },
  methods: {
    updateWidth(state, params) {
      console.log(params);
      state.width = params;
    }
  }
});
```

2. 使用状态管理，

- 非全局使用时，是在适配器Component 内声明使用，

```js
import Yam, { Component } from "yamjs";
import store from "./store";
@Component({
  tagName: "my-timer",
  style: require("./myTimers.stylus"),
  canBeCalledExt: false,
  store: store,
  props: []
})
class App extends Yam {}
```

- 全局使用时，直接在公共 js 处用`yam.use`方法使用，这样每个组件都会接受状态的监管，一旦状态改变时，所有组件都会进行更新。

```js
import Yam from "../lib/index";
import store from "./store";
Yam.use(store);
```

3. 取公共状态值

   凡事使用状态管理插件的组件内部都会自动创建`$store`对象，例如有个状态值是`width`，那么`this.$store.width`就可以取值了

4. 更新公共状态值

   更是状态值，只是在用了状态管理的组件内才能更新状态值，方法是`this.$store.commit()`，更新的时候会先去找声明状态时的`methods`方法集，若是有该对应方法，那么就会调用执行该方法，此时若是该方法返回了`false`那么本次更新状态将不进行更新组件，其他返回值或者不设返回值则进行更新组件动作；若是在`methods`内没有找到对应的方法集，那么就会去`state`找对应的状态值，若是有状态值，那么就进行更新状态值并且更新组件，若是没有对应的状态值，那么就不作处理