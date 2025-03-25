## yamjs-路由管理

> 针对yamjs库的一个补充-简易路由机制

这是一个yamjs简易版的路由管理机制，实现原理监听hash变化来调整显示的组件，可以全局使用，也可以单独使用。一个yamjs应用只能使用一个路由。

使用方法：

1. 引入`router`并注入组件的依赖

   ```js
   import Router from "yamjs/plugins/router/router";
   export default new Router({
     routes: [
       {
         name: "index",
         path: "/",
         component: "my-timer"
       },
       {
         path: "/goTop",
         component: "go-top",
         name: "gotop"
       },
       {
         path: "/myTimer",
         component: "my-timer",
         name: "myTimer"
       }
     ]
   });
   ```

   `name`主要是用来跳转用的，`path`是地址栏的路径，采用的是 hash 模式；`component`要渲染的组件名字；

   使用路由

   ```js
   //common.js
   import Yam from "../lib/index";
   import router from "./router";
   
   Yam.use(router);
   //main.js
   import "./components/common";
   import "./lib/plugins/router/routerView";
   ```

   html 中

   ```html
   <router-view></router-view>
   ```

   在组件中使用路由跳转

   ```js
   //....
    goT () {
       this.$router.push({
         name: 'myTimer',
         query:{a:1,b:2}
       })
     }
   
   //.....
   ```

   跳转之后，地址栏就会变成http://0.0.0.0:8081/#/myTimer?a=1&b=2

   通过目标组件通过`this.$router.current.query`获取

2. 有的方法：

   - `push`进入另外一个组件

     ```js
     this.$router.push({
       name: "myTimer", //name
       query: { a: 1, b: 2 } // 参数
     });
     ```

   - `back`返回