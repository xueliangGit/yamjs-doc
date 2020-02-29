# 安装

#### # 兼容性

yamjs 暂时只支持主流浏览器以及ie9+及其以上；

#### # 更新日志 

最新稳定版版本：0.4.0

[更新日志](./History.md)

#### # NPM

在用 yamjs 构建组间时推荐使用 NPM 安装，NPM 能很好地和诸如 [webpack](https://webpack.js.org/) 或 [rollup](http://rollupjs.org) 模块打包器配合使用

```sh
# 最新版本
$ npm install yamjs
```

##### 命令行工具 (CLI)

Yamjs 提供了一个[暂行的CLI](https://www.npmjs.com/package/yamjs-cli)，为构建组件提供简单的方式。只需要几分钟的时间就可以运行起来并带有热重载、保存时 lint 校验，以及生产环境可用的构建版本。

使用yamjs去开发组间建议使用yam-cli 工具去构建，

```shell
# 最新版本
$ npm install yam-cli -g
# 创建项目
$ yamjs create appName [key] 我这里获取
```

#### #对不同构建版本的解释

umd ： yam.min.js

CommonJs:  yam.common.min.js

ESmodule: yam.esm.min.js